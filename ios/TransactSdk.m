#import <React/RCTBridgeModule.h>
#import <React/RCTUtils.h>

@interface RCT_EXTERN_MODULE(TransactSdk, NSObject)

RCT_EXTERN_METHOD(presentTransact:(NSDictionary *)atomicConfig
				  withResolver:(RCTPromiseResolveBlock)resolve
				  withRejecter:(RCTPromiseRejectBlock)reject)

@end
