import { combineReducers } from '@reduxjs/toolkit';
import smartCareReducer from '@/features/smartCare/store/smartCareSlice';
import authReducer from '@/features/auth/store/authSlice';

const rootReducer = combineReducers({
  smartCare: smartCareReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
