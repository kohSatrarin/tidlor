import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '@/components/atoms/Input';
import { ThemeProvider } from '@/app/theme/ThemeProvider';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Input', () => {
  it('renders without crashing', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" />,
      { wrapper: Wrapper }
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('accepts text input', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" onChangeText={onChange} />,
      { wrapper: Wrapper }
    );
    fireEvent.changeText(getByPlaceholderText('Enter text'), 'hello');
    expect(onChange).toHaveBeenCalledWith('hello');
  });
});
