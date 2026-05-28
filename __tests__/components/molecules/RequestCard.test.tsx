import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { RequestCard } from '@/components/molecules/RequestCard';
import { ThemeProvider } from '@/app/theme/ThemeProvider';
import type { SmartCare } from '@/features/smartCare/types';

const mockItem: SmartCare = {
  id: 'sc-test-001',
  title: 'Air conditioning not working in Room 301 — this is a very long title that should be truncated',
  description: 'Test description',
  createdAt: '2026-05-28T10:00:00.000Z',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('RequestCard', () => {
  it('displays item id and title', () => {
    const { getByText } = render(
      <RequestCard item={mockItem} onPress={jest.fn()} />,
      { wrapper: Wrapper }
    );
    expect(getByText('sc-test-001')).toBeTruthy();
    expect(getByText(mockItem.title)).toBeTruthy();
  });

  it('calls onPress with item id when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <RequestCard item={mockItem} onPress={onPress} />,
      { wrapper: Wrapper }
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledWith('sc-test-001');
  });
});
