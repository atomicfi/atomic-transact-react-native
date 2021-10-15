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
import { presentTransact, TransactURL } from "@atomicfi/react-native-transact-sdk";

// ...

try {
    const response = await presentTransact({
        atomicConfig: {
            product: "deposit",
            publicToken: "ac14f174-8cf7-40e7-89ee-d933e0f5332f"
        },
        transactURL: TransactURL.Sandbox
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
