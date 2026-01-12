# React Native Seel Widget Example

This example application demonstrates how to integrate and use the `react-native-seel-widget` SDK in a React Native application.

## Prerequisites

Before running this example, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optional, but recommended)

For iOS development:
- [Xcode](https://developer.apple.com/xcode/) (macOS only)
- [CocoaPods](https://cocoapods.org/) (for iOS dependencies)

For Android development:
- [Android Studio](https://developer.android.com/studio)
- Android SDK and emulator

## Installation

1. **Navigate to the example directory:**

```bash
cd example
```

2. **Install dependencies:**

Using yarn (recommended):
```bash
yarn install
```

Or using npm:
```bash
npm install
```

3. **Install iOS dependencies (iOS only):**

If you're planning to run on iOS, you need to install CocoaPods dependencies:

```bash
cd ios && pod install && cd ..
```

> **Note**: This step is only required if you're using React Native CLI. For Expo, this is handled automatically.

## Running the Example

This example uses Expo for development. You can run it on iOS, Android, or Web.

### Start the Development Server

```bash
yarn start
# or
npm start
```

This will start the Expo development server and display a QR code in your terminal.

### Run on iOS

**Option 1: Using Expo Go (Recommended for quick testing)**

1. Install [Expo Go](https://apps.apple.com/app/expo-go/id982107779) on your iOS device
2. Scan the QR code displayed in the terminal with your camera app
3. The app will open in Expo Go

**Option 2: Using iOS Simulator**

```bash
yarn ios
# or
npm run ios
```

This will open the app in the iOS Simulator (requires Xcode).

### Run on Android

**Option 1: Using Expo Go (Recommended for quick testing)**

1. Install [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) on your Android device
2. Scan the QR code displayed in the terminal with the Expo Go app
3. The app will open in Expo Go

**Option 2: Using Android Emulator**

```bash
yarn android
# or
npm run android
```

Make sure you have an Android emulator running before executing this command.

### Run on Web

```bash
yarn web
# or
npm run web
```

This will open the app in your default web browser.

## Example Pages

The example application includes several demo pages:

### 1. **Cart Page** (`/Cart`)
- Displays shopping cart items with quantity editing
- Shows Subtotal component with dynamic calculation
- Integrates SeelWFPWidget for Worry-Free Purchase option
- Includes settings button for configuration
- Fixed Checkout button at the bottom

### 2. **Settlement Page** (`/Settlement`)
- Similar to Cart Page with additional settlement features
- Demonstrates widget integration with cart items
- Shows opt-in/opt-out functionality

### 3. **Checkout Page** (`/Checkout`)
- Displays readonly cart items
- Shows Subtotal with quote price integration
- Demonstrates navigation with request data passing

### 4. **Products Page** (`/Products`)
- Displays products in a waterfall layout
- Supports pull-to-refresh and infinite scrolling
- Demonstrates ProductCell component with favorite functionality

### 5. **Skeleton Page** (`/Skeleton`)
- Shows animated skeleton loaders
- Demonstrates loading state UI patterns

## Navigation

The example uses React Navigation for screen management. You can navigate between pages using:

- **Cart**: Shopping cart with widget integration
- **Settlement**: Settlement page with widget
- **Checkout**: Checkout page with readonly items
- **Products**: Product listing with waterfall layout
- **Skeleton**: Skeleton loading examples

## Configuration

The SDK is configured in `src/App.tsx` with:

```typescript
SeelWidgetSDK.shared.configure({
  apiKey: '5ctiodrhqyfkcjqhli4wwnwi6cakrs5r',
  environment: SeelEnvironment.Development,
});
```

> **Note**: Replace the API key with your own Seel API key for production use.

## Troubleshooting

### Metro bundler issues

If you encounter issues with Metro bundler, try:

```bash
yarn start --reset-cache
# or
npm start -- --reset-cache
```

### iOS build issues

If you encounter build issues on iOS:

```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Android build issues

If you encounter build issues on Android:

1. Clean the build:
```bash
cd android
./gradlew clean
cd ..
```

2. Clear Metro cache:
```bash
yarn start --reset-cache
```

### Port already in use

If port 8081 is already in use:

```bash
# Kill the process using port 8081
lsof -ti:8081 | xargs kill -9
```

Or use a different port:
```bash
yarn start --port 8082
```

## Project Structure

```
example/
├── src/
│   ├── App.tsx                 # Main app entry with navigation
│   ├── pages/                   # Page components
│   │   ├── cart-page.tsx       # Cart page
│   │   ├── checkout-page.tsx   # Checkout page
│   │   ├── settlement-page.tsx # Settlement page
│   │   ├── products-page.tsx   # Products page
│   │   ├── settings-page.tsx   # Settings page
│   │   └── skeleton-page.tsx   # Skeleton page
│   ├── components/              # Reusable components
│   │   ├── cart-cell.tsx       # Cart item component
│   │   ├── product-cell.tsx    # Product item component
│   │   └── subtotal.tsx        # Subtotal component
│   ├── mocks/                   # Mock data
│   └── types/                   # TypeScript types
│       └── navigation.ts        # Navigation types
├── assets/                      # Images and assets
├── app.json                     # Expo configuration
├── package.json                 # Dependencies
└── README.md                    # This file
```

## Learn More

- [React Native Seel Widget Documentation](../README.md)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)

## Support

For issues and questions:
- Check the [main README](../README.md) for SDK documentation
- Open an issue on [GitHub](https://github.com/kover-ai/react-native-seel-widget/issues)

