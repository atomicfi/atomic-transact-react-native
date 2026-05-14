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
    let onInteractionListener: any;
    let onDataRequestListener: any;
    let onLaunchListener: any;
    let onAuthStatusUpdateListener: any;
    let onDebugLogListener: any;

    const removeListeners = () => {
      if (onInteractionListener) onInteractionListener.remove();
      if (onDataRequestListener) onDataRequestListener.remove();
      if (onLaunchListener) onLaunchListener.remove();
      if (onAuthStatusUpdateListener) onAuthStatusUpdateListener.remove();
      if (onDebugLogListener) onDebugLogListener.remove();
    };

    onDebugLogListener = TransactReactNativeEvents.addListener(
      'onDebugLog',
      (log) => {
        console.debug('[TransactNative]', log.message);
      }
    );

    if (onInteraction) {
      onInteractionListener = TransactReactNativeEvents.addListener(
        'onInteraction',
        (interaction) => onInteraction(interaction)
      );
    }

    if (onDataRequest) {
      onDataRequestListener = TransactReactNativeEvents.addListener(
        'onDataRequest',
        async (request) => {
          try {
            // Call the user's onDataRequest handler
            const response = await onDataRequest(request);

            // Send the response back to native code
            TransactReactNative.resolveDataRequest(response);

            return response;
          } catch (error) {
            console.error('## Error in onDataRequest:', error);
            // Send null as response in case of error
            TransactReactNative.resolveDataRequest(null);
            return null;
          }
        }
      );
    }

    if (onLaunch) {
      onLaunchListener = TransactReactNativeEvents.addListener('onLaunch', () =>
        onLaunch()
      );
    }

    if (onAuthStatusUpdate) {
      onAuthStatusUpdateListener = TransactReactNativeEvents.addListener(
        'onAuthStatusUpdate',
        (authStatus) => onAuthStatusUpdate(authStatus)
      );
    }

    if (onTaskStatusUpdate) {
      TransactReactNativeEvents.addListener(
        'onTaskStatusUpdate',
        (taskStatus) => onTaskStatusUpdate(taskStatus)
      );
    }

    TransactReactNative.presentTransact(
      config,
      environment,
      presentationStyleIOS,
      setDebug,
      wrapperVersion
    ).then((event: any) => {
      if (event.finished && onFinish) {
        removeListeners();
        onFinish(event.finished);
      } else if (event.closed && onClose) {
        removeListeners();
        onClose(event.closed);
      }
    });
  },
  hideTransact(TransactReactNative: any): Promise<void> {
    return TransactReactNative.hideTransact();
  },
};
