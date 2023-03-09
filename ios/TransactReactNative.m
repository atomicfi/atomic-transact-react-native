#import <React/RCTBridgeModule.h>
#import <React/RCTUtils.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(TransactReactNative, RCTEventEmitter)

RCT_EXTERN_METHOD(presentTransact:(NSDictionary *)config
				  environment:NSString
				  withResolver:(RCTPromiseResolveBlock)resolve
				  withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
