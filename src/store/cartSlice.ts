import { createSlice } from '@reduxjs/toolkit';
import { ItemProps } from '../types/types';
import Toast from 'react-native-toast-message';

interface CartStateProps {
  items: ItemProps[];
  totalAmount: number;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0
  } as CartStateProps,
  reducers: {
    // fillCartFromLocalStorage(state, action) {
    //   const items = action.payload;
    //   let totalAmount = 0;
    //   let totalQuantity = 0;
    //   items.forEach(item => {
    //     state.items.push(JSON.parse(localStorage.getItem(item)));
    //     totalAmount += JSON.parse(localStorage.getItem(item)).totalPrice;
    //     totalQuantity += JSON.parse(localStorage.getItem(item)).quantity;
    //   });
    //   state.totalAmount = totalAmount;
    //   state.totalQuantity = totalQuantity;
    // },
    addItemToCart(state, { payload }) {
      const newItem = payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      state.totalAmount += newItem.price;

      if (!existingItem) {
        const item = {
          title: newItem.title,
          image: newItem.image,
          quantity: newItem.quantity,
          price: newItem.price,
          totalPrice: newItem.price,
          id: newItem.id
        };
        state.items.push(item);
        // localStorage.setItem(item.id, JSON.stringify(item));
      } else {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice += newItem.price * newItem.quantity;
        // localStorage.setItem(existingItem.id, JSON.stringify(existingItem));
      }

      Toast.show({
        type: 'success',
        text1: '🙌 Successfully added to cart!',
        text2: newItem.title
      });
    },
    increaseQuantity(state, { payload }) {
      const itemId = payload;
      const curItem = state.items.find(item => item.id === itemId);

      if (curItem) {
        curItem.quantity++;
        curItem.totalPrice += curItem.price;
        state.totalAmount += curItem.price;
      }
    },
    decreaseQuantity(state, { payload }) {
      const itemId = payload;
      const curItem = state.items.find(item => item.id === itemId);

      if (curItem) {
        if (curItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== itemId);
          state.totalAmount -= curItem.price;
        } else {
          curItem.quantity--;
          curItem.totalPrice -= curItem.price;
          state.totalAmount -= curItem.price;
        }
      }
    },
    removeItemFromCart(state, { payload }) {
      const itemId = payload;
      const curItem = state.items.find(item => item.id === itemId);

      if (curItem) {
        state.items = state.items.filter(item => item.id !== itemId);
        state.totalAmount -= curItem.totalPrice;
      }
    },
    emptyCart(state) {
      state.items = [];
      state.totalAmount = 0;
      // localStorage.clear();
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice;
