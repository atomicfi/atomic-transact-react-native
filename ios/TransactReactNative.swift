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

				Atomic.presentTransact(from: source, config: config, environment: .custom(path: environment), onInteraction: { interaction in
					self.sendEvent(withName: "onInteraction", body: ["name": interaction.name, "value": interaction.value])
				}, onDataRequest: { request in
					self.sendEvent(withName: "onDataRequest", body: request.data)
				}, onCompletion: { result in
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
				})
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
			
			Atomic.presentAction(from: source, id: id, environment: .custom(path: environment), onLaunch: {
				self.sendEvent(withName: "onLaunch", body: [])
			}, onCompletion: { result in
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
			})
		}
	}

	@objc override func supportedEvents() -> [String] {
		return ["onInteraction", "onDataRequest", "onLaunch", "onCompletion"]
	}

	@objc override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
