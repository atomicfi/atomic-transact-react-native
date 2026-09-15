#import <React/RCTBridgeModule.h>
#import <os/log.h>

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
 *
 * Emitted through os_log as well as NSLog: NSLog only reaches a console attached to the process, so
 * an Appium-driven run (where Appium owns the launch) shows nothing. os_log is readable live with
 *
 *   xcrun simctl spawn <udid> log stream --predicate 'subsystem == "com.atomicfi.appium"'
 */
RCT_EXPORT_METHOD(log : (NSString *)message)
{
  static os_log_t harnessLog;
  static dispatch_once_t once;
  dispatch_once(&once, ^{
    harnessLog = os_log_create("com.atomicfi.appium", "AppiumTestEnvironment");
  });

  os_log(harnessLog, "AppiumTestEnvironment: %{public}@", message);
  NSLog(@"AppiumTestEnvironment: %@", message);
}

@end
