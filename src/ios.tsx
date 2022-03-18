import { NativeEventEmitter, Platform } from 'react-native'

export const AtomicIOS = {
  transact({
    TransactSdk,
    config,
    environment,
    onInteraction,
    onFinish,
    onDataRequest,
    onClose
  }: {
    TransactSdk: any
    config: any
    environment?: String
    onInteraction?: Function
    onDataRequest?: Function
    onFinish?: Function
    onClose?: Function
  }): void {
    config.platform = {
      name: 'ios',
      version: Platform.Version.toString()
    }

    const TransactSdkEvents = new NativeEventEmitter(TransactSdk)
    let onInteractionListener: any = undefined
    let onDataRequestListener: any = undefined

    const removeListeners = () => {
      if (onInteractionListener) onInteractionListener.remove()
      if (onDataRequestListener) onDataRequestListener.remove()
    }

    if (onInteraction) {
      onInteractionListener = TransactSdkEvents.addListener('onInteraction', (interaction) =>
        onInteraction(interaction)
      )
    }

    if (onDataRequest) {
      onDataRequestListener = TransactSdkEvents.addListener('onDataRequest', (request) =>
        onDataRequest(request)
      )
    }

    TransactSdk.presentTransact(config, environment).then((event: any) => {
      if (event.finished && onFinish) {
        removeListeners()
        onFinish(event.finished)
      } else if (event.closed && onClose) {
        removeListeners()
        onClose(event.closed)
      }
    })
  }
}
