import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ProfileScreen from '../screens/Profile';
import HomeStack from './HomeStack';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: false
      }}
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
