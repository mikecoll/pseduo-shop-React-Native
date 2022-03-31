import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';

import ProductCard from '../components/UI/ProductCard';
import { ProductProps } from '../types/types';

const Home = () => {
  const [items, setItems] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllProducts = useCallback(
    async (url = 'https://fakestoreapi.com/products') => {
      setError(null);

      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error('Could not get products. :(');
        }

        const data = await res.json();
        return data;
      } catch (error: any) {
        setError(error.message);
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

        if (data) {
          const loadedItems: ProductProps[] = [];

          data.forEach((item: ProductProps) => {
            loadedItems.push({
              title: item.title,
              image: item.image,
              price: item.price,
              rating: item.rating,
              category: item.category,
              descriprion: item.descriprion,
              id: item.id
            });
          });

          setItems(loadedItems);
        }

        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    },
    [getAllProducts]
  );

  useEffect(() => {
    setData();
  }, [setData]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          data={items}
          renderItem={({ item }) => (
            <ProductCard
              image={item.image}
              title={item.title}
              price={item.price}
              rating={item.rating}
            />
          )}
          numColumns={2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4d4d4'
  }
});

export default Home;
