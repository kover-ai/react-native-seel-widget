# react-native-seel-widget

SeelWidget for React Native (iOS, Android, and Web)

## Installing

### With expo

```
npx expo install react-native-seel-widget
```

### With react-native-cli

1. Install library

  ```
  yarn add react-native-seel-widget
  ```

  *Note: We're using `yarn` to install deps. Feel free to change commands to use `npm` 11+ and `npx` if you like*

2. Link native code

  ```
  cd ios && pod install
  ```

## Usage

```tsx
// Step 1
SeelWidgetSDK.shared.configure({
  apiKey: '5ctiodrhqyfkcjqhli4wwnwi6cakrs5r',
  environment: SeelEnvironment.Development,
});
```

```tsx
// Step 2
import { SeelWFPWidget, IQuotesRequest, IQuotesResponse } from 'react-native-seel-widget';

const quoteEU: IQuotesRequest = {};
const quoteUS: IQuotesRequest = {};
export default function YourPage() {
  const [domain, setDomain] = useState<Domain>('EU');
  const [request, setRequest] = useState(domain === 'EU' ? quoteEU : quoteUS);
  const initialRef: any = null;
  const seelWidgetRef = useRef<any>(initialRef);
  useEffect(() => {
    console.warn('useEffect request:\n', request);
    const setup = () => {
      if (seelWidgetRef.current) {
        seelWidgetRef.current.setup(request);
      }
    };
    setup();
  }, [request]);

  return (
    <View>
      <SeelWFPWidget
        ref={seelWidgetRef}
        domain={domain}
        onChangeValue={function ({
          optedIn,
          quotesResponse,
        }: {
          optedIn: boolean;
          quotesResponse?: IQuotesResponse;
        }): void {
          console.log(optedIn, quotesResponse);
        }}
      />
    </View>
  );
}

```
