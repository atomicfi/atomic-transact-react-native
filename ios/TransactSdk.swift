import AtomicTransact
import UIKit

@objc(TransactSdk)
class TransactSdk: NSObject {

	@objc(presentTransact:withResolver:withRejecter:)
	func presentTransact(atomicConfig: [String: Any], resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
		DispatchQueue.main.async {
			guard let source = RCTPresentedViewController() else { return }

			let decoder = JSONDecoder()
			
			do {
				var json = atomicConfig
				if json["language"] == nil {
					json["language"] = "en"
				}
				
				guard let data = try? JSONSerialization.data(withJSONObject: json, options: []) else { return }
				
				let config = try decoder.decode(AtomicConfig.self, from: data)
						
				Atomic.presentTransact(from: source, config: config) { result in
					switch result {
					case .finished(let response):
						resolve(response.data)
					case .closed(let response):
						resolve(response.data)
					case .error(let error):
						resolve(["error": "Unknown error"])
					}
				}
			}
			catch let error {
				reject("config error", String(describing: error), NSError(domain: "com.atomicfi", code: 500, userInfo: nil))
			}
		}
    }
}
