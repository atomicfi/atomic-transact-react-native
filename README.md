# @atomicfi/react-native-transact-sdk

React Native bridge for the Transact SDK

## Installation

Update your `.yarnrc` file to include Atomic's scoped registry.

```bash
"@atomicfi:registry" "https://npm.pkg.github.com"
```

Install the SDK package.

```bash
$ yarn add @atomicfi/react-native-transact-sdk
$ npx pod-install
```

## Usage

```js
import { Atomic, TransactURL } from "@atomicfi/react-native-transact-sdk";

// ...

Atomic.transact({
  transactConfig: {
    product: "deposit",
    publicToken: "ad786554-544d-449a-ab43-aad33003ea4d"
  },
  transactURL: TransactURL.Production,
  onInteraction: interaction => {
    console.log('Interaction event:', interaction)
  },
  onFinish: data => {
    console.log('Finish event:', data)
  },
  onClose: data => {
    console.log('Close event:', data)
  }
})
```

## License

MIT
