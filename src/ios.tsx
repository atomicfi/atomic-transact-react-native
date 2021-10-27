import { NativeEventEmitter } from 'react-native';
import type { Environment } from '.';

export const AtomicIOS = {
  transact({
    TransactSdk,
    config,
    environment,
    onInteraction,
    onFinish,
    onDataRequest,
    onClose,
  }: {
    TransactSdk: any;
    config: Object;
    environment?: Environment;
    onInteraction?: Function;
    onDataRequest?: Function;
    onFinish?: Function;
    onClose?: Function;
  }): void {
    const TransactSdkEvents = new NativeEventEmitter(TransactSdk);

    if (onInteraction) {
      TransactSdkEvents.addListener('onInteraction', (interaction) =>
        onInteraction(interaction)
      );
    }

    if (onDataRequest) {
      TransactSdkEvents.addListener('onDataRequest', (request) =>
        onDataRequest(request)
      );
    }

    TransactSdk.presentTransact(config, environment).then((event: any) => {
      if (event.finished && onFinish) {
        onFinish(event.finished);
      } else if (event.closed && onClose) {
        onClose(event.closed);
      }
    });
  },
};
