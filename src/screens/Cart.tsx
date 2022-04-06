import { View, Text, FlatList, SafeAreaView } from 'react-native';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

const Cart = () => {
  const { items } = useSelector((state: RootStateOrAny) => state.cart);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <Text>
            {item.title} {item.quantity}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default Cart;
