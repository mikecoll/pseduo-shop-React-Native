import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0
  },
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
    // addItemToCart(state, action) {
    //   const newItem = action.payload;
    //   console.log(newItem);
    //   const existingItem = state.items.find(item => item.id === newItem.id);
    //   state.totalQuantity++;
    //   state.totalAmount += newItem.price;
    //   if (!existingItem) {
    //     const item = {
    //       title: newItem.title,
    //       image: newItem.image,
    //       quantity: 1,
    //       price: newItem.price,
    //       totalPrice: newItem.price,
    //       id: newItem.id
    //     };
    //     state.items.push(item);
    //     localStorage.setItem(item.id, JSON.stringify(item));
    //   } else {
    //     existingItem.quantity++;
    //     existingItem.totalPrice += newItem.price;
    //     localStorage.setItem(existingItem.id, JSON.stringify(existingItem));
    //   }
    // },
    // removeItemFromCart(state, action) {
    //   const id = action.payload;
    //   const existingItem = state.items.find(item => item.id === id);
    //   state.totalQuantity--;
    //   if (existingItem.quantity === 1) {
    //     state.items = state.items.filter(item => item.id !== id);
    //     state.totalAmount -= existingItem.price;
    //     localStorage.removeItem(existingItem.id);
    //   } else {
    //     existingItem.quantity--;
    //     existingItem.totalPrice -= existingItem.price;
    //     state.totalAmount -= existingItem.price;
    //     localStorage.setItem(existingItem.id, JSON.stringify(existingItem));
    //   }
    // },
    // emptyCart(state) {
    //   state.items = [];
    //   state.totalQuantity = 0;
    //   state.totalAmount = 0;
    //   localStorage.clear();
    // }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice;
