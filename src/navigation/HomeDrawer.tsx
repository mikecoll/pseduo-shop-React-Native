import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeStack from './HomeStack';
import CustomDrawer from '../components/UI/Drawer';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: 0
      }}
    >
      <Drawer.Screen name="All Products" component={HomeStack} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
