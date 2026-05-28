import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchBar } from '@/components/molecules/SearchBar';
import { ThemeProvider } from '@/app/theme/ThemeProvider';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('SearchBar', () => {
  it('renders input and search button', () => {
    const { getByTestId } = render(
      <SearchBar onSearch={jest.fn()} testID="search" />,
      { wrapper: Wrapper }
    );
    expect(getByTestId('search-input')).toBeTruthy();
    expect(getByTestId('search-button')).toBeTruthy();
  });

  it('calls onSearch with trimmed input value when button pressed', () => {
    const onSearch = jest.fn();
    const { getByTestId } = render(
      <SearchBar onSearch={onSearch} testID="search" />,
      { wrapper: Wrapper }
    );
    fireEvent.changeText(getByTestId('search-input'), '  sc-seed-001  ');
    fireEvent.press(getByTestId('search-button'));
    expect(onSearch).toHaveBeenCalledWith('sc-seed-001');
  });

  it('calls onSearch when submit editing on input', () => {
    const onSearch = jest.fn();
    const { getByTestId } = render(
      <SearchBar onSearch={onSearch} testID="search" />,
      { wrapper: Wrapper }
    );
    fireEvent.changeText(getByTestId('search-input'), 'sc-seed-002');
    fireEvent(getByTestId('search-input'), 'submitEditing');
    expect(onSearch).toHaveBeenCalledWith('sc-seed-002');
  });
});
