import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import { MenuScreen } from '../screens/MenuScreen';
import { StoreScreen } from '../screens/StoreScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';

export default createAppContainer(
  createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Checkout: CheckoutScreen,
    Store: StoreScreen,
    Menu: MenuScreen
  })
);
