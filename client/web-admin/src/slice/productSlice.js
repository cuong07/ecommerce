import { createSlice } from "@reduxjs/toolkit";
const filter = {
  page: 1,
  size: 10,
};

const initialState = {
  list: [],
  isFetching: false,
  filter: { ...filter },
  error: false,
  pageNumber: 1,
  productDetail: {},
  updateProduct: {},
  newProduct: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductStart: (state) => {
      state.isFetching = true;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.list = action.payload.data;
      state.filter.page = action.payload.currentPage;
    },
    getProductError: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    updatePage: (state, action) => {
      state.pageNumber += action.payload;
    },
    getProductDetail: (state, action) => {
      state.isFetching = false;
      state.productDetail = action.payload.data;
    },
    updateProductSuccess: (state) => {
      state.isFetching = false;
    }
  },
});

export const productSliceAction = productSlice.actions;

export default productSlice;
