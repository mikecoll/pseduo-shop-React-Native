import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from '../screens/Favorites';
import ProductDetailsScreen from '../screens/ProductDetails';

const Stack = createStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Products" component={FavoritesScreen} />
      <Stack.Screen name="Details" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
