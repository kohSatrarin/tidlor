import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import type { SmartCare } from '../types';
import type { RootState } from '@/app/store/rootReducer';

type SmartCareState = {
  items: SmartCare[];
  lastSearchResultId: string | null;
  lastSearchError: string | null;
};

const initialState: SmartCareState = {
  items: [],
  lastSearchResultId: null,
  lastSearchError: null,
};

const smartCareSlice = createSlice({
  name: 'smartCare',
  initialState,
  reducers: {
    addRequest(state, action: PayloadAction<{ title: string; description: string }>) {
      const newItem: SmartCare = {
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        createdAt: new Date().toISOString(),
      };
      state.items.unshift(newItem); // prepend to show newest first
    },
    searchRequestById(state, action: PayloadAction<{ id: string }>) {
      const found = state.items.find((item) => item.id === action.payload.id);
      if (found) {
        state.lastSearchResultId = found.id;
        state.lastSearchError = null;
      } else {
        state.lastSearchResultId = null;
        state.lastSearchError = `No Smart Care request found with ID: ${action.payload.id}`;
      }
    },
    clearSearch(state) {
      state.lastSearchResultId = null;
      state.lastSearchError = null;
    },
    seedRequests(state, action: PayloadAction<SmartCare[]>) {
      // Only seeds if empty — called on app startup after rehydration
      if (state.items.length === 0) {
        state.items = action.payload;
      }
    },
  },
});

export const { addRequest, searchRequestById, clearSearch, seedRequests } = smartCareSlice.actions;

// Selectors
export const selectAllRequests = (state: RootState) => state.smartCare.items;
export const selectRequestById = (id: string) => (state: RootState) =>
  state.smartCare.items.find((item) => item.id === id);
export const selectLastSearchResultId = (state: RootState) => state.smartCare.lastSearchResultId;
export const selectLastSearchError = (state: RootState) => state.smartCare.lastSearchError;

export default smartCareSlice.reducer;
