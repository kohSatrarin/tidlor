import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // will be configured with persist ignore list in Task 10
    }),
});

export type AppDispatch = typeof store.dispatch;
export default store;
