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
    onFinish,
    onClose,
  }: {
    TransactReactNative: any;
    id: String;
    environment?: String;
    onLaunch?: Function;
    onFinish?: Function;
    onClose?: Function;
  }): void {
    const TransactReactNativeEvents = new NativeEventEmitter(
      TransactReactNative
    );

    let onLaunchListener: any = undefined;

    const removeListeners = () => {
      if (onLaunchListener) onLaunchListener.remove();
    };

    if (onLaunch) {
      onLaunchListener = TransactReactNativeEvents.addListener('onLaunch', () =>
        onLaunch()
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
