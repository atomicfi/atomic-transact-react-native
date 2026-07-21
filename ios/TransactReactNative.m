#import <React/RCTBridgeModule.h>
#import <React/RCTUtils.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(TransactReactNative, RCTEventEmitter)

RCT_EXTERN_METHOD(presentTransact:(NSString *)instanceId
                  config:(NSDictionary *)config
                  environment:(NSDictionary *)environment
                  presentationStyle:(nullable NSString *)presentationStyle
                  setDebug:(nullable NSNumber *)setDebug
                  wrapperVersion:(NSString *)wrapperVersion
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(resolveDataRequest:(NSString *)instanceId data:(id)data)

RCT_EXTERN_METHOD(hideTransact:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
