import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

interface CategoryItemButtonProps {
  category: string;
  icon: string;
  index: number;
  onSelectCategory: (category: string) => void;
}

const CategoryItemButton = ({
  category,
  icon,
  index,
  onSelectCategory
}: CategoryItemButtonProps) => {
  return (
    <Pressable
      onPress={() => onSelectCategory(category.toLowerCase())}
      style={({ pressed }) => [
        styles.categoryItem,
        index !== 0 && { marginLeft: 7 },
        pressed && { opacity: 0.5 }
      ]}
    >
      <FontAwesomeIcon name={icon} size={20} />
      <Text style={{ marginLeft: 3, fontSize: 16 }}>{category}</Text>
    </Pressable>
  );
};

interface HomeHeaderProps {
  onSelectCategory: (category: string) => void;
}

const HomeHeader = ({ onSelectCategory }: HomeHeaderProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const navigation = useNavigation();

  return (
    <>
      <View style={styles.header}>
        <IconButton
          icon={props => <FeatherIcon name="menu" {...props} />}
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        />
        <IconButton icon="cart" />
      </View>

      <View style={styles.search}>
        <TextInput placeholder="Search" onChangeText={text => setSearchTerm(text)} />
        <FeatherIcon name="search" size={25} color="#555" />
      </View>

      <View>
        <Text style={{ fontSize: 20, paddingHorizontal: 10, fontWeight: 'bold' }}>
          Categories
        </Text>
        <ScrollView
          horizontal
          style={{ margin: 15 }}
          showsHorizontalScrollIndicator={false}
        >
          {[
            { name: 'All Products', icon: '' },
            { name: 'Jewelery', icon: 'diamond' },
            { name: 'Electronics', icon: 'bolt' },
            { name: "Men's Clothing", icon: 'suitcase' },
            { name: "Women's Clothing", icon: 'shopping-bag' }
          ].map((category, index) => (
            <CategoryItemButton
              category={category.name}
              icon={category.icon}
              index={index}
              onSelectCategory={onSelectCategory}
              key={category.name}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  search: {
    height: 40,
    backgroundColor: '#d0d0d0',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginHorizontal: 10,
    marginVertical: 20
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  }
});

export default HomeHeader;
