import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Dimensions
} from 'react-native';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import FavoriteItem from '../components/UI/FavoriteItem';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Favorites = () => {
  const { favorites } = useSelector((state: RootStateOrAny) => state.favs);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Favorites</Text>
      </View>

      <FlatList
        contentContainerStyle={{
          height: SCREEN_HEIGHT
        }}
        ListEmptyComponent={
          <View
            style={{
              height: SCREEN_HEIGHT,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <FontAwesome5Icon
              name="heart-broken"
              size={100}
              color="#ff0000"
              style={{ marginBottom: 20 }}
            />
            <Text style={{ fontSize: 18 }}>No favorite items :(</Text>
            <Text style={{ fontSize: 18 }}>Go and add some!</Text>
          </View>
        }
        data={favorites}
        renderItem={({ item }) => (
          <FavoriteItem
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center'
    // alignItems: 'center'
  },
  title: {
    fontSize: 25,
    paddingHorizontal: 10,
    fontWeight: 'bold'
  }
});

export default Favorites;
