import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { ProductProps } from '../../types/types';

interface BottomSheetProps {
  productInfo: ProductProps;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

const BottomSheetView = ({ productInfo }: BottomSheetProps) => {
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
      <Animated.View style={[styles.detailsContainer, rBottomSheetStyle]}>
        <View style={styles.line} />
        <Text style={styles.title}>{productInfo.title}</Text>
        <Text style={styles.description}>{productInfo.description}</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Text style={styles.price}>${productInfo.price.toFixed(2)}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {[...Array(Math.round(productInfo.rating.rate))].map((_, index) => (
              <Icon name="star" size={20} key={index} />
            ))}
            <Text style={{ marginLeft: 5, fontSize: 16 }}>
              ({productInfo.rating.count})
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            contentStyle={{ padding: 5 }}
            mode="contained"
            icon="heart"
            color="#de0000"
            onPress={() => {}}
          >
            Add to Favorites
          </Button>
          <Button
            style={styles.button}
            contentStyle={{ padding: 10 }}
            labelStyle={{ fontSize: 20 }}
            mode="contained"
            icon="cart"
            color="#6800ff"
            onPress={() => {}}
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
    backgroundColor: '#fff',
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
    flex: 1,
    // justifyContent: 'flex-end',
    marginTop: 75,
    paddingBottom: 20
  },
  button: {
    borderRadius: 10,
    margin: 5
  }
});

export default BottomSheetView;
