import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CartPage from './pages/cart-page';
import CheckoutPage from './pages/checkout-page';
import SettlementPage from './pages/settlement-page';

import { SeelEnvironment, SeelWidgetSDK } from '../../src';

SeelWidgetSDK.shared.configure({
  apiKey: '5ctiodrhqyfkcjqhli4wwnwi6cakrs5r',
  environment: SeelEnvironment.Development,
});

const RootStack = createNativeStackNavigator({
  screens: {
    Cart: {
      screen: CartPage,
      options: {
        title: 'Cart',
      },
    },
    Settlement: {
      screen: SettlementPage,
    },
    Checkout: {
      screen: CheckoutPage,
      options: {
        title: 'Checkout',
      },
    },
  },
  initialRouteName: 'Cart',
  screenOptions: {
    headerStyle: { backgroundColor: 'white' },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
