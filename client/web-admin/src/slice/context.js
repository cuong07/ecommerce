import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageUrl: "https://res.cloudinary.com/dh4wwxi3i/image/upload/v1693495595/",
};
const contextData = createSlice({
  name: "contextData",
  initialState,
  reducers: {
    updateContext: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
});

export const contextDataActions = contextData.actions;
export default contextData;
