#import <React/RCTBridgeModule.h>
#import <React/RCTUtils.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(TransactSdk, RCTEventEmitter)

RCT_EXTERN_METHOD(presentTransact:(NSDictionary *)atomicConfig
				  transactURL:NSString
				  withResolver:(RCTPromiseResolveBlock)resolve
				  withRejecter:(RCTPromiseRejectBlock)reject)

@end
