import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    category: 'All Products'
  },
  reducers: {
    changeCategory(state, { payload }) {
      state.category = payload;
    }
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice;
