#import <React/RCTBridgeModule.h>
#import <React/RCTUtils.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(TransactReactNative, RCTEventEmitter)

RCT_EXTERN_METHOD(presentTransact:(NSDictionary *)config
				  environment:NSDictionary
				  withResolver:(RCTPromiseResolveBlock)resolve
				  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(presentAction:(NSString *)id
				  environment:NSDictionary
				  withResolver:(RCTPromiseResolveBlock)resolve
				  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(resolveDataRequest:(id)data)

RCT_EXTERN_METHOD(hideTransact:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
