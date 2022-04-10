import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Pressable } from 'react-native';
import { IconButton } from 'react-native-paper';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cartSlice';

interface CartItemProps {
  id: number;
  title: string;
  image: string;
  totalPrice: number;
  quantity: number;
}

const CartItem = ({ id, title, image, totalPrice, quantity }: CartItemProps) => {
  const [curQuantity, setCurQuantity] = useState<number>(quantity);

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const { darkMode } = useSelector((state: RootStateOrAny) => state.ui);

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() =>
        navigation.navigate('Details', {
          productId: id
        })
      }
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View
        style={{
          justifyContent: 'space-between',
          paddingHorizontal: 5,
          width: Dimensions.get('window').width / 1.4
        }}
      >
        <IconButton
          icon={() => (
            <EntypoIcon name="cross" size={20} color={darkMode ? '#fff' : '#000'} />
          )}
          style={{ position: 'absolute', right: 10, zIndex: 10 }}
          onPress={() => dispatch(cartActions.removeItemFromCart(id))}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '85%',
            justifyContent: 'space-between'
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.title, { color: darkMode ? '#fff' : '#000' }]}
          >
            {title}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: darkMode ? '#fff' : '#000'
            }}
          >
            ${totalPrice.toFixed(2)}
          </Text>
          <View style={styles.buttons}>
            <IconButton
              icon="minus"
              size={20}
              style={{
                backgroundColor: darkMode ? 'gray' : '#fff'
              }}
              onPress={() => {
                dispatch(cartActions.decreaseQuantity(id));
                setCurQuantity(curQuantity => curQuantity - 1);
              }}
            />
            <View style={{ width: 20, alignItems: 'center' }}>
              <Text style={{ fontSize: 18 }}>{curQuantity}</Text>
            </View>
            <IconButton
              icon="plus"
              size={20}
              color="#fff"
              style={{ backgroundColor: darkMode ? '#d1b3ff' : '#6800ff' }}
              onPress={() => {
                dispatch(cartActions.increaseQuantity(id));
                setCurQuantity(curQuantity => curQuantity + 1);
              }}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  },
  pressed: {
    opacity: 0.7
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15
  },
  title: {
    paddingTop: 10,
    fontWeight: '500',
    fontSize: 18
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  }
});

export default CartItem;
