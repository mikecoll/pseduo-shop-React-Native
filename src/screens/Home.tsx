import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { DrawerActions } from '@react-navigation/native';

import ProductCard from '../components/UI/ProductCard';
import { HomeStackNavProps } from '../types/HomeParamList';
import { ProductProps } from '../types/types';

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

        if (data) {
          const loadedItems: ProductProps[] = [];

          data.forEach((item: ProductProps) => {
            loadedItems.push({
              title: item.title,
              image: item.image,
              price: item.price,
              rating: item.rating,
              category: item.category,
              description: item.description,
              id: item.id
            });
          });

          setItems(loadedItems);
        }

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

  return (
    <LinearGradient
      colors={['#ffffff', '#a8a8a8']}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 0.8 }}
      style={styles.container}
    >
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <View>
              <IconButton
                icon={props => <Icon name="menu" {...props} />}
                onPress={() => {
                  navigation.dispatch(DrawerActions.openDrawer());
                }}
              />
            </View>
          }
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
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4d4d4',
    paddingTop: 50
  }
});

export default Home;
