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
  initialState,
  reducers: {
    fetchingStart: (state) => {
      state.isFetching = true;
    },
    fetchingError: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.category = action.payload.data;
    },
    createCategorySuccess: (state) => {
      state.isFetching = false;
    },
  },
});

export const categorySliceActions = categorySlice.actions;

export default categorySlice;
