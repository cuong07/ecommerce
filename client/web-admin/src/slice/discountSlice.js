import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFetching: false,
  error: false,
  discountList: {},
};

const discountSlice = createSlice({
  name: "discount",
  initialState: initialState,
  reducers: {
    getDiscountStart: (state) => {
      state.isFetching = true;
    },
    getDiscountSuccess: (state, action) => {
      state.isFetching = false;
      state.discountList = action.payload.data;
    },
    getDiscountError: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const discountSliceActions = discountSlice.actions;

export default discountSlice;
