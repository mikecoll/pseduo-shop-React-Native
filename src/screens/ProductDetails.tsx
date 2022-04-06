import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IconButton } from 'react-native-paper';
import BottomSheet from '../components/UI/BottomSheet';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

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
      <View style={styles.headerButtons}>
        <IconButton
          icon={props => <FontAwesome5Icon name="chevron-left" {...props} />}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <IconButton
          icon={() => <FontAwesomeIcon name="heart-o" size={30} color="#ff0000" />}
        />
      </View>
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
          <BottomSheet productInfo={productInfo} />
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
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
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
