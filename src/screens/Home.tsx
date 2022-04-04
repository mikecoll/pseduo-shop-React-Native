import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, FlatList, Alert, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ProductCard from '../components/UI/ProductCard';
import { HomeStackNavProps } from '../types/HomeParamList';
import { ProductProps } from '../types/types';
import { firebase } from '@react-native-firebase/auth';
import HomeHeader from '../components/HomeHeader';

const Home = ({ navigation }: HomeStackNavProps<'Home'>) => {
  const [items, setItems] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      try {
        const data = await getAllProducts(url);

        setItems(data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        Alert.alert('Something went wrong!', error.message);
      }
    },
    [getAllProducts]
  );

  useEffect(() => {
    setData();
  }, [setData]);

  const selectCategoryHandler = (category?: string) => {
    if (!category) {
      setData();
    } else {
      setData(`https://fakestoreapi.com/products/category/${category}`);
    }
  };

  const searchHandler = async (searchTerm: string) => {
    const data = await getAllProducts();

    console.log(searchTerm);

    const filteredItems = data.filter((item: ProductProps) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setItems(filteredItems);
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
            onSelectCategory={selectCategoryHandler}
            onSearch={searchHandler}
          />
        }
        refreshControl={<RefreshControl refreshing={loading} onRefresh={setData} />}
        contentContainerStyle={{ paddingBottom: 20 }}
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
  }
});

export default Home;
