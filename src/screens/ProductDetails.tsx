import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { HomeStackNavProps } from '../types/HomeParamList';
import { ProductProps } from '../types/types';

const ProductDetails = ({ route, navigation }: HomeStackNavProps<'Details'>) => {
  const [productInfo, setProductInfo] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getProductInfo = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${route.params.productId}`
        );

        if (!res.ok) {
          throw new Error('Something went wrong!');
        }

        const data = await res.json();
        setProductInfo(data);
        setLoading(false);
      } catch (error: any) {
        Alert.alert(error.message);
        setLoading(false);
      }
    };

    getProductInfo();
  }, []);

  return (
    <LinearGradient
      colors={['#ffffff', '#a8a8a8']}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.container}
    >
      <IconButton
        icon={props => <Icon name="arrow-left" {...props} />}
        onPress={() => {
          navigation.goBack();
        }}
      />
      {loading && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
      {!loading && productInfo && (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: productInfo.image }}
              style={{ width: '100%', height: 250 }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.detailsContainer}>
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
                onPress={() => {}}
              >
                Add to Cart
              </Button>
            </View>
          </View>
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#333'
  },
  imageContainer: {
    height: '35%'
  },
  detailsContainer: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 20
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
    justifyContent: 'flex-end',
    paddingBottom: 20
  },
  button: {
    borderRadius: 10,
    margin: 5
  }
});

export default ProductDetails;
