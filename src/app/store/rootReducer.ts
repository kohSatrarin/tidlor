import { combineReducers } from '@reduxjs/toolkit';

// Slices will be added by Tasks 3 and 4
const rootReducer = combineReducers({
  // auth: authReducer,      // Task 4
  // smartCare: smartCareReducer, // Task 3
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
