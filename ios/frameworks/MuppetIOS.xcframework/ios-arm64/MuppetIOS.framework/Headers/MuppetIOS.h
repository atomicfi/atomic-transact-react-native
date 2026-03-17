#import <Foundation/NSArray.h>
#import <Foundation/NSDictionary.h>
#import <Foundation/NSError.h>
#import <Foundation/NSObject.h>
#import <Foundation/NSSet.h>
#import <Foundation/NSString.h>
#import <Foundation/NSValue.h>

@class Browser, BrowserBase<T>, BrowserEvent, LogLevel, MIOSConstants, MIOSEmitter<T>, MIOSEmitterEvent<T>, MIOSHttpCookies, MIOSHttpCookiesCompanion, MIOSHttpCookiesConfig, MIOSKotlinAbstractCoroutineContextElement, MIOSKotlinAbstractCoroutineContextKey<B, E>, MIOSKotlinArray<T>, MIOSKotlinByteArray, MIOSKotlinByteIterator, MIOSKotlinCancellationException, MIOSKotlinEnum<E>, MIOSKotlinEnumCompanion, MIOSKotlinException, MIOSKotlinIllegalStateException, MIOSKotlinKTypeProjection, MIOSKotlinKTypeProjectionCompanion, MIOSKotlinKVariance, MIOSKotlinNothing, MIOSKotlinRuntimeException, MIOSKotlinThrowable, MIOSKotlinUnit, MIOSKotlinx_coroutines_coreCoroutineDispatcher, MIOSKotlinx_coroutines_coreCoroutineDispatcherKey, MIOSKotlinx_io_coreBuffer, MIOSKotlinx_serialization_coreSerialKind, MIOSKotlinx_serialization_coreSerializersModule, MIOSKotlinx_serialization_jsonJsonElement, MIOSKotlinx_serialization_jsonJsonElementCompanion, MIOSKtor_client_coreHttpClient, MIOSKtor_client_coreHttpClientCall, MIOSKtor_client_coreHttpClientCallCompanion, MIOSKtor_client_coreHttpClientConfig<T>, MIOSKtor_client_coreHttpClientEngineConfig, MIOSKtor_client_coreHttpReceivePipeline, MIOSKtor_client_coreHttpReceivePipelinePhases, MIOSKtor_client_coreHttpRequestBuilder, MIOSKtor_client_coreHttpRequestBuilderCompanion, MIOSKtor_client_coreHttpRequestData, MIOSKtor_client_coreHttpRequestPipeline, MIOSKtor_client_coreHttpRequestPipelinePhases, MIOSKtor_client_coreHttpResponse, MIOSKtor_client_coreHttpResponseContainer, MIOSKtor_client_coreHttpResponseData, MIOSKtor_client_coreHttpResponsePipeline, MIOSKtor_client_coreHttpResponsePipelinePhases, MIOSKtor_client_coreHttpSendPipeline, MIOSKtor_client_coreHttpSendPipelinePhases, MIOSKtor_client_coreProxyConfig, MIOSKtor_eventsEventDefinition<T>, MIOSKtor_eventsEvents, MIOSKtor_httpContentType, MIOSKtor_httpContentTypeCompanion, MIOSKtor_httpCookie, MIOSKtor_httpCookieCompanion, MIOSKtor_httpCookieEncoding, MIOSKtor_httpHeaderValueParam, MIOSKtor_httpHeaderValueWithParameters, MIOSKtor_httpHeaderValueWithParametersCompanion, MIOSKtor_httpHeadersBuilder, MIOSKtor_httpHttpMethod, MIOSKtor_httpHttpMethodCompanion, MIOSKtor_httpHttpProtocolVersion, MIOSKtor_httpHttpProtocolVersionCompanion, MIOSKtor_httpHttpStatusCode, MIOSKtor_httpHttpStatusCodeCompanion, MIOSKtor_httpOutgoingContent, MIOSKtor_httpURLBuilder, MIOSKtor_httpURLBuilderCompanion, MIOSKtor_httpURLProtocol, MIOSKtor_httpURLProtocolCompanion, MIOSKtor_httpUrl, MIOSKtor_httpUrlCompanion, MIOSKtor_utilsAttributeKey<T>, MIOSKtor_utilsGMTDate, MIOSKtor_utilsGMTDateCompanion, MIOSKtor_utilsMonth, MIOSKtor_utilsMonthCompanion, MIOSKtor_utilsPipeline<TSubject, TContext>, MIOSKtor_utilsPipelinePhase, MIOSKtor_utilsStringValuesBuilderImpl, MIOSKtor_utilsTypeInfo, MIOSKtor_utilsWeekDay, MIOSKtor_utilsWeekDayCompanion, MIOSRequest, MIOSResponse, MuppetBase<T>, PageBase<T>, PageBaseMessage, PageBaseMessageCompanion, PageEvent, PageOptions, UINavigationController, UIViewController, WKWebView, WKWebViewConfiguration;

@protocol BrowserFactoryProtocol, BrowserProtocol, EmitterProtocol, MIOSKotlinAnnotation, MIOSKotlinAutoCloseable, MIOSKotlinComparable, MIOSKotlinContinuation, MIOSKotlinContinuationInterceptor, MIOSKotlinCoroutineContext, MIOSKotlinCoroutineContextElement, MIOSKotlinCoroutineContextKey, MIOSKotlinFunction, MIOSKotlinIterator, MIOSKotlinKAnnotatedElement, MIOSKotlinKClass, MIOSKotlinKClassifier, MIOSKotlinKDeclarationContainer, MIOSKotlinKType, MIOSKotlinMapEntry, MIOSKotlinSequence, MIOSKotlinSuspendFunction1, MIOSKotlinSuspendFunction2, MIOSKotlinx_coroutines_coreChildHandle, MIOSKotlinx_coroutines_coreChildJob, MIOSKotlinx_coroutines_coreCompletableDeferred, MIOSKotlinx_coroutines_coreCoroutineScope, MIOSKotlinx_coroutines_coreDeferred, MIOSKotlinx_coroutines_coreDisposableHandle, MIOSKotlinx_coroutines_coreFlow, MIOSKotlinx_coroutines_coreFlowCollector, MIOSKotlinx_coroutines_coreJob, MIOSKotlinx_coroutines_coreParentJob, MIOSKotlinx_coroutines_coreRunnable, MIOSKotlinx_coroutines_coreSelectClause, MIOSKotlinx_coroutines_coreSelectClause0, MIOSKotlinx_coroutines_coreSelectClause1, MIOSKotlinx_coroutines_coreSelectInstance, MIOSKotlinx_coroutines_coreSharedFlow, MIOSKotlinx_io_coreRawSink, MIOSKotlinx_io_coreRawSource, MIOSKotlinx_io_coreSink, MIOSKotlinx_io_coreSource, MIOSKotlinx_serialization_coreCompositeDecoder, MIOSKotlinx_serialization_coreCompositeEncoder, MIOSKotlinx_serialization_coreDecoder, MIOSKotlinx_serialization_coreDeserializationStrategy, MIOSKotlinx_serialization_coreEncoder, MIOSKotlinx_serialization_coreKSerializer, MIOSKotlinx_serialization_coreSerialDescriptor, MIOSKotlinx_serialization_coreSerializationStrategy, MIOSKotlinx_serialization_coreSerializersModuleCollector, MIOSKtor_client_coreClientPlugin, MIOSKtor_client_coreCookiesStorage, MIOSKtor_client_coreHttpClientEngine, MIOSKtor_client_coreHttpClientEngineCapability, MIOSKtor_client_coreHttpClientPlugin, MIOSKtor_client_coreHttpRequest, MIOSKtor_httpHeaders, MIOSKtor_httpHttpMessage, MIOSKtor_httpHttpMessageBuilder, MIOSKtor_httpParameters, MIOSKtor_httpParametersBuilder, MIOSKtor_ioByteReadChannel, MIOSKtor_ioCloseable, MIOSKtor_ioJvmSerializable, MIOSKtor_utilsAttributes, MIOSKtor_utilsStringValues, MIOSKtor_utilsStringValuesBuilder, MuppetProtocol, PageFactoryBaseProtocol, PageFactoryProtocol, PageProtocol;

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
@interface MIOSBase : NSObject
- (instancetype)init __attribute__((unavailable));
+ (instancetype)new __attribute__((unavailable));
+ (void)initialize __attribute__((objc_requires_super));
@end

@interface MIOSBase (MIOSBaseCopying) <NSCopying>
@end

__attribute__((swift_name("KotlinMutableSet")))
@interface MIOSMutableSet<ObjectType> : NSMutableSet<ObjectType>
@end

__attribute__((swift_name("KotlinMutableDictionary")))
@interface MIOSMutableDictionary<KeyType, ObjectType> : NSMutableDictionary<KeyType, ObjectType>
@end

@interface NSError (NSErrorMIOSKotlinException)
@property (readonly) id _Nullable kotlinException;
@end

__attribute__((swift_name("KotlinNumber")))
@interface MIOSNumber : NSNumber
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
@interface MIOSByte : MIOSNumber
- (instancetype)initWithChar:(char)value;
+ (instancetype)numberWithChar:(char)value;
@end

__attribute__((swift_name("KotlinUByte")))
@interface MIOSUByte : MIOSNumber
- (instancetype)initWithUnsignedChar:(unsigned char)value;
+ (instancetype)numberWithUnsignedChar:(unsigned char)value;
@end

__attribute__((swift_name("KotlinShort")))
@interface MIOSShort : MIOSNumber
- (instancetype)initWithShort:(short)value;
+ (instancetype)numberWithShort:(short)value;
@end

__attribute__((swift_name("KotlinUShort")))
@interface MIOSUShort : MIOSNumber
- (instancetype)initWithUnsignedShort:(unsigned short)value;
+ (instancetype)numberWithUnsignedShort:(unsigned short)value;
@end

__attribute__((swift_name("KotlinInt")))
@interface MIOSInt : MIOSNumber
- (instancetype)initWithInt:(int)value;
+ (instancetype)numberWithInt:(int)value;
@end

__attribute__((swift_name("KotlinUInt")))
@interface MIOSUInt : MIOSNumber
- (instancetype)initWithUnsignedInt:(unsigned int)value;
+ (instancetype)numberWithUnsignedInt:(unsigned int)value;
@end

__attribute__((swift_name("KotlinLong")))
@interface MIOSLong : MIOSNumber
- (instancetype)initWithLongLong:(long long)value;
+ (instancetype)numberWithLongLong:(long long)value;
@end

__attribute__((swift_name("KotlinULong")))
@interface MIOSULong : MIOSNumber
- (instancetype)initWithUnsignedLongLong:(unsigned long long)value;
+ (instancetype)numberWithUnsignedLongLong:(unsigned long long)value;
@end

__attribute__((swift_name("KotlinFloat")))
@interface MIOSFloat : MIOSNumber
- (instancetype)initWithFloat:(float)value;
+ (instancetype)numberWithFloat:(float)value;
@end

__attribute__((swift_name("KotlinDouble")))
@interface MIOSDouble : MIOSNumber
- (instancetype)initWithDouble:(double)value;
+ (instancetype)numberWithDouble:(double)value;
@end

__attribute__((swift_name("KotlinBoolean")))
@interface MIOSBoolean : MIOSNumber
- (instancetype)initWithBool:(BOOL)value;
+ (instancetype)numberWithBool:(BOOL)value;
@end

@protocol EmitterProtocol
@required

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)emitEvent:(MIOSEmitterEvent<id> *)event completionHandler:(void (^)(MIOSEmitterEvent<id> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("emit(event:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)emitType:(MIOSKotlinEnum<MIOSKotlinEnum *> *)type data:(id _Nullable)data completionHandler:(void (^)(MIOSEmitterEvent<id> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("emit(type:data:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)emitType:(NSString *)type data:(id _Nullable)data completionHandler_:(void (^)(MIOSEmitterEvent<id> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("emit(type:data:completionHandler_:)")));
- (void)offJob:(id<MIOSKotlinx_coroutines_coreJob>)job __attribute__((swift_name("off(job:)")));
- (id<MIOSKotlinx_coroutines_coreJob>)onType:(MIOSKotlinEnum<MIOSKotlinEnum *> *)type handler:(id<MIOSKotlinSuspendFunction1>)handler __attribute__((swift_name("on(type:handler:)")));
- (id<MIOSKotlinx_coroutines_coreJob>)onType:(NSString *)type handler_:(id<MIOSKotlinSuspendFunction1>)handler __attribute__((swift_name("on(type:handler_:)")));
- (id<MIOSKotlinx_coroutines_coreJob>)onceType:(MIOSKotlinEnum<MIOSKotlinEnum *> *)type handler:(id<MIOSKotlinSuspendFunction1>)handler __attribute__((swift_name("once(type:handler:)")));
- (id<MIOSKotlinx_coroutines_coreJob>)onceType:(NSString *)type handler_:(id<MIOSKotlinSuspendFunction1>)handler __attribute__((swift_name("once(type:handler_:)")));
@property (readonly) id<MIOSKotlinx_coroutines_coreFlow> events __attribute__((swift_name("events")));
@end

__attribute__((swift_name("Emitter")))
@interface MIOSEmitter<T> : MIOSBase <EmitterProtocol>
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)emitEvent:(MIOSEmitterEvent<T> *)event completionHandler:(void (^)(MIOSEmitterEvent<T> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("emit(event:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)emitType:(MIOSKotlinEnum<MIOSKotlinEnum *> *)type data:(T _Nullable)data completionHandler:(void (^)(MIOSEmitterEvent<T> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("emit(type:data:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)emitType:(NSString *)type data:(T _Nullable)data completionHandler_:(void (^)(MIOSEmitterEvent<T> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("emit(type:data:completionHandler_:)")));
- (void)offJob:(id<MIOSKotlinx_coroutines_coreJob>)job __attribute__((swift_name("off(job:)")));
- (id<MIOSKotlinx_coroutines_coreJob>)onType:(MIOSKotlinEnum<MIOSKotlinEnum *> *)type handler:(id<MIOSKotlinSuspendFunction1>)handler __attribute__((swift_name("on(type:handler:)")));
- (id<MIOSKotlinx_coroutines_coreJob>)onType:(NSString *)type handler_:(id<MIOSKotlinSuspendFunction1>)handler __attribute__((swift_name("on(type:handler_:)")));
- (id<MIOSKotlinx_coroutines_coreJob>)onceType:(MIOSKotlinEnum<MIOSKotlinEnum *> *)type handler:(id<MIOSKotlinSuspendFunction1>)handler __attribute__((swift_name("once(type:handler:)")));
- (id<MIOSKotlinx_coroutines_coreJob>)onceType:(NSString *)type handler_:(id<MIOSKotlinSuspendFunction1>)handler __attribute__((swift_name("once(type:handler_:)")));
@property (readonly) id<MIOSKotlinx_coroutines_coreSharedFlow> events __attribute__((swift_name("events")));
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

@interface BrowserBase<T> : MIOSEmitter<id> <BrowserProtocol>
- (instancetype)initWithFactory:(id<PageFactoryBaseProtocol>)factory __attribute__((swift_name("init(factory:)"))) __attribute__((objc_designated_initializer));
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
+ (instancetype)new __attribute__((unavailable));

/**
 * @note This method has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
- (void)addPagePage:(id<PageProtocol>)page __attribute__((swift_name("addPage(page:)")));

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

/**
 * @note This method has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
- (void)removePagePage:(id<PageProtocol>)page keep:(BOOL)keep __attribute__((swift_name("removePage(page:keep:)")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property (readonly) NSMutableArray<id<PageProtocol>> *_pages __attribute__((swift_name("_pages")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property (readonly) id<PageFactoryBaseProtocol> factory __attribute__((swift_name("factory")));
@end

__attribute__((objc_subclassing_restricted))
@interface Browser : BrowserBase<WKWebView *> <BrowserProtocol>
- (instancetype)initWithController:(UIViewController *)controller factory:(id<PageFactoryProtocol>)factory __attribute__((swift_name("init(controller:factory:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithFactory:(id<PageFactoryBaseProtocol>)factory __attribute__((swift_name("init(factory:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (id<PageProtocol>)PageConfiguration:(WKWebViewConfiguration *)configuration __attribute__((swift_name("Page(configuration:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)showController:(UIViewController *)controller animate:(BOOL)animate completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("show(controller:animate:completionHandler:)")));
@property (readonly) UIViewController *controller __attribute__((swift_name("controller")));
@property (readonly) UINavigationController * _Nullable group __attribute__((swift_name("group")));
@end

__attribute__((swift_name("KotlinComparable")))
@protocol MIOSKotlinComparable
@required
- (int32_t)compareToOther:(id _Nullable)other __attribute__((swift_name("compareTo(other:)")));
@end

__attribute__((swift_name("KotlinEnum")))
@interface MIOSKotlinEnum<E> : MIOSBase <MIOSKotlinComparable>
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer));
@property (class, readonly, getter=companion) MIOSKotlinEnumCompanion *companion __attribute__((swift_name("companion")));
- (int32_t)compareToOther:(E)other __attribute__((swift_name("compareTo(other:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString *name __attribute__((swift_name("name")));
@property (readonly) int32_t ordinal __attribute__((swift_name("ordinal")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Constants")))
@interface MIOSConstants : MIOSKotlinEnum<MIOSConstants *>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly) MIOSConstants *bridgeName __attribute__((swift_name("bridgeName")));
+ (MIOSKotlinArray<MIOSConstants *> *)values __attribute__((swift_name("values()")));
@property (class, readonly) NSArray<MIOSConstants *> *entries __attribute__((swift_name("entries")));
@property (readonly) NSString *value __attribute__((swift_name("value")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("EmitterEvent")))
@interface MIOSEmitterEvent<T> : MIOSBase
- (instancetype)initWithType:(NSString *)type data:(T _Nullable)data __attribute__((swift_name("init(type:data:)"))) __attribute__((objc_designated_initializer));
@property (readonly) T _Nullable data __attribute__((swift_name("data")));
@property (readonly) NSString *type __attribute__((swift_name("type")));
@end

__attribute__((objc_subclassing_restricted))
@interface LogLevel : MIOSKotlinEnum<LogLevel *>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly) LogLevel *error __attribute__((swift_name("error")));
@property (class, readonly) LogLevel *verbose __attribute__((swift_name("verbose")));
@property (class, readonly) LogLevel *debug __attribute__((swift_name("debug")));
+ (MIOSKotlinArray<LogLevel *> *)values __attribute__((swift_name("values()")));
@property (class, readonly) NSArray<LogLevel *> *entries __attribute__((swift_name("entries")));
@end

@protocol MuppetProtocol
@required
- (id<PageProtocol> _Nullable)getPageHandle:(NSString *)handle __attribute__((swift_name("getPage(handle:)")));
- (void)injectPage:(id<PageProtocol>)page factory:(id<BrowserFactoryProtocol>)factory __attribute__((swift_name("inject(page:factory:)")));
- (id<BrowserProtocol>)launchFactory:(id<BrowserFactoryProtocol>)factory __attribute__((swift_name("launch(factory:)")));
@end

@interface MuppetBase<T> : MIOSEmitter<id> <MuppetProtocol>
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (void)addBrowserBrowser:(id<BrowserProtocol>)browser __attribute__((swift_name("addBrowser(browser:)")));
- (id<PageProtocol> _Nullable)getPageHandle:(NSString *)handle __attribute__((swift_name("getPage(handle:)")));
- (void)injectPage:(id<PageProtocol>)page factory:(id<BrowserFactoryProtocol>)factory __attribute__((swift_name("inject(page:factory:)")));
- (id<BrowserProtocol>)launchFactory:(id<BrowserFactoryProtocol>)factory __attribute__((swift_name("launch(factory:)")));
- (void)removeBrowserBrowser:(id<BrowserProtocol>)browser __attribute__((swift_name("removeBrowser(browser:)")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property (readonly) NSMutableArray<id<BrowserProtocol>> *_browsers __attribute__((swift_name("_browsers")));
@end

__attribute__((objc_subclassing_restricted))
@interface Muppet : MuppetBase<WKWebView *>
- (instancetype)initWithSource:(UIViewController *)source __attribute__((swift_name("init(source:)"))) __attribute__((objc_designated_initializer));
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
+ (instancetype)new __attribute__((unavailable));
- (id<BrowserProtocol>)launchFactory:(id<BrowserFactoryProtocol>)factory __attribute__((swift_name("launch(factory:)")));
- (void)setLogLevelLevel:(LogLevel *)level __attribute__((swift_name("setLogLevel(level:)")));
- (void)setLoggerLogger:(void (^ _Nullable)(NSString *))logger __attribute__((swift_name("setLogger(logger:)")));
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
- (void)cookiesUrl:(NSString *)url completionHandler:(void (^)(NSArray<MIOSKtor_httpCookie *> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("cookies(url:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)evaluateJs:(NSString *)js completionHandler:(void (^)(id<MIOSKotlinx_coroutines_coreDeferred> _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("evaluate(js:completionHandler:)")));
- (void)evaluateJs:(NSString *)js handler:(void (^)(NSString * _Nullable))handler __attribute__((swift_name("evaluate(js:handler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)gotoUrl:(NSString *)url headers:(NSDictionary<NSString *, NSString *> *)headers timeout:(int64_t)timeout completionHandler:(void (^)(id<MIOSKotlinx_coroutines_coreDeferred> _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("goto(url:headers:timeout:completionHandler:)")));
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
- (void)progressWithCompletionHandler:(void (^)(MIOSInt * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("progress(completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)requestMethod:(NSString *)method url:(NSString *)url data:(NSString * _Nullable)data headers:(NSDictionary<NSString *, NSString *> * _Nullable)headers followRedirects:(BOOL)followRedirects stream:(id<MIOSKotlinx_coroutines_coreFlow> _Nullable)stream completionHandler:(void (^)(MIOSResponse * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("request(method:url:data:headers:followRedirects:stream:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)screenshotWidth:(int32_t)width height:(int32_t)height quality:(double)quality completionHandler:(void (^)(NSString * _Nullable_result, NSError * _Nullable))completionHandler __attribute__((swift_name("screenshot(width:height:quality:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)setCookieCookie:(MIOSKtor_httpCookie *)cookie completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("setCookie(cookie:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)setCookieCookies:(NSArray<MIOSKtor_httpCookie *> *)cookies completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("setCookie(cookies:completionHandler:)")));
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

@interface PageBase<T> : MIOSEmitter<id> <PageProtocol>
- (instancetype)initWithBrowser:(id<BrowserProtocol>)browser view:(T _Nullable)view __attribute__((swift_name("init(browser:view:)"))) __attribute__((objc_designated_initializer));
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
+ (instancetype)new __attribute__((unavailable));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
 * @note This method has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
- (void)_closeWithCompletionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("_close(completionHandler:)")));

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
- (void)cookiesUrl:(NSString *)url completionHandler:(void (^)(NSArray<MIOSKtor_httpCookie *> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("cookies(url:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)evaluateJs:(NSString *)js completionHandler:(void (^)(id<MIOSKotlinx_coroutines_coreDeferred> _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("evaluate(js:completionHandler:)")));
- (void)evaluateJs:(NSString *)js handler:(void (^)(NSString * _Nullable))handler __attribute__((swift_name("evaluate(js:handler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)gotoUrl:(NSString *)url headers:(NSDictionary<NSString *, NSString *> *)headers timeout:(int64_t)timeout completionHandler:(void (^)(id<MIOSKotlinx_coroutines_coreDeferred> _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("goto(url:headers:timeout:completionHandler:)")));
- (NSString *)handle __attribute__((swift_name("handle()")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)hideAnimate:(BOOL)animate completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("hide(animate:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)initializeWithCompletionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("initialize(completionHandler:)")));

/**
 * @note This method has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
- (BOOL)isHostAllowedUri:(NSString *)uri __attribute__((swift_name("isHostAllowed(uri:)")));
- (id<PageProtocol> _Nullable)parent __attribute__((swift_name("parent()")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)progressWithCompletionHandler:(void (^)(MIOSInt * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("progress(completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)requestMethod:(NSString *)method url:(NSString *)url data:(NSString * _Nullable)data headers:(NSDictionary<NSString *, NSString *> * _Nullable)headers followRedirects:(BOOL)followRedirects stream:(id<MIOSKotlinx_coroutines_coreFlow> _Nullable)stream completionHandler:(void (^)(MIOSResponse * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("request(method:url:data:headers:followRedirects:stream:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)setCookieCookie:(MIOSKtor_httpCookie *)cookie completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("setCookie(cookie:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)setCookieCookies:(NSArray<MIOSKtor_httpCookie *> *)cookies completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("setCookie(cookies:completionHandler:)")));
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
- (T _Nullable)view __attribute__((swift_name("view()")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property (readonly) MIOSKtor_client_coreHttpClient *_client __attribute__((swift_name("_client")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property (readonly) MIOSKtor_client_coreHttpClient *_clientNR __attribute__((swift_name("_clientNR")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property BOOL _closed __attribute__((swift_name("_closed")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property (readonly) MIOSMutableDictionary<MIOSInt *, id<MIOSKotlinx_coroutines_coreCompletableDeferred>> *_deferrables __attribute__((swift_name("_deferrables")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property (readonly) NSMutableArray<NSString *> *_hostAllowList __attribute__((swift_name("_hostAllowList")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property (readonly) id<MIOSKotlinx_coroutines_coreCompletableDeferred> _initialized __attribute__((swift_name("_initialized")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property (readonly) NSString *_jsObjectName __attribute__((swift_name("_jsObjectName")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property id<PageProtocol> _Nullable _parent __attribute__((swift_name("_parent")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property (readonly) id<MIOSKotlinx_coroutines_coreCoroutineScope> _scope __attribute__((swift_name("_scope")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property (readonly) T _Nullable _wv __attribute__((swift_name("_wv")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property (readonly) id<BrowserProtocol> browser __attribute__((swift_name("browser")));
@property (readonly) PageOptions *options __attribute__((swift_name("options")));
@end

__attribute__((objc_subclassing_restricted))
@interface Page : PageBase<WKWebView *> <PageProtocol>
- (instancetype)initWithBrowser:(Browser *)browser view:(WKWebView *)view controller:(UIViewController *)controller __attribute__((swift_name("init(browser:view:controller:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithBrowser:(id<BrowserProtocol>)browser view:(id _Nullable)view __attribute__((swift_name("init(browser:view:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
 * @note This method has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
- (void)_closeWithCompletionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("_close(completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)addUserScriptScript:(NSString *)script completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("addUserScript(script:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)cookiesUrl:(NSString *)url completionHandler:(void (^)(NSArray<MIOSKtor_httpCookie *> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("cookies(url:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)evaluateJs:(NSString *)js completionHandler:(void (^)(id<MIOSKotlinx_coroutines_coreDeferred> _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("evaluate(js:completionHandler:)")));
- (void)evaluateJs:(NSString *)js handler:(void (^)(NSString * _Nullable))handler __attribute__((swift_name("evaluate(js:handler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)gotoUrl:(NSString *)url headers:(NSDictionary<NSString *, NSString *> *)headers timeout:(int64_t)timeout completionHandler:(void (^)(id<MIOSKotlinx_coroutines_coreDeferred> _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("goto(url:headers:timeout:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)hideAnimate:(BOOL)animate completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("hide(animate:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)initializeWithCompletionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("initialize(completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)progressWithCompletionHandler:(void (^)(MIOSInt * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("progress(completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)screenshotWidth:(int32_t)width height:(int32_t)height quality:(double)quality completionHandler:(void (^)(NSString * _Nullable_result, NSError * _Nullable))completionHandler __attribute__((swift_name("screenshot(width:height:quality:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)setCookieCookie:(MIOSKtor_httpCookie *)cookie completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("setCookie(cookie:completionHandler:)")));

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
@property (readonly) UIViewController *controller __attribute__((swift_name("controller")));
@end

@protocol PageFactoryBaseProtocol
@required
- (id<PageProtocol>)createBrowser:(id<BrowserProtocol>)browser __attribute__((swift_name("create(browser:)")));
@end

@protocol PageFactoryProtocol <PageFactoryBaseProtocol>
@required
- (id<PageProtocol>)createBrowser:(id<BrowserProtocol>)browser configuration:(WKWebViewConfiguration *)configuration __attribute__((swift_name("create(browser:configuration:)")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("ContentTypeFallbackConfig")))
@interface MIOSContentTypeFallbackConfig : MIOSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("ForceHttpsConfig")))
@interface MIOSForceHttpsConfig : MIOSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property NSSet<NSString *> *bypass __attribute__((swift_name("bypass")));
@end


/**
 * @note annotations
 *   kotlin.SinceKotlin(version="2.0")
*/
__attribute__((swift_name("KotlinAutoCloseable")))
@protocol MIOSKotlinAutoCloseable
@required
- (void)close __attribute__((swift_name("close()")));
@end

__attribute__((swift_name("Ktor_ioCloseable")))
@protocol MIOSKtor_ioCloseable <MIOSKotlinAutoCloseable>
@required
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("HttpCookies")))
@interface MIOSHttpCookies : MIOSBase <MIOSKtor_ioCloseable>
@property (class, readonly, getter=companion) MIOSHttpCookiesCompanion *companion __attribute__((swift_name("companion")));
- (void)close __attribute__((swift_name("close()")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)getRequestUrl:(MIOSKtor_httpUrl *)requestUrl completionHandler:(void (^)(NSArray<MIOSKtor_httpCookie *> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("get(requestUrl:completionHandler:)")));
@end

__attribute__((swift_name("Ktor_client_coreHttpClientPlugin")))
@protocol MIOSKtor_client_coreHttpClientPlugin
@required
- (void)installPlugin:(id)plugin scope:(MIOSKtor_client_coreHttpClient *)scope __attribute__((swift_name("install(plugin:scope:)")));
- (id)prepareBlock:(void (^)(id))block __attribute__((swift_name("prepare(block:)")));
@property (readonly) MIOSKtor_utilsAttributeKey<id> *key __attribute__((swift_name("key")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("HttpCookies.Companion")))
@interface MIOSHttpCookiesCompanion : MIOSBase <MIOSKtor_client_coreHttpClientPlugin>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSHttpCookiesCompanion *shared __attribute__((swift_name("shared")));
- (void)installPlugin:(MIOSHttpCookies *)plugin scope:(MIOSKtor_client_coreHttpClient *)scope __attribute__((swift_name("install(plugin:scope:)")));
- (MIOSHttpCookies *)prepareBlock:(void (^)(MIOSHttpCookiesConfig *))block __attribute__((swift_name("prepare(block:)")));
@property (readonly) MIOSKtor_utilsAttributeKey<MIOSHttpCookies *> *key __attribute__((swift_name("key")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("HttpCookies.Config")))
@interface MIOSHttpCookiesConfig : MIOSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (void)defaultBlock:(id<MIOSKotlinSuspendFunction1>)block __attribute__((swift_name("default(block:)")));
@property id<MIOSKtor_client_coreCookiesStorage> storage __attribute__((swift_name("storage")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Request")))
@interface MIOSRequest : MIOSBase
- (instancetype)initWithMethod:(NSString *)method url:(NSString *)url data:(NSString * _Nullable)data headers:(NSDictionary<NSString *, NSString *> * _Nullable)headers followRedirects:(BOOL)followRedirects stream:(id<MIOSKotlinx_coroutines_coreFlow> _Nullable)stream __attribute__((swift_name("init(method:url:data:headers:followRedirects:stream:)"))) __attribute__((objc_designated_initializer));
- (MIOSRequest *)doCopyMethod:(NSString *)method url:(NSString *)url data:(NSString * _Nullable)data headers:(NSDictionary<NSString *, NSString *> * _Nullable)headers followRedirects:(BOOL)followRedirects stream:(id<MIOSKotlinx_coroutines_coreFlow> _Nullable)stream __attribute__((swift_name("doCopy(method:url:data:headers:followRedirects:stream:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString * _Nullable data __attribute__((swift_name("data")));
@property (readonly) BOOL followRedirects __attribute__((swift_name("followRedirects")));
@property (readonly) NSDictionary<NSString *, NSString *> * _Nullable headers __attribute__((swift_name("headers")));
@property (readonly) NSString *method __attribute__((swift_name("method")));
@property (readonly) id<MIOSKotlinx_coroutines_coreFlow> _Nullable stream __attribute__((swift_name("stream")));
@property (readonly) NSString *url __attribute__((swift_name("url")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Response")))
@interface MIOSResponse : MIOSBase
- (instancetype)initWithStatus:(int32_t)status headers:(NSDictionary<NSString *, NSArray<NSString *> *> *)headers body:(id<MIOSKotlinx_coroutines_coreFlow>)body __attribute__((swift_name("init(status:headers:body:)"))) __attribute__((objc_designated_initializer));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)bytesWithCompletionHandler:(void (^)(MIOSKotlinByteArray * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("bytes(completionHandler:)")));
- (MIOSResponse *)doCopyStatus:(int32_t)status headers:(NSDictionary<NSString *, NSArray<NSString *> *> *)headers body:(id<MIOSKotlinx_coroutines_coreFlow>)body __attribute__((swift_name("doCopy(status:headers:body:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSDictionary<NSString *, MIOSKotlinx_serialization_jsonJsonElement *> *)header __attribute__((swift_name("header()")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)jsonObjectWithCompletionHandler:(void (^)(NSDictionary<NSString *, MIOSKotlinx_serialization_jsonJsonElement *> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("jsonObject(completionHandler:)")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) id<MIOSKotlinx_coroutines_coreFlow> body __attribute__((swift_name("body")));
@property (readonly) NSDictionary<NSString *, NSArray<NSString *> *> *headers __attribute__((swift_name("headers")));
@property (readonly) int32_t status __attribute__((swift_name("status")));
@end

__attribute__((objc_subclassing_restricted))
@interface BrowserEvent : MIOSKotlinEnum<BrowserEvent *>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly) BrowserEvent *page __attribute__((swift_name("page")));
@property (class, readonly) BrowserEvent *closed __attribute__((swift_name("closed")));
+ (MIOSKotlinArray<BrowserEvent *> *)values __attribute__((swift_name("values()")));
@property (class, readonly) NSArray<BrowserEvent *> *entries __attribute__((swift_name("entries")));
@end

__attribute__((objc_subclassing_restricted))
@interface PageEvent : MIOSKotlinEnum<PageEvent *>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly) PageEvent *console __attribute__((swift_name("console")));
@property (class, readonly) PageEvent *close __attribute__((swift_name("close")));
@property (class, readonly) PageEvent *closed __attribute__((swift_name("closed")));
@property (class, readonly) PageEvent *dispatch __attribute__((swift_name("dispatch")));
@property (class, readonly) PageEvent *domcontentloaded __attribute__((swift_name("domcontentloaded")));
@property (class, readonly) PageEvent *started __attribute__((swift_name("started")));
@property (class, readonly) PageEvent *finished __attribute__((swift_name("finished")));
@property (class, readonly) PageEvent *load_ __attribute__((swift_name("load_")));
@property (class, readonly) PageEvent *locationchange __attribute__((swift_name("locationchange")));
@property (class, readonly) PageEvent *domchange __attribute__((swift_name("domchange")));
@property (class, readonly) PageEvent *progress __attribute__((swift_name("progress")));
@property (class, readonly) PageEvent *popup __attribute__((swift_name("popup")));
@property (class, readonly) PageEvent *visible __attribute__((swift_name("visible")));
@property (class, readonly) PageEvent *hostblocked __attribute__((swift_name("hostblocked")));
@property (class, readonly) PageEvent *error __attribute__((swift_name("error")));
+ (MIOSKotlinArray<PageEvent *> *)values __attribute__((swift_name("values()")));
@property (class, readonly) NSArray<PageEvent *> *entries __attribute__((swift_name("entries")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
@interface PageBaseMessage : MIOSBase
- (instancetype)initWithMethod:(NSString *)method params:(NSArray<MIOSKotlinx_serialization_jsonJsonElement *> *)params __attribute__((swift_name("init(method:params:)"))) __attribute__((objc_designated_initializer));
@property (class, readonly, getter=companion) PageBaseMessageCompanion *companion __attribute__((swift_name("companion")));
- (PageBaseMessage *)doCopyMethod:(NSString *)method params:(NSArray<MIOSKotlinx_serialization_jsonJsonElement *> *)params __attribute__((swift_name("doCopy(method:params:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString *method __attribute__((swift_name("method")));
@property (readonly) NSArray<MIOSKotlinx_serialization_jsonJsonElement *> *params __attribute__((swift_name("params")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("PageBaseMessage.Companion")))
@interface PageBaseMessageCompanion : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) PageBaseMessageCompanion *shared __attribute__((swift_name("shared")));
- (id<MIOSKotlinx_serialization_coreKSerializer>)serializer __attribute__((swift_name("serializer()")));
@end

__attribute__((objc_subclassing_restricted))
@interface PageOptions : MIOSBase
- (instancetype)initWithHideOnClose:(BOOL)hideOnClose __attribute__((swift_name("init(hideOnClose:)"))) __attribute__((objc_designated_initializer));
- (PageOptions *)doCopyHideOnClose:(BOOL)hideOnClose __attribute__((swift_name("doCopy(hideOnClose:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property BOOL hideOnClose __attribute__((swift_name("hideOnClose")));
@end

@protocol BrowserFactoryProtocol
@required
- (id<BrowserProtocol>)createMuppet:(id<MuppetProtocol>)muppet __attribute__((swift_name("create(muppet:)")));
@end

__attribute__((swift_name("Kotlinx_coroutines_coreCoroutineScope")))
@protocol MIOSKotlinx_coroutines_coreCoroutineScope
@required
@property (readonly) id<MIOSKotlinCoroutineContext> coroutineContext __attribute__((swift_name("coroutineContext")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_client_coreHttpClient")))
@interface MIOSKtor_client_coreHttpClient : MIOSBase <MIOSKotlinx_coroutines_coreCoroutineScope, MIOSKtor_ioCloseable>
- (instancetype)initWithEngine:(id<MIOSKtor_client_coreHttpClientEngine>)engine userConfig:(MIOSKtor_client_coreHttpClientConfig<MIOSKtor_client_coreHttpClientEngineConfig *> *)userConfig __attribute__((swift_name("init(engine:userConfig:)"))) __attribute__((objc_designated_initializer));
- (void)close __attribute__((swift_name("close()")));
- (MIOSKtor_client_coreHttpClient *)configBlock:(void (^)(MIOSKtor_client_coreHttpClientConfig<id> *))block __attribute__((swift_name("config(block:)")));
- (BOOL)isSupportedCapability:(id<MIOSKtor_client_coreHttpClientEngineCapability>)capability __attribute__((swift_name("isSupported(capability:)")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) id<MIOSKtor_utilsAttributes> attributes __attribute__((swift_name("attributes")));
@property (readonly) id<MIOSKotlinCoroutineContext> coroutineContext __attribute__((swift_name("coroutineContext")));
@property (readonly) id<MIOSKtor_client_coreHttpClientEngine> engine __attribute__((swift_name("engine")));
@property (readonly) MIOSKtor_client_coreHttpClientEngineConfig *engineConfig __attribute__((swift_name("engineConfig")));
@property (readonly) MIOSKtor_eventsEvents *monitor __attribute__((swift_name("monitor")));
@property (readonly) MIOSKtor_client_coreHttpReceivePipeline *receivePipeline __attribute__((swift_name("receivePipeline")));
@property (readonly) MIOSKtor_client_coreHttpRequestPipeline *requestPipeline __attribute__((swift_name("requestPipeline")));
@property (readonly) MIOSKtor_client_coreHttpResponsePipeline *responsePipeline __attribute__((swift_name("responsePipeline")));
@property (readonly) MIOSKtor_client_coreHttpSendPipeline *sendPipeline __attribute__((swift_name("sendPipeline")));
@end

@interface MIOSKtor_client_coreHttpClient (Extensions)

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)cookiesUrl:(MIOSKtor_httpUrl *)url completionHandler:(void (^)(NSArray<MIOSKtor_httpCookie *> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("cookies(url:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)cookiesUrlString:(NSString *)urlString completionHandler:(void (^)(NSArray<MIOSKtor_httpCookie *> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("cookies(urlString:completionHandler:)")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("BridgeKt")))
@interface MIOSBridgeKt : MIOSBase
+ (void)injectMuppet:(id<MuppetProtocol>)muppet page:(id<PageProtocol>)page factory:(id<BrowserFactoryProtocol>)factory __attribute__((swift_name("inject(muppet:page:factory:)")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("ContentTypeFallbackKt")))
@interface MIOSContentTypeFallbackKt : MIOSBase
@property (class, readonly) id<MIOSKtor_client_coreClientPlugin> ContentTypeFallback __attribute__((swift_name("ContentTypeFallback")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("ForceHttpsKt")))
@interface MIOSForceHttpsKt : MIOSBase
@property (class, readonly) id<MIOSKtor_client_coreClientPlugin> ForceHttps __attribute__((swift_name("ForceHttps")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("HttpCookiesKt")))
@interface MIOSHttpCookiesKt : MIOSBase
+ (MIOSKtor_httpCookie * _Nullable)get:(NSArray<MIOSKtor_httpCookie *> *)receiver name:(NSString *)name __attribute__((swift_name("get(_:name:)")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("PlatformKt")))
@interface MIOSPlatformKt : MIOSBase
@property (class, readonly) BOOL DBG __attribute__((swift_name("DBG")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("RequestKt")))
@interface MIOSRequestKt : MIOSBase
+ (MIOSRequest * _Nullable)redirectRequestRequest:(MIOSRequest *)request status:(int32_t)status location:(NSString * _Nullable)location __attribute__((swift_name("redirectRequest(request:status:location:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
+ (void)requestClient:(MIOSKtor_client_coreHttpClient *)client method:(NSString *)method url:(NSString *)url data:(NSString * _Nullable)data headers:(NSDictionary<NSString *, NSString *> * _Nullable)headers followRedirects:(BOOL)followRedirects stream:(id<MIOSKotlinx_coroutines_coreFlow> _Nullable)stream completionHandler:(void (^)(MIOSResponse * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("request(client:method:url:data:headers:followRedirects:stream:completionHandler:)")));
+ (NSString *)toHttps:(NSString *)receiver __attribute__((swift_name("toHttps(_:)")));
@end

__attribute__((swift_name("KotlinThrowable")))
@interface MIOSKotlinThrowable : MIOSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithCause:(MIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(MIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer));

/**
 * @note annotations
 *   kotlin.experimental.ExperimentalNativeApi
*/
- (MIOSKotlinArray<NSString *> *)getStackTrace __attribute__((swift_name("getStackTrace()")));
- (void)printStackTrace __attribute__((swift_name("printStackTrace()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) MIOSKotlinThrowable * _Nullable cause __attribute__((swift_name("cause")));
@property (readonly) NSString * _Nullable message __attribute__((swift_name("message")));
- (NSError *)asError __attribute__((swift_name("asError()")));
@end

__attribute__((swift_name("KotlinException")))
@interface MIOSKotlinException : MIOSKotlinThrowable
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithCause:(MIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(MIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer));
@end

__attribute__((swift_name("KotlinRuntimeException")))
@interface MIOSKotlinRuntimeException : MIOSKotlinException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithCause:(MIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(MIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer));
@end

__attribute__((swift_name("KotlinIllegalStateException")))
@interface MIOSKotlinIllegalStateException : MIOSKotlinRuntimeException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithCause:(MIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(MIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer));
@end


/**
 * @note annotations
 *   kotlin.SinceKotlin(version="1.4")
*/
__attribute__((swift_name("KotlinCancellationException")))
@interface MIOSKotlinCancellationException : MIOSKotlinIllegalStateException
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithCause:(MIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(MIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer));
@end


/**
 * @note annotations
 *   kotlin.SinceKotlin(version="1.3")
*/
__attribute__((swift_name("KotlinCoroutineContext")))
@protocol MIOSKotlinCoroutineContext
@required
- (id _Nullable)foldInitial:(id _Nullable)initial operation:(id _Nullable (^)(id _Nullable, id<MIOSKotlinCoroutineContextElement>))operation __attribute__((swift_name("fold(initial:operation:)")));
- (id<MIOSKotlinCoroutineContextElement> _Nullable)getKey:(id<MIOSKotlinCoroutineContextKey>)key __attribute__((swift_name("get(key:)")));
- (id<MIOSKotlinCoroutineContext>)minusKeyKey:(id<MIOSKotlinCoroutineContextKey>)key __attribute__((swift_name("minusKey(key:)")));
- (id<MIOSKotlinCoroutineContext>)plusContext:(id<MIOSKotlinCoroutineContext>)context __attribute__((swift_name("plus(context:)")));
@end

__attribute__((swift_name("KotlinCoroutineContextElement")))
@protocol MIOSKotlinCoroutineContextElement <MIOSKotlinCoroutineContext>
@required
@property (readonly) id<MIOSKotlinCoroutineContextKey> key __attribute__((swift_name("key")));
@end

__attribute__((swift_name("Kotlinx_coroutines_coreJob")))
@protocol MIOSKotlinx_coroutines_coreJob <MIOSKotlinCoroutineContextElement>
@required

/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
- (id<MIOSKotlinx_coroutines_coreChildHandle>)attachChildChild:(id<MIOSKotlinx_coroutines_coreChildJob>)child __attribute__((swift_name("attachChild(child:)")));
- (void)cancelCause:(MIOSKotlinCancellationException * _Nullable)cause __attribute__((swift_name("cancel(cause:)")));

/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
- (MIOSKotlinCancellationException *)getCancellationException __attribute__((swift_name("getCancellationException()")));
- (id<MIOSKotlinx_coroutines_coreDisposableHandle>)invokeOnCompletionHandler:(void (^)(MIOSKotlinThrowable * _Nullable))handler __attribute__((swift_name("invokeOnCompletion(handler:)")));

/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
- (id<MIOSKotlinx_coroutines_coreDisposableHandle>)invokeOnCompletionOnCancelling:(BOOL)onCancelling invokeImmediately:(BOOL)invokeImmediately handler:(void (^)(MIOSKotlinThrowable * _Nullable))handler __attribute__((swift_name("invokeOnCompletion(onCancelling:invokeImmediately:handler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)joinWithCompletionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("join(completionHandler:)")));
- (id<MIOSKotlinx_coroutines_coreJob>)plusOther:(id<MIOSKotlinx_coroutines_coreJob>)other __attribute__((swift_name("plus(other:)"))) __attribute__((unavailable("Operator '+' on two Job objects is meaningless. Job is a coroutine context element and `+` is a set-sum operator for coroutine contexts. The job to the right of `+` just replaces the job the left of `+`.")));
- (BOOL)start __attribute__((swift_name("start()")));
@property (readonly) id<MIOSKotlinSequence> children __attribute__((swift_name("children")));
@property (readonly) BOOL isActive __attribute__((swift_name("isActive")));
@property (readonly) BOOL isCancelled __attribute__((swift_name("isCancelled")));
@property (readonly) BOOL isCompleted __attribute__((swift_name("isCompleted")));
@property (readonly) id<MIOSKotlinx_coroutines_coreSelectClause0> onJoin __attribute__((swift_name("onJoin")));

/**
 * @note annotations
 *   kotlinx.coroutines.ExperimentalCoroutinesApi
*/
@property (readonly, getter=parent_) id<MIOSKotlinx_coroutines_coreJob> _Nullable parent __attribute__((swift_name("parent")));
@end

__attribute__((swift_name("KotlinFunction")))
@protocol MIOSKotlinFunction
@required
@end

__attribute__((swift_name("KotlinSuspendFunction1")))
@protocol MIOSKotlinSuspendFunction1 <MIOSKotlinFunction>
@required

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)invokeP1:(id _Nullable)p1 completionHandler:(void (^)(id _Nullable_result, NSError * _Nullable))completionHandler __attribute__((swift_name("invoke(p1:completionHandler:)")));
@end

__attribute__((swift_name("Kotlinx_coroutines_coreFlow")))
@protocol MIOSKotlinx_coroutines_coreFlow
@required

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)collectCollector:(id<MIOSKotlinx_coroutines_coreFlowCollector>)collector completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("collect(collector:completionHandler:)")));
@end

__attribute__((swift_name("Kotlinx_coroutines_coreSharedFlow")))
@protocol MIOSKotlinx_coroutines_coreSharedFlow <MIOSKotlinx_coroutines_coreFlow>
@required
@property (readonly) NSArray<id> *replayCache __attribute__((swift_name("replayCache")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinEnumCompanion")))
@interface MIOSKotlinEnumCompanion : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKotlinEnumCompanion *shared __attribute__((swift_name("shared")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinArray")))
@interface MIOSKotlinArray<T> : MIOSBase
+ (instancetype)arrayWithSize:(int32_t)size init:(T _Nullable (^)(MIOSInt *))init __attribute__((swift_name("init(size:init:)")));
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (T _Nullable)getIndex:(int32_t)index __attribute__((swift_name("get(index:)")));
- (id<MIOSKotlinIterator>)iterator __attribute__((swift_name("iterator()")));
- (void)setIndex:(int32_t)index value:(T _Nullable)value __attribute__((swift_name("set(index:value:)")));
@property (readonly) int32_t size __attribute__((swift_name("size")));
@end

__attribute__((swift_name("Ktor_ioJvmSerializable")))
@protocol MIOSKtor_ioJvmSerializable
@required
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpCookie")))
@interface MIOSKtor_httpCookie : MIOSBase <MIOSKtor_ioJvmSerializable>
- (instancetype)initWithName:(NSString *)name value:(NSString *)value encoding:(MIOSKtor_httpCookieEncoding *)encoding maxAge:(MIOSInt * _Nullable)maxAge expires:(MIOSKtor_utilsGMTDate * _Nullable)expires domain:(NSString * _Nullable)domain path:(NSString * _Nullable)path secure:(BOOL)secure httpOnly:(BOOL)httpOnly extensions:(NSDictionary<NSString *, id> *)extensions __attribute__((swift_name("init(name:value:encoding:maxAge:expires:domain:path:secure:httpOnly:extensions:)"))) __attribute__((objc_designated_initializer));
@property (class, readonly, getter=companion) MIOSKtor_httpCookieCompanion *companion __attribute__((swift_name("companion")));
- (MIOSKtor_httpCookie *)doCopyName:(NSString *)name value:(NSString *)value encoding:(MIOSKtor_httpCookieEncoding *)encoding maxAge:(MIOSInt * _Nullable)maxAge expires:(MIOSKtor_utilsGMTDate * _Nullable)expires domain:(NSString * _Nullable)domain path:(NSString * _Nullable)path secure:(BOOL)secure httpOnly:(BOOL)httpOnly extensions:(NSDictionary<NSString *, id> *)extensions __attribute__((swift_name("doCopy(name:value:encoding:maxAge:expires:domain:path:secure:httpOnly:extensions:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString * _Nullable domain __attribute__((swift_name("domain")));
@property (readonly) MIOSKtor_httpCookieEncoding *encoding __attribute__((swift_name("encoding")));
@property (readonly) MIOSKtor_utilsGMTDate * _Nullable expires __attribute__((swift_name("expires")));
@property (readonly) NSDictionary<NSString *, id> *extensions __attribute__((swift_name("extensions")));
@property (readonly) BOOL httpOnly __attribute__((swift_name("httpOnly")));
@property (readonly) MIOSInt * _Nullable maxAge __attribute__((swift_name("maxAge")));
@property (readonly) NSString *name __attribute__((swift_name("name")));
@property (readonly) NSString * _Nullable path __attribute__((swift_name("path")));
@property (readonly) BOOL secure __attribute__((swift_name("secure")));
@property (readonly) NSString *value __attribute__((swift_name("value")));
@end

__attribute__((swift_name("Kotlinx_coroutines_coreDeferred")))
@protocol MIOSKotlinx_coroutines_coreDeferred <MIOSKotlinx_coroutines_coreJob>
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
- (MIOSKotlinThrowable * _Nullable)getCompletionExceptionOrNull __attribute__((swift_name("getCompletionExceptionOrNull()")));
@property (readonly) id<MIOSKotlinx_coroutines_coreSelectClause1> onAwait __attribute__((swift_name("onAwait")));
@end

__attribute__((swift_name("Kotlinx_coroutines_coreCompletableDeferred")))
@protocol MIOSKotlinx_coroutines_coreCompletableDeferred <MIOSKotlinx_coroutines_coreDeferred>
@required
- (BOOL)completeValue:(id _Nullable)value __attribute__((swift_name("complete(value:)")));
- (BOOL)completeExceptionallyException:(MIOSKotlinThrowable *)exception __attribute__((swift_name("completeExceptionally(exception:)")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable(with=NormalClass(value=io/ktor/http/UrlSerializer))
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpUrl")))
@interface MIOSKtor_httpUrl : MIOSBase <MIOSKtor_ioJvmSerializable>
@property (class, readonly, getter=companion) MIOSKtor_httpUrlCompanion *companion __attribute__((swift_name("companion")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString *encodedFragment __attribute__((swift_name("encodedFragment")));
@property (readonly) NSString * _Nullable encodedPassword __attribute__((swift_name("encodedPassword")));
@property (readonly) NSString *encodedPath __attribute__((swift_name("encodedPath")));
@property (readonly) NSString *encodedPathAndQuery __attribute__((swift_name("encodedPathAndQuery")));
@property (readonly) NSString *encodedQuery __attribute__((swift_name("encodedQuery")));
@property (readonly) NSString * _Nullable encodedUser __attribute__((swift_name("encodedUser")));
@property (readonly) NSString *fragment __attribute__((swift_name("fragment")));
@property (readonly) NSString *host __attribute__((swift_name("host")));
@property (readonly) id<MIOSKtor_httpParameters> parameters __attribute__((swift_name("parameters")));
@property (readonly) NSString * _Nullable password __attribute__((swift_name("password")));
@property (readonly) NSArray<NSString *> *pathSegments __attribute__((swift_name("pathSegments"))) __attribute__((deprecated("\n        `pathSegments` is deprecated.\n\n        This property will contain an empty path segment at the beginning for URLs with a hostname,\n        and an empty path segment at the end for the URLs with a trailing slash. If you need to keep this behaviour please\n        use [rawSegments]. If you only need to access the meaningful parts of the path, consider using [segments] instead.\n             \n        Please decide if you need [rawSegments] or [segments] explicitly.\n        ")));
@property (readonly) int32_t port __attribute__((swift_name("port")));
@property (readonly) MIOSKtor_httpURLProtocol *protocol __attribute__((swift_name("protocol")));
@property (readonly) MIOSKtor_httpURLProtocol * _Nullable protocolOrNull __attribute__((swift_name("protocolOrNull")));
@property (readonly) NSArray<NSString *> *rawSegments __attribute__((swift_name("rawSegments")));
@property (readonly) NSArray<NSString *> *segments __attribute__((swift_name("segments")));
@property (readonly) int32_t specifiedPort __attribute__((swift_name("specifiedPort")));
@property (readonly) BOOL trailingQuery __attribute__((swift_name("trailingQuery")));
@property (readonly) NSString * _Nullable user __attribute__((swift_name("user")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_utilsAttributeKey")))
@interface MIOSKtor_utilsAttributeKey<T> : MIOSBase

/**
 * @note annotations
 *   kotlin.jvm.JvmOverloads
*/
- (instancetype)initWithName:(NSString *)name type:(MIOSKtor_utilsTypeInfo *)type __attribute__((swift_name("init(name:type:)"))) __attribute__((objc_designated_initializer));
- (MIOSKtor_utilsAttributeKey<T> *)doCopyName:(NSString *)name type:(MIOSKtor_utilsTypeInfo *)type __attribute__((swift_name("doCopy(name:type:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString *name __attribute__((swift_name("name")));
@end

__attribute__((swift_name("Ktor_client_coreCookiesStorage")))
@protocol MIOSKtor_client_coreCookiesStorage <MIOSKtor_ioCloseable>
@required

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)addCookieRequestUrl:(MIOSKtor_httpUrl *)requestUrl cookie:(MIOSKtor_httpCookie *)cookie completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("addCookie(requestUrl:cookie:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)getRequestUrl:(MIOSKtor_httpUrl *)requestUrl completionHandler:(void (^)(NSArray<MIOSKtor_httpCookie *> * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("get(requestUrl:completionHandler:)")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinByteArray")))
@interface MIOSKotlinByteArray : MIOSBase
+ (instancetype)arrayWithSize:(int32_t)size __attribute__((swift_name("init(size:)")));
+ (instancetype)arrayWithSize:(int32_t)size init:(MIOSByte *(^)(MIOSInt *))init __attribute__((swift_name("init(size:init:)")));
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (int8_t)getIndex:(int32_t)index __attribute__((swift_name("get(index:)")));
- (MIOSKotlinByteIterator *)iterator __attribute__((swift_name("iterator()")));
- (void)setIndex:(int32_t)index value:(int8_t)value __attribute__((swift_name("set(index:value:)")));
@property (readonly) int32_t size __attribute__((swift_name("size")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable(with=NormalClass(value=kotlinx/serialization/json/JsonElementSerializer))
*/
__attribute__((swift_name("Kotlinx_serialization_jsonJsonElement")))
@interface MIOSKotlinx_serialization_jsonJsonElement : MIOSBase
@property (class, readonly, getter=companion) MIOSKotlinx_serialization_jsonJsonElementCompanion *companion __attribute__((swift_name("companion")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreSerializationStrategy")))
@protocol MIOSKotlinx_serialization_coreSerializationStrategy
@required
- (void)serializeEncoder:(id<MIOSKotlinx_serialization_coreEncoder>)encoder value:(id _Nullable)value __attribute__((swift_name("serialize(encoder:value:)")));
@property (readonly) id<MIOSKotlinx_serialization_coreSerialDescriptor> descriptor __attribute__((swift_name("descriptor")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreDeserializationStrategy")))
@protocol MIOSKotlinx_serialization_coreDeserializationStrategy
@required
- (id _Nullable)deserializeDecoder:(id<MIOSKotlinx_serialization_coreDecoder>)decoder __attribute__((swift_name("deserialize(decoder:)")));
@property (readonly) id<MIOSKotlinx_serialization_coreSerialDescriptor> descriptor __attribute__((swift_name("descriptor")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreKSerializer")))
@protocol MIOSKotlinx_serialization_coreKSerializer <MIOSKotlinx_serialization_coreSerializationStrategy, MIOSKotlinx_serialization_coreDeserializationStrategy>
@required
@end

__attribute__((swift_name("Ktor_client_coreHttpClientEngine")))
@protocol MIOSKtor_client_coreHttpClientEngine <MIOSKotlinx_coroutines_coreCoroutineScope, MIOSKtor_ioCloseable>
@required

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)executeData:(MIOSKtor_client_coreHttpRequestData *)data completionHandler:(void (^)(MIOSKtor_client_coreHttpResponseData * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("execute(data:completionHandler:)")));
- (void)installClient:(MIOSKtor_client_coreHttpClient *)client __attribute__((swift_name("install(client:)")));
@property (readonly) MIOSKtor_client_coreHttpClientEngineConfig *config __attribute__((swift_name("config")));
@property (readonly) MIOSKotlinx_coroutines_coreCoroutineDispatcher *dispatcher __attribute__((swift_name("dispatcher")));
@property (readonly) NSSet<id<MIOSKtor_client_coreHttpClientEngineCapability>> *supportedCapabilities __attribute__((swift_name("supportedCapabilities")));
@end

__attribute__((swift_name("Ktor_client_coreHttpClientEngineConfig")))
@interface MIOSKtor_client_coreHttpClientEngineConfig : MIOSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property MIOSKotlinx_coroutines_coreCoroutineDispatcher * _Nullable dispatcher __attribute__((swift_name("dispatcher")));
@property BOOL pipelining __attribute__((swift_name("pipelining")));
@property MIOSKtor_client_coreProxyConfig * _Nullable proxy __attribute__((swift_name("proxy")));
@property int32_t threadsCount __attribute__((swift_name("threadsCount"))) __attribute__((unavailable("The [threadsCount] property is deprecated. Consider setting [dispatcher] instead.")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_client_coreHttpClientConfig")))
@interface MIOSKtor_client_coreHttpClientConfig<T> : MIOSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (MIOSKtor_client_coreHttpClientConfig<T> *)clone __attribute__((swift_name("clone()")));
- (void)engineBlock:(void (^)(T))block __attribute__((swift_name("engine(block:)")));
- (void)installClient:(MIOSKtor_client_coreHttpClient *)client __attribute__((swift_name("install(client:)")));
- (void)installPlugin:(id<MIOSKtor_client_coreHttpClientPlugin>)plugin configure:(void (^)(id))configure __attribute__((swift_name("install(plugin:configure:)")));
- (void)installKey:(NSString *)key block:(void (^)(MIOSKtor_client_coreHttpClient *))block __attribute__((swift_name("install(key:block:)")));
- (void)plusAssignOther:(MIOSKtor_client_coreHttpClientConfig<T> *)other __attribute__((swift_name("plusAssign(other:)")));
@property BOOL developmentMode __attribute__((swift_name("developmentMode"))) __attribute__((deprecated("Development mode is no longer required. The property will be removed in the future.")));
@property BOOL expectSuccess __attribute__((swift_name("expectSuccess")));
@property BOOL followRedirects __attribute__((swift_name("followRedirects")));
@property BOOL useDefaultTransformers __attribute__((swift_name("useDefaultTransformers")));
@end

__attribute__((swift_name("Ktor_client_coreHttpClientEngineCapability")))
@protocol MIOSKtor_client_coreHttpClientEngineCapability
@required
@end

__attribute__((swift_name("Ktor_utilsAttributes")))
@protocol MIOSKtor_utilsAttributes
@required
- (id)computeIfAbsentKey:(MIOSKtor_utilsAttributeKey<id> *)key block:(id (^)(void))block __attribute__((swift_name("computeIfAbsent(key:block:)")));
- (BOOL)containsKey:(MIOSKtor_utilsAttributeKey<id> *)key __attribute__((swift_name("contains(key:)")));
- (id)getKey_:(MIOSKtor_utilsAttributeKey<id> *)key __attribute__((swift_name("get(key_:)")));
- (id _Nullable)getOrNullKey:(MIOSKtor_utilsAttributeKey<id> *)key __attribute__((swift_name("getOrNull(key:)")));
- (void)putKey:(MIOSKtor_utilsAttributeKey<id> *)key value:(id)value __attribute__((swift_name("put(key:value:)")));
- (void)removeKey:(MIOSKtor_utilsAttributeKey<id> *)key __attribute__((swift_name("remove(key:)")));
- (void)setKey:(MIOSKtor_utilsAttributeKey<id> *)key value:(id)value __attribute__((swift_name("set(key:value:)")));
- (id)takeKey:(MIOSKtor_utilsAttributeKey<id> *)key __attribute__((swift_name("take(key:)")));
- (id _Nullable)takeOrNullKey:(MIOSKtor_utilsAttributeKey<id> *)key __attribute__((swift_name("takeOrNull(key:)")));
@property (readonly) NSArray<MIOSKtor_utilsAttributeKey<id> *> *allKeys __attribute__((swift_name("allKeys")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_eventsEvents")))
@interface MIOSKtor_eventsEvents : MIOSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (void)raiseDefinition:(MIOSKtor_eventsEventDefinition<id> *)definition value:(id _Nullable)value __attribute__((swift_name("raise(definition:value:)")));
- (id<MIOSKotlinx_coroutines_coreDisposableHandle>)subscribeDefinition:(MIOSKtor_eventsEventDefinition<id> *)definition handler:(void (^)(id _Nullable))handler __attribute__((swift_name("subscribe(definition:handler:)")));
- (void)unsubscribeDefinition:(MIOSKtor_eventsEventDefinition<id> *)definition handler:(void (^)(id _Nullable))handler __attribute__((swift_name("unsubscribe(definition:handler:)")));
@end

__attribute__((swift_name("Ktor_utilsPipeline")))
@interface MIOSKtor_utilsPipeline<TSubject, TContext> : MIOSBase
- (instancetype)initWithPhases:(MIOSKotlinArray<MIOSKtor_utilsPipelinePhase *> *)phases __attribute__((swift_name("init(phases:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithPhase:(MIOSKtor_utilsPipelinePhase *)phase interceptors:(NSArray<id<MIOSKotlinSuspendFunction2>> *)interceptors __attribute__((swift_name("init(phase:interceptors:)"))) __attribute__((objc_designated_initializer));
- (void)addPhasePhase:(MIOSKtor_utilsPipelinePhase *)phase __attribute__((swift_name("addPhase(phase:)")));
- (void)afterIntercepted __attribute__((swift_name("afterIntercepted()")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)executeContext:(TContext)context subject:(TSubject)subject completionHandler:(void (^)(TSubject _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("execute(context:subject:completionHandler:)")));
- (void)insertPhaseAfterReference:(MIOSKtor_utilsPipelinePhase *)reference phase:(MIOSKtor_utilsPipelinePhase *)phase __attribute__((swift_name("insertPhaseAfter(reference:phase:)")));
- (void)insertPhaseBeforeReference:(MIOSKtor_utilsPipelinePhase *)reference phase:(MIOSKtor_utilsPipelinePhase *)phase __attribute__((swift_name("insertPhaseBefore(reference:phase:)")));
- (void)interceptPhase:(MIOSKtor_utilsPipelinePhase *)phase block:(id<MIOSKotlinSuspendFunction2>)block __attribute__((swift_name("intercept(phase:block:)")));
- (NSArray<id<MIOSKotlinSuspendFunction2>> *)interceptorsForPhasePhase:(MIOSKtor_utilsPipelinePhase *)phase __attribute__((swift_name("interceptorsForPhase(phase:)")));
- (void)mergeFrom:(MIOSKtor_utilsPipeline<TSubject, TContext> *)from __attribute__((swift_name("merge(from:)")));
- (void)mergePhasesFrom:(MIOSKtor_utilsPipeline<TSubject, TContext> *)from __attribute__((swift_name("mergePhases(from:)")));
- (void)resetFromFrom:(MIOSKtor_utilsPipeline<TSubject, TContext> *)from __attribute__((swift_name("resetFrom(from:)")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) id<MIOSKtor_utilsAttributes> attributes __attribute__((swift_name("attributes")));
@property (readonly) BOOL developmentMode __attribute__((swift_name("developmentMode")));
@property (readonly) BOOL isEmpty __attribute__((swift_name("isEmpty")));
@property (readonly) NSArray<MIOSKtor_utilsPipelinePhase *> *items __attribute__((swift_name("items")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_client_coreHttpReceivePipeline")))
@interface MIOSKtor_client_coreHttpReceivePipeline : MIOSKtor_utilsPipeline<MIOSKtor_client_coreHttpResponse *, MIOSKotlinUnit *>
- (instancetype)initWithDevelopmentMode:(BOOL)developmentMode __attribute__((swift_name("init(developmentMode:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithPhases:(MIOSKotlinArray<MIOSKtor_utilsPipelinePhase *> *)phases __attribute__((swift_name("init(phases:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithPhase:(MIOSKtor_utilsPipelinePhase *)phase interceptors:(NSArray<id<MIOSKotlinSuspendFunction2>> *)interceptors __attribute__((swift_name("init(phase:interceptors:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly, getter=companion) MIOSKtor_client_coreHttpReceivePipelinePhases *companion __attribute__((swift_name("companion")));
@property (readonly) BOOL developmentMode __attribute__((swift_name("developmentMode")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_client_coreHttpRequestPipeline")))
@interface MIOSKtor_client_coreHttpRequestPipeline : MIOSKtor_utilsPipeline<id, MIOSKtor_client_coreHttpRequestBuilder *>
- (instancetype)initWithDevelopmentMode:(BOOL)developmentMode __attribute__((swift_name("init(developmentMode:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithPhases:(MIOSKotlinArray<MIOSKtor_utilsPipelinePhase *> *)phases __attribute__((swift_name("init(phases:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithPhase:(MIOSKtor_utilsPipelinePhase *)phase interceptors:(NSArray<id<MIOSKotlinSuspendFunction2>> *)interceptors __attribute__((swift_name("init(phase:interceptors:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly, getter=companion) MIOSKtor_client_coreHttpRequestPipelinePhases *companion __attribute__((swift_name("companion")));
@property (readonly) BOOL developmentMode __attribute__((swift_name("developmentMode")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_client_coreHttpResponsePipeline")))
@interface MIOSKtor_client_coreHttpResponsePipeline : MIOSKtor_utilsPipeline<MIOSKtor_client_coreHttpResponseContainer *, MIOSKtor_client_coreHttpClientCall *>
- (instancetype)initWithDevelopmentMode:(BOOL)developmentMode __attribute__((swift_name("init(developmentMode:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithPhases:(MIOSKotlinArray<MIOSKtor_utilsPipelinePhase *> *)phases __attribute__((swift_name("init(phases:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithPhase:(MIOSKtor_utilsPipelinePhase *)phase interceptors:(NSArray<id<MIOSKotlinSuspendFunction2>> *)interceptors __attribute__((swift_name("init(phase:interceptors:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly, getter=companion) MIOSKtor_client_coreHttpResponsePipelinePhases *companion __attribute__((swift_name("companion")));
@property (readonly) BOOL developmentMode __attribute__((swift_name("developmentMode")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_client_coreHttpSendPipeline")))
@interface MIOSKtor_client_coreHttpSendPipeline : MIOSKtor_utilsPipeline<id, MIOSKtor_client_coreHttpRequestBuilder *>
- (instancetype)initWithDevelopmentMode:(BOOL)developmentMode __attribute__((swift_name("init(developmentMode:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithPhases:(MIOSKotlinArray<MIOSKtor_utilsPipelinePhase *> *)phases __attribute__((swift_name("init(phases:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (instancetype)initWithPhase:(MIOSKtor_utilsPipelinePhase *)phase interceptors:(NSArray<id<MIOSKotlinSuspendFunction2>> *)interceptors __attribute__((swift_name("init(phase:interceptors:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly, getter=companion) MIOSKtor_client_coreHttpSendPipelinePhases *companion __attribute__((swift_name("companion")));
@property (readonly) BOOL developmentMode __attribute__((swift_name("developmentMode")));
@end

__attribute__((swift_name("Ktor_client_coreClientPlugin")))
@protocol MIOSKtor_client_coreClientPlugin <MIOSKtor_client_coreHttpClientPlugin>
@required
@end

__attribute__((swift_name("Kotlinx_coroutines_coreDisposableHandle")))
@protocol MIOSKotlinx_coroutines_coreDisposableHandle
@required
- (void)dispose __attribute__((swift_name("dispose()")));
@end


/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
__attribute__((swift_name("Kotlinx_coroutines_coreChildHandle")))
@protocol MIOSKotlinx_coroutines_coreChildHandle <MIOSKotlinx_coroutines_coreDisposableHandle>
@required

/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
- (BOOL)childCancelledCause:(MIOSKotlinThrowable *)cause __attribute__((swift_name("childCancelled(cause:)")));

/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
@property (readonly, getter=parent_) id<MIOSKotlinx_coroutines_coreJob> _Nullable parent __attribute__((swift_name("parent")));
@end


/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
__attribute__((swift_name("Kotlinx_coroutines_coreChildJob")))
@protocol MIOSKotlinx_coroutines_coreChildJob <MIOSKotlinx_coroutines_coreJob>
@required

/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
- (void)parentCancelledParentJob:(id<MIOSKotlinx_coroutines_coreParentJob>)parentJob __attribute__((swift_name("parentCancelled(parentJob:)")));
@end

__attribute__((swift_name("KotlinSequence")))
@protocol MIOSKotlinSequence
@required
- (id<MIOSKotlinIterator>)iterator __attribute__((swift_name("iterator()")));
@end


/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
__attribute__((swift_name("Kotlinx_coroutines_coreSelectClause")))
@protocol MIOSKotlinx_coroutines_coreSelectClause
@required
@property (readonly) id clauseObject __attribute__((swift_name("clauseObject")));
@property (readonly) MIOSKotlinUnit *(^(^ _Nullable onCancellationConstructor)(id<MIOSKotlinx_coroutines_coreSelectInstance>, id _Nullable, id _Nullable))(MIOSKotlinThrowable *, id _Nullable, id<MIOSKotlinCoroutineContext>) __attribute__((swift_name("onCancellationConstructor")));
@property (readonly) id _Nullable (^processResFunc)(id, id _Nullable, id _Nullable) __attribute__((swift_name("processResFunc")));
@property (readonly) void (^regFunc)(id, id<MIOSKotlinx_coroutines_coreSelectInstance>, id _Nullable) __attribute__((swift_name("regFunc")));
@end

__attribute__((swift_name("Kotlinx_coroutines_coreSelectClause0")))
@protocol MIOSKotlinx_coroutines_coreSelectClause0 <MIOSKotlinx_coroutines_coreSelectClause>
@required
@end

__attribute__((swift_name("KotlinCoroutineContextKey")))
@protocol MIOSKotlinCoroutineContextKey
@required
@end

__attribute__((swift_name("Kotlinx_coroutines_coreFlowCollector")))
@protocol MIOSKotlinx_coroutines_coreFlowCollector
@required

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)emitValue:(id _Nullable)value completionHandler:(void (^)(NSError * _Nullable))completionHandler __attribute__((swift_name("emit(value:completionHandler:)")));
@end

__attribute__((swift_name("KotlinIterator")))
@protocol MIOSKotlinIterator
@required
- (BOOL)hasNext __attribute__((swift_name("hasNext()")));
- (id _Nullable)next __attribute__((swift_name("next()")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpCookieEncoding")))
@interface MIOSKtor_httpCookieEncoding : MIOSKotlinEnum<MIOSKtor_httpCookieEncoding *>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly) MIOSKtor_httpCookieEncoding *raw __attribute__((swift_name("raw")));
@property (class, readonly) MIOSKtor_httpCookieEncoding *dquotes __attribute__((swift_name("dquotes")));
@property (class, readonly) MIOSKtor_httpCookieEncoding *uriEncoding __attribute__((swift_name("uriEncoding")));
@property (class, readonly) MIOSKtor_httpCookieEncoding *base64Encoding __attribute__((swift_name("base64Encoding")));
+ (MIOSKotlinArray<MIOSKtor_httpCookieEncoding *> *)values __attribute__((swift_name("values()")));
@property (class, readonly) NSArray<MIOSKtor_httpCookieEncoding *> *entries __attribute__((swift_name("entries")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.Serializable
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_utilsGMTDate")))
@interface MIOSKtor_utilsGMTDate : MIOSBase <MIOSKotlinComparable>
- (instancetype)initWithSeconds:(int32_t)seconds minutes:(int32_t)minutes hours:(int32_t)hours dayOfWeek:(MIOSKtor_utilsWeekDay *)dayOfWeek dayOfMonth:(int32_t)dayOfMonth dayOfYear:(int32_t)dayOfYear month:(MIOSKtor_utilsMonth *)month year:(int32_t)year timestamp:(int64_t)timestamp __attribute__((swift_name("init(seconds:minutes:hours:dayOfWeek:dayOfMonth:dayOfYear:month:year:timestamp:)"))) __attribute__((objc_designated_initializer));
@property (class, readonly, getter=companion) MIOSKtor_utilsGMTDateCompanion *companion __attribute__((swift_name("companion")));
- (int32_t)compareToOther:(MIOSKtor_utilsGMTDate *)other __attribute__((swift_name("compareTo(other:)")));
- (MIOSKtor_utilsGMTDate *)doCopy __attribute__((swift_name("doCopy()")));
- (MIOSKtor_utilsGMTDate *)doCopySeconds:(int32_t)seconds minutes:(int32_t)minutes hours:(int32_t)hours dayOfWeek:(MIOSKtor_utilsWeekDay *)dayOfWeek dayOfMonth:(int32_t)dayOfMonth dayOfYear:(int32_t)dayOfYear month:(MIOSKtor_utilsMonth *)month year:(int32_t)year timestamp:(int64_t)timestamp __attribute__((swift_name("doCopy(seconds:minutes:hours:dayOfWeek:dayOfMonth:dayOfYear:month:year:timestamp:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) int32_t dayOfMonth __attribute__((swift_name("dayOfMonth")));
@property (readonly) MIOSKtor_utilsWeekDay *dayOfWeek __attribute__((swift_name("dayOfWeek")));
@property (readonly) int32_t dayOfYear __attribute__((swift_name("dayOfYear")));
@property (readonly) int32_t hours __attribute__((swift_name("hours")));
@property (readonly) int32_t minutes __attribute__((swift_name("minutes")));
@property (readonly) MIOSKtor_utilsMonth *month __attribute__((swift_name("month")));
@property (readonly) int32_t seconds __attribute__((swift_name("seconds")));
@property (readonly) int64_t timestamp __attribute__((swift_name("timestamp")));
@property (readonly) int32_t year __attribute__((swift_name("year")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpCookie.Companion")))
@interface MIOSKtor_httpCookieCompanion : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKtor_httpCookieCompanion *shared __attribute__((swift_name("shared")));
- (id<MIOSKotlinx_serialization_coreKSerializer>)serializer __attribute__((swift_name("serializer()")));
@end

__attribute__((swift_name("Kotlinx_coroutines_coreSelectClause1")))
@protocol MIOSKotlinx_coroutines_coreSelectClause1 <MIOSKotlinx_coroutines_coreSelectClause>
@required
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpUrl.Companion")))
@interface MIOSKtor_httpUrlCompanion : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKtor_httpUrlCompanion *shared __attribute__((swift_name("shared")));
- (id<MIOSKotlinx_serialization_coreKSerializer>)serializer __attribute__((swift_name("serializer()")));
@end

__attribute__((swift_name("Ktor_utilsStringValues")))
@protocol MIOSKtor_utilsStringValues
@required
- (BOOL)containsName:(NSString *)name __attribute__((swift_name("contains(name:)")));
- (BOOL)containsName:(NSString *)name value:(NSString *)value __attribute__((swift_name("contains(name:value:)")));
- (NSSet<id<MIOSKotlinMapEntry>> *)entries __attribute__((swift_name("entries()")));
- (void)forEachBody:(void (^)(NSString *, NSArray<NSString *> *))body __attribute__((swift_name("forEach(body:)")));
- (NSString * _Nullable)getName:(NSString *)name __attribute__((swift_name("get(name:)")));
- (NSArray<NSString *> * _Nullable)getAllName:(NSString *)name __attribute__((swift_name("getAll(name:)")));
- (BOOL)isEmpty_ __attribute__((swift_name("isEmpty()")));
- (NSSet<NSString *> *)names __attribute__((swift_name("names()")));
@property (readonly) BOOL caseInsensitiveName __attribute__((swift_name("caseInsensitiveName")));
@end

__attribute__((swift_name("Ktor_httpParameters")))
@protocol MIOSKtor_httpParameters <MIOSKtor_utilsStringValues>
@required
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpURLProtocol")))
@interface MIOSKtor_httpURLProtocol : MIOSBase <MIOSKtor_ioJvmSerializable>
- (instancetype)initWithName:(NSString *)name defaultPort:(int32_t)defaultPort __attribute__((swift_name("init(name:defaultPort:)"))) __attribute__((objc_designated_initializer));
@property (class, readonly, getter=companion) MIOSKtor_httpURLProtocolCompanion *companion __attribute__((swift_name("companion")));
- (MIOSKtor_httpURLProtocol *)doCopyName:(NSString *)name defaultPort:(int32_t)defaultPort __attribute__((swift_name("doCopy(name:defaultPort:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) int32_t defaultPort __attribute__((swift_name("defaultPort")));
@property (readonly) NSString *name __attribute__((swift_name("name")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_utilsTypeInfo")))
@interface MIOSKtor_utilsTypeInfo : MIOSBase
- (instancetype)initWithType:(id<MIOSKotlinKClass>)type kotlinType:(id<MIOSKotlinKType> _Nullable)kotlinType __attribute__((swift_name("init(type:kotlinType:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithType:(id<MIOSKotlinKClass>)type reifiedType:(id<MIOSKotlinKType>)reifiedType kotlinType:(id<MIOSKotlinKType> _Nullable)kotlinType __attribute__((swift_name("init(type:reifiedType:kotlinType:)"))) __attribute__((objc_designated_initializer)) __attribute__((deprecated("Use constructor without reifiedType parameter.")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) id<MIOSKotlinKType> _Nullable kotlinType __attribute__((swift_name("kotlinType")));
@property (readonly) id<MIOSKotlinKClass> type __attribute__((swift_name("type")));
@end

__attribute__((swift_name("KotlinByteIterator")))
@interface MIOSKotlinByteIterator : MIOSBase <MIOSKotlinIterator>
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (MIOSByte *)next __attribute__((swift_name("next()")));
- (int8_t)nextByte __attribute__((swift_name("nextByte()")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Kotlinx_serialization_jsonJsonElement.Companion")))
@interface MIOSKotlinx_serialization_jsonJsonElementCompanion : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKotlinx_serialization_jsonJsonElementCompanion *shared __attribute__((swift_name("shared")));
- (id<MIOSKotlinx_serialization_coreKSerializer>)serializer __attribute__((swift_name("serializer()")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreEncoder")))
@protocol MIOSKotlinx_serialization_coreEncoder
@required
- (id<MIOSKotlinx_serialization_coreCompositeEncoder>)beginCollectionDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor collectionSize:(int32_t)collectionSize __attribute__((swift_name("beginCollection(descriptor:collectionSize:)")));
- (id<MIOSKotlinx_serialization_coreCompositeEncoder>)beginStructureDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("beginStructure(descriptor:)")));
- (void)encodeBooleanValue:(BOOL)value __attribute__((swift_name("encodeBoolean(value:)")));
- (void)encodeByteValue:(int8_t)value __attribute__((swift_name("encodeByte(value:)")));
- (void)encodeCharValue:(unichar)value __attribute__((swift_name("encodeChar(value:)")));
- (void)encodeDoubleValue:(double)value __attribute__((swift_name("encodeDouble(value:)")));
- (void)encodeEnumEnumDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)enumDescriptor index:(int32_t)index __attribute__((swift_name("encodeEnum(enumDescriptor:index:)")));
- (void)encodeFloatValue:(float)value __attribute__((swift_name("encodeFloat(value:)")));
- (id<MIOSKotlinx_serialization_coreEncoder>)encodeInlineDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("encodeInline(descriptor:)")));
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
- (void)encodeNullableSerializableValueSerializer:(id<MIOSKotlinx_serialization_coreSerializationStrategy>)serializer value:(id _Nullable)value __attribute__((swift_name("encodeNullableSerializableValue(serializer:value:)")));
- (void)encodeSerializableValueSerializer:(id<MIOSKotlinx_serialization_coreSerializationStrategy>)serializer value:(id _Nullable)value __attribute__((swift_name("encodeSerializableValue(serializer:value:)")));
- (void)encodeShortValue:(int16_t)value __attribute__((swift_name("encodeShort(value:)")));
- (void)encodeStringValue:(NSString *)value __attribute__((swift_name("encodeString(value:)")));
@property (readonly) MIOSKotlinx_serialization_coreSerializersModule *serializersModule __attribute__((swift_name("serializersModule")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreSerialDescriptor")))
@protocol MIOSKotlinx_serialization_coreSerialDescriptor
@required
- (NSArray<id<MIOSKotlinAnnotation>> *)getElementAnnotationsIndex:(int32_t)index __attribute__((swift_name("getElementAnnotations(index:)")));
- (id<MIOSKotlinx_serialization_coreSerialDescriptor>)getElementDescriptorIndex:(int32_t)index __attribute__((swift_name("getElementDescriptor(index:)")));
- (int32_t)getElementIndexName:(NSString *)name __attribute__((swift_name("getElementIndex(name:)")));
- (NSString *)getElementNameIndex:(int32_t)index __attribute__((swift_name("getElementName(index:)")));
- (BOOL)isElementOptionalIndex:(int32_t)index __attribute__((swift_name("isElementOptional(index:)")));
@property (readonly) NSArray<id<MIOSKotlinAnnotation>> *annotations __attribute__((swift_name("annotations")));
@property (readonly) int32_t elementsCount __attribute__((swift_name("elementsCount")));
@property (readonly) BOOL isInline __attribute__((swift_name("isInline")));
@property (readonly) BOOL isNullable __attribute__((swift_name("isNullable")));
@property (readonly) MIOSKotlinx_serialization_coreSerialKind *kind __attribute__((swift_name("kind")));
@property (readonly) NSString *serialName __attribute__((swift_name("serialName")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreDecoder")))
@protocol MIOSKotlinx_serialization_coreDecoder
@required
- (id<MIOSKotlinx_serialization_coreCompositeDecoder>)beginStructureDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("beginStructure(descriptor:)")));
- (BOOL)decodeBoolean __attribute__((swift_name("decodeBoolean()")));
- (int8_t)decodeByte __attribute__((swift_name("decodeByte()")));
- (unichar)decodeChar __attribute__((swift_name("decodeChar()")));
- (double)decodeDouble __attribute__((swift_name("decodeDouble()")));
- (int32_t)decodeEnumEnumDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)enumDescriptor __attribute__((swift_name("decodeEnum(enumDescriptor:)")));
- (float)decodeFloat __attribute__((swift_name("decodeFloat()")));
- (id<MIOSKotlinx_serialization_coreDecoder>)decodeInlineDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("decodeInline(descriptor:)")));
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
- (MIOSKotlinNothing * _Nullable)decodeNull __attribute__((swift_name("decodeNull()")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (id _Nullable)decodeNullableSerializableValueDeserializer:(id<MIOSKotlinx_serialization_coreDeserializationStrategy>)deserializer __attribute__((swift_name("decodeNullableSerializableValue(deserializer:)")));
- (id _Nullable)decodeSerializableValueDeserializer:(id<MIOSKotlinx_serialization_coreDeserializationStrategy>)deserializer __attribute__((swift_name("decodeSerializableValue(deserializer:)")));
- (int16_t)decodeShort __attribute__((swift_name("decodeShort()")));
- (NSString *)decodeString __attribute__((swift_name("decodeString()")));
@property (readonly) MIOSKotlinx_serialization_coreSerializersModule *serializersModule __attribute__((swift_name("serializersModule")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_client_coreHttpRequestData")))
@interface MIOSKtor_client_coreHttpRequestData : MIOSBase
- (instancetype)initWithUrl:(MIOSKtor_httpUrl *)url method:(MIOSKtor_httpHttpMethod *)method headers:(id<MIOSKtor_httpHeaders>)headers body:(MIOSKtor_httpOutgoingContent *)body executionContext:(id<MIOSKotlinx_coroutines_coreJob>)executionContext attributes:(id<MIOSKtor_utilsAttributes>)attributes __attribute__((swift_name("init(url:method:headers:body:executionContext:attributes:)"))) __attribute__((objc_designated_initializer));
- (id _Nullable)getCapabilityOrNullKey:(id<MIOSKtor_client_coreHttpClientEngineCapability>)key __attribute__((swift_name("getCapabilityOrNull(key:)")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) id<MIOSKtor_utilsAttributes> attributes __attribute__((swift_name("attributes")));
@property (readonly) MIOSKtor_httpOutgoingContent *body __attribute__((swift_name("body")));
@property (readonly) id<MIOSKotlinx_coroutines_coreJob> executionContext __attribute__((swift_name("executionContext")));
@property (readonly) id<MIOSKtor_httpHeaders> headers __attribute__((swift_name("headers")));
@property (readonly) MIOSKtor_httpHttpMethod *method __attribute__((swift_name("method")));
@property (readonly) MIOSKtor_httpUrl *url __attribute__((swift_name("url")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_client_coreHttpResponseData")))
@interface MIOSKtor_client_coreHttpResponseData : MIOSBase
- (instancetype)initWithStatusCode:(MIOSKtor_httpHttpStatusCode *)statusCode requestTime:(MIOSKtor_utilsGMTDate *)requestTime headers:(id<MIOSKtor_httpHeaders>)headers version:(MIOSKtor_httpHttpProtocolVersion *)version body:(id)body callContext:(id<MIOSKotlinCoroutineContext>)callContext __attribute__((swift_name("init(statusCode:requestTime:headers:version:body:callContext:)"))) __attribute__((objc_designated_initializer));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) id body __attribute__((swift_name("body")));
@property (readonly) id<MIOSKotlinCoroutineContext> callContext __attribute__((swift_name("callContext")));
@property (readonly) id<MIOSKtor_httpHeaders> headers __attribute__((swift_name("headers")));
@property (readonly) MIOSKtor_utilsGMTDate *requestTime __attribute__((swift_name("requestTime")));
@property (readonly) MIOSKtor_utilsGMTDate *responseTime __attribute__((swift_name("responseTime")));
@property (readonly) MIOSKtor_httpHttpStatusCode *statusCode __attribute__((swift_name("statusCode")));
@property (readonly) MIOSKtor_httpHttpProtocolVersion *version __attribute__((swift_name("version")));
@end


/**
 * @note annotations
 *   kotlin.SinceKotlin(version="1.3")
*/
__attribute__((swift_name("KotlinAbstractCoroutineContextElement")))
@interface MIOSKotlinAbstractCoroutineContextElement : MIOSBase <MIOSKotlinCoroutineContextElement>
- (instancetype)initWithKey:(id<MIOSKotlinCoroutineContextKey>)key __attribute__((swift_name("init(key:)"))) __attribute__((objc_designated_initializer));
@property (readonly) id<MIOSKotlinCoroutineContextKey> key __attribute__((swift_name("key")));
@end


/**
 * @note annotations
 *   kotlin.SinceKotlin(version="1.3")
*/
__attribute__((swift_name("KotlinContinuationInterceptor")))
@protocol MIOSKotlinContinuationInterceptor <MIOSKotlinCoroutineContextElement>
@required
- (id<MIOSKotlinContinuation>)interceptContinuationContinuation:(id<MIOSKotlinContinuation>)continuation __attribute__((swift_name("interceptContinuation(continuation:)")));
- (void)releaseInterceptedContinuationContinuation:(id<MIOSKotlinContinuation>)continuation __attribute__((swift_name("releaseInterceptedContinuation(continuation:)")));
@end

__attribute__((swift_name("Kotlinx_coroutines_coreCoroutineDispatcher")))
@interface MIOSKotlinx_coroutines_coreCoroutineDispatcher : MIOSKotlinAbstractCoroutineContextElement <MIOSKotlinContinuationInterceptor>
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithKey:(id<MIOSKotlinCoroutineContextKey>)key __attribute__((swift_name("init(key:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly, getter=companion) MIOSKotlinx_coroutines_coreCoroutineDispatcherKey *companion __attribute__((swift_name("companion")));
- (void)dispatchContext:(id<MIOSKotlinCoroutineContext>)context block:(id<MIOSKotlinx_coroutines_coreRunnable>)block __attribute__((swift_name("dispatch(context:block:)")));

/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
- (void)dispatchYieldContext:(id<MIOSKotlinCoroutineContext>)context block:(id<MIOSKotlinx_coroutines_coreRunnable>)block __attribute__((swift_name("dispatchYield(context:block:)")));
- (id<MIOSKotlinContinuation>)interceptContinuationContinuation:(id<MIOSKotlinContinuation>)continuation __attribute__((swift_name("interceptContinuation(continuation:)")));
- (BOOL)isDispatchNeededContext:(id<MIOSKotlinCoroutineContext>)context __attribute__((swift_name("isDispatchNeeded(context:)")));
- (MIOSKotlinx_coroutines_coreCoroutineDispatcher *)limitedParallelismParallelism:(int32_t)parallelism name:(NSString * _Nullable)name __attribute__((swift_name("limitedParallelism(parallelism:name:)")));
- (MIOSKotlinx_coroutines_coreCoroutineDispatcher *)plusOther_:(MIOSKotlinx_coroutines_coreCoroutineDispatcher *)other __attribute__((swift_name("plus(other_:)"))) __attribute__((unavailable("Operator '+' on two CoroutineDispatcher objects is meaningless. CoroutineDispatcher is a coroutine context element and `+` is a set-sum operator for coroutine contexts. The dispatcher to the right of `+` just replaces the dispatcher to the left.")));
- (void)releaseInterceptedContinuationContinuation:(id<MIOSKotlinContinuation>)continuation __attribute__((swift_name("releaseInterceptedContinuation(continuation:)")));
- (NSString *)description __attribute__((swift_name("description()")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_client_coreProxyConfig")))
@interface MIOSKtor_client_coreProxyConfig : MIOSBase
- (instancetype)initWithUrl:(MIOSKtor_httpUrl *)url __attribute__((swift_name("init(url:)"))) __attribute__((objc_designated_initializer));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) MIOSKtor_httpUrl *url __attribute__((swift_name("url")));
@end

__attribute__((swift_name("Ktor_eventsEventDefinition")))
@interface MIOSKtor_eventsEventDefinition<T> : MIOSBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_utilsPipelinePhase")))
@interface MIOSKtor_utilsPipelinePhase : MIOSBase
- (instancetype)initWithName:(NSString *)name __attribute__((swift_name("init(name:)"))) __attribute__((objc_designated_initializer));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString *name __attribute__((swift_name("name")));
@end

__attribute__((swift_name("KotlinSuspendFunction2")))
@protocol MIOSKotlinSuspendFunction2 <MIOSKotlinFunction>
@required

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)invokeP1:(id _Nullable)p1 p2:(id _Nullable)p2 completionHandler:(void (^)(id _Nullable_result, NSError * _Nullable))completionHandler __attribute__((swift_name("invoke(p1:p2:completionHandler:)")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_client_coreHttpReceivePipeline.Phases")))
@interface MIOSKtor_client_coreHttpReceivePipelinePhases : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)phases __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKtor_client_coreHttpReceivePipelinePhases *shared __attribute__((swift_name("shared")));
@property (readonly) MIOSKtor_utilsPipelinePhase *After __attribute__((swift_name("After")));
@property (readonly) MIOSKtor_utilsPipelinePhase *Before __attribute__((swift_name("Before")));
@property (readonly) MIOSKtor_utilsPipelinePhase *State __attribute__((swift_name("State")));
@end

__attribute__((swift_name("Ktor_httpHttpMessage")))
@protocol MIOSKtor_httpHttpMessage
@required
@property (readonly) id<MIOSKtor_httpHeaders> headers __attribute__((swift_name("headers")));
@end

__attribute__((swift_name("Ktor_client_coreHttpResponse")))
@interface MIOSKtor_client_coreHttpResponse : MIOSBase <MIOSKtor_httpHttpMessage, MIOSKotlinx_coroutines_coreCoroutineScope>
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) MIOSKtor_client_coreHttpClientCall *call __attribute__((swift_name("call")));
@property (readonly) id<MIOSKtor_ioByteReadChannel> rawContent __attribute__((swift_name("rawContent")));
@property (readonly) MIOSKtor_utilsGMTDate *requestTime __attribute__((swift_name("requestTime")));
@property (readonly) MIOSKtor_utilsGMTDate *responseTime __attribute__((swift_name("responseTime")));
@property (readonly) MIOSKtor_httpHttpStatusCode *status __attribute__((swift_name("status")));
@property (readonly) MIOSKtor_httpHttpProtocolVersion *version __attribute__((swift_name("version")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinUnit")))
@interface MIOSKotlinUnit : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)unit __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKotlinUnit *shared __attribute__((swift_name("shared")));
- (NSString *)description __attribute__((swift_name("description()")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_client_coreHttpRequestPipeline.Phases")))
@interface MIOSKtor_client_coreHttpRequestPipelinePhases : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)phases __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKtor_client_coreHttpRequestPipelinePhases *shared __attribute__((swift_name("shared")));
@property (readonly) MIOSKtor_utilsPipelinePhase *Before __attribute__((swift_name("Before")));
@property (readonly) MIOSKtor_utilsPipelinePhase *Render __attribute__((swift_name("Render")));
@property (readonly) MIOSKtor_utilsPipelinePhase *Send __attribute__((swift_name("Send")));
@property (readonly) MIOSKtor_utilsPipelinePhase *State __attribute__((swift_name("State")));
@property (readonly) MIOSKtor_utilsPipelinePhase *Transform __attribute__((swift_name("Transform")));
@end

__attribute__((swift_name("Ktor_httpHttpMessageBuilder")))
@protocol MIOSKtor_httpHttpMessageBuilder
@required
@property (readonly) MIOSKtor_httpHeadersBuilder *headers __attribute__((swift_name("headers")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_client_coreHttpRequestBuilder")))
@interface MIOSKtor_client_coreHttpRequestBuilder : MIOSBase <MIOSKtor_httpHttpMessageBuilder>
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
@property (class, readonly, getter=companion) MIOSKtor_client_coreHttpRequestBuilderCompanion *companion __attribute__((swift_name("companion")));
- (MIOSKtor_client_coreHttpRequestData *)build __attribute__((swift_name("build()")));
- (id _Nullable)getCapabilityOrNullKey:(id<MIOSKtor_client_coreHttpClientEngineCapability>)key __attribute__((swift_name("getCapabilityOrNull(key:)")));
- (void)setAttributesBlock:(void (^)(id<MIOSKtor_utilsAttributes>))block __attribute__((swift_name("setAttributes(block:)")));
- (void)setCapabilityKey:(id<MIOSKtor_client_coreHttpClientEngineCapability>)key capability:(id)capability __attribute__((swift_name("setCapability(key:capability:)")));
- (MIOSKtor_client_coreHttpRequestBuilder *)takeFromBuilder:(MIOSKtor_client_coreHttpRequestBuilder *)builder __attribute__((swift_name("takeFrom(builder:)")));
- (MIOSKtor_client_coreHttpRequestBuilder *)takeFromWithExecutionContextBuilder:(MIOSKtor_client_coreHttpRequestBuilder *)builder __attribute__((swift_name("takeFromWithExecutionContext(builder:)")));
- (void)urlBlock:(void (^)(MIOSKtor_httpURLBuilder *, MIOSKtor_httpURLBuilder *))block __attribute__((swift_name("url(block:)")));
@property (readonly) id<MIOSKtor_utilsAttributes> attributes __attribute__((swift_name("attributes")));
@property id body __attribute__((swift_name("body")));
@property MIOSKtor_utilsTypeInfo * _Nullable bodyType __attribute__((swift_name("bodyType")));
@property (readonly) id<MIOSKotlinx_coroutines_coreJob> executionContext __attribute__((swift_name("executionContext")));
@property (readonly) MIOSKtor_httpHeadersBuilder *headers __attribute__((swift_name("headers")));
@property MIOSKtor_httpHttpMethod *method __attribute__((swift_name("method")));
@property (readonly) MIOSKtor_httpURLBuilder *url __attribute__((swift_name("url")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_client_coreHttpResponsePipeline.Phases")))
@interface MIOSKtor_client_coreHttpResponsePipelinePhases : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)phases __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKtor_client_coreHttpResponsePipelinePhases *shared __attribute__((swift_name("shared")));
@property (readonly) MIOSKtor_utilsPipelinePhase *After __attribute__((swift_name("After")));
@property (readonly) MIOSKtor_utilsPipelinePhase *Parse __attribute__((swift_name("Parse")));
@property (readonly) MIOSKtor_utilsPipelinePhase *Receive __attribute__((swift_name("Receive")));
@property (readonly) MIOSKtor_utilsPipelinePhase *State __attribute__((swift_name("State")));
@property (readonly) MIOSKtor_utilsPipelinePhase *Transform __attribute__((swift_name("Transform")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_client_coreHttpResponseContainer")))
@interface MIOSKtor_client_coreHttpResponseContainer : MIOSBase
- (instancetype)initWithExpectedType:(MIOSKtor_utilsTypeInfo *)expectedType response:(id)response __attribute__((swift_name("init(expectedType:response:)"))) __attribute__((objc_designated_initializer));
- (MIOSKtor_client_coreHttpResponseContainer *)doCopyExpectedType:(MIOSKtor_utilsTypeInfo *)expectedType response:(id)response __attribute__((swift_name("doCopy(expectedType:response:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) MIOSKtor_utilsTypeInfo *expectedType __attribute__((swift_name("expectedType")));
@property (readonly) id response __attribute__((swift_name("response")));
@end

__attribute__((swift_name("Ktor_client_coreHttpClientCall")))
@interface MIOSKtor_client_coreHttpClientCall : MIOSBase <MIOSKotlinx_coroutines_coreCoroutineScope>
- (instancetype)initWithClient:(MIOSKtor_client_coreHttpClient *)client __attribute__((swift_name("init(client:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithClient:(MIOSKtor_client_coreHttpClient *)client requestData:(MIOSKtor_client_coreHttpRequestData *)requestData responseData:(MIOSKtor_client_coreHttpResponseData *)responseData __attribute__((swift_name("init(client:requestData:responseData:)"))) __attribute__((objc_designated_initializer));
@property (class, readonly, getter=companion) MIOSKtor_client_coreHttpClientCallCompanion *companion __attribute__((swift_name("companion")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)bodyInfo:(MIOSKtor_utilsTypeInfo *)info completionHandler:(void (^)(id _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("body(info:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)bodyNullableInfo:(MIOSKtor_utilsTypeInfo *)info completionHandler:(void (^)(id _Nullable_result, NSError * _Nullable))completionHandler __attribute__((swift_name("bodyNullable(info:completionHandler:)")));

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
 * @note This method has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
- (void)getResponseContentWithCompletionHandler:(void (^)(id<MIOSKtor_ioByteReadChannel> _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("getResponseContent(completionHandler:)")));
- (NSString *)description __attribute__((swift_name("description()")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property (readonly) BOOL allowDoubleReceive __attribute__((swift_name("allowDoubleReceive")));
@property (readonly) id<MIOSKtor_utilsAttributes> attributes __attribute__((swift_name("attributes")));
@property (readonly) MIOSKtor_client_coreHttpClient *client __attribute__((swift_name("client")));
@property (readonly) id<MIOSKotlinCoroutineContext> coroutineContext __attribute__((swift_name("coroutineContext")));
@property id<MIOSKtor_client_coreHttpRequest> request __attribute__((swift_name("request")));
@property MIOSKtor_client_coreHttpResponse *response __attribute__((swift_name("response")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_client_coreHttpSendPipeline.Phases")))
@interface MIOSKtor_client_coreHttpSendPipelinePhases : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)phases __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKtor_client_coreHttpSendPipelinePhases *shared __attribute__((swift_name("shared")));
@property (readonly) MIOSKtor_utilsPipelinePhase *Before __attribute__((swift_name("Before")));
@property (readonly) MIOSKtor_utilsPipelinePhase *Engine __attribute__((swift_name("Engine")));
@property (readonly) MIOSKtor_utilsPipelinePhase *Monitoring __attribute__((swift_name("Monitoring")));
@property (readonly) MIOSKtor_utilsPipelinePhase *Receive __attribute__((swift_name("Receive")));
@property (readonly) MIOSKtor_utilsPipelinePhase *State __attribute__((swift_name("State")));
@end


/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
__attribute__((swift_name("Kotlinx_coroutines_coreParentJob")))
@protocol MIOSKotlinx_coroutines_coreParentJob <MIOSKotlinx_coroutines_coreJob>
@required

/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
- (MIOSKotlinCancellationException *)getChildJobCancellationCause __attribute__((swift_name("getChildJobCancellationCause()")));
@end


/**
 * @note annotations
 *   kotlinx.coroutines.InternalCoroutinesApi
*/
__attribute__((swift_name("Kotlinx_coroutines_coreSelectInstance")))
@protocol MIOSKotlinx_coroutines_coreSelectInstance
@required
- (void)disposeOnCompletionDisposableHandle:(id<MIOSKotlinx_coroutines_coreDisposableHandle>)disposableHandle __attribute__((swift_name("disposeOnCompletion(disposableHandle:)")));
- (void)selectInRegistrationPhaseInternalResult:(id _Nullable)internalResult __attribute__((swift_name("selectInRegistrationPhase(internalResult:)")));
- (BOOL)trySelectClauseObject:(id)clauseObject result:(id _Nullable)result __attribute__((swift_name("trySelect(clauseObject:result:)")));
@property (readonly) id<MIOSKotlinCoroutineContext> context __attribute__((swift_name("context")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_utilsWeekDay")))
@interface MIOSKtor_utilsWeekDay : MIOSKotlinEnum<MIOSKtor_utilsWeekDay *>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly, getter=companion) MIOSKtor_utilsWeekDayCompanion *companion __attribute__((swift_name("companion")));
@property (class, readonly) MIOSKtor_utilsWeekDay *monday __attribute__((swift_name("monday")));
@property (class, readonly) MIOSKtor_utilsWeekDay *tuesday __attribute__((swift_name("tuesday")));
@property (class, readonly) MIOSKtor_utilsWeekDay *wednesday __attribute__((swift_name("wednesday")));
@property (class, readonly) MIOSKtor_utilsWeekDay *thursday __attribute__((swift_name("thursday")));
@property (class, readonly) MIOSKtor_utilsWeekDay *friday __attribute__((swift_name("friday")));
@property (class, readonly) MIOSKtor_utilsWeekDay *saturday __attribute__((swift_name("saturday")));
@property (class, readonly) MIOSKtor_utilsWeekDay *sunday __attribute__((swift_name("sunday")));
+ (MIOSKotlinArray<MIOSKtor_utilsWeekDay *> *)values __attribute__((swift_name("values()")));
@property (class, readonly) NSArray<MIOSKtor_utilsWeekDay *> *entries __attribute__((swift_name("entries")));
@property (readonly) NSString *value __attribute__((swift_name("value")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_utilsMonth")))
@interface MIOSKtor_utilsMonth : MIOSKotlinEnum<MIOSKtor_utilsMonth *>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly, getter=companion) MIOSKtor_utilsMonthCompanion *companion __attribute__((swift_name("companion")));
@property (class, readonly) MIOSKtor_utilsMonth *january __attribute__((swift_name("january")));
@property (class, readonly) MIOSKtor_utilsMonth *february __attribute__((swift_name("february")));
@property (class, readonly) MIOSKtor_utilsMonth *march __attribute__((swift_name("march")));
@property (class, readonly) MIOSKtor_utilsMonth *april __attribute__((swift_name("april")));
@property (class, readonly) MIOSKtor_utilsMonth *may __attribute__((swift_name("may")));
@property (class, readonly) MIOSKtor_utilsMonth *june __attribute__((swift_name("june")));
@property (class, readonly) MIOSKtor_utilsMonth *july __attribute__((swift_name("july")));
@property (class, readonly) MIOSKtor_utilsMonth *august __attribute__((swift_name("august")));
@property (class, readonly) MIOSKtor_utilsMonth *september __attribute__((swift_name("september")));
@property (class, readonly) MIOSKtor_utilsMonth *october __attribute__((swift_name("october")));
@property (class, readonly) MIOSKtor_utilsMonth *november __attribute__((swift_name("november")));
@property (class, readonly) MIOSKtor_utilsMonth *december __attribute__((swift_name("december")));
+ (MIOSKotlinArray<MIOSKtor_utilsMonth *> *)values __attribute__((swift_name("values()")));
@property (class, readonly) NSArray<MIOSKtor_utilsMonth *> *entries __attribute__((swift_name("entries")));
@property (readonly) NSString *value __attribute__((swift_name("value")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_utilsGMTDate.Companion")))
@interface MIOSKtor_utilsGMTDateCompanion : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKtor_utilsGMTDateCompanion *shared __attribute__((swift_name("shared")));
- (id<MIOSKotlinx_serialization_coreKSerializer>)serializer __attribute__((swift_name("serializer()")));
@property (readonly) MIOSKtor_utilsGMTDate *START __attribute__((swift_name("START")));
@end

__attribute__((swift_name("KotlinMapEntry")))
@protocol MIOSKotlinMapEntry
@required
@property (readonly) id _Nullable key __attribute__((swift_name("key")));
@property (readonly) id _Nullable value __attribute__((swift_name("value")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpURLProtocol.Companion")))
@interface MIOSKtor_httpURLProtocolCompanion : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKtor_httpURLProtocolCompanion *shared __attribute__((swift_name("shared")));
- (MIOSKtor_httpURLProtocol *)createOrDefaultName:(NSString *)name __attribute__((swift_name("createOrDefault(name:)")));
@property (readonly) MIOSKtor_httpURLProtocol *HTTP __attribute__((swift_name("HTTP")));
@property (readonly) MIOSKtor_httpURLProtocol *HTTPS __attribute__((swift_name("HTTPS")));
@property (readonly) MIOSKtor_httpURLProtocol *SOCKS __attribute__((swift_name("SOCKS")));
@property (readonly) MIOSKtor_httpURLProtocol *WS __attribute__((swift_name("WS")));
@property (readonly) MIOSKtor_httpURLProtocol *WSS __attribute__((swift_name("WSS")));
@property (readonly) NSDictionary<NSString *, MIOSKtor_httpURLProtocol *> *byName __attribute__((swift_name("byName")));
@end

__attribute__((swift_name("KotlinKDeclarationContainer")))
@protocol MIOSKotlinKDeclarationContainer
@required
@end

__attribute__((swift_name("KotlinKAnnotatedElement")))
@protocol MIOSKotlinKAnnotatedElement
@required
@end


/**
 * @note annotations
 *   kotlin.SinceKotlin(version="1.1")
*/
__attribute__((swift_name("KotlinKClassifier")))
@protocol MIOSKotlinKClassifier
@required
@end

__attribute__((swift_name("KotlinKClass")))
@protocol MIOSKotlinKClass <MIOSKotlinKDeclarationContainer, MIOSKotlinKAnnotatedElement, MIOSKotlinKClassifier>
@required

/**
 * @note annotations
 *   kotlin.SinceKotlin(version="1.1")
*/
- (BOOL)isInstanceValue:(id _Nullable)value __attribute__((swift_name("isInstance(value:)")));
@property (readonly) NSString * _Nullable qualifiedName __attribute__((swift_name("qualifiedName")));
@property (readonly) NSString * _Nullable simpleName __attribute__((swift_name("simpleName")));
@end

__attribute__((swift_name("KotlinKType")))
@protocol MIOSKotlinKType
@required

/**
 * @note annotations
 *   kotlin.SinceKotlin(version="1.1")
*/
@property (readonly) NSArray<MIOSKotlinKTypeProjection *> *arguments __attribute__((swift_name("arguments")));

/**
 * @note annotations
 *   kotlin.SinceKotlin(version="1.1")
*/
@property (readonly) id<MIOSKotlinKClassifier> _Nullable classifier __attribute__((swift_name("classifier")));
@property (readonly) BOOL isMarkedNullable __attribute__((swift_name("isMarkedNullable")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreCompositeEncoder")))
@protocol MIOSKotlinx_serialization_coreCompositeEncoder
@required
- (void)encodeBooleanElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(BOOL)value __attribute__((swift_name("encodeBooleanElement(descriptor:index:value:)")));
- (void)encodeByteElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(int8_t)value __attribute__((swift_name("encodeByteElement(descriptor:index:value:)")));
- (void)encodeCharElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(unichar)value __attribute__((swift_name("encodeCharElement(descriptor:index:value:)")));
- (void)encodeDoubleElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(double)value __attribute__((swift_name("encodeDoubleElement(descriptor:index:value:)")));
- (void)encodeFloatElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(float)value __attribute__((swift_name("encodeFloatElement(descriptor:index:value:)")));
- (id<MIOSKotlinx_serialization_coreEncoder>)encodeInlineElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("encodeInlineElement(descriptor:index:)")));
- (void)encodeIntElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(int32_t)value __attribute__((swift_name("encodeIntElement(descriptor:index:value:)")));
- (void)encodeLongElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(int64_t)value __attribute__((swift_name("encodeLongElement(descriptor:index:value:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (void)encodeNullableSerializableElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index serializer:(id<MIOSKotlinx_serialization_coreSerializationStrategy>)serializer value:(id _Nullable)value __attribute__((swift_name("encodeNullableSerializableElement(descriptor:index:serializer:value:)")));
- (void)encodeSerializableElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index serializer:(id<MIOSKotlinx_serialization_coreSerializationStrategy>)serializer value:(id _Nullable)value __attribute__((swift_name("encodeSerializableElement(descriptor:index:serializer:value:)")));
- (void)encodeShortElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(int16_t)value __attribute__((swift_name("encodeShortElement(descriptor:index:value:)")));
- (void)encodeStringElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index value:(NSString *)value __attribute__((swift_name("encodeStringElement(descriptor:index:value:)")));
- (void)endStructureDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("endStructure(descriptor:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (BOOL)shouldEncodeElementDefaultDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("shouldEncodeElementDefault(descriptor:index:)")));
@property (readonly) MIOSKotlinx_serialization_coreSerializersModule *serializersModule __attribute__((swift_name("serializersModule")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreSerializersModule")))
@interface MIOSKotlinx_serialization_coreSerializersModule : MIOSBase

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (void)dumpToCollector:(id<MIOSKotlinx_serialization_coreSerializersModuleCollector>)collector __attribute__((swift_name("dumpTo(collector:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (id<MIOSKotlinx_serialization_coreKSerializer> _Nullable)getContextualKClass:(id<MIOSKotlinKClass>)kClass typeArgumentsSerializers:(NSArray<id<MIOSKotlinx_serialization_coreKSerializer>> *)typeArgumentsSerializers __attribute__((swift_name("getContextual(kClass:typeArgumentsSerializers:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (id<MIOSKotlinx_serialization_coreSerializationStrategy> _Nullable)getPolymorphicBaseClass:(id<MIOSKotlinKClass>)baseClass value:(id)value __attribute__((swift_name("getPolymorphic(baseClass:value:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (id<MIOSKotlinx_serialization_coreDeserializationStrategy> _Nullable)getPolymorphicBaseClass:(id<MIOSKotlinKClass>)baseClass serializedClassName:(NSString * _Nullable)serializedClassName __attribute__((swift_name("getPolymorphic(baseClass:serializedClassName:)")));
@end

__attribute__((swift_name("KotlinAnnotation")))
@protocol MIOSKotlinAnnotation
@required
@end

__attribute__((swift_name("Kotlinx_serialization_coreSerialKind")))
@interface MIOSKotlinx_serialization_coreSerialKind : MIOSBase
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@end

__attribute__((swift_name("Kotlinx_serialization_coreCompositeDecoder")))
@protocol MIOSKotlinx_serialization_coreCompositeDecoder
@required
- (BOOL)decodeBooleanElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeBooleanElement(descriptor:index:)")));
- (int8_t)decodeByteElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeByteElement(descriptor:index:)")));
- (unichar)decodeCharElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeCharElement(descriptor:index:)")));
- (int32_t)decodeCollectionSizeDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("decodeCollectionSize(descriptor:)")));
- (double)decodeDoubleElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeDoubleElement(descriptor:index:)")));
- (int32_t)decodeElementIndexDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("decodeElementIndex(descriptor:)")));
- (float)decodeFloatElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeFloatElement(descriptor:index:)")));
- (id<MIOSKotlinx_serialization_coreDecoder>)decodeInlineElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeInlineElement(descriptor:index:)")));
- (int32_t)decodeIntElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeIntElement(descriptor:index:)")));
- (int64_t)decodeLongElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeLongElement(descriptor:index:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (id _Nullable)decodeNullableSerializableElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index deserializer:(id<MIOSKotlinx_serialization_coreDeserializationStrategy>)deserializer previousValue:(id _Nullable)previousValue __attribute__((swift_name("decodeNullableSerializableElement(descriptor:index:deserializer:previousValue:)")));

/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
- (BOOL)decodeSequentially __attribute__((swift_name("decodeSequentially()")));
- (id _Nullable)decodeSerializableElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index deserializer:(id<MIOSKotlinx_serialization_coreDeserializationStrategy>)deserializer previousValue:(id _Nullable)previousValue __attribute__((swift_name("decodeSerializableElement(descriptor:index:deserializer:previousValue:)")));
- (int16_t)decodeShortElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeShortElement(descriptor:index:)")));
- (NSString *)decodeStringElementDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor index:(int32_t)index __attribute__((swift_name("decodeStringElement(descriptor:index:)")));
- (void)endStructureDescriptor:(id<MIOSKotlinx_serialization_coreSerialDescriptor>)descriptor __attribute__((swift_name("endStructure(descriptor:)")));
@property (readonly) MIOSKotlinx_serialization_coreSerializersModule *serializersModule __attribute__((swift_name("serializersModule")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinNothing")))
@interface MIOSKotlinNothing : MIOSBase
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpHttpMethod")))
@interface MIOSKtor_httpHttpMethod : MIOSBase
- (instancetype)initWithValue:(NSString *)value __attribute__((swift_name("init(value:)"))) __attribute__((objc_designated_initializer));
@property (class, readonly, getter=companion) MIOSKtor_httpHttpMethodCompanion *companion __attribute__((swift_name("companion")));
- (MIOSKtor_httpHttpMethod *)doCopyValue:(NSString *)value __attribute__((swift_name("doCopy(value:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString *value __attribute__((swift_name("value")));
@end

__attribute__((swift_name("Ktor_httpHeaders")))
@protocol MIOSKtor_httpHeaders <MIOSKtor_utilsStringValues>
@required
@end

__attribute__((swift_name("Ktor_httpOutgoingContent")))
@interface MIOSKtor_httpOutgoingContent : MIOSBase
- (id _Nullable)getPropertyKey:(MIOSKtor_utilsAttributeKey<id> *)key __attribute__((swift_name("getProperty(key:)")));
- (void)setPropertyKey:(MIOSKtor_utilsAttributeKey<id> *)key value:(id _Nullable)value __attribute__((swift_name("setProperty(key:value:)")));
- (id<MIOSKtor_httpHeaders> _Nullable)trailers __attribute__((swift_name("trailers()")));
@property (readonly) MIOSLong * _Nullable contentLength __attribute__((swift_name("contentLength")));
@property (readonly) MIOSKtor_httpContentType * _Nullable contentType __attribute__((swift_name("contentType")));
@property (readonly) id<MIOSKtor_httpHeaders> headers __attribute__((swift_name("headers")));
@property (readonly) MIOSKtor_httpHttpStatusCode * _Nullable status __attribute__((swift_name("status")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpHttpStatusCode")))
@interface MIOSKtor_httpHttpStatusCode : MIOSBase <MIOSKotlinComparable>
- (instancetype)initWithValue:(int32_t)value description:(NSString *)description __attribute__((swift_name("init(value:description:)"))) __attribute__((objc_designated_initializer));
@property (class, readonly, getter=companion) MIOSKtor_httpHttpStatusCodeCompanion *companion __attribute__((swift_name("companion")));
- (int32_t)compareToOther:(MIOSKtor_httpHttpStatusCode *)other __attribute__((swift_name("compareTo(other:)")));
- (MIOSKtor_httpHttpStatusCode *)doCopyValue:(int32_t)value description:(NSString *)description __attribute__((swift_name("doCopy(value:description:)")));
- (MIOSKtor_httpHttpStatusCode *)descriptionValue:(NSString *)value __attribute__((swift_name("description(value:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString *description_ __attribute__((swift_name("description_")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpHttpProtocolVersion")))
@interface MIOSKtor_httpHttpProtocolVersion : MIOSBase
- (instancetype)initWithName:(NSString *)name major:(int32_t)major minor:(int32_t)minor __attribute__((swift_name("init(name:major:minor:)"))) __attribute__((objc_designated_initializer));
@property (class, readonly, getter=companion) MIOSKtor_httpHttpProtocolVersionCompanion *companion __attribute__((swift_name("companion")));
- (MIOSKtor_httpHttpProtocolVersion *)doCopyName:(NSString *)name major:(int32_t)major minor:(int32_t)minor __attribute__((swift_name("doCopy(name:major:minor:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) int32_t major __attribute__((swift_name("major")));
@property (readonly) int32_t minor __attribute__((swift_name("minor")));
@property (readonly) NSString *name __attribute__((swift_name("name")));
@end


/**
 * @note annotations
 *   kotlin.SinceKotlin(version="1.3")
*/
__attribute__((swift_name("KotlinContinuation")))
@protocol MIOSKotlinContinuation
@required
- (void)resumeWithResult:(id _Nullable)result __attribute__((swift_name("resumeWith(result:)")));
@property (readonly) id<MIOSKotlinCoroutineContext> context __attribute__((swift_name("context")));
@end


/**
 * @note annotations
 *   kotlin.SinceKotlin(version="1.3")
 *   kotlin.ExperimentalStdlibApi
*/
__attribute__((swift_name("KotlinAbstractCoroutineContextKey")))
@interface MIOSKotlinAbstractCoroutineContextKey<B, E> : MIOSBase <MIOSKotlinCoroutineContextKey>
- (instancetype)initWithBaseKey:(id<MIOSKotlinCoroutineContextKey>)baseKey safeCast:(E _Nullable (^)(id<MIOSKotlinCoroutineContextElement>))safeCast __attribute__((swift_name("init(baseKey:safeCast:)"))) __attribute__((objc_designated_initializer));
@end


/**
 * @note annotations
 *   kotlin.ExperimentalStdlibApi
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Kotlinx_coroutines_coreCoroutineDispatcher.Key")))
@interface MIOSKotlinx_coroutines_coreCoroutineDispatcherKey : MIOSKotlinAbstractCoroutineContextKey<id<MIOSKotlinContinuationInterceptor>, MIOSKotlinx_coroutines_coreCoroutineDispatcher *>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (instancetype)initWithBaseKey:(id<MIOSKotlinCoroutineContextKey>)baseKey safeCast:(id<MIOSKotlinCoroutineContextElement> _Nullable (^)(id<MIOSKotlinCoroutineContextElement>))safeCast __attribute__((swift_name("init(baseKey:safeCast:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
+ (instancetype)key __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKotlinx_coroutines_coreCoroutineDispatcherKey *shared __attribute__((swift_name("shared")));
@end

__attribute__((swift_name("Kotlinx_coroutines_coreRunnable")))
@protocol MIOSKotlinx_coroutines_coreRunnable
@required
- (void)run __attribute__((swift_name("run()")));
@end

__attribute__((swift_name("Ktor_ioByteReadChannel")))
@protocol MIOSKtor_ioByteReadChannel
@required

/**
 * @note This method converts instances of CancellationException to errors.
 * Other uncaught Kotlin exceptions are fatal.
*/
- (void)awaitContentMin:(int32_t)min completionHandler:(void (^)(MIOSBoolean * _Nullable, NSError * _Nullable))completionHandler __attribute__((swift_name("awaitContent(min:completionHandler:)")));
- (void)cancelCause_:(MIOSKotlinThrowable * _Nullable)cause __attribute__((swift_name("cancel(cause_:)")));
@property (readonly) MIOSKotlinThrowable * _Nullable closedCause __attribute__((swift_name("closedCause")));
@property (readonly) BOOL isClosedForRead __attribute__((swift_name("isClosedForRead")));
@property (readonly) id<MIOSKotlinx_io_coreSource> readBuffer __attribute__((swift_name("readBuffer")));
@end

__attribute__((swift_name("Ktor_utilsStringValuesBuilder")))
@protocol MIOSKtor_utilsStringValuesBuilder
@required
- (void)appendName:(NSString *)name value:(NSString *)value __attribute__((swift_name("append(name:value:)")));
- (void)appendAllStringValues:(id<MIOSKtor_utilsStringValues>)stringValues __attribute__((swift_name("appendAll(stringValues:)")));
- (void)appendAllName:(NSString *)name values:(id)values __attribute__((swift_name("appendAll(name:values:)")));
- (void)appendMissingStringValues:(id<MIOSKtor_utilsStringValues>)stringValues __attribute__((swift_name("appendMissing(stringValues:)")));
- (void)appendMissingName:(NSString *)name values:(id)values __attribute__((swift_name("appendMissing(name:values:)")));
- (id<MIOSKtor_utilsStringValues>)build __attribute__((swift_name("build()")));
- (void)clear __attribute__((swift_name("clear()")));
- (BOOL)containsName:(NSString *)name __attribute__((swift_name("contains(name:)")));
- (BOOL)containsName:(NSString *)name value:(NSString *)value __attribute__((swift_name("contains(name:value:)")));
- (NSSet<id<MIOSKotlinMapEntry>> *)entries __attribute__((swift_name("entries()")));
- (NSString * _Nullable)getName:(NSString *)name __attribute__((swift_name("get(name:)")));
- (NSArray<NSString *> * _Nullable)getAllName:(NSString *)name __attribute__((swift_name("getAll(name:)")));
- (BOOL)isEmpty_ __attribute__((swift_name("isEmpty()")));
- (NSSet<NSString *> *)names __attribute__((swift_name("names()")));
- (void)removeName:(NSString *)name __attribute__((swift_name("remove(name:)")));
- (BOOL)removeName:(NSString *)name value:(NSString *)value __attribute__((swift_name("remove(name:value:)")));
- (void)removeKeysWithNoEntries __attribute__((swift_name("removeKeysWithNoEntries()")));
- (void)setName:(NSString *)name value:(NSString *)value __attribute__((swift_name("set(name:value:)")));
@property (readonly) BOOL caseInsensitiveName __attribute__((swift_name("caseInsensitiveName")));
@end

__attribute__((swift_name("Ktor_utilsStringValuesBuilderImpl")))
@interface MIOSKtor_utilsStringValuesBuilderImpl : MIOSBase <MIOSKtor_utilsStringValuesBuilder>
- (instancetype)initWithCaseInsensitiveName:(BOOL)caseInsensitiveName size:(int32_t)size __attribute__((swift_name("init(caseInsensitiveName:size:)"))) __attribute__((objc_designated_initializer));
- (void)appendName:(NSString *)name value:(NSString *)value __attribute__((swift_name("append(name:value:)")));
- (void)appendAllStringValues:(id<MIOSKtor_utilsStringValues>)stringValues __attribute__((swift_name("appendAll(stringValues:)")));
- (void)appendAllName:(NSString *)name values:(id)values __attribute__((swift_name("appendAll(name:values:)")));
- (void)appendMissingStringValues:(id<MIOSKtor_utilsStringValues>)stringValues __attribute__((swift_name("appendMissing(stringValues:)")));
- (void)appendMissingName:(NSString *)name values:(id)values __attribute__((swift_name("appendMissing(name:values:)")));
- (id<MIOSKtor_utilsStringValues>)build __attribute__((swift_name("build()")));
- (void)clear __attribute__((swift_name("clear()")));
- (BOOL)containsName:(NSString *)name __attribute__((swift_name("contains(name:)")));
- (BOOL)containsName:(NSString *)name value:(NSString *)value __attribute__((swift_name("contains(name:value:)")));
- (NSSet<id<MIOSKotlinMapEntry>> *)entries __attribute__((swift_name("entries()")));
- (NSString * _Nullable)getName:(NSString *)name __attribute__((swift_name("get(name:)")));
- (NSArray<NSString *> * _Nullable)getAllName:(NSString *)name __attribute__((swift_name("getAll(name:)")));
- (BOOL)isEmpty_ __attribute__((swift_name("isEmpty()")));
- (NSSet<NSString *> *)names __attribute__((swift_name("names()")));
- (void)removeName:(NSString *)name __attribute__((swift_name("remove(name:)")));
- (BOOL)removeName:(NSString *)name value:(NSString *)value __attribute__((swift_name("remove(name:value:)")));
- (void)removeKeysWithNoEntries __attribute__((swift_name("removeKeysWithNoEntries()")));
- (void)setName:(NSString *)name value:(NSString *)value __attribute__((swift_name("set(name:value:)")));

/**
 * @note This method has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
- (void)validateNameName:(NSString *)name __attribute__((swift_name("validateName(name:)")));

/**
 * @note This method has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
- (void)validateValueValue:(NSString *)value __attribute__((swift_name("validateValue(value:)")));
@property (readonly) BOOL caseInsensitiveName __attribute__((swift_name("caseInsensitiveName")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property (readonly) MIOSMutableDictionary<NSString *, NSMutableArray<NSString *> *> *values __attribute__((swift_name("values")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpHeadersBuilder")))
@interface MIOSKtor_httpHeadersBuilder : MIOSKtor_utilsStringValuesBuilderImpl
- (instancetype)initWithSize:(int32_t)size __attribute__((swift_name("init(size:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithCaseInsensitiveName:(BOOL)caseInsensitiveName size:(int32_t)size __attribute__((swift_name("init(caseInsensitiveName:size:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (id<MIOSKtor_httpHeaders>)build __attribute__((swift_name("build()")));

/**
 * @note This method has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
- (void)validateNameName:(NSString *)name __attribute__((swift_name("validateName(name:)")));

/**
 * @note This method has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
- (void)validateValueValue:(NSString *)value __attribute__((swift_name("validateValue(value:)")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_client_coreHttpRequestBuilder.Companion")))
@interface MIOSKtor_client_coreHttpRequestBuilderCompanion : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKtor_client_coreHttpRequestBuilderCompanion *shared __attribute__((swift_name("shared")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpURLBuilder")))
@interface MIOSKtor_httpURLBuilder : MIOSBase
- (instancetype)initWithProtocol:(MIOSKtor_httpURLProtocol * _Nullable)protocol host:(NSString *)host port:(int32_t)port user:(NSString * _Nullable)user password:(NSString * _Nullable)password pathSegments:(NSArray<NSString *> *)pathSegments parameters:(id<MIOSKtor_httpParameters>)parameters fragment:(NSString *)fragment trailingQuery:(BOOL)trailingQuery __attribute__((swift_name("init(protocol:host:port:user:password:pathSegments:parameters:fragment:trailingQuery:)"))) __attribute__((objc_designated_initializer));
@property (class, readonly, getter=companion) MIOSKtor_httpURLBuilderCompanion *companion __attribute__((swift_name("companion")));
- (MIOSKtor_httpUrl *)build __attribute__((swift_name("build()")));
- (NSString *)buildString __attribute__((swift_name("buildString()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property NSString *encodedFragment __attribute__((swift_name("encodedFragment")));
@property id<MIOSKtor_httpParametersBuilder> encodedParameters __attribute__((swift_name("encodedParameters")));
@property NSString * _Nullable encodedPassword __attribute__((swift_name("encodedPassword")));
@property NSArray<NSString *> *encodedPathSegments __attribute__((swift_name("encodedPathSegments")));
@property NSString * _Nullable encodedUser __attribute__((swift_name("encodedUser")));
@property NSString *fragment __attribute__((swift_name("fragment")));
@property NSString *host __attribute__((swift_name("host")));
@property (readonly) id<MIOSKtor_httpParametersBuilder> parameters __attribute__((swift_name("parameters")));
@property NSString * _Nullable password __attribute__((swift_name("password")));
@property NSArray<NSString *> *pathSegments __attribute__((swift_name("pathSegments")));
@property int32_t port __attribute__((swift_name("port")));
@property MIOSKtor_httpURLProtocol *protocol __attribute__((swift_name("protocol")));
@property MIOSKtor_httpURLProtocol * _Nullable protocolOrNull __attribute__((swift_name("protocolOrNull")));
@property BOOL trailingQuery __attribute__((swift_name("trailingQuery")));
@property NSString * _Nullable user __attribute__((swift_name("user")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_client_coreHttpClientCall.Companion")))
@interface MIOSKtor_client_coreHttpClientCallCompanion : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKtor_client_coreHttpClientCallCompanion *shared __attribute__((swift_name("shared")));
@end

__attribute__((swift_name("Ktor_client_coreHttpRequest")))
@protocol MIOSKtor_client_coreHttpRequest <MIOSKtor_httpHttpMessage, MIOSKotlinx_coroutines_coreCoroutineScope>
@required
@property (readonly) id<MIOSKtor_utilsAttributes> attributes __attribute__((swift_name("attributes")));
@property (readonly) MIOSKtor_client_coreHttpClientCall *call __attribute__((swift_name("call")));
@property (readonly) MIOSKtor_httpOutgoingContent *content __attribute__((swift_name("content")));
@property (readonly) MIOSKtor_httpHttpMethod *method __attribute__((swift_name("method")));
@property (readonly) MIOSKtor_httpUrl *url __attribute__((swift_name("url")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_utilsWeekDay.Companion")))
@interface MIOSKtor_utilsWeekDayCompanion : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKtor_utilsWeekDayCompanion *shared __attribute__((swift_name("shared")));
- (MIOSKtor_utilsWeekDay *)fromOrdinal:(int32_t)ordinal __attribute__((swift_name("from(ordinal:)")));
- (MIOSKtor_utilsWeekDay *)fromValue:(NSString *)value __attribute__((swift_name("from(value:)")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_utilsMonth.Companion")))
@interface MIOSKtor_utilsMonthCompanion : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKtor_utilsMonthCompanion *shared __attribute__((swift_name("shared")));
- (MIOSKtor_utilsMonth *)fromOrdinal:(int32_t)ordinal __attribute__((swift_name("from(ordinal:)")));
- (MIOSKtor_utilsMonth *)fromValue:(NSString *)value __attribute__((swift_name("from(value:)")));
@end


/**
 * @note annotations
 *   kotlin.SinceKotlin(version="1.1")
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinKTypeProjection")))
@interface MIOSKotlinKTypeProjection : MIOSBase
- (instancetype)initWithVariance:(MIOSKotlinKVariance * _Nullable)variance type:(id<MIOSKotlinKType> _Nullable)type __attribute__((swift_name("init(variance:type:)"))) __attribute__((objc_designated_initializer));
@property (class, readonly, getter=companion) MIOSKotlinKTypeProjectionCompanion *companion __attribute__((swift_name("companion")));
- (MIOSKotlinKTypeProjection *)doCopyVariance:(MIOSKotlinKVariance * _Nullable)variance type:(id<MIOSKotlinKType> _Nullable)type __attribute__((swift_name("doCopy(variance:type:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) id<MIOSKotlinKType> _Nullable type __attribute__((swift_name("type")));
@property (readonly) MIOSKotlinKVariance * _Nullable variance __attribute__((swift_name("variance")));
@end


/**
 * @note annotations
 *   kotlinx.serialization.ExperimentalSerializationApi
*/
__attribute__((swift_name("Kotlinx_serialization_coreSerializersModuleCollector")))
@protocol MIOSKotlinx_serialization_coreSerializersModuleCollector
@required
- (void)contextualKClass:(id<MIOSKotlinKClass>)kClass provider:(id<MIOSKotlinx_serialization_coreKSerializer> (^)(NSArray<id<MIOSKotlinx_serialization_coreKSerializer>> *))provider __attribute__((swift_name("contextual(kClass:provider:)")));
- (void)contextualKClass:(id<MIOSKotlinKClass>)kClass serializer:(id<MIOSKotlinx_serialization_coreKSerializer>)serializer __attribute__((swift_name("contextual(kClass:serializer:)")));
- (void)polymorphicBaseClass:(id<MIOSKotlinKClass>)baseClass actualClass:(id<MIOSKotlinKClass>)actualClass actualSerializer:(id<MIOSKotlinx_serialization_coreKSerializer>)actualSerializer __attribute__((swift_name("polymorphic(baseClass:actualClass:actualSerializer:)")));
- (void)polymorphicDefaultBaseClass:(id<MIOSKotlinKClass>)baseClass defaultDeserializerProvider:(id<MIOSKotlinx_serialization_coreDeserializationStrategy> _Nullable (^)(NSString * _Nullable))defaultDeserializerProvider __attribute__((swift_name("polymorphicDefault(baseClass:defaultDeserializerProvider:)"))) __attribute__((deprecated("Deprecated in favor of function with more precise name: polymorphicDefaultDeserializer")));
- (void)polymorphicDefaultDeserializerBaseClass:(id<MIOSKotlinKClass>)baseClass defaultDeserializerProvider:(id<MIOSKotlinx_serialization_coreDeserializationStrategy> _Nullable (^)(NSString * _Nullable))defaultDeserializerProvider __attribute__((swift_name("polymorphicDefaultDeserializer(baseClass:defaultDeserializerProvider:)")));
- (void)polymorphicDefaultSerializerBaseClass:(id<MIOSKotlinKClass>)baseClass defaultSerializerProvider:(id<MIOSKotlinx_serialization_coreSerializationStrategy> _Nullable (^)(id))defaultSerializerProvider __attribute__((swift_name("polymorphicDefaultSerializer(baseClass:defaultSerializerProvider:)")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpHttpMethod.Companion")))
@interface MIOSKtor_httpHttpMethodCompanion : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKtor_httpHttpMethodCompanion *shared __attribute__((swift_name("shared")));
- (MIOSKtor_httpHttpMethod *)parseMethod:(NSString *)method __attribute__((swift_name("parse(method:)")));
@property (readonly) NSArray<MIOSKtor_httpHttpMethod *> *DefaultMethods __attribute__((swift_name("DefaultMethods")));
@property (readonly) MIOSKtor_httpHttpMethod *Delete __attribute__((swift_name("Delete")));
@property (readonly) MIOSKtor_httpHttpMethod *Get __attribute__((swift_name("Get")));
@property (readonly) MIOSKtor_httpHttpMethod *Head __attribute__((swift_name("Head")));
@property (readonly) MIOSKtor_httpHttpMethod *Options __attribute__((swift_name("Options")));
@property (readonly) MIOSKtor_httpHttpMethod *Patch __attribute__((swift_name("Patch")));
@property (readonly) MIOSKtor_httpHttpMethod *Post __attribute__((swift_name("Post")));
@property (readonly) MIOSKtor_httpHttpMethod *Put __attribute__((swift_name("Put")));
@end

__attribute__((swift_name("Ktor_httpHeaderValueWithParameters")))
@interface MIOSKtor_httpHeaderValueWithParameters : MIOSBase
- (instancetype)initWithContent:(NSString *)content parameters:(NSArray<MIOSKtor_httpHeaderValueParam *> *)parameters __attribute__((swift_name("init(content:parameters:)"))) __attribute__((objc_designated_initializer));
@property (class, readonly, getter=companion) MIOSKtor_httpHeaderValueWithParametersCompanion *companion __attribute__((swift_name("companion")));
- (NSString * _Nullable)parameterName:(NSString *)name __attribute__((swift_name("parameter(name:)")));
- (NSString *)description __attribute__((swift_name("description()")));

/**
 * @note This property has protected visibility in Kotlin source and is intended only for use by subclasses.
*/
@property (readonly) NSString *content __attribute__((swift_name("content")));
@property (readonly) NSArray<MIOSKtor_httpHeaderValueParam *> *parameters __attribute__((swift_name("parameters")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpContentType")))
@interface MIOSKtor_httpContentType : MIOSKtor_httpHeaderValueWithParameters
- (instancetype)initWithContentType:(NSString *)contentType contentSubtype:(NSString *)contentSubtype parameters:(NSArray<MIOSKtor_httpHeaderValueParam *> *)parameters __attribute__((swift_name("init(contentType:contentSubtype:parameters:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithContent:(NSString *)content parameters:(NSArray<MIOSKtor_httpHeaderValueParam *> *)parameters __attribute__((swift_name("init(content:parameters:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly, getter=companion) MIOSKtor_httpContentTypeCompanion *companion __attribute__((swift_name("companion")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (BOOL)matchPattern:(MIOSKtor_httpContentType *)pattern __attribute__((swift_name("match(pattern:)")));
- (BOOL)matchPattern_:(NSString *)pattern __attribute__((swift_name("match(pattern_:)")));
- (MIOSKtor_httpContentType *)withParameterName:(NSString *)name value:(NSString *)value __attribute__((swift_name("withParameter(name:value:)")));
- (MIOSKtor_httpContentType *)withoutParameters __attribute__((swift_name("withoutParameters()")));
@property (readonly) NSString *contentSubtype __attribute__((swift_name("contentSubtype")));
@property (readonly) NSString *contentType __attribute__((swift_name("contentType")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpHttpStatusCode.Companion")))
@interface MIOSKtor_httpHttpStatusCodeCompanion : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKtor_httpHttpStatusCodeCompanion *shared __attribute__((swift_name("shared")));
- (MIOSKtor_httpHttpStatusCode *)fromValueValue:(int32_t)value __attribute__((swift_name("fromValue(value:)")));
@property (readonly) MIOSKtor_httpHttpStatusCode *Accepted __attribute__((swift_name("Accepted")));
@property (readonly) MIOSKtor_httpHttpStatusCode *BadGateway __attribute__((swift_name("BadGateway")));
@property (readonly) MIOSKtor_httpHttpStatusCode *BadRequest __attribute__((swift_name("BadRequest")));
@property (readonly) MIOSKtor_httpHttpStatusCode *Conflict __attribute__((swift_name("Conflict")));
@property (readonly) MIOSKtor_httpHttpStatusCode *Continue __attribute__((swift_name("Continue")));
@property (readonly) MIOSKtor_httpHttpStatusCode *Created __attribute__((swift_name("Created")));
@property (readonly) MIOSKtor_httpHttpStatusCode *ExpectationFailed __attribute__((swift_name("ExpectationFailed")));
@property (readonly) MIOSKtor_httpHttpStatusCode *FailedDependency __attribute__((swift_name("FailedDependency")));
@property (readonly) MIOSKtor_httpHttpStatusCode *Forbidden __attribute__((swift_name("Forbidden")));
@property (readonly) MIOSKtor_httpHttpStatusCode *Found __attribute__((swift_name("Found")));
@property (readonly) MIOSKtor_httpHttpStatusCode *GatewayTimeout __attribute__((swift_name("GatewayTimeout")));
@property (readonly) MIOSKtor_httpHttpStatusCode *Gone __attribute__((swift_name("Gone")));
@property (readonly) MIOSKtor_httpHttpStatusCode *InsufficientStorage __attribute__((swift_name("InsufficientStorage")));
@property (readonly) MIOSKtor_httpHttpStatusCode *InternalServerError __attribute__((swift_name("InternalServerError")));
@property (readonly) MIOSKtor_httpHttpStatusCode *LengthRequired __attribute__((swift_name("LengthRequired")));
@property (readonly) MIOSKtor_httpHttpStatusCode *Locked __attribute__((swift_name("Locked")));
@property (readonly) MIOSKtor_httpHttpStatusCode *MethodNotAllowed __attribute__((swift_name("MethodNotAllowed")));
@property (readonly) MIOSKtor_httpHttpStatusCode *MovedPermanently __attribute__((swift_name("MovedPermanently")));
@property (readonly) MIOSKtor_httpHttpStatusCode *MultiStatus __attribute__((swift_name("MultiStatus")));
@property (readonly) MIOSKtor_httpHttpStatusCode *MultipleChoices __attribute__((swift_name("MultipleChoices")));
@property (readonly) MIOSKtor_httpHttpStatusCode *NoContent __attribute__((swift_name("NoContent")));
@property (readonly) MIOSKtor_httpHttpStatusCode *NonAuthoritativeInformation __attribute__((swift_name("NonAuthoritativeInformation")));
@property (readonly) MIOSKtor_httpHttpStatusCode *NotAcceptable __attribute__((swift_name("NotAcceptable")));
@property (readonly) MIOSKtor_httpHttpStatusCode *NotFound __attribute__((swift_name("NotFound")));
@property (readonly) MIOSKtor_httpHttpStatusCode *NotImplemented __attribute__((swift_name("NotImplemented")));
@property (readonly) MIOSKtor_httpHttpStatusCode *NotModified __attribute__((swift_name("NotModified")));
@property (readonly) MIOSKtor_httpHttpStatusCode *OK __attribute__((swift_name("OK")));
@property (readonly) MIOSKtor_httpHttpStatusCode *PartialContent __attribute__((swift_name("PartialContent")));
@property (readonly) MIOSKtor_httpHttpStatusCode *PayloadTooLarge __attribute__((swift_name("PayloadTooLarge")));
@property (readonly) MIOSKtor_httpHttpStatusCode *PaymentRequired __attribute__((swift_name("PaymentRequired")));
@property (readonly) MIOSKtor_httpHttpStatusCode *PermanentRedirect __attribute__((swift_name("PermanentRedirect")));
@property (readonly) MIOSKtor_httpHttpStatusCode *PreconditionFailed __attribute__((swift_name("PreconditionFailed")));
@property (readonly) MIOSKtor_httpHttpStatusCode *Processing __attribute__((swift_name("Processing")));
@property (readonly) MIOSKtor_httpHttpStatusCode *ProxyAuthenticationRequired __attribute__((swift_name("ProxyAuthenticationRequired")));
@property (readonly) MIOSKtor_httpHttpStatusCode *RequestHeaderFieldTooLarge __attribute__((swift_name("RequestHeaderFieldTooLarge")));
@property (readonly) MIOSKtor_httpHttpStatusCode *RequestTimeout __attribute__((swift_name("RequestTimeout")));
@property (readonly) MIOSKtor_httpHttpStatusCode *RequestURITooLong __attribute__((swift_name("RequestURITooLong")));
@property (readonly) MIOSKtor_httpHttpStatusCode *RequestedRangeNotSatisfiable __attribute__((swift_name("RequestedRangeNotSatisfiable")));
@property (readonly) MIOSKtor_httpHttpStatusCode *ResetContent __attribute__((swift_name("ResetContent")));
@property (readonly) MIOSKtor_httpHttpStatusCode *SeeOther __attribute__((swift_name("SeeOther")));
@property (readonly) MIOSKtor_httpHttpStatusCode *ServiceUnavailable __attribute__((swift_name("ServiceUnavailable")));
@property (readonly) MIOSKtor_httpHttpStatusCode *SwitchProxy __attribute__((swift_name("SwitchProxy")));
@property (readonly) MIOSKtor_httpHttpStatusCode *SwitchingProtocols __attribute__((swift_name("SwitchingProtocols")));
@property (readonly) MIOSKtor_httpHttpStatusCode *TemporaryRedirect __attribute__((swift_name("TemporaryRedirect")));
@property (readonly) MIOSKtor_httpHttpStatusCode *TooEarly __attribute__((swift_name("TooEarly")));
@property (readonly) MIOSKtor_httpHttpStatusCode *TooManyRequests __attribute__((swift_name("TooManyRequests")));
@property (readonly) MIOSKtor_httpHttpStatusCode *Unauthorized __attribute__((swift_name("Unauthorized")));
@property (readonly) MIOSKtor_httpHttpStatusCode *UnprocessableEntity __attribute__((swift_name("UnprocessableEntity")));
@property (readonly) MIOSKtor_httpHttpStatusCode *UnsupportedMediaType __attribute__((swift_name("UnsupportedMediaType")));
@property (readonly) MIOSKtor_httpHttpStatusCode *UpgradeRequired __attribute__((swift_name("UpgradeRequired")));
@property (readonly) MIOSKtor_httpHttpStatusCode *UseProxy __attribute__((swift_name("UseProxy")));
@property (readonly) MIOSKtor_httpHttpStatusCode *VariantAlsoNegotiates __attribute__((swift_name("VariantAlsoNegotiates")));
@property (readonly) MIOSKtor_httpHttpStatusCode *VersionNotSupported __attribute__((swift_name("VersionNotSupported")));
@property (readonly) NSArray<MIOSKtor_httpHttpStatusCode *> *allStatusCodes __attribute__((swift_name("allStatusCodes")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpHttpProtocolVersion.Companion")))
@interface MIOSKtor_httpHttpProtocolVersionCompanion : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKtor_httpHttpProtocolVersionCompanion *shared __attribute__((swift_name("shared")));
- (MIOSKtor_httpHttpProtocolVersion *)fromValueName:(NSString *)name major:(int32_t)major minor:(int32_t)minor __attribute__((swift_name("fromValue(name:major:minor:)")));
- (MIOSKtor_httpHttpProtocolVersion *)parseValue:(id)value __attribute__((swift_name("parse(value:)")));
@property (readonly) MIOSKtor_httpHttpProtocolVersion *HTTP_1_0 __attribute__((swift_name("HTTP_1_0")));
@property (readonly) MIOSKtor_httpHttpProtocolVersion *HTTP_1_1 __attribute__((swift_name("HTTP_1_1")));
@property (readonly) MIOSKtor_httpHttpProtocolVersion *HTTP_2_0 __attribute__((swift_name("HTTP_2_0")));
@property (readonly) MIOSKtor_httpHttpProtocolVersion *QUIC __attribute__((swift_name("QUIC")));
@property (readonly) MIOSKtor_httpHttpProtocolVersion *SPDY_3 __attribute__((swift_name("SPDY_3")));
@end

__attribute__((swift_name("Kotlinx_io_coreRawSource")))
@protocol MIOSKotlinx_io_coreRawSource <MIOSKotlinAutoCloseable>
@required
- (int64_t)readAtMostToSink:(MIOSKotlinx_io_coreBuffer *)sink byteCount:(int64_t)byteCount __attribute__((swift_name("readAtMostTo(sink:byteCount:)")));
@end

__attribute__((swift_name("Kotlinx_io_coreSource")))
@protocol MIOSKotlinx_io_coreSource <MIOSKotlinx_io_coreRawSource>
@required
- (BOOL)exhausted __attribute__((swift_name("exhausted()")));
- (id<MIOSKotlinx_io_coreSource>)peek __attribute__((swift_name("peek()")));
- (int32_t)readAtMostToSink:(MIOSKotlinByteArray *)sink startIndex:(int32_t)startIndex endIndex:(int32_t)endIndex __attribute__((swift_name("readAtMostTo(sink:startIndex:endIndex:)")));
- (int8_t)readByte __attribute__((swift_name("readByte()")));
- (int32_t)readInt __attribute__((swift_name("readInt()")));
- (int64_t)readLong __attribute__((swift_name("readLong()")));
- (int16_t)readShort __attribute__((swift_name("readShort()")));
- (void)readToSink:(id<MIOSKotlinx_io_coreRawSink>)sink byteCount:(int64_t)byteCount __attribute__((swift_name("readTo(sink:byteCount:)")));
- (BOOL)requestByteCount:(int64_t)byteCount __attribute__((swift_name("request(byteCount:)")));
- (void)requireByteCount:(int64_t)byteCount __attribute__((swift_name("require(byteCount:)")));
- (void)skipByteCount:(int64_t)byteCount __attribute__((swift_name("skip(byteCount:)")));
- (int64_t)transferToSink:(id<MIOSKotlinx_io_coreRawSink>)sink __attribute__((swift_name("transferTo(sink:)")));

/**
 * @note annotations
 *   kotlinx.io.InternalIoApi
*/
@property (readonly) MIOSKotlinx_io_coreBuffer *buffer __attribute__((swift_name("buffer")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpURLBuilder.Companion")))
@interface MIOSKtor_httpURLBuilderCompanion : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKtor_httpURLBuilderCompanion *shared __attribute__((swift_name("shared")));
@end

__attribute__((swift_name("Ktor_httpParametersBuilder")))
@protocol MIOSKtor_httpParametersBuilder <MIOSKtor_utilsStringValuesBuilder>
@required
@end


/**
 * @note annotations
 *   kotlin.SinceKotlin(version="1.1")
*/
__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinKVariance")))
@interface MIOSKotlinKVariance : MIOSKotlinEnum<MIOSKotlinKVariance *>
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
@property (class, readonly) MIOSKotlinKVariance *invariant __attribute__((swift_name("invariant")));
@property (class, readonly) MIOSKotlinKVariance *in __attribute__((swift_name("in")));
@property (class, readonly) MIOSKotlinKVariance *out __attribute__((swift_name("out")));
+ (MIOSKotlinArray<MIOSKotlinKVariance *> *)values __attribute__((swift_name("values()")));
@property (class, readonly) NSArray<MIOSKotlinKVariance *> *entries __attribute__((swift_name("entries")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinKTypeProjection.Companion")))
@interface MIOSKotlinKTypeProjectionCompanion : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKotlinKTypeProjectionCompanion *shared __attribute__((swift_name("shared")));

/**
 * @note annotations
 *   kotlin.jvm.JvmStatic
*/
- (MIOSKotlinKTypeProjection *)contravariantType:(id<MIOSKotlinKType>)type __attribute__((swift_name("contravariant(type:)")));

/**
 * @note annotations
 *   kotlin.jvm.JvmStatic
*/
- (MIOSKotlinKTypeProjection *)covariantType:(id<MIOSKotlinKType>)type __attribute__((swift_name("covariant(type:)")));

/**
 * @note annotations
 *   kotlin.jvm.JvmStatic
*/
- (MIOSKotlinKTypeProjection *)invariantType:(id<MIOSKotlinKType>)type __attribute__((swift_name("invariant(type:)")));
@property (readonly) MIOSKotlinKTypeProjection *STAR __attribute__((swift_name("STAR")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpHeaderValueParam")))
@interface MIOSKtor_httpHeaderValueParam : MIOSBase
- (instancetype)initWithName:(NSString *)name value:(NSString *)value __attribute__((swift_name("init(name:value:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithName:(NSString *)name value:(NSString *)value escapeValue:(BOOL)escapeValue __attribute__((swift_name("init(name:value:escapeValue:)"))) __attribute__((objc_designated_initializer));
- (MIOSKtor_httpHeaderValueParam *)doCopyName:(NSString *)name value:(NSString *)value escapeValue:(BOOL)escapeValue __attribute__((swift_name("doCopy(name:value:escapeValue:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) BOOL escapeValue __attribute__((swift_name("escapeValue")));
@property (readonly) NSString *name __attribute__((swift_name("name")));
@property (readonly) NSString *value __attribute__((swift_name("value")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpHeaderValueWithParameters.Companion")))
@interface MIOSKtor_httpHeaderValueWithParametersCompanion : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKtor_httpHeaderValueWithParametersCompanion *shared __attribute__((swift_name("shared")));
- (id _Nullable)parseValue:(NSString *)value init:(id _Nullable (^)(NSString *, NSArray<MIOSKtor_httpHeaderValueParam *> *))init __attribute__((swift_name("parse(value:init:)")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Ktor_httpContentType.Companion")))
@interface MIOSKtor_httpContentTypeCompanion : MIOSBase
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
+ (instancetype)companion __attribute__((swift_name("init()")));
@property (class, readonly, getter=shared) MIOSKtor_httpContentTypeCompanion *shared __attribute__((swift_name("shared")));
- (MIOSKtor_httpContentType *)parseValue:(NSString *)value __attribute__((swift_name("parse(value:)")));
@property (readonly) MIOSKtor_httpContentType *Any __attribute__((swift_name("Any")));
@end

__attribute__((swift_name("Kotlinx_io_coreRawSink")))
@protocol MIOSKotlinx_io_coreRawSink <MIOSKotlinAutoCloseable>
@required
- (void)flush __attribute__((swift_name("flush()")));
- (void)writeSource:(MIOSKotlinx_io_coreBuffer *)source byteCount:(int64_t)byteCount __attribute__((swift_name("write(source:byteCount:)")));
@end

__attribute__((swift_name("Kotlinx_io_coreSink")))
@protocol MIOSKotlinx_io_coreSink <MIOSKotlinx_io_coreRawSink>
@required
- (void)emit __attribute__((swift_name("emit()")));

/**
 * @note annotations
 *   kotlinx.io.InternalIoApi
*/
- (void)hintEmit __attribute__((swift_name("hintEmit()")));
- (int64_t)transferFromSource:(id<MIOSKotlinx_io_coreRawSource>)source __attribute__((swift_name("transferFrom(source:)")));
- (void)writeSource:(id<MIOSKotlinx_io_coreRawSource>)source byteCount_:(int64_t)byteCount __attribute__((swift_name("write(source:byteCount_:)")));
- (void)writeSource:(MIOSKotlinByteArray *)source startIndex:(int32_t)startIndex endIndex:(int32_t)endIndex __attribute__((swift_name("write(source:startIndex:endIndex:)")));
- (void)writeByteByte:(int8_t)byte __attribute__((swift_name("writeByte(byte:)")));
- (void)writeIntInt:(int32_t)int_ __attribute__((swift_name("writeInt(int:)")));
- (void)writeLongLong:(int64_t)long_ __attribute__((swift_name("writeLong(long:)")));
- (void)writeShortShort:(int16_t)short_ __attribute__((swift_name("writeShort(short:)")));

/**
 * @note annotations
 *   kotlinx.io.InternalIoApi
*/
@property (readonly) MIOSKotlinx_io_coreBuffer *buffer __attribute__((swift_name("buffer")));
@end

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Kotlinx_io_coreBuffer")))
@interface MIOSKotlinx_io_coreBuffer : MIOSBase <MIOSKotlinx_io_coreSource, MIOSKotlinx_io_coreSink>
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (void)clear __attribute__((swift_name("clear()")));
- (void)close __attribute__((swift_name("close()")));
- (MIOSKotlinx_io_coreBuffer *)doCopy __attribute__((swift_name("doCopy()")));
- (void)doCopyToOut:(MIOSKotlinx_io_coreBuffer *)out startIndex:(int64_t)startIndex endIndex:(int64_t)endIndex __attribute__((swift_name("doCopyTo(out:startIndex:endIndex:)")));
- (void)emit __attribute__((swift_name("emit()")));
- (BOOL)exhausted __attribute__((swift_name("exhausted()")));
- (void)flush __attribute__((swift_name("flush()")));
- (int8_t)getPosition:(int64_t)position __attribute__((swift_name("get(position:)")));

/**
 * @note annotations
 *   kotlinx.io.InternalIoApi
*/
- (void)hintEmit __attribute__((swift_name("hintEmit()")));
- (id<MIOSKotlinx_io_coreSource>)peek __attribute__((swift_name("peek()")));
- (int64_t)readAtMostToSink:(MIOSKotlinx_io_coreBuffer *)sink byteCount:(int64_t)byteCount __attribute__((swift_name("readAtMostTo(sink:byteCount:)")));
- (int32_t)readAtMostToSink:(MIOSKotlinByteArray *)sink startIndex:(int32_t)startIndex endIndex:(int32_t)endIndex __attribute__((swift_name("readAtMostTo(sink:startIndex:endIndex:)")));
- (int8_t)readByte __attribute__((swift_name("readByte()")));
- (int32_t)readInt __attribute__((swift_name("readInt()")));
- (int64_t)readLong __attribute__((swift_name("readLong()")));
- (int16_t)readShort __attribute__((swift_name("readShort()")));
- (void)readToSink:(id<MIOSKotlinx_io_coreRawSink>)sink byteCount:(int64_t)byteCount __attribute__((swift_name("readTo(sink:byteCount:)")));
- (BOOL)requestByteCount:(int64_t)byteCount __attribute__((swift_name("request(byteCount:)")));
- (void)requireByteCount:(int64_t)byteCount __attribute__((swift_name("require(byteCount:)")));
- (void)skipByteCount:(int64_t)byteCount __attribute__((swift_name("skip(byteCount:)")));
- (NSString *)description __attribute__((swift_name("description()")));
- (int64_t)transferFromSource:(id<MIOSKotlinx_io_coreRawSource>)source __attribute__((swift_name("transferFrom(source:)")));
- (int64_t)transferToSink:(id<MIOSKotlinx_io_coreRawSink>)sink __attribute__((swift_name("transferTo(sink:)")));
- (void)writeSource:(MIOSKotlinx_io_coreBuffer *)source byteCount:(int64_t)byteCount __attribute__((swift_name("write(source:byteCount:)")));
- (void)writeSource:(id<MIOSKotlinx_io_coreRawSource>)source byteCount_:(int64_t)byteCount __attribute__((swift_name("write(source:byteCount_:)")));
- (void)writeSource:(MIOSKotlinByteArray *)source startIndex:(int32_t)startIndex endIndex:(int32_t)endIndex __attribute__((swift_name("write(source:startIndex:endIndex:)")));
- (void)writeByteByte:(int8_t)byte __attribute__((swift_name("writeByte(byte:)")));
- (void)writeIntInt:(int32_t)int_ __attribute__((swift_name("writeInt(int:)")));
- (void)writeLongLong:(int64_t)long_ __attribute__((swift_name("writeLong(long:)")));
- (void)writeShortShort:(int16_t)short_ __attribute__((swift_name("writeShort(short:)")));

/**
 * @note annotations
 *   kotlinx.io.InternalIoApi
*/
@property (readonly) MIOSKotlinx_io_coreBuffer *buffer __attribute__((swift_name("buffer")));
@property (readonly) int64_t size __attribute__((swift_name("size")));
@end

#pragma pop_macro("_Nullable_result")
#pragma clang diagnostic pop
NS_ASSUME_NONNULL_END
