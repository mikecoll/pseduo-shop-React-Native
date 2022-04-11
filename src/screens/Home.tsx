import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
  View,
  Pressable,
  Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import ProductCard from '../components/UI/ProductCard';
import { ProductProps } from '../types/types';
import HomeHeader from '../components/UI/HomeHeader';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/uiSlice';
import { IconButton } from 'react-native-paper';
import LogoIcon from '../components/UI/Logo';
import { DrawerActions } from '@react-navigation/native';
import { HomeStackNavProps } from '../types/HomeParamList';
import { favsActions } from '../store/favsSlice';

const Home = ({ navigation }: HomeStackNavProps<'Home'>) => {
  const [items, setItems] = useState<ProductProps[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { darkMode, category } = useSelector((state: RootStateOrAny) => state.ui);
  const cartItems = useSelector((state: RootStateOrAny) => state.cart.items);

  const user = auth().currentUser;

  useEffect(() => {
    const getFavorites = async () => {
      console.log('user:', user);

      if (user) {
        const favsRef = firestore().collection('users').doc(user?.uid).get();

        const favsSnap = (await favsRef).data();
        const favs = favsSnap?.favorites;

        if (favs) {
          dispatch(favsActions.setFavorites(favs));
        }
      }
    };

    getFavorites();
  }, [user]);

  let url = '';
  if (category !== 'All Products') {
    url = `https://fakestoreapi.com/products/category/${category.toLowerCase()}`;
  }

  const getAllProducts = useCallback(
    async (url = 'https://fakestoreapi.com/products') => {
      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error('Could not get products. :(');
        }

        const data = await res.json();
        return data;
      } catch (error: any) {
        Alert.alert('Something went wrong!', error.message);
      }
    },
    []
  );

  const setData = useCallback(
    async (url?: string) => {
      setRefreshing(true);

      try {
        const data = await getAllProducts(url);

        if (data) {
          setItems(data);
        }

        setRefreshing(false);
      } catch (error: any) {
        setRefreshing(false);
        Alert.alert('Something went wrong!', error.message);
      }
    },
    [getAllProducts]
  );

  useEffect(() => {
    if (url) {
      setData(url);
    } else {
      setData();
    }
  }, [setData, url]);

  const searchHandler = async (searchTerm: string) => {
    setLoading(true);

    dispatch(uiActions.changeCategory('All Products'));
    try {
      const data = await getAllProducts();

      const filteredItems = data.filter((item: ProductProps) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setItems(filteredItems);
      setLoading(false);
    } catch (error: any) {
      Alert.alert('Something went wrong!', error.message);
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={darkMode ? ['#3c3c3c', '#bababa'] : ['#ffffff', '#a8a8a8']}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 0.8 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <IconButton
          icon={props => <FeatherIcon name="menu" {...props} />}
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        />
        <View style={styles.logo}>
          <LogoIcon height={50} width={50} color={darkMode ? '#fff' : '#000'} />
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.cartButton,
            pressed && styles.cartButtonPressed
          ]}
          onPress={() => {
            navigation.navigate('Cart');
          }}
        >
          <FontAwesome5Icon
            name="shopping-cart"
            size={20}
            color={darkMode ? '#fff' : '#000'}
          />
          <View style={styles.cartQuantity}>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>
              {cartItems.length}
            </Text>
          </View>
        </Pressable>
      </View>
      <FlatList
        ListHeaderComponent={
          <HomeHeader
            onSearch={searchHandler}
            itemsQuantity={items.length}
            loading={loading}
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              dispatch(uiActions.changeCategory('All Products'));
              setData();
            }}
          />
        }
        data={items}
        renderItem={({ item }) => (
          <ProductCard
            image={item.image}
            title={item.title}
            price={item.price}
            rating={item.rating}
            id={item.id}
          />
        )}
        numColumns={2}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  cartButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    padding: 5
  },
  cartQuantity: {
    backgroundColor: '#73ff49',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 5
  },
  cartButtonPressed: {
    backgroundColor: '#d0d0d0',
    borderRadius: 15
  },
  logo: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1
  },
  container: {
    flex: 1,
    paddingTop: 50
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Home;
