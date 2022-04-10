import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RootStateOrAny, useSelector } from 'react-redux';

interface HomeHeaderProps {
  onSearch: (searchTerm: string) => void;
  itemsQuantity?: number;
  loading: boolean;
}

const HomeHeader = ({ onSearch, itemsQuantity }: HomeHeaderProps) => {
  const { darkMode, category } = useSelector((state: RootStateOrAny) => state.ui);

  return (
    <>
      <View style={styles.search}>
        <TextInput
          style={{ width: '100%', color: '#000' }}
          placeholder="Search all prodcuts"
          onChangeText={text => onSearch(text)}
        />
        <FeatherIcon name="search" size={25} color="#555" />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between'
        }}
      >
        {itemsQuantity ? (
          <View>
            <Text style={[styles.text, { color: darkMode ? '#fff' : '#000' }]}>
              Found
            </Text>
            <Text style={[styles.text, { color: darkMode ? '#fff' : '#000' }]}>
              {itemsQuantity} Products
            </Text>
          </View>
        ) : null}

        <View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              paddingHorizontal: 10,
              color: darkMode ? '#fff' : '#000'
            }}
          >
            {category}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  search: {
    height: 40,
    backgroundColor: '#d0d0d0',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 40,
    marginHorizontal: 10,
    marginVertical: 20
  },
  text: {
    fontSize: 25,
    paddingHorizontal: 10,
    fontWeight: 'bold'
  }
});

export default HomeHeader;
