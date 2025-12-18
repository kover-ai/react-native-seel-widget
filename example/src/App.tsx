// import { createStaticNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import CartPage from './pages/cart-page';

import SettlementPage from './pages/settlement-page';

// const RootStack = createNativeStackNavigator({
//   screens: {
//     Cart: {
//       screen: CartPage,
//     },
//     Settlement: {
//       screen: SettlementPage,
//     },
//   },
//   initialRouteName: 'Cart',
// });

// const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <SettlementPage />;
}
