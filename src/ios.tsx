import { type EmitterSubscription, NativeEventEmitter } from 'react-native';

let presentActionListeners: {
  onLaunch?: EmitterSubscription;
  onCompletion?: EmitterSubscription;
} = {
  onLaunch: undefined,
  onCompletion: undefined,
};

export const AtomicIOS = {
  transact({
    TransactReactNative,
    config,
    environment,
    onInteraction,
    onFinish,
    onDataRequest,
    onClose,
  }: {
    TransactReactNative: any;
    config: any;
    environment?: String;
    onInteraction?: Function;
    onDataRequest?: Function;
    onFinish?: Function;
    onClose?: Function;
  }): void {
    const TransactReactNativeEvents = new NativeEventEmitter(
      TransactReactNative
    );
    let onInteractionListener: any = undefined;
    let onDataRequestListener: any = undefined;

    const removeListeners = () => {
      if (onInteractionListener) onInteractionListener.remove();
      if (onDataRequestListener) onDataRequestListener.remove();
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
        (request) => onDataRequest(request)
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
    onCompletion,
  }: {
    TransactReactNative: any;
    id: String;
    environment?: String;
    onLaunch?: Function;
    onCompletion?: Function;
  }): void {
    const TransactReactNativeEvents = new NativeEventEmitter(
      TransactReactNative
    );

    if (presentActionListeners.onLaunch) {
      presentActionListeners.onLaunch.remove();
    }

    if (presentActionListeners.onCompletion) {
      presentActionListeners.onCompletion.remove();
    }

    if (onLaunch) {
      presentActionListeners.onLaunch = TransactReactNativeEvents.addListener(
        'onLaunch',
        () => onLaunch()
      );
    }

    if (onCompletion) {
      presentActionListeners.onCompletion =
        TransactReactNativeEvents.addListener('onCompletion', () =>
          onCompletion()
        );
    }

    TransactReactNative.presentAction(id, environment);
  },
};
