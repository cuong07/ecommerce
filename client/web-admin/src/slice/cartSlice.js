import { createSlice } from "@reduxjs/toolkit";
const filter = {
  page: 1,
  size: 10,
};

const initialState = {
  isFetching: false,
  error: null,
  carts: {},
  filter: { ...filter },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCartStart: (state) => {
      state.isFetching = true;
    },
    getCartSuccess: (state, action) => {
      state.isFetching = false;
      state.carts = action.payload.data;
      state.filter.page = action.payload.currentPage;
    },
    getDiscountError: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    updatePage: (state, action) => {
      state.pageNumber += action.payload;
    },
  },
});

export const cartSliceActions = cartSlice.actions;

export default cartSlice;
