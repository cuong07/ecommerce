import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: {},
  newCategory: {},
  updateCategory: {},
  isFetching: false,
  error: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    getCategoryStart: (state) => {
      state.isFetching = true;
    },
    getCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.category = action.payload.data;
    },
    getCategoryError: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const categorySliceActions = categorySlice.actions;

export default categorySlice;
