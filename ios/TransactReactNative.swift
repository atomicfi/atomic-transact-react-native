import AtomicTransact
import UIKit

@objc(TransactReactNative)
class TransactReactNative: RCTEventEmitter {
	
	// Data request handler that will be called when the response arrives
	private var dataResponseHandler: ((Any) -> Void)? = nil
	
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
	
	@objc(presentTransact:environment:presentationStyle:setDebug:withResolver:withRejecter:)
	func presentTransact(config: [String: Any], environment: [String: Any], presentationStyle: String?, setDebug: NSNumber?, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
		DispatchQueue.main.async {
			guard let source = RCTPresentedViewController() else { return }
			
			let decoder = JSONDecoder()
			let parsedEnvironment = self.parseEnvironment(environment)
			
			do {
				var json = config

				let debugEnabled = setDebug?.boolValue ?? false
				Atomic.setDebug(isEnabled: debugEnabled, forwardLogs: { logMessage in
					self.sendEvent(withName: "onDebugLog", body: ["message": logMessage])
				})

				let parsedPresentationStyle = self.parsePresentationStyle(presentationStyle)
				
				if var platform = AtomicConfig.Platform().encode() as? [String: Any] {
					platform["sdkVersion"] = platform["sdkVersion"] as! String + "-react"
					json["platform"] = platform
				}

				guard let data = try? JSONSerialization.data(withJSONObject: json, options: []) else { return }
				
				let config = try decoder.decode(AtomicConfig.self, from: data)
				
				Atomic.presentTransact(
					from: source, config: config, environment: parsedEnvironment, presentationStyle: parsedPresentationStyle,
					onInteraction: { interaction in
						self.sendEvent(withName: "onInteraction", body: ["name": interaction.name, "value": interaction.value])
					},
					onDataRequest: { request async -> TransactDataResponse? in
						// Create a task to handle the async request to React Native
						return await withCheckedContinuation { continuation in
							// Store the completion handler 
								self.dataResponseHandler = { responseData in
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
							self.sendEvent(withName: "onDataRequest", body: request.data)
						}
					},
					onAuthStatusUpdate: { status in
						self.sendEvent(withName: "onAuthStatusUpdate", body: status.serialize())
					},
					onTaskStatusUpdate: { status in
						self.sendEvent(withName: "onTaskStatusUpdate", body: status.serialize())
					},
					onCompletion: { result in
						switch result {
						case .finished(let response):
							resolve(["finished": response.data])
						case .closed(let response):
							resolve(["closed": response.data])
						case .error:
							resolve(["error": "Unknown error"])
						default:
							resolve(["error": "Unknown error"])
						}
					}
				)
			}
			catch let error {
				reject("config error", String(describing: error), NSError(domain: "com.atomicfi", code: 500, userInfo: nil))
			}
		}
	}
	
	// Method to receive response from React Native
	@objc(resolveDataRequest:)
	func resolveDataRequest(data: Any) -> Void {
		// Call the stored response handler with the data from React Native
		if let handler = dataResponseHandler {
			handler(data)
			
			// Clear the handler
			dataResponseHandler = nil
		}
	}
	
	@objc(presentAction:environment:presentationStyle:setDebug:withResolver:withRejecter:)
	func presentAction(id: String, environment: [String: Any], presentationStyle: String?, setDebug: NSNumber?, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
		DispatchQueue.main.async {
			guard let source = RCTPresentedViewController() else { return }

			let parsedEnvironment = self.parseEnvironment(environment)
			let parsedPresentationStyle = self.parsePresentationStyle(presentationStyle)

			let debugEnabled = setDebug?.boolValue ?? false
			Atomic.setDebug(isEnabled: debugEnabled, forwardLogs: { logMessage in
				self.sendEvent(withName: "onDebugLog", body: ["message": logMessage])
			})

			Atomic.presentAction(
				from: source,
				id: id,
				environment: parsedEnvironment,
				presentationStyle: parsedPresentationStyle,
				onLaunch: {
					self.sendEvent(withName: "onLaunch", body: [])
				},
				onAuthStatusUpdate: { status in
					self.sendEvent(withName: "onAuthStatusUpdate", body: status.serialize())
				},
				onTaskStatusUpdate: { status in
					self.sendEvent(withName: "onTaskStatusUpdate", body: status.serialize())
				},
				onCompletion: { result in
					switch result {
					case .finished(let response):
						resolve(["finished": response.data])
					case .closed(let response):
						resolve(["closed": response.data])
					case .error:
						resolve(["error": "Unknown error"])
					default:
						print("default")
						resolve(["error": "Unknown error"])
					}
				}
			)
		}
	}
	
	@objc(hideTransact:withRejecter:)
	func hideTransact(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
		DispatchQueue.main.async {
			do {
				Atomic.hideTransact()
			} catch {
				reject("dismiss_error", "Error dismissing Transact", error)
			}
		}
	}
	
	@objc override func supportedEvents() -> [String] {
		return ["onInteraction", "onDataRequest", "onLaunch", "onCompletion", "onAuthStatusUpdate", "onTaskStatusUpdate", "onDebugLog"]
	}
	
	@objc override static func requiresMainQueueSetup() -> Bool {
		return true
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
            "company": company.serialize()
        ]
        
        if let switchData = switchData {
            var switchMap: [String: Any] = [:]
            
            let payment = switchData.paymentMethod
            var paymentMap: [String: Any] = [
                "id": payment.id,
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
