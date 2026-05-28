import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { useAppTheme } from '@/app/theme/ThemeProvider';
import type { SmartCare } from '@/features/smartCare/types';

type RequestCardProps = {
  item: SmartCare;
  onPress: (id: string) => void;
  testID?: string;
};

export function RequestCard({ item, onPress, testID }: RequestCardProps) {
  const { colors, spacing, radius } = useAppTheme();

  return (
    <TouchableOpacity
      onPress={() => onPress(item.id)}
      accessibilityRole="button"
      accessibilityLabel={item.title}
      testID={testID}
      style={[
        styles.card,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          borderRadius: radius.md,
          padding: spacing.lg,
          marginBottom: spacing.sm,
        },
      ]}
    >
      <Text variant="caption" color={colors.textSecondary}>
        {item.id}
      </Text>
      <Text variant="body" numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1 },
  title: { marginTop: 2 },
});
