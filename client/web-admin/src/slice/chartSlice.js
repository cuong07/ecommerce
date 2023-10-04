import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalRevenueLineChart: null,
  countProductForCategory: null,
  isFetching: false,
  error: null,
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
  },
});

export const chartSliceAction = chartSlice.actions;
export default chartSlice;
