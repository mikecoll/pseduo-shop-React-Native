import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './uiSlice';
import cartSlice from './cartSlice';
import favsSlice from './favsSlice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
    favs: favsSlice.reducer
  }
});

export default store;
