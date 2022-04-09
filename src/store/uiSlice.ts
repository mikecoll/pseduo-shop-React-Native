import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    darkMode: false,
    category: 'All Products'
  },
  reducers: {
    changeCategory(state, { payload }) {
      state.category = payload;
    },
    setTheme(state, { payload }) {
      if (payload === 'light') {
        state.darkMode = false;
      } else {
        state.darkMode = true;
      }
    }
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice;
