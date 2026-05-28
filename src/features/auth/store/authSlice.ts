import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mockLogin } from '../services/authApi';
import type { AuthState } from '../types';
import type { RootState } from '@/app/store/rootReducer';

export const login = createAsyncThunk(
  'auth/login',
  async (credential: string, { rejectWithValue }) => {
    try {
      return await mockLogin(credential);
    } catch (err) {
      return rejectWithValue('Login failed. Please try again.');
    }
  },
);

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'error';
        state.error = (action.payload as string) ?? 'Unknown error';
        state.user = null;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;

// Selectors
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsLoggedIn = (state: RootState) => state.auth.user !== null;

export default authSlice.reducer;
