# @atomicfi/react-native-transact-sdk

React Native bridge for the Transact SDK

## Installation

```sh
npm install @atomicfi/react-native-transact-sdk
```

## Usage

```js
import { presentTransact } from "@atomicfi/react-native-transact-sdk";

// ...

try {
    const response = await presentTransact({
        atomicConfig: {
            product: "deposit",
            publicToken: "ac14f174-8cf7-40e7-89ee-d933e0f5332f"
        },
        transactURL: "https://transact.atomicfi.com"
    });
    console.log(response)
}
catch (err) {
    console.log(err)
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
