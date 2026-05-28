import React from 'react';
import { render } from '@testing-library/react-native';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner';
import { ThemeProvider } from '@/app/theme/ThemeProvider';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('LoadingSpinner', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<LoadingSpinner testID="spinner" />, { wrapper: Wrapper });
    expect(getByTestId('spinner')).toBeTruthy();
  });
});
