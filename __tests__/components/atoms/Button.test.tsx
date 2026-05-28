import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/atoms/Button';
import { ThemeProvider } from '@/app/theme/ThemeProvider';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Button', () => {
  it('renders title', () => {
    const { getByText } = render(<Button title="Press me" />, { wrapper: Wrapper });
    expect(getByText('Press me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button title="Press me" onPress={onPress} />, { wrapper: Wrapper });
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button title="Press me" onPress={onPress} disabled />, { wrapper: Wrapper });
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows loading spinner when loading=true', () => {
    const { queryByText } = render(
      <Button title="Submit" loading testID="btn" />,
      { wrapper: Wrapper }
    );
    // Title text is hidden during loading
    expect(queryByText('Submit')).toBeNull();
  });
});
