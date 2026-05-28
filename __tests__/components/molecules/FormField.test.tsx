import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FormField } from '@/components/molecules/FormField';
import { ThemeProvider } from '@/app/theme/ThemeProvider';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('FormField', () => {
  it('renders label and input', () => {
    const { getByText, getByTestId } = render(
      <FormField label="Title" testID="title-input" />,
      { wrapper: Wrapper }
    );
    expect(getByText('Title')).toBeTruthy();
    expect(getByTestId('title-input')).toBeTruthy();
  });

  it('shows error message when error prop provided', () => {
    const { getByTestId } = render(
      <FormField label="Title" error="Title is required" testID="title-input" />,
      { wrapper: Wrapper }
    );
    expect(getByTestId('title-input-error')).toBeTruthy();
  });

  it('does not show error element when no error', () => {
    const { queryByTestId } = render(
      <FormField label="Title" testID="title-input" />,
      { wrapper: Wrapper }
    );
    expect(queryByTestId('title-input-error')).toBeNull();
  });
});
