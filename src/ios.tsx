import { NativeEventEmitter } from 'react-native';

export const AtomicIOS = {
  transact({
    TransactReactNative,
    config,
    environment,
    onInteraction,
    onFinish,
    onDataRequest,
    onClose,
    onAuthStatusUpdate,
    onTaskStatusUpdate,
  }: {
    TransactReactNative: any;
    config: any;
    environment?: String;
    onInteraction?: Function;
    onDataRequest?: Function;
    onFinish?: Function;
    onClose?: Function;
    onAuthStatusUpdate?: Function;
    onTaskStatusUpdate?: Function;
  }): void {
    const TransactReactNativeEvents = new NativeEventEmitter(
      TransactReactNative
    );
    let onInteractionListener: any;
    let onDataRequestListener: any;
    let onAuthStatusUpdateListener: any;

    const removeListeners = () => {
      if (onInteractionListener) onInteractionListener.remove();
      if (onDataRequestListener) onDataRequestListener.remove();
      if (onAuthStatusUpdateListener) onAuthStatusUpdateListener.remove();
    };

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

    TransactReactNative.presentTransact(config, environment).then(
      (event: any) => {
        if (event.finished && onFinish) {
          removeListeners();
          onFinish(event.finished);
        } else if (event.closed && onClose) {
          removeListeners();
          onClose(event.closed);
        }
      }
    );
  },
  presentAction({
    TransactReactNative,
    id,
    environment,
    onLaunch,
    onFinish,
    onClose,
    onAuthStatusUpdate,
    onTaskStatusUpdate,
  }: {
    TransactReactNative: any;
    id: String;
    environment?: String;
    onLaunch?: Function;
    onFinish?: Function;
    onClose?: Function;
    onAuthStatusUpdate?: Function;
    onTaskStatusUpdate?: Function;
  }): void {
    const TransactReactNativeEvents = new NativeEventEmitter(
      TransactReactNative
    );
    let onLaunchListener: any;
    let onAuthStatusUpdateListener: any;

    const removeListeners = () => {
      if (onLaunchListener) onLaunchListener.remove();
      if (onAuthStatusUpdateListener) onAuthStatusUpdateListener.remove();
    };

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

    TransactReactNative.presentAction(id, environment).then((event: any) => {
      if (event.finished && onFinish) {
        removeListeners();
        onFinish(event.finished);
      } else if (event.closed && onClose) {
        removeListeners();
        onClose(event.closed);
      }
    });
  },
};
