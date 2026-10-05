import AtomicTransact
import UIKit

@objc(TransactReactNative)
class TransactReactNative: RCTEventEmitter {

	// Data-request continuations keyed by instanceId, so concurrent/overlapping requests across
	// tasks don't collide (the previous single handler was overwritten — SDK-658).
	private var dataResponseHandlers: [String: (Any) -> Void] = [:]

	// Launches that haven't completed or cleaned up yet, by instanceId.
	private var liveInstanceIds: Set<String> = []

	// A paused session and the launches it could belong to. The SDK pauses whichever Transact is
	// presented without saying which, so that's every launch live at the time.
	private struct PausedSession {
		let ref: Atomic.PausedTransactRef
		var instanceIds: Set<String>
	}

	// Keyed by the JS pauseId: a PausedTransactRef can't cross the bridge, so the JS ref names one
	// held here until it's resumed or its session ends.
	private var pausedSessions: [String: PausedSession] = [:]
	
	private func parseEnvironment(_ environmentData: [String: Any]) -> AtomicTransact.TransactEnvironment {
		guard let environment = environmentData["environment"] as? String else {
			return .production // fallback to production if parsing fails
		}
		
		// Check if it matches known environments
		if environment == "production" {
			return .production
		} else if environment == "sandbox" {
			return .sandbox
		} else {
			let transactPath = environmentData["transactPath"] as? String ?? "https://transact.atomicfi.com"
			let apiPath = environmentData["apiPath"] as? String ?? "https://api.atomicfi.com"
			return .custom(transactPath: transactPath, apiPath: apiPath)
		}
	}
	
	private func parsePresentationStyle(_ presentationStyleString: String?) -> UIModalPresentationStyle {
		guard let styleString = presentationStyleString else {
			return .formSheet // Default to formSheet
		}
		
		switch styleString {
		case "fullScreen":
			return .fullScreen
		default:
			return .formSheet
		}
	}
	
	// RCTPresentedViewController() is nil while no window scene is in the foreground: during launch
	// before the window is key, or while the app is inactive or backgrounded. Wait briefly for one
	// before giving up, so a call made as the app finishes launching still presents.
	@MainActor
	private func waitForPresentingViewController() async -> UIViewController? {
		let deadline = Date().addingTimeInterval(2)
		while Date() < deadline {
			if let source = RCTPresentedViewController() {
				return source
			}
			try? await Task.sleep(nanoseconds: 100_000_000)
		}
		return RCTPresentedViewController()
	}

	// Whether a presentation or dismissal is in flight in any visible window. Transact's may not be in
	// the key window.
	@MainActor
	private func isTransitioning() -> Bool {
		let windows = UIApplication.shared.connectedScenes
			.compactMap { $0 as? UIWindowScene }
			.flatMap { $0.windows }
			.filter { !$0.isHidden }
		for window in windows {
			var controller = window.rootViewController
			while let current = controller {
				if current.transitionCoordinator != nil || current.isBeingPresented || current.isBeingDismissed {
					return true
				}
				controller = current.presentedViewController
			}
		}
		return false
	}

	// Waits briefly for a presentation or dismissal in flight to finish. UIKit drops a presentation
	// made mid-transition, and the SDK returns from pauseTransact as soon as Transact starts animating
	// out: resuming before that dismissal finishes leaves Transact parked out of sight.
	@MainActor
	private func waitForTransitions() async {
		let deadline = Date().addingTimeInterval(2)
		while Date() < deadline, isTransitioning() {
			try? await Task.sleep(nanoseconds: 50_000_000)
		}
	}

	// An ended session can't be resumed: the SDK would bring back a session that already reported its
	// end, or once cleaned up a torn-down screen the user can't close. Drop the paused sessions only
	// this launch could have owned.
	private func endSession(_ instanceId: String) {
		liveInstanceIds.remove(instanceId)
		for (pauseId, var session) in pausedSessions {
			session.instanceIds.remove(instanceId)
			pausedSessions[pauseId] = session.instanceIds.isEmpty ? nil : session
		}
	}

	// A launch that fails before Transact presents gets no other callback, so it must reject; the
	// JS layer delivers the rejection to onError.
	private func rejectLaunch(_ reject: RCTPromiseRejectBlock, code: String, message: String, debugEnabled: Bool) {
		if debugEnabled {
			sendEvent(withName: "onDebugLog", body: ["message": "\(code): \(message)"])
		}
		reject(code, message, nil)
	}

	@objc(presentTransact:config:environment:presentationStyle:setDebug:wrapperVersion:withResolver:withRejecter:)
	func presentTransact(instanceId: String, config: [String: Any], environment: [String: Any], presentationStyle: String?, setDebug: NSNumber?, wrapperVersion: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
		let debugEnabled = setDebug?.boolValue ?? false

		Task { @MainActor in
			await Atomic.setDebug(isEnabled: debugEnabled, forwardLogs: { logMessage in
				self.sendEvent(withName: "onDebugLog", body: ["message": logMessage])
			})

			guard let source = await self.waitForPresentingViewController() else {
				self.rejectLaunch(reject, code: "no_presenting_view_controller", message: "No view controller to present Transact from", debugEnabled: debugEnabled)
				return
			}

			let decoder = JSONDecoder()
			let parsedEnvironment = self.parseEnvironment(environment)

			do {
				var json = config

				let parsedPresentationStyle = self.parsePresentationStyle(presentationStyle)

				json["platform"] = AtomicConfig.Platform(suffixed: "react-\(wrapperVersion)").encode()

				// JSONSerialization raises an Objective-C exception, not a Swift error, on an invalid object.
				guard JSONSerialization.isValidJSONObject(json),
					let data = try? JSONSerialization.data(withJSONObject: json, options: []) else {
					self.rejectLaunch(reject, code: "config_serialization_failed", message: "The Transact config could not be serialized to JSON", debugEnabled: debugEnabled)
					return
				}

				let config = try decoder.decode(AtomicConfig.self, from: data)

				self.liveInstanceIds.insert(instanceId)
				Atomic.presentTransact(
					from: source, config: config, environment: parsedEnvironment, presentationStyle: parsedPresentationStyle,
					onInteraction: { interaction in
						self.sendEvent(withName: "onInteraction", body: ["instanceId": instanceId, "data": ["name": interaction.name, "value": interaction.value]])
					},
					onDataRequest: { request async -> TransactDataResponse? in
						// Create a task to handle the async request to React Native
						return await withCheckedContinuation { continuation in
							// Store the completion handler
								self.dataResponseHandlers[instanceId] = { responseData in
								if let responseDict = responseData as? [String: Any] {
									// The SDK expects the response data to be passed directly
									// Let the SDK handle the parsing internally
									do {
										let jsonData = try JSONSerialization.data(withJSONObject: responseDict, options: [])
										let decoder = JSONDecoder()
										let response = try decoder.decode(TransactDataResponse.self, from: jsonData)
										continuation.resume(returning: response)
									} catch {
										// If decoding fails, return nil
										print("Failed to decode TransactDataResponse: \(error)")
										continuation.resume(returning: nil)
									}
								} else {
									// If response isn't a dictionary or is nil
									continuation.resume(returning: nil)
								}
							}

							// Send event with request data to React Native
							self.sendEvent(withName: "onDataRequest", body: ["instanceId": instanceId, "data": request.data])
						}
					},
					onAuthStatusUpdate: { status in
						self.sendEvent(withName: "onAuthStatusUpdate", body: ["instanceId": instanceId, "data": status.serialize()])
					},
					onTaskStatusUpdate: { status in
						self.sendEvent(withName: "onTaskStatusUpdate", body: ["instanceId": instanceId, "data": status.serialize()])
					},
					onLaunch: {
						self.sendEvent(withName: "onLaunch", body: ["instanceId": instanceId, "data": NSNull()])
					},
					onCompletion: { result in
						// Finished, closed or failed, the SDK has hidden it for good: nothing to pause or resume.
						self.endSession(instanceId)
						switch result {
						case .finished(let response):
							self.sendEvent(withName: "onFinish", body: ["instanceId": instanceId, "data": response.data])
							resolve(["finished": response.data])
						case .closed(let response):
							self.sendEvent(withName: "onClose", body: ["instanceId": instanceId, "data": response.data])
							resolve(["closed": response.data])
						case .error:
							resolve(["error": "Unknown error"])
						default:
							resolve(["error": "Unknown error"])
						}
					},
					onError: { error in
						// In-flow SDK error channel (distinct from onCompletion's terminal load errors).
						// Routed per-task like every other event; not terminal on its own.
						if case let .transactError(data) = error {
							self.sendEvent(withName: "onError", body: ["instanceId": instanceId, "data": data])
						} else {
							self.sendEvent(withName: "onError", body: ["instanceId": instanceId, "data": NSNull()])
						}
					},
					onCleanup: {
						self.sendEvent(withName: "onCleanup", body: ["instanceId": instanceId, "data": NSNull()])
						self.dataResponseHandlers[instanceId] = nil
						self.endSession(instanceId)
					}
				)
			}
			catch let error {
				self.rejectLaunch(reject, code: "config_decode_failed", message: String(describing: error), debugEnabled: debugEnabled)
			}
		}
	}

	// Receives a data-request response from React Native, routed to the originating task by id.
	@objc(resolveDataRequest:data:)
	func resolveDataRequest(instanceId: String, data: Any) -> Void {
		if let handler = dataResponseHandlers[instanceId] {
			handler(data)
			dataResponseHandlers[instanceId] = nil
		}
	}

	@objc(hideTransact:withRejecter:)
	func hideTransact(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
		DispatchQueue.main.async {
			// Atomic.hideTransact() is non-throwing and process-global (hides every presented
			// session). Resolve so the JS promise settles instead of hanging forever.
			Atomic.hideTransact()
			resolve(nil)
		}
	}

	// Pauses whichever Transact is presented, like Atomic.pauseTransact(): it isn't tied to a task.
	@objc(pauseTransact:animated:withResolver:withRejecter:)
	func pauseTransact(pauseId: String, animated: Bool, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
		Task { @MainActor in
			// Let a presentation in flight finish first, e.g. a resume's: the SDK can't hide Transact
			// while it's still animating in.
			await self.waitForTransitions()
			do {
				let ref = try await Atomic.pauseTransact(animated: animated)
				// A launch already known to be paused can't have answered this pause.
				let paused = self.pausedSessions.values.filter { $0.instanceIds.count == 1 }.flatMap { $0.instanceIds }
				self.pausedSessions[pauseId] = PausedSession(ref: ref, instanceIds: self.liveInstanceIds.subtracting(paused))
				// Resolve once Transact is gone, so resuming straight away can present it again.
				await self.waitForTransitions()
				resolve(nil)
			} catch Atomic.PauseTransactError.transactNotPresented {
				// A paused Transact doesn't answer the SDK's request, so a second pause lands here too.
				// Report it as Android does.
				if self.pausedSessions.isEmpty {
					reject("transact_not_presented", "No Transact is currently presented", nil)
				} else {
					reject("transact_already_paused", "Transact is already paused", nil)
				}
			} catch {
				reject("pause_failed", String(describing: error), nil)
			}
		}
	}

	@objc(resumeTransact:animated:withResolver:withRejecter:)
	func resumeTransact(pauseId: String, animated: Bool, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
		Task { @MainActor in
			guard self.pausedSessions[pauseId] != nil else {
				reject("no_paused_transact", "No paused Transact to resume", nil)
				return
			}

			await self.waitForTransitions()
			guard let source = await self.waitForPresentingViewController(), !self.isTransitioning() else {
				// Keep the session, so the app can resume once it has a screen to present from.
				reject("no_presenting_view_controller", "No view controller to resume Transact from", nil)
				return
			}

			// Taken only now: a second resume of this ref, or the session's cleanup, may have happened
			// while this one waited.
			guard let session = self.pausedSessions.removeValue(forKey: pauseId) else {
				reject("no_paused_transact", "No paused Transact to resume", nil)
				return
			}
			session.ref.resume(source: source, animated: animated)
			// Resolve once Transact is back, so pausing straight away can hide it again.
			await self.waitForTransitions()
			resolve(nil)
		}
	}

	@objc override func supportedEvents() -> [String] {
		return ["onInteraction", "onDataRequest", "onLaunch", "onFinish", "onClose", "onCleanup", "onError", "onAuthStatusUpdate", "onTaskStatusUpdate", "onDebugLog"]
	}
}


extension TransactCompany {
	func serialize() -> [String: Any?] {
		return [
			"_id": id,
			"name": name,
			"branding": branding != nil ? [
				"color": branding?.color,
				"logo": [
					"url": branding?.logo.url,
					"backgroundColor": branding?.logo.backgroundColor
				]
			] : nil
		]
	}
}

extension TransactAuthStatusUpdate {
    func serialize() -> [String: Any?] {
        return [
            "status": status.rawValue,
            "company": company.serialize(),
        ]
    }
}

extension TransactTaskStatusUpdate {
    func serialize() -> [String: Any?] {
        var result: [String: Any?] = [
            "taskId": taskId,
            "product": product.rawValue,
            "status": status.rawValue,
            "failReason": failReason,
            "company": company.serialize(),
            "actionType": actionType?.rawValue
        ]
        
        if let switchData = switchData {
            var switchMap: [String: Any] = [:]
            
            let payment = switchData.paymentMethod
            var paymentMap: [String: Any] = [
                "_id": payment.id,
                "title": payment.title,
                "type": payment.type.rawValue
            ]
            
            switch payment.type {
            case .card:
                paymentMap["expiry"] = payment.expiry
                paymentMap["brand"] = payment.brand
                paymentMap["lastFour"] = payment.lastFour
            case .bank:
                paymentMap["routingNumber"] = payment.routingNumber
                paymentMap["accountType"] = payment.accountType
                paymentMap["lastFourAccountNumber"] = payment.lastFourAccountNumber
            }
            
            switchMap["paymentMethod"] = paymentMap
            result["switchData"] = switchMap
        }
        
        if let depositData = depositData {
            result["depositData"] = [
                "accountType": depositData.accountType,
                "lastFour": depositData.lastFour,
                "routingNumber": depositData.routingNumber,
                "title": depositData.title,
                "distributionAmount": depositData.distributionAmount,
                "distributionType": depositData.distributionType?.description
            ]
        }
        
        if let managedBy = managedBy {
            result["managedBy"] = ["company": managedBy.company.serialize()]
        }
        
        return result
    }
}
