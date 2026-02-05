# react-native-seel-widget

[![npm version](https://img.shields.io/npm/v/react-native-seel-widget.svg)](https://www.npmjs.com/package/react-native-seel-widget)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Seel Widget SDK for React Native - Integrate Seel's Worry-Free Purchase (WFP) widget into your React Native applications for iOS, Android, and Web.

## Features

- 🎯 **Cross-platform**: Works on iOS, Android, and Web
- 🔒 **Type-safe**: Full TypeScript support
- ⚡ **Easy Integration**: Simple API with minimal setup
- 🎨 **Customizable**: Flexible styling and configuration options
- 💾 **Persistent Storage**: Automatic opt-in/opt-out preference management
- 🌍 **Multi-domain Support**: Support for US and EU regions

## Installation

### Using npm

```bash
npm install react-native-seel-widget
```

### Using yarn

```bash
yarn add react-native-seel-widget
```

### Using Expo

```bash
npx expo install react-native-seel-widget
```

### iOS Setup (React Native CLI only)

If you're using React Native CLI (not Expo), you need to install iOS dependencies:

```bash
cd ios && pod install
```

### Additional Dependencies

This library requires `@react-native-async-storage/async-storage` for storing user preferences. It should be installed automatically, but if you encounter issues:

```bash
npm install @react-native-async-storage/async-storage
# or
yarn add @react-native-async-storage/async-storage
```

## Requirements

- React Native >= 0.70.0
- React >= 18.0.0

## Quick Start

### Step 1: Configure the SDK

Configure the SDK in your app entry point (e.g., `App.tsx`):

```tsx
import { SeelWidgetSDK, SeelEnvironment } from 'react-native-seel-widget';

// Configure SDK before using any components
SeelWidgetSDK.shared.configure({
  apiKey: 'your-api-key-here',
  environment: SeelEnvironment.Development, // or SeelEnvironment.Production
  requestTimeout: 5000, // Optional: Request timeout in milliseconds (default: 5000)
  optOutExpiredTime: 31536000000, // Optional: Opt-out expiration time in milliseconds (default: 365 days)
});
```

### Step 2: Use the Widget Component

The widget supports two usage modes: **Manual Mode** and **Auto Mode**.

#### Manual Mode (Recommended for complex scenarios)

Use `ref.setup()` to manually trigger quote requests:

```tsx
import React, { useRef, useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  SeelWFPWidget,
  DomainEnum,
  type IQuotesRequest,
  type IQuotesResponse,
  type SeelWFPWidgetRef,
} from 'react-native-seel-widget';

export default function CheckoutPage() {
  const seelWidgetRef = useRef<SeelWFPWidgetRef>(null);
  const [request, setRequest] = useState<IQuotesRequest>({
    session_id: 'session-123',
    type: 'checkout',
    device_category: 'mobile',
    device_platform: 'ios',
    line_items: [/* ... */],
    customer: { customer_id: 'xxx', email: 'xxx@example.com' },
    shipping_address: { /* ... */ },
    extra_info: { shipping_fee: 0, total_discounts: 0, total_sales_tax: 0 },
  });

  useEffect(() => {
    // Manually trigger request when data is ready
    seelWidgetRef.current?.setup(request);
  }, [request]);

  return (
    <SeelWFPWidget
      ref={seelWidgetRef}
      domain={DomainEnum.US}
      defaultOptedIn={false}
      onChangeValue={({ optedIn, quotesResponse }) => {
        console.log('Opt-in:', optedIn, 'Price:', quotesResponse?.price);
      }}
    />
  );
}
```

#### Auto Mode (Recommended for simple scenarios)

Let the widget automatically fetch quotes when `request` prop changes:

```tsx
import React, { useState } from 'react';
import {
  SeelWFPWidget,
  DomainEnum,
  type IQuotesRequest,
} from 'react-native-seel-widget';

export default function CheckoutPage() {
  const [request, setRequest] = useState<IQuotesRequest>({
    session_id: 'session-123',
    type: 'checkout',
    device_category: 'mobile',
    device_platform: 'ios',
    line_items: [/* ... */],
    customer: { customer_id: 'xxx', email: 'xxx@example.com' },
    shipping_address: { /* ... */ },
    extra_info: { shipping_fee: 0, total_discounts: 0, total_sales_tax: 0 },
  });

  return (
    <SeelWFPWidget
      domain={DomainEnum.US}
      request={request}        // Pass request data
      autoFetch={true}         // Enable auto-fetch
      debounceMs={500}         // Debounce 500ms (optional)
      defaultOptedIn={false}
      onChangeValue={({ optedIn, quotesResponse }) => {
        console.log('Opt-in:', optedIn, 'Price:', quotesResponse?.price);
      }}
    />
  );
}
```

## API Reference

### SeelWidgetSDK

The main SDK class for configuration.

#### Methods

##### `configure(props: SeelWidgetSDKProps)`

Configure the SDK with your API key and settings.

**Parameters:**

- `apiKey` (string, required): Your Seel API key
- `environment` (SeelEnvironment, optional): `SeelEnvironment.Development` or `SeelEnvironment.Production` (default: `Production`)
- `apiVersion` (string, optional): API version (default: `'2.6.0'`)
- `requestTimeout` (number, optional): Request timeout in milliseconds (default: `5000`)
- `optOutExpiredTime` (number, optional): Opt-out expiration time in milliseconds (default: `31536000000` = 365 days)

**Example:**

```tsx
SeelWidgetSDK.shared.configure({
  apiKey: 'your-api-key',
  environment: SeelEnvironment.Development,
  requestTimeout: 10000,
  optOutExpiredTime: 86400000, // 1 day
});
```

#### Properties

- `SeelWidgetSDK.shared.apiKey`: Get current API key
- `SeelWidgetSDK.shared.apiVersion`: Get current API version
- `SeelWidgetSDK.shared.environment`: Get current environment
- `SeelWidgetSDK.shared.requestTimeout`: Get current request timeout
- `SeelWidgetSDK.shared.optOutExpiredTime`: Get current opt-out expiration time

### SeelWFPWidget

The main widget component for displaying the Worry-Free Purchase option.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `domain` | `DomainEnum` | Yes | - | The domain/region (`DomainEnum.US` or `DomainEnum.EU`) |
| `defaultOptedIn` | `boolean` | Yes | `false` | Default opt-in state |
| `onChangeValue` | `(params) => void` | Yes | - | Callback when opt-in status or quote response changes |
| `request` | `IQuotesRequest` | No | - | Request data for auto-fetch mode |
| `autoFetch` | `boolean` | No | `false` | Enable auto-fetch when `request` prop changes |
| `debounceMs` | `number` | No | `300` | Debounce delay in milliseconds for auto-fetch |

#### Ref Methods

##### `setup(quote: IQuotesRequest)`

Manually trigger a quote request.

```tsx
seelWidgetRef.current?.setup(quoteRequest);
```

##### `refresh()`

Refresh using the last request data. Useful for retry scenarios.

```tsx
seelWidgetRef.current?.refresh();
```

##### `cancel()`

Cancel any pending request. Useful when navigating away or resetting state.

```tsx
seelWidgetRef.current?.cancel();
```

#### Features

- **Race Condition Handling**: Automatically ignores outdated responses when multiple requests are made rapidly
- **Debounce Support**: Prevents excessive API calls when `request` changes frequently in auto mode
- **Cleanup on Unmount**: Automatically cancels pending requests when component unmounts

#### Example: Manual Mode with Refresh

```tsx
const seelWidgetRef = useRef<SeelWFPWidgetRef>(null);

// Initial setup
useEffect(() => {
  seelWidgetRef.current?.setup(request);
}, []);

// Refresh button handler
const handleRefresh = () => {
  seelWidgetRef.current?.refresh();
};

// Cancel on navigation
useEffect(() => {
  return () => {
    seelWidgetRef.current?.cancel();
  };
}, []);
```

### IQuotesRequest

Interface for quote request data.

```tsx
interface IQuotesRequest {
  session_id: string;
  type: string;
  device_category: string;
  device_platform: string;
  line_items: IQuotesRequestLineItem[];
  customer: IQuotesRequestCustomer;
  shipping_address: IShippingAddress;
  extra_info: IQuotesRequestExtraInfo;
  is_default_on?: boolean; // Optional: Default opt-in state
  // ... other optional fields
}

interface IQuotesRequestLineItem {
  product_id: string;
  product_title: string;
  price: number;
  quantity: number;
  image_urls?: string[];
  allocated_discounts: number;
  category_1: string;
  category_2: string;
  currency: string;
  final_price: number | string;
  is_final_sale: boolean;
  line_item_id: string;
  requires_shipping: boolean;
  sales_tax: number;
  // ... other optional fields
}
```

> **Note**: For a complete list of all available fields, refer to the TypeScript definitions in the package.

### DomainEnum

Enum for supported domains/regions.

```tsx
enum DomainEnum {
  Idle = '',
  US = 'US',
  EU = 'EU',
}
```

### SeelEnvironment

Enum for SDK environments.

```tsx
enum SeelEnvironment {
  Development = 'development',
  Production = 'production',
}
```

## Additional Components

### SeelWFPTitleView

A standalone title view component for displaying the widget title and price.

```tsx
import { SeelWFPTitleView, ResponseStatusEnum } from 'react-native-seel-widget';

<SeelWFPTitleView
  status={ResponseStatusEnum.Accepted}
  title="Worry-Free Purchase"
  price={4.99}
  optedIn={false}
  onChangeOptedInValue={(optedIn) => {
    console.log('Opt-in changed:', optedIn);
  }}
/>
```

### SeelWFPInfoView

A standalone info view component for displaying detailed widget information.

```tsx
import { SeelWFPInfoView, DomainEnum } from 'react-native-seel-widget';

<SeelWFPInfoView
  domain={DomainEnum.US}
  widgetTitle="Worry-Free Purchase"
  termsUrl="https://example.com/terms"
  privacyPolicyUrl="https://example.com/privacy"
  onChangeOptedInValue={(optedIn) => {
    console.log('Opt-in changed:', optedIn);
  }}
/>
```

## Examples

Check out the [example](./example) directory for complete working examples including:

- Basic widget integration
- Cart page with widget
- Settlement page with widget
- Settings page
- Products page with waterfall layout

To run the example:

```bash
cd example
yarn install
yarn start
```

## TypeScript Support

This library is written in TypeScript and includes full type definitions. All exported types are available for import:

```tsx
import type {
  IQuotesRequest,
  IQuotesResponse,
  IQuotesRequestLineItem,
  SeelWFPWidgetRef,
  SeelWFPTitleViewProps,
  SeelWFPInfoViewProps,
} from 'react-native-seel-widget';
```

## Storage

The SDK uses `@react-native-async-storage/async-storage` to persist user opt-in/opt-out preferences. The preferences are automatically managed and respect the `optOutExpiredTime` configuration.

## Troubleshooting

### Widget not showing

1. Ensure the SDK is configured before rendering the widget
2. Check that `setup()` is called with valid quote data
3. Verify your API key is correct
4. Check network connectivity

### TypeScript errors

Make sure you have TypeScript 4.5+ installed and have enabled strict mode in your `tsconfig.json`.

### iOS build issues

If you encounter build issues on iOS:

```bash
cd ios
pod deintegrate
pod install
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

For issues and feature requests, please use the [GitHub issue tracker](https://github.com/kover-ai/react-native-seel-widget/issues).

## Related Links

- [GitHub Repository](https://github.com/kover-ai/react-native-seel-widget)
- [NPM Package](https://www.npmjs.com/package/react-native-seel-widget)
