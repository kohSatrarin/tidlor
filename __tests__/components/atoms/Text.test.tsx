import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from '@/components/atoms/Text';
import { ThemeProvider } from '@/app/theme/ThemeProvider';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Text', () => {
  it('renders children', () => {
    const { getByText } = render(<Text>Hello</Text>, { wrapper: Wrapper });
    expect(getByText('Hello')).toBeTruthy();
  });

  it('renders h1 variant', () => {
    const { getByText } = render(<Text variant="h1">Title</Text>, { wrapper: Wrapper });
    expect(getByText('Title')).toBeTruthy();
  });

  it('renders error variant', () => {
    const { getByText } = render(<Text variant="error">Error message</Text>, { wrapper: Wrapper });
    expect(getByText('Error message')).toBeTruthy();
  });
});
