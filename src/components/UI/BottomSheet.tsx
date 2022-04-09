import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Button, IconButton } from 'react-native-paper';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cartSlice';

import { ProductProps } from '../../types/types';

interface BottomSheetProps {
  productInfo: ProductProps;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

const BottomSheetView = ({ productInfo }: BottomSheetProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const dispatch = useDispatch();

  const { darkMode } = useSelector((state: RootStateOrAny) => state.ui);

  const translateY = useSharedValue(0);

  const scrollTo = useCallback((destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 2) {
        scrollTo(-SCREEN_HEIGHT / 2);
      } else if (translateY.value < SCREEN_HEIGHT / 2) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

  useEffect(() => {
    scrollTo(-SCREEN_HEIGHT / 2);
  }, []);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [{ translateY: translateY.value }]
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.detailsContainer,
          rBottomSheetStyle,
          { backgroundColor: darkMode ? '#3c3c3c' : '#fff' }
        ]}
      >
        <View style={styles.line} />
        <Text style={[styles.title, { color: darkMode ? '#fff' : '#000' }]}>
          {productInfo.title}
        </Text>
        <Text style={[styles.description, { color: darkMode ? '#fff' : '#000' }]}>
          {productInfo.description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Text style={[styles.price, { color: darkMode ? '#fff' : '#000' }]}>
            ${productInfo.price.toFixed(2)}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {productInfo.rating &&
              [...Array(Math.round(productInfo.rating.rate))].map((_, index) => (
                <FontAwesome5Icon
                  name="star"
                  size={20}
                  color={darkMode ? '#fff' : '#000'}
                  key={index}
                />
              ))}
            <Text
              style={{
                marginLeft: 5,
                fontSize: 16,
                color: darkMode ? '#fff' : '#000'
              }}
            >
              ({productInfo.rating && productInfo.rating.count})
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View
            style={[
              styles.quantityButton,
              { borderColor: darkMode ? '#fff' : '#000' }
            ]}
          >
            <IconButton
              icon="minus"
              size={25}
              disabled={quantity === 1}
              onPress={() => setQuantity(quantity => quantity - 1)}
            />
            <View
              style={{ width: 50, justifyContent: 'center', alignItems: 'center' }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: darkMode ? '#fff' : '#000'
                }}
              >
                {quantity}
              </Text>
            </View>
            <IconButton
              icon="plus"
              size={25}
              onPress={() => setQuantity(quantity => quantity + 1)}
            />
          </View>
          <Button
            style={styles.button}
            labelStyle={{ fontSize: 20 }}
            mode="contained"
            icon="cart"
            color={darkMode ? '#d1b3ff' : '#6800ff'}
            onPress={() => {
              const item = {
                title: productInfo.title,
                image: productInfo.image,
                price: productInfo.price,
                id: productInfo.id,
                quantity
              };

              dispatch(cartActions.addItemToCart(item));
            }}
          >
            Add to Cart
          </Button>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    height: SCREEN_HEIGHT,
    top: SCREEN_HEIGHT,
    width: '100%',
    position: 'absolute',
    borderRadius: 25,
    paddingHorizontal: 20
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'gray',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold'
  },
  description: {
    textAlign: 'center',
    marginTop: 15
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  buttonContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 75,
    paddingBottom: 20
  },
  button: {
    borderRadius: 10,
    margin: 5
  },
  quantityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 5
  }
});

export default BottomSheetView;
