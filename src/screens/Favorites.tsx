import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { RootStateOrAny, useSelector } from 'react-redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import FavoriteItem from '../components/UI/FavoriteItem';
import LinearGradient from 'react-native-linear-gradient';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Favorites = () => {
  const { favorites } = useSelector((state: RootStateOrAny) => state.favs);
  const { darkMode } = useSelector((state: RootStateOrAny) => state.ui);

  return (
    <LinearGradient
      colors={darkMode ? ['#3c3c3c', '#bababa'] : ['#ffffff', '#a8a8a8']}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 0.8 }}
      style={styles.container}
    >
      <View>
        <Text style={[styles.title, { color: darkMode ? '#fff' : '#000' }]}>
          Favorites
        </Text>
      </View>

      <FlatList
        contentContainerStyle={{
          height: SCREEN_HEIGHT - 130
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
            <Text style={{ fontSize: 18, color: darkMode ? '#fff' : '#000' }}>
              No favorite items :(
            </Text>
            <Text style={{ fontSize: 18, color: darkMode ? '#fff' : '#000' }}>
              Go and add some!
            </Text>
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    justifyContent: 'center'
  },
  title: {
    fontSize: 25,
    paddingHorizontal: 10,
    fontWeight: 'bold'
  }
});

export default Favorites;
