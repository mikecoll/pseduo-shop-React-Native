import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import ProductDetailsScreen from '../screens/ProductDetails';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Products" component={HomeScreen} />
      <Stack.Screen name="Details" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
