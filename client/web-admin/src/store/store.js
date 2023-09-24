import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authSlice, categorySlice, productSlice } from "../slice";
import contextData from "../slice/context";
import discountSlice from "../slice/discountSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice.reducer);
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    product: productSlice.reducer,
    context: contextData.reducer,
    category: categorySlice.reducer,
    discount: discountSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      //  {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),
});
export let persistor = persistStore(store);
export default store;

