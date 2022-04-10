import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, Pressable, Animated } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { ProductProps } from '../../types/types';
import { cartActions } from '../../store/cartSlice';

const ProductCard = ({ image, title, price, rating, id }: ProductProps) => {
  const [selected, setSelected] = useState<boolean>(false);
  const addToCartAnimation = useRef(new Animated.Value(1)).current;

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const { darkMode } = useSelector((state: RootStateOrAny) => state.ui);

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => {
        navigation.navigate('Details', {
          productId: id
        });
      }}
    >
      <Image source={{ uri: image }} style={{ height: '100%', width: '100%' }} />
      <View style={styles.details}>
        <Text style={{ padding: 4, color: '#fff', fontSize: 16 }}>{title}</Text>
        <View style={{ padding: 4 }}>
          <View style={{ paddingHorizontal: 4, flexDirection: 'row' }}>
            {rating &&
              [...Array(Math.round(rating.rate))].map((_, index) => (
                <Icon name="star" color="#fff" size={16} key={index} />
              ))}
          </View>
          <Text style={{ fontSize: 20, color: '#fff' }}>${price}</Text>
        </View>
        <Animated.View style={[{ transform: [{ scale: addToCartAnimation }] }]}>
          <Button
            mode="contained"
            icon="cart"
            color={darkMode ? '#d1b3ff' : '#6800ff'}
            onPress={() => {
              Animated.sequence([
                Animated.timing(addToCartAnimation, {
                  toValue: 1.5,
                  duration: 100,
                  useNativeDriver: true
                }),
                Animated.timing(addToCartAnimation, {
                  toValue: 1,
                  duration: 350,
                  useNativeDriver: true
                })
              ]).start(() => setSelected(prev => !prev));

              const item = {
                title,
                image,
                price,
                id,
                quantity: 1
              };

              dispatch(cartActions.addItemToCart(item));
            }}
          >
            Add To Cart
          </Button>
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 8,
    marginHorizontal: 4,
    justifyContent: 'space-between',
    width: '40%',
    height: 250
  },
  pressed: {
    opacity: 0.7
  },
  details: {
    backgroundColor: 'rgba(34,34,34,0.85)',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
});

export default ProductCard;
