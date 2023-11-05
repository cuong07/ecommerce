import { createSlice } from "@reduxjs/toolkit";

const filter = {
  soldMostProduct: {
    page: 0,
    size: 10,
  },
  biggestBuyer: {
    page: 0,
    size: 8,
  },
};

const initialState = {
  totalRevenueLineChart: null,
  countProductForCategory: null,
  isFetching: false,
  error: null,
  filter: { ...filter },
  listSoldMostProduct: {},
  listBiggestBuyer: {},
  pageNumber: {
    soldMostProduct: 0,
    biggestBuyer: 0,
  },
};

const chartSlice = createSlice({
  name: "chart",
  initialState: initialState,
  reducers: {
    fetchingStart: (state) => {
      state.isFetching = true;
    },
    fetchingError: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    getLineChartSuccess: (state, action) => {
      state.isFetching = false;
      state.totalRevenueLineChart = action.payload.data;
    },
    getPieChartSuccess: (state, action) => {
      state.isFetching = false;
      state.countProductForCategory = action.payload.data;
    },
    getSoldMostProductSuccess: (state, action) => {
      state.isFetching = false;
      state.listSoldMostProduct = action.payload.data;
    },
    getBiggestBuyerSuccsess: (state, action) => {
      state.isFetching = false;
      state.listBiggestBuyer = action.payload.data;
    },
    updatePageSoldMostProduct: (state, action) => {
      state.filter.soldMostProduct.page += action.payload;
    },
    updatePageBiggestBuyer: (state, action) => {
      state.filter.biggestBuyer.page += action.payload;
    },
  },
});

export const chartSliceAction = chartSlice.actions;
export default chartSlice;
