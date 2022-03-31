import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ProductProps {
  image: string;
  title: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
}

const ProductCard: React.FC<ProductProps> = ({ image, title, price, rating }) => {
  // console.log(rating);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          // resizeMode="cover"
          style={{ height: '100%', width: '100%' }}
        />
      </View>

      <View style={styles.details}>
        <Text style={{ padding: 4, color: '#fff', fontSize: 16 }}>{title}</Text>
        <View style={{ padding: 4 }}>
          <View style={{ paddingHorizontal: 4, flexDirection: 'row' }}>
            {[...Array(Math.round(rating.rate))].map((_, index) => (
              <Icon name="star" color="#fff" size={16} key={index} />
            ))}
          </View>
          <Text style={{ fontSize: 20, color: '#fff' }}>${price}</Text>
        </View>
        <View>
          <Button mode="contained">
            <Icon name="cart-plus" />
            Add To Cart
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 8,
    marginHorizontal: 4,
    justifyContent: 'space-between',
    width: '40%',
    height: 250
  },
  imageContainer: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignContent: 'center'
    // padding: 10,
    // height: '100%',
    // width: '100%'
  },
  details: {
    zIndex: 10,
    backgroundColor: 'rgba(34,34,34,0.85)',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
});

export default ProductCard;
