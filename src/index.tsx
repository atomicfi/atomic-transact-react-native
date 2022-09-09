import { Appearance, NativeModules, Platform } from 'react-native'
import { AtomicIOS } from './ios'
import { AtomicAndroid } from './android'
import * as CONSTANTS from './constants'

const LINKING_ERROR =
  `The package 'transact-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n'

const TransactSdk = NativeModules.TransactSdk
  ? NativeModules.TransactSdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR)
        }
      }
    )

interface Theme {
  brandColor?: String
  overlayColor?: String
  dark?: Boolean
}

interface Task {
  product: String
  distribution?: Object
}

interface Config {
  publicToken: String
  product: String
  additionalProduct?: String
  linkedAccount?: String
  theme?: Theme
  distribution?: Object
  language?: String
  deeplink?: Object
  metadata?: Object
  search?: Object
  handoff?: String
  experiments?: Object
  tasks?: Task[]
}

export const Product = CONSTANTS.Product
export const Environment = CONSTANTS.Environment

export const Atomic = {
  transact({
    config,
    environment,
    onInteraction,
    onFinish,
    onDataRequest,
    onClose
  }: {
    config: Config
    environment?: String
    onInteraction?: Function
    onDataRequest?: Function
    onFinish?: Function
    onClose?: Function
  }): void {
    environment = environment || Environment.Production

    config.language = config.language || 'en'
    config.theme = config.theme || {}
    config.theme.dark =
      config.theme.dark !== undefined
        ? config.theme.dark
        : Appearance.getColorScheme() === 'dark'

    const args = {
      TransactSdk,
      config,
      environment,
      onInteraction,
      onFinish,
      onDataRequest,
      onClose
    }

    switch (Platform.OS) {
      case 'ios':
        AtomicIOS.transact(args)
        break
      case 'android':
        AtomicAndroid.transact(args)
        break
      default:
        throw new Error(`Unsupported OS: ${Platform.OS}`)
    }
  }
}
