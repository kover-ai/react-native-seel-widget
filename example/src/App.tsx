import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CartPage from './pages/cart-page';
import SettlementPage from './pages/settlement-page';

import { SeelEnvironment, SeelWidgetSDK } from '../../src';

SeelWidgetSDK.shared.configure({
  apiKey: '5ctiodrhqyfkcjqhli4wwnwi6cakrs5r',
  environment: SeelEnvironment.Development,
});

console.log('SeelWidgetSDK.shared:', SeelWidgetSDK.shared.apiKey);

const RootStack = createNativeStackNavigator({
  screens: {
    Cart: {
      screen: CartPage,
      options: {
        title: 'Shopping Cart',
      },
    },
    Settlement: {
      screen: SettlementPage,
    },
  },
  initialRouteName: 'Settlement',
  screenOptions: {
    headerStyle: { backgroundColor: 'white' },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
