import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenLayout } from '@/components/templates/ScreenLayout';
import { Text } from '@/components/atoms/Text';
import { useAppSelector } from '@/features/shared/hooks/useAppDispatch';
import { selectRequestById } from '@/features/smartCare/store/smartCareSlice';
import { useAppTheme } from '@/app/theme/ThemeProvider';
import { formatDate } from '@/features/shared/utils/formatDate';
import type { MainStackParamList } from '@/app/navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'RequestDetail'>;

export function RequestDetailScreen() {
  const route = useRoute<Props['route']>();
  const { id } = route.params;
  const request = useAppSelector(selectRequestById(id));
  const { spacing } = useAppTheme();

  if (!request) {
    return (
      <ScreenLayout>
        <View style={styles.center}>
          <Text variant="body" testID="not-found-text">Request not found.</Text>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout scrollable>
      <View style={[styles.container, { padding: spacing.xl, gap: spacing.lg }]}>
        <View>
          <Text variant="caption" testID="detail-id">{request.id}</Text>
        </View>
        <View>
          <Text variant="label">Title</Text>
          <Text variant="h2" testID="detail-title">{request.title}</Text>
        </View>
        <View>
          <Text variant="label">Description</Text>
          <Text variant="body" testID="detail-description">{request.description}</Text>
        </View>
        <View>
          <Text variant="label">Created</Text>
          <Text variant="body" testID="detail-created">{formatDate(request.createdAt)}</Text>
        </View>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {},
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
