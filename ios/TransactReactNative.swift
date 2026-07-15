import AtomicTransact
import UIKit

@objc(TransactReactNative)
class TransactReactNative: RCTEventEmitter {

	// Data-request continuations keyed by instanceId, so concurrent/overlapping requests across
	// tasks don't collide (the previous single handler was overwritten — SDK-658).
	private var dataResponseHandlers: [String: (Any) -> Void] = [:]
	
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
	
	@objc(presentTransact:config:environment:presentationStyle:setDebug:wrapperVersion:withResolver:withRejecter:)
	func presentTransact(instanceId: String, config: [String: Any], environment: [String: Any], presentationStyle: String?, setDebug: NSNumber?, wrapperVersion: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
		let debugEnabled = setDebug?.boolValue ?? false

		Task { @MainActor in
			await Atomic.setDebug(isEnabled: debugEnabled, forwardLogs: { logMessage in
				self.sendEvent(withName: "onDebugLog", body: ["message": logMessage])
			})

			guard let source = RCTPresentedViewController() else { return }

			let decoder = JSONDecoder()
			let parsedEnvironment = self.parseEnvironment(environment)

			do {
				var json = config

				let parsedPresentationStyle = self.parsePresentationStyle(presentationStyle)

				json["platform"] = AtomicConfig.Platform(suffixed: "react-\(wrapperVersion)").encode()

				guard let data = try? JSONSerialization.data(withJSONObject: json, options: []) else { return }

				let config = try decoder.decode(AtomicConfig.self, from: data)

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
					}
				)
			}
			catch let error {
				reject("config error", String(describing: error), NSError(domain: "com.atomicfi", code: 500, userInfo: nil))
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
