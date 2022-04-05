import React from 'react';
import { View, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Button } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import LogoIcon from './Logo';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/uiSlice';

const Drawer = (props: any) => {
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <LinearGradient
          colors={['#ffffff', '#a8a8a8']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 0.8 }}
          style={{ height: 150, justifyContent: 'center' }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <View>
              <LogoIcon height={60} width={50} />
            </View>
            <View>
              <Text style={{ fontSize: 30 }}>Pseudo Shop</Text>
              <Text style={{ fontSize: 15, color: '#333', textAlign: 'center' }}>
                Free shipping worldwide
              </Text>
            </View>
          </View>
        </LinearGradient>
        {/* <DrawerItemList {...props} /> */}
        <Button
          onPress={() => {
            dispatch(uiActions.changeCategory('All Products'));
          }}
        >
          All Products
        </Button>
        <Button
          onPress={() => {
            dispatch(uiActions.changeCategory('Jewelery'));
          }}
        >
          Jewelery
        </Button>
        <Button
          onPress={() => {
            dispatch(uiActions.changeCategory('Electronics'));
          }}
        >
          Electronics
        </Button>
        <Button
          onPress={() => {
            dispatch(uiActions.changeCategory("Men's Clothing"));
          }}
        >
          Men's Clothing
        </Button>
        <Button
          onPress={() => {
            dispatch(uiActions.changeCategory("Women's Clothing"));
          }}
        >
          Women's Clothing
        </Button>
      </DrawerContentScrollView>
      <View>
        <Text>Custom Text</Text>
      </View>
    </View>
  );
};

export default Drawer;
