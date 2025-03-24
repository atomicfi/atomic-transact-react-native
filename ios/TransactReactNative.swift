import AtomicTransact
import UIKit

@objc(TransactReactNative)
class TransactReactNative: RCTEventEmitter {
	
	@objc(presentTransact:environment:withResolver:withRejecter:)
	func presentTransact(config: [String: Any], environment: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
		DispatchQueue.main.async {
			guard let source = RCTPresentedViewController() else { return }
			
			let decoder = JSONDecoder()
			
			do {
				var json = config
				
				if var platform = AtomicConfig.Platform().encode() as? [String: Any] {
					platform["sdkVersion"] = platform["sdkVersion"] as! String + "-react"
					json["platform"] = platform
				}
				
				guard let data = try? JSONSerialization.data(withJSONObject: json, options: []) else { return }
				
				let config = try decoder.decode(AtomicConfig.self, from: data)
				
				Atomic.presentTransact(
					from: source, config: config, environment: .custom(path: environment),
					onInteraction: { interaction in
						self.sendEvent(withName: "onInteraction", body: ["name": interaction.name, "value": interaction.value])
					},
					onDataRequest: { request in
						self.sendEvent(withName: "onDataRequest", body: request.data)
					},
					onAuthStatusUpdate: { status in
						self.sendEvent(withName: "onAuthStatusUpdate", body: ["status": status.serialize()])
					},
					onTaskStatusUpdate: { status in
						self.sendEvent(withName: "onTaskStatusUpdate", body: ["status":  status.serialize()])
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
	
	@objc(presentAction:environment:withResolver:withRejecter:)
	func presentAction(id: String, environment: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
		DispatchQueue.main.async {
			guard let source = RCTPresentedViewController() else { return }
			
			Atomic.presentAction(
				from: source,
				id: id,
				environment: .custom(path: environment),
				onLaunch: {
					self.sendEvent(withName: "onLaunch", body: [])
				},
				onAuthStatusUpdate: { status in
					self.sendEvent(withName: "onAuthStatusUpdate", body: ["status": status.serialize()])
				},
				onTaskStatusUpdate: { status in
					print("iOS Native -> Task status update event:", status)
					self.sendEvent(withName: "onTaskStatusUpdate", body: ["status": status.serialize()])
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
	
	@objc override func supportedEvents() -> [String] {
		return ["onInteraction", "onDataRequest", "onLaunch", "onCompletion", "onAuthStatusUpdate", "onTaskStatusUpdate"]
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
