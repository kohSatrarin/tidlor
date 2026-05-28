import { combineReducers } from '@reduxjs/toolkit';
import smartCareReducer from '@/features/smartCare/store/smartCareSlice';

// auth reducer will be added in Task 4
const rootReducer = combineReducers({
  smartCare: smartCareReducer,
  // auth: authReducer,  // Task 4
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
