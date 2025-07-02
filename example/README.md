# Atomic Transact React Native Example App

This is an example app demonstrating the integration of the `@atomicfi/transact-react-native` package using Expo.

## Workspace Setup

This example app is part of the `@atomicfi/transact-react-native` workspace. Follow these steps to get it running:

### 1. Clone and Setup the Workspace

```bash
# Clone the repository (if not already done)
git clone <repository-url>
cd atomic-transact-react-native

# Install all workspace dependencies and run prepare scripts
yarn install
```

**Note**: `yarn install` automatically runs the `prepare` script which builds the main package using `bob build`. If you need to rebuild the package later, you can run:

```bash
# Manually rebuild the @atomicfi/transact-react-native package
yarn prepare
```

### 2. Navigate to Example Directory

```bash
cd example
```

### 3. Install Example Dependencies

```bash
# Install example-specific dependencies
yarn install
```

## Running the App

Since this app uses native modules, you **must** use Expo Dev Client instead of Expo Go.

### Option 1: Build and Run Locally (Recommended for Development)

#### iOS:

```bash
yarn ios
```

#### Android:

```bash
yarn android
```

These commands will:

1. Build a development client with the native modules
2. Install it on your simulator/device
3. Start the Metro bundler

### Option 2: Build with EAS Build (For Physical Devices)

#### Setup EAS (first time only):

```bash
eas login
eas build:configure
```

#### Build Development Client:

```bash
# For iOS
yarn build:ios

# For Android
yarn build:android
```

Then install the built app on your device and run:

```bash
yarn start
```

### Development Server Only:

```bash
yarn start
```

This starts the Metro bundler, but you need a dev client already installed.

## Development Workflow

When making changes to the main `@atomicfi/transact-react-native` package:

1. Make your changes in the `src/` directory (workspace root)
2. Rebuild the package: `yarn prepare` (from workspace root)
3. Restart the Metro bundler in the example app
4. Test your changes in the example app

## Using the Example App

### 1. Home Screen

- Overview of available features
- Navigation to different demo screens
- Information about the SDK capabilities

### 2. Transact Screen

- **Configuration**: Enter your Atomic public token
- **Environment**: Choose between Sandbox, Production, or Custom URL
- **Theme**: Toggle between Dark and Light modes
- **Product Selection**: Choose from available products (Deposit, Present, Switch)
- **Automatic Scope**: Scope is automatically set based on product selection:
  - **Deposit** → User Link scope
  - **Present/Switch** → Pay Link scope
- **Launch**: Initiate the Transact flow with your configuration

### 3. Present Action Screen

- **Action ID Input**: Enter a specific action ID to launch
- **Environment**: Choose between Sandbox, Production, or Custom URL
- **Launch**: Present the specified action

## Configuration

### Getting Atomic Credentials

To test the actual flows, you'll need:

1. **Public Token**: Obtain from Atomic Financial dashboard
2. **Environment**: Use Sandbox for testing, Production for live transactions, or Custom URL for custom environments
3. **Action IDs**: Get specific action IDs from your Atomic integration

### Environment Options

- **Sandbox**: Default testing environment
- **Production**: Live environment for real transactions
- **Custom URL**: Enter a custom environment URL (e.g., for staging environments)

### Example Configuration

The app automatically generates configurations like this:

```typescript
const config = {
  publicToken: 'your-public-token-here',
  scope: getScope(), // Automatically determined by product selection
  tasks: [
    {
      operation: selectedProduct, // Product.DEPOSIT, Product.PRESENT, or Product.SWITCH
    },
  ],
};

// Environment is automatically configured based on selection:
const environment = getEnvironment(); // Environment.sandbox, Environment.production, or Environment.custom(url, apiUrl)
```

## Package Scripts

Available scripts in the example directory:

```bash
# Development
yarn start          # Start Metro bundler
yarn ios           # Build and run on iOS simulator
yarn android       # Build and run on Android emulator

# Building
yarn build:ios     # Build iOS development client with EAS
yarn build:android # Build Android development client with EAS

# Linting and Type Checking
yarn lint          # Run ESLint
yarn type-check    # Run TypeScript compiler check
```

## Workspace Scripts

Available scripts from the workspace root:

```bash
# Build the main package
yarn prepare

# Run tests
yarn test

# Lint the entire workspace
yarn lint

# Type check the entire workspace
yarn typecheck
```

## Troubleshooting

### Common Issues

1. **"Cannot run on Expo Go"**: This app requires Expo Dev Client due to native modules
2. **"Linking Error"**: Ensure you've built a development client with native modules
3. **"Invalid Public Token"**: Verify your token is correct and environment matches
4. **"Action Not Found"**: Check that the action ID exists in your environment
5. **"Package not found"**: Run `yarn prepare` from the workspace root to build the main package
6. **"Metro bundler issues"**: Try clearing Metro cache: `yarn start --clear`

### Development Tips

- Always run `yarn prepare` from workspace root after making changes to the main package
- Use Sandbox environment for testing
- Check console logs for detailed callback information
- Verify your Atomic dashboard configuration
- Test on both iOS and Android platforms
- Use `yarn ios` or `yarn android` for the easiest setup

### Building for Physical Devices

If you need to test on a physical device:

1. Install EAS CLI: `npm install -g eas-cli`
2. Login to EAS: `eas login`
3. Build development client: `yarn build:ios` or `yarn build:android`
4. Install the built app on your device
5. Run `yarn start` and scan QR code

### Workspace Development

When working on the main package:

1. Make changes in `src/` (workspace root)
2. Run `yarn prepare` (workspace root)
3. Restart Metro in example app
4. Test changes

## File Structure

```
atomic-transact-react-native/
├── src/                     # Main package source
├── example/                 # Example app
│   ├── screens/            # App screens
│   ├── App.tsx            # Main app component
│   └── package.json       # Example dependencies
├── package.json           # Workspace root
└── README.md             # Main package README
```

## Package Information

- **Package**: `@atomicfi/transact-react-native`
- **Version**: Check package.json for current version
- **Documentation**: [Atomic Financial Docs](https://docs.atomicfi.com/reference/transact-sdk#libraries__react-native)

## Support

For additional support:

- [Atomic Financial Documentation](https://docs.atomicfi.com)
- [Expo Dev Client Documentation](https://docs.expo.dev/development/build/)
- [React Native Documentation](https://reactnative.dev)
