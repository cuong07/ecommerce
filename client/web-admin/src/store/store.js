import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authSlice, categorySlice, productSlice } from '../slice';
import contextData from '../slice/context';
import discountSlice from '../slice/discountSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice.reducer);
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    product: productSlice.reducer,
    context: contextData.reducer,
    category: categorySlice.reducer,
    discount: discountSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export const persistor = persistStore(store);
export default store;
