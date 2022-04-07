import { createSlice } from '@reduxjs/toolkit';
import { ItemProps, ProductProps } from '../types/types';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface FavsStateProps {
  favorites: ItemProps[];
}

const favsSlice = createSlice({
  name: 'favs',
  initialState: {
    favorites: []
  } as FavsStateProps,
  reducers: {
    setFavorites(state, { payload }) {
      state.favorites = payload;
    },
    addFavorite(state, { payload }) {
      if (state.favorites) {
        const existingItem = state.favorites.find(
          (item: ItemProps) => item.id === payload.id
        );

        if (!existingItem) {
          state.favorites = [...state.favorites, payload];
        }

        firestore()
          .collection('users')
          .doc(auth().currentUser?.uid)
          .update({
            favorites: [...state.favorites, payload]
          });

        Toast.show({
          type: 'success',
          text1: '❤️ Added to favorites!',
          text2: payload.title
        });
      }
    },
    removeFromFavorites(state, { payload }) {
      if (state.favorites) {
        state.favorites = state.favorites.filter(
          (item: ItemProps) => item.id !== payload.id
        );

        firestore()
          .collection('users')
          .doc(auth().currentUser?.uid)
          .update({
            favorites: state.favorites.filter(
              (item: ProductProps) => item.id !== payload.id
            )
          });

        Toast.show({
          type: 'success',
          text1: '💔 Removed from favorites!',
          text2: payload.title
        });
      }
    }
  }
});

export const favsActions = favsSlice.actions;

export default favsSlice;
