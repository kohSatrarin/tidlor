import React, { useCallback } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { RequestCard } from '@/components/molecules/RequestCard';
import { Text } from '@/components/atoms/Text';
import { useAppTheme } from '@/app/theme/ThemeProvider';
import type { SmartCare } from '@/features/smartCare/types';

type RequestListProps = {
  items: SmartCare[];
  onItemPress: (id: string) => void;
  testID?: string;
};

export function RequestList({ items, onItemPress, testID }: RequestListProps) {
  const { colors, spacing } = useAppTheme();

  const renderItem = useCallback(
    ({ item }: { item: SmartCare }) => (
      <RequestCard
        item={item}
        onPress={onItemPress}
        testID={`request-card-${item.id}`}
      />
    ),
    [onItemPress],
  );

  const ListEmptyComponent = (
    <View style={styles.empty}>
      <Text variant="body" color={colors.textSecondary}>
        No Smart Care requests yet.
      </Text>
      <Text variant="caption" color={colors.textSecondary}>
        Tap + to add your first request.
      </Text>
    </View>
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={[
        styles.list,
        { padding: spacing.lg },
        items.length === 0 && styles.emptyContainer,
      ]}
      showsVerticalScrollIndicator={false}
      testID={testID}
    />
  );
}

const styles = StyleSheet.create({
  list: { flexGrow: 1 },
  empty: { alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyContainer: { flex: 1 },
});
