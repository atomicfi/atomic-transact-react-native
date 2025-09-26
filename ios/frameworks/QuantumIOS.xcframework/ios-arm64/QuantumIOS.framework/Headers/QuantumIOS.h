#import <Foundation/NSArray.h>
#import <Foundation/NSDictionary.h>
#import <Foundation/NSError.h>
#import <Foundation/NSObject.h>
#import <Foundation/NSSet.h>
#import <Foundation/NSString.h>
#import <Foundation/NSValue.h>

@class QIOSCoreEmitterEvent<T>, QIOSCoreResponse, QIOSKotlinArray<T>, QIOSKotlinByteArray, QIOSKotlinByteIterator, QIOSKotlinCancellationException, QIOSKotlinEnum<E>, QIOSKotlinEnumCompanion, QIOSKotlinException, QIOSKotlinIllegalStateException, QIOSKotlinNothing, QIOSKotlinRuntimeException, QIOSKotlinThrowable, QIOSKotlinUnit, QIOSKotlinx_serialization_coreSerialKind, QIOSKotlinx_serialization_coreSerializersModule, QIOSKotlinx_serialization_jsonJsonElement, QIOSKotlinx_serialization_jsonJsonElementCompanion, QIOSKtor_httpCookie, QIOSKtor_httpCookieCompanion, QIOSKtor_httpCookieEncoding, QIOSKtor_utilsGMTDate, QIOSKtor_utilsGMTDateCompanion, QIOSKtor_utilsMonth, QIOSKtor_utilsMonthCompanion, QIOSKtor_utilsWeekDay, QIOSKtor_utilsWeekDayCompanion, QIOSQuantumCommon<T>, QIOSQuantumSessionCompanion, UIViewController, WKWebView, WKWebViewConfiguration;

@protocol BrowserFactoryProtocol, BrowserProtocol, EmitterProtocol, MuppetProtocol, PageFactoryBaseProtocol, PageProtocol, QIOSKotlinAnnotation, QIOSKotlinComparable, QIOSKotlinCoroutineContext, QIOSKotlinCoroutineContextElement, QIOSKotlinCoroutineContextKey, QIOSKotlinFunction, QIOSKotlinIterator, QIOSKotlinKAnnotatedElement, QIOSKotlinKClass, QIOSKotlinKClassifier, QIOSKotlinKDeclarationContainer, QIOSKotlinSequence, QIOSKotlinSuspendFunction1, QIOSKotlinx_coroutines_coreChildHandle, QIOSKotlinx_coroutines_coreChildJob, QIOSKotlinx_coroutines_coreCoroutineScope, QIOSKotlinx_coroutines_coreDeferred, QIOSKotlinx_coroutines_coreDisposableHandle, QIOSKotlinx_coroutines_coreFlow, QIOSKotlinx_coroutines_coreFlowCollector, QIOSKotlinx_coroutines_coreJob, QIOSKotlinx_coroutines_coreParentJob, QIOSKotlinx_coroutines_coreSelectClause, QIOSKotlinx_coroutines_coreSelectClause0, QIOSKotlinx_coroutines_coreSelectClause1, QIOSKotlinx_coroutines_coreSelectInstance, QIOSKotlinx_serialization_coreCompositeDecoder, QIOSKotlinx_serialization_coreCompositeEncoder, QIOSKotlinx_serialization_coreDecoder, QIOSKotlinx_serialization_coreDeserializationStrategy, QIOSKotlinx_serialization_coreEncoder, QIOSKotlinx_serialization_coreKSerializer, QIOSKotlinx_serialization_coreSerialDescriptor, QIOSKotlinx_serialization_coreSerializationStrategy, QIOSKotlinx_serialization_coreSerializersModuleCollector, QIOSKtor_ioJvmSerializable, QIOSQuantumInterface;

NS_ASSUME_NONNULL_BEGIN
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wunknown-warning-option"
#pragma clang diagnostic ignored "-Wincompatible-property-type"
#pragma clang diagnostic ignored "-Wnullability"

#pragma push_macro("_Nullable_result")
#if !__has_feature(nullability_nullable_result)
#undef _Nullable_result
#define _Nullable_result _Nullable
#endif

__attribute__((swift_name("KotlinBase")))
@interface QIOSBase : NSObject
- (instancetype)init __attribute__((unavailable));
+ (instancetype)new __attribute__((unavailable));
+ (void)initialize __attribute__((objc_requires_super));
@end

@interface QIOSBase (QIOSBaseCopying) <NSCopying>
@end

__attribute__((swift_name("KotlinMutableSet")))
@interface QIOSMutableSet<ObjectType> : NSMutableSet<ObjectType>
@end

__attribute__((swift_name("KotlinMutableDictionary")))
@interface QIOSMutableDictionary<KeyType, ObjectType> : NSMutableDictionary<KeyType, ObjectType>
@end

@interface NSError (NSErrorQIOSKotlinException)
@property (readonly) id _Nullable kotlinException;
@end

__attribute__((swift_name("KotlinNumber")))
@interface QIOSNumber : NSNumber
- (instancetype)initWithChar:(char)value __attribute__((unavailable));
- (instancetype)initWithUnsignedChar:(unsigned char)value __attribute__((unavailable));
- (instancetype)initWithShort:(short)value __attribute__((unavailable));
- (instancetype)initWithUnsignedShort:(unsigned short)value __attribute__((unavailable));
- (instancetype)initWithInt:(int)value __attribute__((unavailable));
- (instancetype)initWithUnsignedInt:(unsigned int)value __attribute__((unavailable));
- (instancetype)initWithLong:(long)value __attribute__((unavailable));
- (instancetype)initWithUnsignedLong:(unsigned long)value __attribute__((unavailable));
- (instancetype)initWithLongLong:(long long)value __attribute__((unavailable));
- (instancetype)initWithUnsignedLongLong:(unsigned long long)value __attribute__((unavailable));
- (instancetype)initWithFloat:(float)value __attribute__((unavailable));
- (instancetype)initWithDouble:(double)value __attribute__((unavailable));
- (instancetype)initWithBool:(BOOL)value __attribute__((unavailable));
- (instancetype)initWithInteger:(NSInteger)value __attribute__((unavailable));
- (instancetype)initWithUnsignedInteger:(NSUInteger)value __attribute__((unavailable));
+ (instancetype)numberWithChar:(char)value __attribute__((unavailable));
+ (instancetype)numberWithUnsignedChar:(unsigned char)value __attribute__((unavailable));
+ (instancetype)numberWithShort:(short)value __attribute__((unavailable));
+ (instancetype)numberWithUnsignedShort:(unsigned short)value __attribute__((unavailable));
+ (instancetype)numberWithInt:(int)value __attribute__((unavailable));
+ (instancetype)numberWithUnsignedInt:(unsigned int)value __attribute__((unavailable));
+ (instancetype)numberWithLong:(long)value __attribute__((unavailable));
+ (instancetype)numberWithUnsignedLong:(unsigned long)value __attribute__((unavailable));
+ (instancetype)numberWithLongLong:(long long)value __attribute__((unavailable));
+ (instancetype)numberWithUnsignedLongLong:(unsigned long long)value __attribute__((unavailable));
+ (instancetype)numberWithFloat:(float)value __attribute__((unavailable));
+ (instancetype)numberWithDouble:(double)value __attribute__((unavailable));
+ (instancetype)numberWithBool:(BOOL)value __attribute__((unavailable));
+ (instancetype)numberWithInteger:(NSInteger)value __attribute__((unavailable));
+ (instancetype)numberWithUnsignedInteger:(NSUInteger)value __attribute__((unavailable));
@end

__attribute__((swift_name("KotlinByte")))
@interface QIOSByte : QIOSNumber
- (instancetype)initWithChar:(char)value;
+ (instancetype)numberWithChar:(char)value;
@end

__attribute__((swift_name("KotlinUByte")))
@interface QIOSUByte : QIOSNumber
- (instancetype)initWithUnsignedChar:(unsigned char)value;
+ (instancetype)numberWithUnsignedChar:(unsigned char)value;
@end

__attribute__((swift_name("KotlinShort")))
@interface QIOSShort : QIOSNumber
- (instancetype)initWithShort:(short)value;
+ (instancetype)numberWithShort:(short)value;
@end

__attribute__((swift_name("KotlinUShort")))
@interface QIOSUShort : QIOSNumber
- (instancetype)initWithUnsignedShort:(unsigned short)value;
+ (instancetype)numberWithUnsignedShort:(unsigned short)value;
@end

__attribute__((swift_name("KotlinInt")))
@interface QIOSInt : QIOSNumber
- (instancetype)initWithInt:(int)value;
+ (instancetype)numberWithInt:(int)value;
@end

__attribute__((swift_name("KotlinUInt")))
@interface QIOSUInt : QIOSNumber
- (instancetype)initWithUnsignedInt:(unsigned int)value;
+ (instancetype)numberWithUnsignedInt:(unsigned int)value;
@end

__attribute__((swift_name("KotlinLong")))
@interface QIOSLong : QIOSNumber
- (instancetype)initWithLongLong:(long long)value;
+ (instancetype)numberWithLongLong:(long long)value;
@end

__attribute__((swift_name("KotlinULong")))
@interface QIOSULong : QIOSNumber
- (instancetype)initWithUnsignedLongLong:(unsigned long long)value;
+ (instancetype)numberWithUnsignedLongLong:(unsigned long long)value;
@end

__attribute__((swift_name("KotlinFloat")))
@interface QIOSFloat : QIOSNumber
- (instancetype)initWithFloat:(float)value;
+ (instancetype)numberWithFloat:(float)value;
@end

__attribute__((swift_name("KotlinDouble")))
@interface QIOSDouble : QIOSNumber
- (instancetype)initWithDouble:(double)value;
+ (instancetype)numberWithDouble:(double)value;
@end

__attribute__((swift_name("KotlinBoolean")))
@interface QIOSBoolean : QIOSNumber
- (instancetype)initWithBool:(BOOL)value;
+ (instancetype)numberWithBool:(BOOL)value;
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("AtomicWebView")))
@interface QIOSAtomicWebView : QIOSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (WKWebView *)createController:(UIViewController *)controller configuration:(WKWebViewConfiguration *)configuration __attribute__((swift_name("create(controller:configuration:)")));
@end

@protocol BrowserFactoryProtocol
@required
- (id<BrowserProtocol>)createMuppet:(id<MuppetProtocol>)muppet __attribute__((swift_name("create(muppet:)")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("BrowserFactory")))
@interface QIOSBrowserFactory : QIOSBase <BrowserFactoryProtocol>
- (instancetype)initWithController:(UIViewController *)controller scope:(id<QIOSKotlinx_coroutines_coreCoroutineScope>)scope __attribute__((swift_name("init(controller:scope:)"))) __attribute__((objc_designated_initializer));
- (id<BrowserProtocol>)createMuppet:(id<MuppetProtocol>)muppet __attribute__((swift_name("create(muppet:)")));
@property UIViewController *controller __attribute__((swift_name("controller")));
@property id<QIOSKotlinx_coroutines_coreCoroutineScope> scope __attribute__((swift_name("scope")));
@end

__attribute__((swift_name("QuantumInterface")))
@protocol QIOSQuantumInterface
@required

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)gotoUrl:(NSString *)url headers:(NSDictionary<NSString *, NSString *> *)headers timeout:(int64_t)timeout completionHandler:(void (^)(QIOSBoolean * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("goto(url:headers:timeout:completionHandler:)")));
@end

__attribute__((swift_name("QuantumCommon")))
@interface QIOSQuantumCommon<T> : QIOSBase <QIOSQuantumInterface>
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)gotoUrl:(NSString *)url headers:(NSDictionary<NSString *, NSString *> *)headers timeout:(int64_t)timeout completionHandler:(void (^)(QIOSBoolean * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("goto(url:headers:timeout:completionHandler:)")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property id<BrowserProtocol> _Nullable browser __attribute__((swift_name("browser")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property id<MuppetProtocol> _Nullable muppet __attribute__((swift_name("muppet")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property id<PageProtocol> _Nullable page __attribute__((swift_name("page")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Quantum")))
@interface QIOSQuantum : QIOSQuantumCommon<WKWebView *>
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (void)cleanup __attribute__((swift_name("cleanup()")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)initializeToken:(NSString *)token view:(WKWebView *)view controller:(UIViewController *)controller apiUrl:(NSString *)apiUrl completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("initialize(token:view:controller:apiUrl:completionHandler:)")));
- (void)updateUpdatedPresentationSource:(UIViewController *)updatedPresentationSource __attribute__((swift_name("update(updatedPresentationSource:)")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("QuantumSession")))
@interface QIOSQuantumSession : QIOSBase
- (instancetype)initWithApiUrl:(NSString *)apiUrl __attribute__((swift_name("init(apiUrl:)"))) __attribute__((objc_designated_initializer));
@property (class, readonly, getter=companion) QIOSQuantumSessionCompanion *companion __attribute__((swift_name("companion")));

/**
 * @note This method converts instances of QuantumSessionException, CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)generateUserTokenPublicToken:(NSString *)publicToken context:(id _Nullable)context completionHandler:(void (^)(NSString * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("generateUserToken(publicToken:context:completionHandler:)")));

/**
 * @note This method converts instances of QuantumSessionException, CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)trackSessionToken:(NSString *)token context:(id _Nullable)context completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("trackSession(token:context:completionHandler:)")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("QuantumSession.Companion")))
@interface QIOSQuantumSessionCompanion : QIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) QIOSQuantumSessionCompanion *shared __attribute__((swift_name("shared")));
@end

__attribute__((swift_name("KotlinThrowable")))
@interface QIOSKotlinThrowable : QIOSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithCause:(QIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(QIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer));

/**
 * @note annotations
 *   kotlin.experimental.ExperimentalNativeApi
*/
- (QIOSKotlinArray<NSString *> *)getStackTrace __attribute__((swift_name("getStackTrace()")));
- (void)printStackTrace __attribute__((swift_name("printStackTrace()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) QIOSKotlinThrowable * _Nullable cause __attribute__((swift_name("cause")));
@property (readonly) NSString * _Nullable message __attribute__((swift_name("message")));
- (NSError *)asError __attribute__((swift_name("asError()")));
@end

__attribute__((swift_name("KotlinException")))
@interface QIOSKotlinException : QIOSKotlinThrowable
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithCause:(QIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(QIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("QuantumSessionException")))
@interface QIOSQuantumSessionException : QIOSKotlinException
- (instancetype)initWithMessage:(NSString *)message cause:(QIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer));
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
+ (instancetype)new __attribute__((unavailable));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithCause:(QIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("QuantumSessionKt")))
@interface QIOSQuantumSessionKt : QIOSBase
+ (NSString *)getAppIdContext:(id _Nullable)context __attribute__((swift_name("getAppId(context:)")));
+ (NSString *)getPlatformName __attribute__((swift_name("getPlatformName()")));
@end

@protocol EmitterProtocol
@required

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)emitEvent:(QIOSCoreEmitterEvent<id> *)event completionHandler:(void (^)(QIOSCoreEmitterEvent<id> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("emit(event:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)emitType:(QIOSKotlinEnum<QIOSKotlinEnum *> *)type data:(id _Nullable)data completionHandler:(void (^)(QIOSCoreEmitterEvent<id> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("emit(type:data:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)emitType:(NSString *)type data:(id _Nullable)data completionHandler_:(void (^)(QIOSCoreEmitterEvent<id> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("emit(type:data:completionHandler_:)")));
- (void)offJob:(id<QIOSKotlinx_coroutines_coreJob>)job __attribute__((swift_name("off(job:)")));
- (id<QIOSKotlinx_coroutines_coreJob>)onType:(QIOSKotlinEnum<QIOSKotlinEnum *> *)type handler:(id<QIOSKotlinSuspendFunction1>)handler __attribute__((swift_name("on(type:handler:)")));
- (id<QIOSKotlinx_coroutines_coreJob>)onType:(NSString *)type handler_:(id<QIOSKotlinSuspendFunction1>)handler __attribute__((swift_name("on(type:handler_:)")));
- (id<QIOSKotlinx_coroutines_coreJob>)onceType:(QIOSKotlinEnum<QIOSKotlinEnum *> *)type handler:(id<QIOSKotlinSuspendFunction1>)handler __attribute__((swift_name("once(type:handler:)")));
- (id<QIOSKotlinx_coroutines_coreJob>)onceType:(NSString *)type handler_:(id<QIOSKotlinSuspendFunction1>)handler __attribute__((swift_name("once(type:handler_:)")));
@property (readonly) id<QIOSKotlinx_coroutines_coreFlow> events __attribute__((swift_name("events")));
@end

@protocol BrowserProtocol <EmitterProtocol>
@required

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)closeWithCompletionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("close(completionHandler:)")));
- (NSString *)handle __attribute__((swift_name("handle()")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)PageWithCompletionHandler:(void (^)(id<PageProtocol> _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("Page(completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)PageFactory:(id<PageFactoryBaseProtocol>)factory completionHandler:(void (^)(id<PageProtocol> _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("Page(factory:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)PageFactory:(id<PageProtocol> (^)(id<BrowserProtocol>))factory completionHandler_:(void (^)(id<PageProtocol> _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("Page(factory:completionHandler_:)")));
- (NSArray<id<PageProtocol>> *)pages __attribute__((swift_name("pages()")));
@end

@protocol MuppetProtocol
@required
- (id<PageProtocol> _Nullable)getPageHandle:(NSString *)handle __attribute__((swift_name("getPage(handle:)")));
- (void)injectPage:(id<PageProtocol>)page factory:(id<BrowserFactoryProtocol>)factory __attribute__((swift_name("inject(page:factory:)")));
- (id<BrowserProtocol>)launchFactory:(id<BrowserFactoryProtocol>)factory __attribute__((swift_name("launch(factory:)")));
@end

__attribute__((swift_name("Kotlinx_coroutines_coreCoroutineScope")))
@protocol QIOSKotlinx_coroutines_coreCoroutineScope
@required
@property (readonly) id<QIOSKotlinCoroutineContext> coroutineContext __attribute__((swift_name("coroutineContext")));
@end

__attribute__((swift_name("KotlinRuntimeException")))
@interface QIOSKotlinRuntimeException : QIOSKotlinException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithCause:(QIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(QIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer));
@end

__attribute__((swift_name("KotlinIllegalStateException")))
@interface QIOSKotlinIllegalStateException : QIOSKotlinRuntimeException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithCause:(QIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(QIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer));
@end


/**
 * @note annotations
 *   kotlin.SinceKotlin(version="1.4")
*/
__attribute__((swift_name("KotlinCancellationException")))
@interface QIOSKotlinCancellationException : QIOSKotlinIllegalStateException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithCause:(QIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(QIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer));
@end

@protocol PageProtocol <EmitterProtocol>
@required

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)addUserScriptScript:(NSString *)script completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("addUserScript(script:completionHandler:)")));
- (void)clearHostAllowList __attribute__((swift_name("clearHostAllowList()")));
- (void)close __attribute__((swift_name("close()")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)cookiesUrl:(NSString *)url completionHandler:(void (^)(NSArray<QIOSKtor_httpCookie *> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("cookies(url:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)evaluateJs:(NSString *)js completionHandler:(void (^)(id<QIOSKotlinx_coroutines_coreDeferred> _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("evaluate(js:completionHandler:)")));
- (void)evaluateJs:(NSString *)js handler:(void (^)(NSString * _Nullable))handler __attribute__((swift_name("evaluate(js:handler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)gotoUrl:(NSString *)url headers:(NSDictionary<NSString *, NSString *> *)headers timeout:(int64_t)timeout completionHandler:(void (^)(id<QIOSKotlinx_coroutines_coreDeferred> _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("goto(url:headers:timeout:completionHandler:)")));
- (NSString *)handle __attribute__((swift_name("handle()")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)hideAnimate:(BOOL)animate completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("hide(animate:completionHandler:)")));
- (id<PageProtocol> _Nullable)parent __attribute__((swift_name("parent()")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)progressWithCompletionHandler:(void (^)(QIOSInt * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("progress(completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)requestMethod:(NSString *)method url:(NSString *)url data:(NSString * _Nullable)data headers:(NSDictionary<NSString *, NSString *> * _Nullable)headers followRedirects:(BOOL)followRedirects stream:(id<QIOSKotlinx_coroutines_coreFlow> _Nullable)stream completionHandler:(void (^)(QIOSCoreResponse * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("request(method:url:data:headers:followRedirects:stream:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)screenshotWidth:(int32_t)width height:(int32_t)height quality:(double)quality completionHandler:(void (^)(NSString * _Nullable_result, NSError * _Nullable))completionHandler __attribute__((swift_name("screenshot(width:height:quality:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)setCookieCookie:(QIOSKtor_httpCookie *)cookie completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("setCookie(cookie:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)setCookieCookies:(NSArray<QIOSKtor_httpCookie *> *)cookies completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("setCookie(cookies:completionHandler:)")));
- (void)setHostAllowListAllowed:(NSArray<NSString *> *)allowed __attribute__((swift_name("setHostAllowList(allowed:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)setUserAgentUserAgent:(NSString *)userAgent completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("setUserAgent(userAgent:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)showAnimate:(BOOL)animate completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("show(animate:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)urlWithCompletionHandler:(void (^)(NSString * _Nullable_result, NSError * _Nullable))completionHandler __attribute__((swift_name("url(completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)userAgentWithCompletionHandler:(void (^)(NSString * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("userAgent(completionHandler:)")));
- (id _Nullable)view __attribute__((swift_name("view()")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinArray")))
@interface QIOSKotlinArray<T> : QIOSBase
+ (instancetype)arrayWithSize:(int32_t)size init:(T _Nullable (^)(QIOSInt *))init __attribute__((swift_name("init(size:init:)")));
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (T _Nullable)getIndex:(int32_t)index __attribute__((swift_name("get(index:)")));
- (id<QIOSKotlinIterator>)iterator __attribute__((swift_name("iterator()")));
- (void)setIndex:(int32_t)index value:(T _Nullable)value __attribute__((swift_name("set(index:value:)")));
@property (readonly) int32_t size __attribute__((swift_name("size")));
@end

@protocol PageFactoryBaseProtocol
@required
- (id<PageProtocol>)createBrowser:(id<BrowserProtocol>)browser __attribute__((swift_name("create(browser:)")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("CoreEmitterEvent")))
@interface QIOSCoreEmitterEvent<T> : QIOSBase
- (instancetype)initWithType:(NSString *)type data:(T _Nullable)data __attribute__((swift_name("init(type:data:)"))) __attribute__((objc_designated_initializer));
@property (readonly) T _Nullable data __attribute__((swift_name("data")));
@property (readonly) NSString *type __attribute__((swift_name("type")));
@end

__attribute__((swift_name("KotlinComparable")))
@protocol QIOSKotlinComparable
@required
- (int32_t)compareToOther:(id _Nullable)other __attribute__((swift_name("compareTo(other:)")));
@end

__attribute__((swift_name("KotlinEnum")))
@interface QIOSKotlinEnum<E> : QIOSBase <QIOSKotlinComparable>
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer));
@property (class, readonly, getter=companion) QIOSKotlinEnumCompanion *companion __attribute__((swift_name("companion")));
- (int32_t)compareToOther:(E)other __attribute__((swift_name("compareTo(other:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString *name __attribute__((swift_name("name")));
@property (readonly) int32_t ordinal __attribute__((swift_name("ordinal")));
@end


/**
 * @note annotations
 *   kotlin.SinceKotlin(version="1.3")
*/
__attribute__((swift_name("KotlinCoroutineContext")))
@protocol QIOSKotlinCoroutineContext
@required
- (id _Nullable)foldInitial:(id _Nullable)initial operation:(id _Nullable (^)(id _Nullable, id<QIOSKotlinCoroutineContextElement>))operation __attribute__((swift_name("fold(initial:operation:)")));
- (id<QIOSKotlinCoroutineContextElement> _Nullable)getKey:(id<QIOSKotlinCoroutineContextKey>)key __attribute__((swift_name("get(key:)")));
- (id<QIOSKotlinCoroutineContext>)minusKeyKey:(id<QIOSKotlinCoroutineContextKey>)key __attribute__((swift_name("minusKey(key:)")));
- (id<QIOSKotlinCoroutineContext>)plusContext:(id<QIOSKotlinCoroutineContext>)context __attribute__((swift_name("plus(context:)")));
@end

__attribute__((swift_name("KotlinCoroutineContextElement")))
@protocol QIOSKotlinCoroutineContextElement <QIOSKotlinCoroutineContext>
@required
@property (readonly) id<QIOSKotlinCoroutineContextKey> key __attribute__((swift_name("key")));
@end

__attribute__((swift_name("Kotlinx_coroutines_coreJob")))
@protocol QIOSKotlinx_coroutines_coreJob <QIOSKotlinCoroutineContextElement>
@required

/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
- (id<QIOSKotlinx_coroutines_coreChildHandle>)attachChildChild:(id<QIOSKotlinx_coroutines_coreChildJob>)child __attribute__((swift_name("attachChild(child:)")));
- (void)cancelCause:(QIOSKotlinCancellationException * _Nullable)cause __attribute__((swift_name("cancel(cause:)")));

/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
- (QIOSKotlinCancellationException *)getCancellationException __attribute__((swift_name("getCancellationException()")));
- (id<QIOSKotlinx_coroutines_coreDisposableHandle>)invokeOnCompletionHandler:(void (^)(QIOSKotlinThrowable * _Nullable))handler __attribute__((swift_name("invokeOnCompletion(handler:)")));

/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
- (id<QIOSKotlinx_coroutines_coreDisposableHandle>)invokeOnCompletionOnCancelling:(BOOL)onCancelling invokeImmediately:(BOOL)invokeImmediately handler:(void (^)(QIOSKotlinThrowable * _Nullable))handler __attribute__((swift_name("invokeOnCompletion(onCancelling:invokeImmediately:handler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)joinWithCompletionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("join(completionHandler:)")));
- (id<QIOSKotlinx_coroutines_coreJob>)plusOther:(id<QIOSKotlinx_coroutines_coreJob>)other __attribute__((swift_name("plus(other:)"))) __attribute__((unavailable("Operator '+' on two Job objects is meaningless. Job is a coroutine context element and `+` is a set-sum operator for coroutine contexts. The job to the right of `+` just replaces the job the left of `+`.")));
- (BOOL)start __attribute__((swift_name("start()")));
@property (readonly) id<QIOSKotlinSequence> children __attribute__((swift_name("children")));
@property (readonly) BOOL isActive __attribute__((swift_name("isActive")));
@property (readonly) BOOL isCancelled __attribute__((swift_name("isCancelled")));
@property (readonly) BOOL isCompleted __attribute__((swift_name("isCompleted")));
@property (readonly) id<QIOSKotlinx_coroutines_coreSelectClause0> onJoin __attribute__((swift_name("onJoin")));

/**
 * @note annotations
 *   kotlinx.coroutines.ExperimentalCoroutinesApi
*/
@property (readonly, getter=parent_) id<QIOSKotlinx_coroutines_coreJob> _Nullable parent __attribute__((swift_name("parent")));
@end

__attribute__((swift_name("KotlinFunction")))
@protocol QIOSKotlinFunction
@required
@end

__attribute__((swift_name("KotlinSuspendFunction1")))
@protocol QIOSKotlinSuspendFunction1 <QIOSKotlinFunction>
@required

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)invokeP1:(id _Nullable)p1 completionHandler:(void (^)(id _Nullable_result, NSError * _Nullable))completionHandler __attribute__((swift_name("invoke(p1:completionHandler:)")));
@end

__attribute__((swift_name("Kotlinx_coroutines_coreFlow")))
@protocol QIOSKotlinx_coroutines_coreFlow
@required

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)collectCollector:(id<QIOSKotlinx_coroutines_coreFlowCollector>)collector completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("collect(collector:completionHandler:)")));
@end

__attribute__((swift_name("Ktor_ioJvmSerializable")))
@protocol QIOSKtor_ioJvmSerializable
@required
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpCookie")))
@interface QIOSKtor_httpCookie : QIOSBase <QIOSKtor_ioJvmSerializable>
- (instancetype)initWithName:(NSString *)name value:(NSString *)value encoding:(QIOSKtor_httpCookieEncoding *)encoding maxAge:(QIOSInt * _Nullable)maxAge expires:(QIOSKtor_utilsGMTDate * _Nullable)expires domain:(NSString * _Nullable)domain path:(NSString * _Nullable)path secure:(BOOL)secure httpOnly:(BOOL)httpOnly extensions:(NSDictionary<NSString *, id> *)extensions __attribute__((swift_name("init(name:value:encoding:maxAge:expires:domain:path:secure:httpOnly:extensions:)"))) __attribute__((objc_designated_initializer));
@property (class, readonly, getter=companion) QIOSKtor_httpCookieCompanion *companion __attribute__((swift_name("companion")));
- (QIOSKtor_httpCookie *)doCopyName:(NSString *)name value:(NSString *)value encoding:(QIOSKtor_httpCookieEncoding *)encoding maxAge:(QIOSInt * _Nullable)maxAge expires:(QIOSKtor_utilsGMTDate * _Nullable)expires domain:(NSString * _Nullable)domain path:(NSString * _Nullable)path secure:(BOOL)secure httpOnly:(BOOL)httpOnly extensions:(NSDictionary<NSString *, id> *)extensions __attribute__((swift_name("doCopy(name:value:encoding:maxAge:expires:domain:path:secure:httpOnly:extensions:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString * _Nullable domain __attribute__((swift_name("domain")));
@property (readonly) QIOSKtor_httpCookieEncoding *encoding __attribute__((swift_name("encoding")));
@property (readonly) QIOSKtor_utilsGMTDate * _Nullable expires __attribute__((swift_name("expires")));
@property (readonly) NSDictionary<NSString *, id> *extensions __attribute__((swift_name("extensions")));
@property (readonly) BOOL httpOnly __attribute__((swift_name("httpOnly")));
@property (readonly) QIOSInt * _Nullable maxAge __attribute__((swift_name("maxAge")));
@property (readonly) NSString *name __attribute__((swift_name("name")));
@property (readonly) NSString * _Nullable path __attribute__((swift_name("path")));
@property (readonly) BOOL secure __attribute__((swift_name("secure")));
@property (readonly) NSString *value __attribute__((swift_name("value")));
@end

__attribute__((swift_name("Kotlinx_coroutines_coreDeferred")))
@protocol QIOSKotlinx_coroutines_coreDeferred <QIOSKotlinx_coroutines_coreJob>
@required

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)awaitWithCompletionHandler:(void (^)(id _Nullable_result, NSError * _Nullable))completionHandler __attribute__((swift_name("await(completionHandler:)")));

/**
 * @note annotations
 *   kotlinx.coroutines.ExperimentalCoroutinesApi
*/
- (id _Nullable)getCompleted __attribute__((swift_name("getCompleted()")));

/**
 * @note annotations
 *   kotlinx.coroutines.ExperimentalCoroutinesApi
*/
- (QIOSKotlinThrowable * _Nullable)getCompletionExceptionOrNull __attribute__((swift_name("getCompletionExceptionOrNull()")));
@property (readonly) id<QIOSKotlinx_coroutines_coreSelectClause1> onAwait __attribute__((swift_name("onAwait")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("CoreResponse")))
@interface QIOSCoreResponse : QIOSBase
- (instancetype)initWithStatus:(int32_t)status headers:(NSDictionary<NSString *, NSArray<NSString *> *> *)headers body:(id<QIOSKotlinx_coroutines_coreFlow>)body __attribute__((swift_name("init(status:headers:body:)"))) __attribute__((objc_designated_initializer));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)bytesWithCompletionHandler:(void (^)(QIOSKotlinByteArray * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("bytes(completionHandler:)")));
- (QIOSCoreResponse *)doCopyStatus:(int32_t)status headers:(NSDictionary<NSString *, NSArray<NSString *> *> *)headers body:(id<QIOSKotlinx_coroutines_coreFlow>)body __attribute__((swift_name("doCopy(status:headers:body:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSDictionary<NSString *, QIOSKotlinx_serialization_jsonJsonElement *> *)header __attribute__((swift_name("header()")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)jsonObjectWithCompletionHandler:(void (^)(NSDictionary<NSString *, QIOSKotlinx_serialization_jsonJsonElement *> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("jsonObject(completionHandler:)")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) id<QIOSKotlinx_coroutines_coreFlow> body __attribute__((swift_name("body")));
@property (readonly) NSDictionary<NSString *, NSArray<NSString *> *> *headers __attribute__((swift_name("headers")));
@property (readonly) int32_t status __attribute__((swift_name("status")));
@end

__attribute__((swift_name("KotlinIterator")))
@protocol QIOSKotlinIterator
@required
- (BOOL)hasNext __attribute__((swift_name("hasNext()")));
- (id _Nullable)next __attribute__((swift_name("next()")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinEnumCompanion")))
@interface QIOSKotlinEnumCompanion : QIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) QIOSKotlinEnumCompanion *shared __attribute__((swift_name("shared")));
@end

__attribute__((swift_name("Kotlinx_coroutines_coreDisposableHandle")))
@protocol QIOSKotlinx_coroutines_coreDisposableHandle
@required
- (void)dispose __attribute__((swift_name("dispose()")));
@end


/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
__attribute__((swift_name("Kotlinx_coroutines_coreChildHandle")))
@protocol QIOSKotlinx_coroutines_coreChildHandle <QIOSKotlinx_coroutines_coreDisposableHandle>
@required

/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
- (BOOL)childCancelledCause:(QIOSKotlinThrowable *)cause __attribute__((swift_name("childCancelled(cause:)")));

/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
@property (readonly, getter=parent_) id<QIOSKotlinx_coroutines_coreJob> _Nullable parent __attribute__((swift_name("parent")));
@end


/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
__attribute__((swift_name("Kotlinx_coroutines_coreChildJob")))
@protocol QIOSKotlinx_coroutines_coreChildJob <QIOSKotlinx_coroutines_coreJob>
@required

/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
- (void)parentCancelledParentJob:(id<QIOSKotlinx_coroutines_coreParentJob>)parentJob __attribute__((swift_name("parentCancelled(parentJob:)")));
@end

__attribute__((swift_name("KotlinSequence")))
@protocol QIOSKotlinSequence
@required
- (id<QIOSKotlinIterator>)iterator __attribute__((swift_name("iterator()")));
@end


/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
__attribute__((swift_name("Kotlinx_coroutines_coreSelectClause")))
@protocol QIOSKotlinx_coroutines_coreSelectClause
@required
@property (readonly) id clauseObject __attribute__((swift_name("clauseObject")));
@property (readonly) QIOSKotlinUnit *(^(^ _Nullable onCancellationConstructor)(id<QIOSKotlinx_coroutines_coreSelectInstance>, id _Nullable, id _Nullable))(QIOSKotlinThrowable *, id _Nullable, id<QIOSKotlinCoroutineContext>) __attribute__((swift_name("onCancellationConstructor")));
@property (readonly) id _Nullable (^processResFunc)(id, id _Nullable, id _Nullable) __attribute__((swift_name("processResFunc")));
@property (readonly) void (^regFunc)(id, id<QIOSKotlinx_coroutines_coreSelectInstance>, id _Nullable) __attribute__((swift_name("regFunc")));
@end

__attribute__((swift_name("Kotlinx_coroutines_coreSelectClause0")))
@protocol QIOSKotlinx_coroutines_coreSelectClause0 <QIOSKotlinx_coroutines_coreSelectClause>
@required
@end

__attribute__((swift_name("KotlinCoroutineContextKey")))
@protocol QIOSKotlinCoroutineContextKey
@required
@end

__attribute__((swift_name("Kotlinx_coroutines_coreFlowCollector")))
@protocol QIOSKotlinx_coroutines_coreFlowCollector
@required

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)emitValue:(id _Nullable)value completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("emit(value:completionHandler:)")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpCookieEncoding")))
@interface QIOSKtor_httpCookieEncoding : QIOSKotlinEnum<QIOSKtor_httpCookieEncoding *>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly) QIOSKtor_httpCookieEncoding *raw __attribute__((swift_name("raw")));
@property (class, readonly) QIOSKtor_httpCookieEncoding *dquotes __attribute__((swift_name("dquotes")));
@property (class, readonly) QIOSKtor_httpCookieEncoding *uriEncoding __attribute__((swift_name("uriEncoding")));
@property (class, readonly) QIOSKtor_httpCookieEncoding *base64Encoding __attribute__((swift_name("base64Encoding")));
+ (QIOSKotlinArray<QIOSKtor_httpCookieEncoding *> *)values __attribute__((swift_name("values()")));
@property (class, readonly) NSArray<QIOSKtor_httpCookieEncoding *> *entries __attribute__((swift_name("entries")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_utilsGMTDate")))
@interface QIOSKtor_utilsGMTDate : QIOSBase <QIOSKotlinComparable>
- (instancetype)initWithSeconds:(int32_t)seconds minutes:(int32_t)minutes hours:(int32_t)hours dayOfWeek:(QIOSKtor_utilsWeekDay *)dayOfWeek dayOfMonth:(int32_t)dayOfMonth dayOfYear:(int32_t)dayOfYear month:(QIOSKtor_utilsMonth *)month year:(int32_t)year timestamp:(int64_t)timestamp __attribute__((swift_name("init(seconds:minutes:hours:dayOfWeek:dayOfMonth:dayOfYear:month:year:timestamp:)"))) __attribute__((objc_designated_initializer));
@property (class, readonly, getter=companion) QIOSKtor_utilsGMTDateCompanion *companion __attribute__((swift_name("companion")));
- (int32_t)compareToOther:(QIOSKtor_utilsGMTDate *)other __attribute__((swift_name("compareTo(other:)")));
- (QIOSKtor_utilsGMTDate *)doCopy __attribute__((swift_name("doCopy()")));
- (QIOSKtor_utilsGMTDate *)doCopySeconds:(int32_t)seconds minutes:(int32_t)minutes hours:(int32_t)hours dayOfWeek:(QIOSKtor_utilsWeekDay *)dayOfWeek dayOfMonth:(int32_t)dayOfMonth dayOfYear:(int32_t)dayOfYear month:(QIOSKtor_utilsMonth *)month year:(int32_t)year timestamp:(int64_t)timestamp __attribute__((swift_name("doCopy(seconds:minutes:hours:dayOfWeek:dayOfMonth:dayOfYear:month:year:timestamp:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) int32_t dayOfMonth __attribute__((swift_name("dayOfMonth")));
@property (readonly) QIOSKtor_utilsWeekDay *dayOfWeek __attribute__((swift_name("dayOfWeek")));
@property (readonly) int32_t dayOfYear __attribute__((swift_name("dayOfYear")));
@property (readonly) int32_t hours __attribute__((swift_name("hours")));
@property (readonly) int32_t minutes __attribute__((swift_name("minutes")));
@property (readonly) QIOSKtor_utilsMonth *month __attribute__((swift_name("month")));
@property (readonly) int32_t seconds __attribute__((swift_name("seconds")));
@property (readonly) int64_t timestamp __attribute__((swift_name("timestamp")));
@property (readonly) int32_t year __attribute__((swift_name("year")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpCookie.Companion")))
@interface QIOSKtor_httpCookieCompanion : QIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) QIOSKtor_httpCookieCompanion *shared __attribute__((swift_name("shared")));
- (id<QIOSKotlinx_serialization_coreKSerializer>)serializer __attribute__((swift_name("serializer()")));
@end

__attribute__((swift_name("Kotlinx_coroutines_coreSelectClause1")))
@protocol QIOSKotlinx_coroutines_coreSelectClause1 <QIOSKotlinx_coroutines_coreSelectClause>
@required
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinByteArray")))
@interface QIOSKotlinByteArray : QIOSBase
+ (instancetype)arrayWithSize:(int32_t)size __attribute__((swift_name("init(size:)")));
+ (instancetype)arrayWithSize:(int32_t)size init:(QIOSByte *(^)(QIOSInt *))init __attribute__((swift_name("init(size:init:)")));
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (int8_t)getIndex:(int32_t)index __attribute__((swift_name("get(index:)")));
- (QIOSKotlinByteIterator *)iterator __attribute__((swift_name("iterator()")));
- (void)setIndex:(int32_t)index value:(int8_t)value __attribute__((swift_name("set(index:value:)")));
@property (readonly) int32_t size __attribute__((swift_name("size")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable(with=NormalClass(value=kotlinx/serialization/json/JsonElementSerializer))
*/
__attribute__((swift_name("Kotlinx_serialization_jsonJsonElement")))
@interface QIOSKotlinx_serialization_jsonJsonElement : QIOSBase
@property (class, readonly, getter=companion) QIOSKotlinx_serialization_jsonJsonElementCompanion *companion __attribute__((swift_name("companion")));
@end


/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
__attribute__((swift_name("Kotlinx_coroutines_coreParentJob")))
@protocol QIOSKotlinx_coroutines_coreParentJob <QIOSKotlinx_coroutines_coreJob>
@required

/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
- (QIOSKotlinCancellationException *)getChildJobCancellationCause __attribute__((swift_name("getChildJobCancellationCause()")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinUnit")))
@interface QIOSKotlinUnit : QIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)unit __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) QIOSKotlinUnit *shared __attribute__((swift_name("shared")));
- (NSString *)description __attribute__((swift_name("description()")));
@end


/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
__attribute__((swift_name("Kotlinx_coroutines_coreSelectInstance")))
@protocol QIOSKotlinx_coroutines_coreSelectInstance
@required
- (void)disposeOnCompletionDisposableHandle:(id<QIOSKotlinx_coroutines_coreDisposableHandle>)disposableHandle __attribute__((swift_name("disposeOnCompletion(disposableHandle:)")));
- (void)selectInRegistrationPhaseInternalResult:(id _Nullable)internalResult __attribute__((swift_name("selectInRegistrationPhase(internalResult:)")));
- (BOOL)trySelectClauseObject:(id)clauseObject result:(id _Nullable)result __attribute__((swift_name("trySelect(clauseObject:result:)")));
@property (readonly) id<QIOSKotlinCoroutineContext> context __attribute__((swift_name("context")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_utilsWeekDay")))
@interface QIOSKtor_utilsWeekDay : QIOSKotlinEnum<QIOSKtor_utilsWeekDay *>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly, getter=companion) QIOSKtor_utilsWeekDayCompanion *companion __attribute__((swift_name("companion")));
@property (class, readonly) QIOSKtor_utilsWeekDay *monday __attribute__((swift_name("monday")));
@property (class, readonly) QIOSKtor_utilsWeekDay *tuesday __attribute__((swift_name("tuesday")));
@property (class, readonly) QIOSKtor_utilsWeekDay *wednesday __attribute__((swift_name("wednesday")));
@property (class, readonly) QIOSKtor_utilsWeekDay *thursday __attribute__((swift_name("thursday")));
@property (class, readonly) QIOSKtor_utilsWeekDay *friday __attribute__((swift_name("friday")));
@property (class, readonly) QIOSKtor_utilsWeekDay *saturday __attribute__((swift_name("saturday")));
@property (class, readonly) QIOSKtor_utilsWeekDay *sunday __attribute__((swift_name("sunday")));
+ (QIOSKotlinArray<QIOSKtor_utilsWeekDay *> *)values __attribute__((swift_name("values()")));
@property (class, readonly) NSArray<QIOSKtor_utilsWeekDay *> *entries __attribute__((swift_name("entries")));
@property (readonly) NSString *value __attribute__((swift_name("value")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_utilsMonth")))
@interface QIOSKtor_utilsMonth : QIOSKotlinEnum<QIOSKtor_utilsMonth *>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly, getter=companion) QIOSKtor_utilsMonthCompanion *companion __attribute__((swift_name("companion")));
@property (class, readonly) QIOSKtor_utilsMonth *january __attribute__((swift_name("january")));
@property (class, readonly) QIOSKtor_utilsMonth *february __attribute__((swift_name("february")));
@property (class, readonly) QIOSKtor_utilsMonth *march __attribute__((swift_name("march")));
@property (class, readonly) QIOSKtor_utilsMonth *april __attribute__((swift_name("april")));
@property (class, readonly) QIOSKtor_utilsMonth *may __attribute__((swift_name("may")));
@property (class, readonly) QIOSKtor_utilsMonth *june __attribute__((swift_name("june")));
@property (class, readonly) QIOSKtor_utilsMonth *july __attribute__((swift_name("july")));
@property (class, readonly) QIOSKtor_utilsMonth *august __attribute__((swift_name("august")));
@property (class, readonly) QIOSKtor_utilsMonth *september __attribute__((swift_name("september")));
@property (class, readonly) QIOSKtor_utilsMonth *october __attribute__((swift_name("october")));
@property (class, readonly) QIOSKtor_utilsMonth *november __attribute__((swift_name("november")));
@property (class, readonly) QIOSKtor_utilsMonth *december __attribute__((swift_name("december")));
+ (QIOSKotlinArray<QIOSKtor_utilsMonth *> *)values __attribute__((swift_name("values()")));
@property (class, readonly) NSArray<QIOSKtor_utilsMonth *> *entries __attribute__((swift_name("entries")));
@property (readonly) NSString *value __attribute__((swift_name("value")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_utilsGMTDate.Companion")))
@interface QIOSKtor_utilsGMTDateCompanion : QIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) QIOSKtor_utilsGMTDateCompanion *shared __attribute__((swift_name("shared")));
- (id<QIOSKotlinx_serialization_coreKSerializer>)serializer __attribute__((swift_name("serializer()")));
@property (readonly) QIOSKtor_utilsGMTDate *START __attribute__((swift_name("START")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreSerializationStrategy")))
@protocol QIOSKotlinx_serialization_coreSerializationStrategy
@required
- (void)serializeEncoder:(id<QIOSKotlinx_serialization_coreEncoder>)encoder value:(id _Nullable)value __attribute__((swift_name("serialize(encoder:value:)")));
@property (readonly) id<QIOSKotlinx_serialization_coreSerialDescriptor> descriptor __attribute__((swift_name("descriptor")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreDeserializationStrategy")))
@protocol QIOSKotlinx_serialization_coreDeserializationStrategy
@required
- (id _Nullable)deserializeDecoder:(id<QIOSKotlinx_serialization_coreDecoder>)decoder __attribute__((swift_name("deserialize(decoder:)")));
@property (readonly) id<QIOSKotlinx_serialization_coreSerialDescriptor> descriptor __attribute__((swift_name("descriptor")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreKSerializer")))
@protocol QIOSKotlinx_serialization_coreKSerializer <QIOSKotlinx_serialization_coreSerializationStrategy, QIOSKotlinx_serialization_coreDeserializationStrategy>
@required
@end

__attribute__((swift_name("KotlinByteIterator")))
@interface QIOSKotlinByteIterator : QIOSBase <QIOSKotlinIterator>
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (QIOSByte *)next __attribute__((swift_name("next()")));
- (int8_t)nextByte __attribute__((swift_name("nextByte()")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Kotlinx_serialization_jsonJsonElement.Companion")))
@interface QIOSKotlinx_serialization_jsonJsonElementCompanion : QIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) QIOSKotlinx_serialization_jsonJsonElementCompanion *shared __attribute__((swift_name("shared")));
- (id<QIOSKotlinx_serialization_coreKSerializer>)serializer __attribute__((swift_name("serializer()")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_utilsWeekDay.Companion")))
@interface QIOSKtor_utilsWeekDayCompanion : QIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) QIOSKtor_utilsWeekDayCompanion *shared __attribute__((swift_name("shared")));
- (QIOSKtor_utilsWeekDay *)fromOrdinal:(int32_t)ordinal __attribute__((swift_name("from(ordinal:)")));
- (QIOSKtor_utilsWeekDay *)fromValue:(NSString *)value __attribute__((swift_name("from(value:)")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_utilsMonth.Companion")))
@interface QIOSKtor_utilsMonthCompanion : QIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) QIOSKtor_utilsMonthCompanion *shared __attribute__((swift_name("shared")));
- (QIOSKtor_utilsMonth *)fromOrdinal:(int32_t)ordinal __attribute__((swift_name("from(ordinal:)")));
- (QIOSKtor_utilsMonth *)fromValue:(NSString *)value __attribute__((swift_name("from(value:)")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreEncoder")))
@protocol QIOSKotlinx_serialization_coreEncoder
@required
- (id<QIOSKotlinx_serialization_coreCompositeEncoder>)beginCollectionDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor collectionSize:(int32_t)collectionSize __attribute__((swift_name("beginCollection(descriptor:collectionSize:)")));
- (id<QIOSKotlinx_serialization_coreCompositeEncoder>)beginStructureDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("beginStructure(descriptor:)")));
- (void)encodeBooleanValue:(BOOL)value __attribute__((swift_name("encodeBoolean(value:)")));
- (void)encodeByteValue:(int8_t)value __attribute__((swift_name("encodeByte(value:)")));
- (void)encodeCharValue:(unichar)value __attribute__((swift_name("encodeChar(value:)")));
- (void)encodeDoubleValue:(double)value __attribute__((swift_name("encodeDouble(value:)")));
- (void)encodeEnumEnumDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)enumDescriptor index:(int32_t)index __attribute__((swift_name("encodeEnum(enumDescriptor:index:)")));
- (void)encodeFloatValue:(float)value __attribute__((swift_name("encodeFloat(value:)")));
- (id<QIOSKotlinx_serialization_coreEncoder>)encodeInlineDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("encodeInline(descriptor:)")));
- (void)encodeIntValue:(int32_t)value __attribute__((swift_name("encodeInt(value:)")));
- (void)encodeLongValue:(int64_t)value __attribute__((swift_name("encodeLong(value:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (void)encodeNotNullMark __attribute__((swift_name("encodeNotNullMark()")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (void)encodeNull __attribute__((swift_name("encodeNull()")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (void)encodeNullableSerializableValueSerializer:(id<QIOSKotlinx_serialization_coreSerializationStrategy>)serializer value:(id _Nullable)value __attribute__((swift_name("encodeNullableSerializableValue(serializer:value:)")));
- (void)encodeSerializableValueSerializer:(id<QIOSKotlinx_serialization_coreSerializationStrategy>)serializer value:(id _Nullable)value __attribute__((swift_name("encodeSerializableValue(serializer:value:)")));
- (void)encodeShortValue:(int16_t)value __attribute__((swift_name("encodeShort(value:)")));
- (void)encodeStringValue:(NSString *)value __attribute__((swift_name("encodeString(value:)")));
@property (readonly) QIOSKotlinx_serialization_coreSerializersModule *serializersModule __attribute__((swift_name("serializersModule")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreSerialDescriptor")))
@protocol QIOSKotlinx_serialization_coreSerialDescriptor
@required
- (NSArray<id<QIOSKotlinAnnotation>> *)getElementAnnotationsIndex:(int32_t)index __attribute__((swift_name("getElementAnnotations(index:)")));
- (id<QIOSKotlinx_serialization_coreSerialDescriptor>)getElementDescriptorIndex:(int32_t)index __attribute__((swift_name("getElementDescriptor(index:)")));
- (int32_t)getElementIndexName:(NSString *)name __attribute__((swift_name("getElementIndex(name:)")));
- (NSString *)getElementNameIndex:(int32_t)index __attribute__((swift_name("getElementName(index:)")));
- (BOOL)isElementOptionalIndex:(int32_t)index __attribute__((swift_name("isElementOptional(index:)")));
@property (readonly) NSArray<id<QIOSKotlinAnnotation>> *annotations __attribute__((swift_name("annotations")));
@property (readonly) int32_t elementsCount __attribute__((swift_name("elementsCount")));
@property (readonly) BOOL isInline __attribute__((swift_name("isInline")));
@property (readonly) BOOL isNullable __attribute__((swift_name("isNullable")));
@property (readonly) QIOSKotlinx_serialization_coreSerialKind *kind __attribute__((swift_name("kind")));
@property (readonly) NSString *serialName __attribute__((swift_name("serialName")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreDecoder")))
@protocol QIOSKotlinx_serialization_coreDecoder
@required
- (id<QIOSKotlinx_serialization_coreCompositeDecoder>)beginStructureDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("beginStructure(descriptor:)")));
- (BOOL)decodeBoolean __attribute__((swift_name("decodeBoolean()")));
- (int8_t)decodeByte __attribute__((swift_name("decodeByte()")));
- (unichar)decodeChar __attribute__((swift_name("decodeChar()")));
- (double)decodeDouble __attribute__((swift_name("decodeDouble()")));
- (int32_t)decodeEnumEnumDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)enumDescriptor __attribute__((swift_name("decodeEnum(enumDescriptor:)")));
- (float)decodeFloat __attribute__((swift_name("decodeFloat()")));
- (id<QIOSKotlinx_serialization_coreDecoder>)decodeInlineDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("decodeInline(descriptor:)")));
- (int32_t)decodeInt __attribute__((swift_name("decodeInt()")));
- (int64_t)decodeLong __attribute__((swift_name("decodeLong()")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (BOOL)decodeNotNullMark __attribute__((swift_name("decodeNotNullMark()")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (QIOSKotlinNothing * _Nullable)decodeNull __attribute__((swift_name("decodeNull()")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (id _Nullable)decodeNullableSerializableValueDeserializer:(id<QIOSKotlinx_serialization_coreDeserializationStrategy>)deserializer __attribute__((swift_name("decodeNullableSerializableValue(deserializer:)")));
- (id _Nullable)decodeSerializableValueDeserializer:(id<QIOSKotlinx_serialization_coreDeserializationStrategy>)deserializer __attribute__((swift_name("decodeSerializableValue(deserializer:)")));
- (int16_t)decodeShort __attribute__((swift_name("decodeShort()")));
- (NSString *)decodeString __attribute__((swift_name("decodeString()")));
@property (readonly) QIOSKotlinx_serialization_coreSerializersModule *serializersModule __attribute__((swift_name("serializersModule")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreCompositeEncoder")))
@protocol QIOSKotlinx_serialization_coreCompositeEncoder
@required
- (void)encodeBooleanElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(BOOL)value __attribute__((swift_name("encodeBooleanElement(descriptor:index:value:)")));
- (void)encodeByteElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(int8_t)value __attribute__((swift_name("encodeByteElement(descriptor:index:value:)")));
- (void)encodeCharElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(unichar)value __attribute__((swift_name("encodeCharElement(descriptor:index:value:)")));
- (void)encodeDoubleElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(double)value __attribute__((swift_name("encodeDoubleElement(descriptor:index:value:)")));
- (void)encodeFloatElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(float)value __attribute__((swift_name("encodeFloatElement(descriptor:index:value:)")));
- (id<QIOSKotlinx_serialization_coreEncoder>)encodeInlineElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("encodeInlineElement(descriptor:index:)")));
- (void)encodeIntElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(int32_t)value __attribute__((swift_name("encodeIntElement(descriptor:index:value:)")));
- (void)encodeLongElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(int64_t)value __attribute__((swift_name("encodeLongElement(descriptor:index:value:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (void)encodeNullableSerializableElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index serializer:(id<QIOSKotlinx_serialization_coreSerializationStrategy>)serializer value:(id _Nullable)value __attribute__((swift_name("encodeNullableSerializableElement(descriptor:index:serializer:value:)")));
- (void)encodeSerializableElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index serializer:(id<QIOSKotlinx_serialization_coreSerializationStrategy>)serializer value:(id _Nullable)value __attribute__((swift_name("encodeSerializableElement(descriptor:index:serializer:value:)")));
- (void)encodeShortElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(int16_t)value __attribute__((swift_name("encodeShortElement(descriptor:index:value:)")));
- (void)encodeStringElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(NSString *)value __attribute__((swift_name("encodeStringElement(descriptor:index:value:)")));
- (void)endStructureDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("endStructure(descriptor:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (BOOL)shouldEncodeElementDefaultDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("shouldEncodeElementDefault(descriptor:index:)")));
@property (readonly) QIOSKotlinx_serialization_coreSerializersModule *serializersModule __attribute__((swift_name("serializersModule")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreSerializersModule")))
@interface QIOSKotlinx_serialization_coreSerializersModule : QIOSBase

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (void)dumpToCollector:(id<QIOSKotlinx_serialization_coreSerializersModuleCollector>)collector __attribute__((swift_name("dumpTo(collector:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (id<QIOSKotlinx_serialization_coreKSerializer> _Nullable)getContextualKClass:(id<QIOSKotlinKClass>)kClass typeArgumentsSerializers:(NSArray<id<QIOSKotlinx_serialization_coreKSerializer>> *)typeArgumentsSerializers __attribute__((swift_name("getContextual(kClass:typeArgumentsSerializers:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (id<QIOSKotlinx_serialization_coreSerializationStrategy> _Nullable)getPolymorphicBaseClass:(id<QIOSKotlinKClass>)baseClass value:(id)value __attribute__((swift_name("getPolymorphic(baseClass:value:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (id<QIOSKotlinx_serialization_coreDeserializationStrategy> _Nullable)getPolymorphicBaseClass:(id<QIOSKotlinKClass>)baseClass serializedClassName:(NSString * _Nullable)serializedClassName __attribute__((swift_name("getPolymorphic(baseClass:serializedClassName:)")));
@end

__attribute__((swift_name("KotlinAnnotation")))
@protocol QIOSKotlinAnnotation
@required
@end

__attribute__((swift_name("Kotlinx_serialization_coreSerialKind")))
@interface QIOSKotlinx_serialization_coreSerialKind : QIOSBase
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreCompositeDecoder")))
@protocol QIOSKotlinx_serialization_coreCompositeDecoder
@required
- (BOOL)decodeBooleanElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeBooleanElement(descriptor:index:)")));
- (int8_t)decodeByteElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeByteElement(descriptor:index:)")));
- (unichar)decodeCharElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeCharElement(descriptor:index:)")));
- (int32_t)decodeCollectionSizeDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("decodeCollectionSize(descriptor:)")));
- (double)decodeDoubleElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeDoubleElement(descriptor:index:)")));
- (int32_t)decodeElementIndexDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("decodeElementIndex(descriptor:)")));
- (float)decodeFloatElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeFloatElement(descriptor:index:)")));
- (id<QIOSKotlinx_serialization_coreDecoder>)decodeInlineElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeInlineElement(descriptor:index:)")));
- (int32_t)decodeIntElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeIntElement(descriptor:index:)")));
- (int64_t)decodeLongElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeLongElement(descriptor:index:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (id _Nullable)decodeNullableSerializableElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index deserializer:(id<QIOSKotlinx_serialization_coreDeserializationStrategy>)deserializer previousValue:(id _Nullable)previousValue __attribute__((swift_name("decodeNullableSerializableElement(descriptor:index:deserializer:previousValue:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (BOOL)decodeSequentially __attribute__((swift_name("decodeSequentially()")));
- (id _Nullable)decodeSerializableElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index deserializer:(id<QIOSKotlinx_serialization_coreDeserializationStrategy>)deserializer previousValue:(id _Nullable)previousValue __attribute__((swift_name("decodeSerializableElement(descriptor:index:deserializer:previousValue:)")));
- (int16_t)decodeShortElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeShortElement(descriptor:index:)")));
- (NSString *)decodeStringElementDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeStringElement(descriptor:index:)")));
- (void)endStructureDescriptor:(id<QIOSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("endStructure(descriptor:)")));
@property (readonly) QIOSKotlinx_serialization_coreSerializersModule *serializersModule __attribute__((swift_name("serializersModule")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinNothing")))
@interface QIOSKotlinNothing : QIOSBase
@end


/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
__attribute__((swift_name("Kotlinx_serialization_coreSerializersModuleCollector")))
@protocol QIOSKotlinx_serialization_coreSerializersModuleCollector
@required
- (void)contextualKClass:(id<QIOSKotlinKClass>)kClass provider:(id<QIOSKotlinx_serialization_coreKSerializer> (^)(NSArray<id<QIOSKotlinx_serialization_coreKSerializer>> *))provider __attribute__((swift_name("contextual(kClass:provider:)")));
- (void)contextualKClass:(id<QIOSKotlinKClass>)kClass serializer:(id<QIOSKotlinx_serialization_coreKSerializer>)serializer __attribute__((swift_name("contextual(kClass:serializer:)")));
- (void)polymorphicBaseClass:(id<QIOSKotlinKClass>)baseClass actualClass:(id<QIOSKotlinKClass>)actualClass actualSerializer:(id<QIOSKotlinx_serialization_coreKSerializer>)actualSerializer __attribute__((swift_name("polymorphic(baseClass:actualClass:actualSerializer:)")));
- (void)polymorphicDefaultBaseClass:(id<QIOSKotlinKClass>)baseClass defaultDeserializerProvider:(id<QIOSKotlinx_serialization_coreDeserializationStrategy> _Nullable (^)(NSString * _Nullable))defaultDeserializerProvider __attribute__((swift_name("polymorphicDefault(baseClass:defaultDeserializerProvider:)"))) __attribute__((deprecated("Deprecated in favor of function with more precise name: polymorphicDefaultDeserializer")));
- (void)polymorphicDefaultDeserializerBaseClass:(id<QIOSKotlinKClass>)baseClass defaultDeserializerProvider:(id<QIOSKotlinx_serialization_coreDeserializationStrategy> _Nullable (^)(NSString * _Nullable))defaultDeserializerProvider __attribute__((swift_name("polymorphicDefaultDeserializer(baseClass:defaultDeserializerProvider:)")));
- (void)polymorphicDefaultSerializerBaseClass:(id<QIOSKotlinKClass>)baseClass defaultSerializerProvider:(id<QIOSKotlinx_serialization_coreSerializationStrategy> _Nullable (^)(id))defaultSerializerProvider __attribute__((swift_name("polymorphicDefaultSerializer(baseClass:defaultSerializerProvider:)")));
@end

__attribute__((swift_name("KotlinKDeclarationContainer")))
@protocol QIOSKotlinKDeclarationContainer
@required
@end

__attribute__((swift_name("KotlinKAnnotatedElement")))
@protocol QIOSKotlinKAnnotatedElement
@required
@end


/**
 * @note annotations
 *   kotlin.SinceKotlin(version="1.1")
*/
__attribute__((swift_name("KotlinKClassifier")))
@protocol QIOSKotlinKClassifier
@required
@end

__attribute__((swift_name("KotlinKClass")))
@protocol QIOSKotlinKClass <QIOSKotlinKDeclarationContainer, QIOSKotlinKAnnotatedElement, QIOSKotlinKClassifier>
@required

/**
 * @note annotations
 *   kotlin.SinceKotlin(version="1.1")
*/
- (BOOL)isInstanceValue:(id _Nullable)value __attribute__((swift_name("isInstance(value:)")));
@property (readonly) NSString * _Nullable qualifiedName __attribute__((swift_name("qualifiedName")));
@property (readonly) NSString * _Nullable simpleName __attribute__((swift_name("simpleName")));
@end

#pragma pop_macro("_Nullable_result")
#pragma clang diagnostic pop
NS_ASSUME_NONNULL_END
