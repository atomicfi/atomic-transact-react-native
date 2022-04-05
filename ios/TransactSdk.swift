import AtomicTransact
import UIKit

@objc(TransactSdk)
class TransactSdk: RCTEventEmitter {

	@objc(presentTransact:environment:withResolver:withRejecter:)
	func presentTransact(config: [String: Any], environment: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
		DispatchQueue.main.async {
			guard let source = RCTPresentedViewController() else { return }

			let decoder = JSONDecoder()

			do {
				var json = config

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
					case .error(let error):
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

	@objc override func supportedEvents() -> [String] {
		return ["onInteraction", "onDataRequest"]
	}
}
