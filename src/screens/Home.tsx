import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, FlatList, Alert, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import ProductCard from '../components/UI/ProductCard';
import { HomeStackNavProps } from '../types/HomeParamList';
import { ProductProps } from '../types/types';
import HomeHeader from '../components/UI/HomeHeader';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/uiSlice';

const Home = () => {
  const [items, setItems] = useState<ProductProps[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { category } = useSelector((state: RootStateOrAny) => state.ui);

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

        setItems(data);
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
      colors={['#ffffff', '#a8a8a8']}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 0.8 }}
      style={styles.container}
    >
      <FlatList
        ListHeaderComponent={
          <HomeHeader
            onSearch={searchHandler}
            itemsQuantity={items.length}
            loading={loading}
          />
        }
        // ListEmptyComponent={
        //   <View style={styles.emptyContainer}>
        //     <FontAwesome5Icon name="sad-tear" size={65} />
        //     <Text style={{ fontSize: 25, marginTop: 10 }}>No products found...</Text>
        //   </View>
        // }
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
  container: {
    flex: 1,
    backgroundColor: '#d4d4d4',
    paddingTop: 50
  },
  cartButton: {
    flexDirection: 'row'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Home;
