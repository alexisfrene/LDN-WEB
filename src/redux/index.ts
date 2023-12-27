import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import variantsReducer from './variantsSlice';
import { variantsApi } from '@/services/products';
export const store = configureStore({
  reducer: {
    variants: variantsReducer,
    [variantsApi.reducerPath]: variantsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(variantsApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
