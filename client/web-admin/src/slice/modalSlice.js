import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  data: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.data = action.payload || {};
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const modalSliceAction = modalSlice.actions;

export default modalSlice;
