import { createSlice } from "@reduxjs/toolkit";
const filter = {
  page: 1,
  size: 10,
};

const initialState = {
  isFetching: false,
  error: null,
  orders: {},
  filter: { ...filter },
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getOrderStart: (state) => {
      state.isFetching = true;
    },
    getOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload.data;
      state.filter.page = action.payload.currentPage;
    },
    getOrderError: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    updatePage: (state, action) => {
      state.pageNumber += action.payload;
    },
  },
});

export const orderSliceActions = orderSlice.actions;

export default orderSlice;
