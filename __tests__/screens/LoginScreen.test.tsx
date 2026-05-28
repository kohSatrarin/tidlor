import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen } from '@/features/auth/screens/LoginScreen';
import { ThemeProvider } from '@/app/theme/ThemeProvider';
import rootReducer from '@/app/store/rootReducer';

function renderWithProviders(ui: React.ReactElement) {
  const testStore = configureStore({ reducer: rootReducer });
  return render(
    <Provider store={testStore}>
      <ThemeProvider>
        <NavigationContainer>
          {ui}
        </NavigationContainer>
      </ThemeProvider>
    </Provider>,
  );
}

describe('LoginScreen', () => {
  it('renders title and login button', () => {
    const { getByTestId } = renderWithProviders(<LoginScreen />);
    expect(getByTestId('screen-title')).toBeTruthy();
    expect(getByTestId('login-button')).toBeTruthy();
  });

  it('login button starts disabled (empty input)', () => {
    const { getByTestId } = renderWithProviders(<LoginScreen />);
    const btn = getByTestId('login-button');
    expect(btn.props.accessibilityState?.disabled).toBe(true);
  });

  it('login button enabled with valid 13-digit national ID', async () => {
    const { getByTestId } = renderWithProviders(<LoginScreen />);
    fireEvent.changeText(getByTestId('credential-input'), '1234567890123');
    await waitFor(() => {
      expect(getByTestId('login-button').props.accessibilityState?.disabled).toBe(false);
    });
  });

  it('login button enabled with valid 10-digit phone', async () => {
    const { getByTestId } = renderWithProviders(<LoginScreen />);
    fireEvent.changeText(getByTestId('credential-input'), '0812345678');
    await waitFor(() => {
      expect(getByTestId('login-button').props.accessibilityState?.disabled).toBe(false);
    });
  });

  it('login button stays disabled with invalid input', async () => {
    const { getByTestId } = renderWithProviders(<LoginScreen />);
    fireEvent.changeText(getByTestId('credential-input'), '123abc');
    await waitFor(() => {
      expect(getByTestId('login-button').props.accessibilityState?.disabled).toBe(true);
    });
  });
});
