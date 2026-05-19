import { NativeEventEmitter } from 'react-native';
import * as CONSTANTS from './constants';

export const AtomicIOS = {
  transact({
    TransactReactNative,
    config,
    environment,
    wrapperVersion,
    onInteraction,
    onLaunch,
    onFinish,
    onDataRequest,
    onClose,
    onAuthStatusUpdate,
    onTaskStatusUpdate,
    presentationStyleIOS,
    setDebug,
  }: {
    TransactReactNative: any;
    config: any;
    environment?: CONSTANTS.TransactEnvironment;
    wrapperVersion: string;
    onInteraction?: Function;
    onDataRequest?: Function;
    onLaunch?: Function;
    onFinish?: Function;
    onClose?: Function;
    onAuthStatusUpdate?: Function;
    onTaskStatusUpdate?: Function;
    presentationStyleIOS?: CONSTANTS.PresentationStyleIOS;
    setDebug?: boolean;
  }): void {
    const TransactReactNativeEvents = new NativeEventEmitter(
      TransactReactNative
    );

    const setListener = (event: string, handler?: Function) => {
      TransactReactNativeEvents.removeAllListeners(event);
      if (handler) {
        TransactReactNativeEvents.addListener(event, (payload) =>
          handler(payload)
        );
      }
    };

    setListener('onDebugLog', (log: any) => {
      console.debug('[TransactNative]', log.message);
    });

    setListener(
      'onInteraction',
      onInteraction && ((interaction: any) => onInteraction(interaction))
    );

    setListener(
      'onDataRequest',
      onDataRequest &&
        (async (request: any) => {
          try {
            const response = await onDataRequest(request);
            TransactReactNative.resolveDataRequest(response);
            return response;
          } catch (error) {
            console.error('## Error in onDataRequest:', error);
            TransactReactNative.resolveDataRequest(null);
            return null;
          }
        })
    );

    setListener('onLaunch', onLaunch && (() => onLaunch()));

    setListener(
      'onAuthStatusUpdate',
      onAuthStatusUpdate &&
        ((authStatus: any) => onAuthStatusUpdate(authStatus))
    );

    setListener(
      'onTaskStatusUpdate',
      onTaskStatusUpdate &&
        ((taskStatus: any) => onTaskStatusUpdate(taskStatus))
    );

    TransactReactNative.presentTransact(
      config,
      environment,
      presentationStyleIOS,
      setDebug,
      wrapperVersion
    ).then((event: any) => {
      if (event.finished && onFinish) {
        onFinish(event.finished);
      } else if (event.closed && onClose) {
        onClose(event.closed);
      }
    });
  },
  hideTransact(TransactReactNative: any): Promise<void> {
    return TransactReactNative.hideTransact();
  },
};
