import { View, Text, FlatList, StyleSheet, TextInput, Alert } from 'react-native';
import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Button, IconButton } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import { HomeStackNavProps } from '../types/HomeParamList';
import CartItem from '../components/UI/CartItem';
import { cartActions } from '../store/cartSlice';

const Cart = ({ navigation }: HomeStackNavProps<'Cart'>) => {
  const { items, totalAmount } = useSelector((state: RootStateOrAny) => state.cart);

  const dispatch = useDispatch();

  return (
    <LinearGradient
      colors={['#ffffff', '#a8a8a8']}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 0.8 }}
      style={styles.container}
    >
      <View>
        <View>
          <IconButton
            icon={props => <FontAwesome5Icon name="chevron-left" {...props} />}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: -1
            }}
          >
            <Text style={{ fontSize: 20 }}>Shopping Bag</Text>
          </View>
        </View>

        <View style={{ height: 335 }}>
          <FlatList
            ListEmptyComponent={
              <View
                style={{
                  height: 300,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={{ fontSize: 18 }}>No items in your bag :(</Text>
                <Text style={{ fontSize: 18 }}>Go and add some!</Text>
              </View>
            }
            data={items}
            renderItem={({ item }) => (
              <CartItem
                id={item.id}
                title={item.title}
                image={item.image}
                totalPrice={item.totalPrice}
                quantity={item.quantity}
              />
            )}
          />
        </View>
        <View style={styles.promoCode}>
          <TextInput
            style={{ width: '100%', fontSize: 18 }}
            placeholder="Promo Code"
          />
          <Button
            mode="contained"
            style={{
              borderRadius: 15
            }}
          >
            Apply
          </Button>
        </View>
        <View style={styles.bagInfo}>
          <Text style={styles.infoText}>Subtotal</Text>
          <Text style={styles.priceText}>${totalAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.bagInfo}>
          <Text style={styles.infoText}>Shipping</Text>
          <Text style={styles.priceText}>Free</Text>
        </View>
        <View style={[styles.bagInfo, { borderBottomWidth: 0 }]}>
          <Text style={styles.infoText}>Bag Total</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10, fontSize: 16 }}>
              ({items.length} items)
            </Text>
            <Text style={styles.priceText}>${totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </View>
      <Button
        style={{ marginHorizontal: 20, borderRadius: 15 }}
        labelStyle={{ fontSize: 18 }}
        mode="contained"
        color="#6800ff"
        disabled={!items.length}
        onPress={() => {
          dispatch(cartActions.emptyCart());
          Alert.alert('Thank you for using Pseudo Shop! 🌴🚀');
        }}
      >
        Proceed To Checkout
      </Button>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 10,
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  promoCode: {
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 90,
    marginHorizontal: 10,
    marginVertical: 15
  },
  bagInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#fff'
  },
  infoText: {
    fontSize: 18,
    fontWeight: '500'
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default Cart;
