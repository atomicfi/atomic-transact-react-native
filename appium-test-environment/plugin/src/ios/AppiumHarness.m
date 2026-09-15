#import <React/RCTBridgeModule.h>

/**
 * Bridges the Appium conformance contract to JS on iOS.
 *
 * The suite launches this app via `mobile:launchApp` with the TRANSACT_* values passed as process
 * environment variables. React Native cannot read those — Metro inlines `process.env` at build
 * time — so they are read here from NSProcessInfo and handed to JS.
 *
 * The interface is declared inline rather than in a header so the plugin has a single file to add
 * to the target's Sources phase; a separate header would also need adding to the project, and
 * Xcode would copy it into the app bundle as a resource.
 */
@interface AppiumHarness : NSObject <RCTBridgeModule>
@end

@implementation AppiumHarness

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

/** The TRANSACT_* process environment variables the suite launched this app with. */
RCT_EXPORT_METHOD(getLaunchExtras
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject)
{
  NSMutableDictionary<NSString *, NSString *> *extras = [NSMutableDictionary dictionary];
  NSDictionary<NSString *, NSString *> *environment = [[NSProcessInfo processInfo] environment];

  for (NSString *key in environment) {
    if ([key hasPrefix:@"TRANSACT_"]) {
      extras[key] = environment[key];
    }
  }

  resolve(extras);
}

/**
 * Log under the same tag the Android harness uses. The iOS specs assert on UI rather than logs, so
 * this is for diagnosing runs rather than for any assertion.
 */
RCT_EXPORT_METHOD(log : (NSString *)message)
{
  NSLog(@"AppiumTestEnvironment: %@", message);
}

@end
