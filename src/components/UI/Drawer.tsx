import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import LogoIcon from './Logo';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/uiSlice';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

interface DrawerButtonProps {
  category: string;
  icon?: string;
  onPress: (category: string) => void;
}

const DrawerButton = ({ category, icon, onPress }: DrawerButtonProps) => {
  return (
    <Pressable
      onPress={() => onPress(category)}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          paddingHorizontal: 15,
          paddingVertical: 10,
          margin: 5,
          borderRadius: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#d1b3ff'
        },
        pressed && {
          opacity: 0.7
        }
      ]}
    >
      {icon ? <FontAwesomeIcon name={icon} size={25} /> : <View />}
      <Text style={{ fontSize: 20 }}>{category}</Text>
    </Pressable>
  );
};

const Drawer = (props: any) => {
  const [userInfo, setUserInfo] = useState<FirebaseAuthTypes.User | undefined>();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { darkMode } = useSelector((state: RootStateOrAny) => state.ui);

  useEffect(() => {
    const user = auth().currentUser;

    if (user) {
      setUserInfo(user);
    }
  }, []);

  const changeCategory = (category: string) => {
    dispatch(uiActions.changeCategory(category));
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const signOutHandler = async () => {
    await auth().signOut();
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'gray',
          backgroundColor: darkMode ? '#3c3c3c' : '#fff'
        }}
      >
        <LinearGradient
          colors={darkMode ? ['#3c3c3c', '#bababa'] : ['#ffffff', '#a8a8a8']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 0.8 }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <View>
              <LogoIcon height={60} width={50} color={darkMode ? '#fff' : '#000'} />
            </View>
            <View>
              <Text style={{ fontSize: 30, color: darkMode ? '#fff' : '#000' }}>
                Pseudo Shop
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: darkMode ? '#ccc' : '#333',
                  textAlign: 'center'
                }}
              >
                Free shipping worldwide
              </Text>
            </View>
          </View>
          <View
            style={{
              padding: 15,
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {userInfo?.photoURL && (
              <Image
                source={{
                  uri: userInfo.photoURL
                }}
                style={{ height: 70, width: 70, borderRadius: 35 }}
              />
            )}
            <View>
              <Text style={{ fontSize: 18 }}>Welcome,</Text>
              <Text style={{ fontSize: 22, fontWeight: '500' }}>
                {userInfo?.displayName}
              </Text>
            </View>
          </View>
        </LinearGradient>
        <View style={{ marginTop: 15 }}>
          {[
            { name: 'All Products' },
            { name: 'Jewelery', icon: 'diamond' },
            { name: 'Electronics', icon: 'bolt' },
            { name: "Men's Clothing", icon: 'suitcase' },
            { name: "Women's Clothing", icon: 'shopping-bag' }
          ].map((category, index) => (
            <DrawerButton
              category={category.name}
              icon={category.icon}
              onPress={changeCategory}
              key={index}
            />
          ))}
        </View>
      </DrawerContentScrollView>

      <Pressable
        onPress={signOutHandler}
        style={({ pressed }) => [
          {
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#d1b3ff'
          },
          pressed && {
            opacity: 0.7
          }
        ]}
      >
        <FontAwesomeIcon name="sign-out" size={25} />
        <Text style={{ fontSize: 18, marginLeft: 10 }}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Drawer;
