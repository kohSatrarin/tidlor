import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { NavigationContainer } from '@react-navigation/native';
import { MainScreen } from '@/features/smartCare/screens/MainScreen';
import { ThemeProvider } from '@/app/theme/ThemeProvider';
import rootReducer from '@/app/store/rootReducer';
import type { SmartCare } from '@/features/smartCare/types';

const seedItem: SmartCare = {
  id: 'sc-test-001',
  title: 'AC not working',
  description: 'Details',
  createdAt: '2026-05-28T10:00:00.000Z',
};

function renderMainScreen(preloadedState?: object) {
  const testStore = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as never,
  });
  return render(
    <Provider store={testStore}>
      <ThemeProvider>
        <NavigationContainer>
          <MainScreen />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>,
  );
}

describe('MainScreen', () => {
  it('renders request list', () => {
    const { getByTestId } = renderMainScreen({
      smartCare: { items: [seedItem], lastSearchResultId: null, lastSearchError: null },
    });
    expect(getByTestId('request-list')).toBeTruthy();
  });

  it('renders add button', () => {
    const { getByTestId } = renderMainScreen();
    expect(getByTestId('add-button')).toBeTruthy();
  });

  it('shows search error when search returns no result', async () => {
    const { findByTestId } = renderMainScreen({
      smartCare: {
        items: [seedItem],
        lastSearchResultId: null,
        lastSearchError: 'No Smart Care request found with ID: bad-id',
      },
    });
    expect(await findByTestId('search-error')).toBeTruthy();
  });

  it('renders request card for each item', () => {
    const { getByTestId } = renderMainScreen({
      smartCare: { items: [seedItem], lastSearchResultId: null, lastSearchError: null },
    });
    expect(getByTestId('request-card-sc-test-001')).toBeTruthy();
  });
});
