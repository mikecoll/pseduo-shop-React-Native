import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import LogoIcon from './Logo';
import { RootStateOrAny, useSelector } from 'react-redux';

interface HomeHeaderProps {
  onSearch: (searchTerm: string) => void;
  itemsQuantity?: number;
  loading: boolean;
}

const HomeHeader = ({ onSearch, itemsQuantity, loading }: HomeHeaderProps) => {
  const navigation = useNavigation<any>();

  const { category } = useSelector((state: RootStateOrAny) => state.ui);
  const { totalQuantity } = useSelector((state: RootStateOrAny) => state.cart);

  return (
    <>
      {/* <View style={styles.header}>
        <IconButton
          icon={props => <FeatherIcon name="menu" {...props} />}
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        />
        <View style={styles.logo}>
          <LogoIcon height={50} width={50} />
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.cartButton,
            pressed && styles.cartButtonPressed
          ]}
          onPress={() => {
            navigation.navigate('Cart');
          }}
        >
          <FontAwesome5Icon name="shopping-cart" size={20} />
          <View style={styles.cartQuantity}>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>{totalQuantity}</Text>
          </View>
        </Pressable>
      </View> */}

      <View style={styles.search}>
        <TextInput
          style={{ width: '100%' }}
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
        <View style={styles.textContainer}>
          {itemsQuantity ? (
            <>
              <Text style={styles.text}>Found</Text>
              <Text style={styles.text}>{itemsQuantity} Products</Text>
            </>
          ) : null}
        </View>
        <View>
          <Text style={{ fontSize: 22, fontWeight: 'bold', paddingHorizontal: 10 }}>
            {category}
          </Text>
        </View>
      </View>
      {loading ? (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            top: 160
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : null}
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
  textContainer: {},
  text: {
    fontSize: 25,
    paddingHorizontal: 10,
    fontWeight: 'bold'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#f0f0f0'
  }
});

export default HomeHeader;
