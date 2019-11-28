import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import { MenuScreen } from '../screens/MenuScreen';
import { StoreScreen } from '../screens/StoreScreen';

export default createAppContainer(
  createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Store: StoreScreen,
    Menu: MenuScreen
  })
);
