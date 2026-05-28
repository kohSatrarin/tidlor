import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenLayout } from '@/components/templates/ScreenLayout';
import { SearchBar } from '@/components/molecules/SearchBar';
import { RequestList } from '@/components/organisms/RequestList';
import { Text } from '@/components/atoms/Text';
import { useRequests } from '../hooks/useRequests';
import { useSearchRequest } from '../hooks/useSearchRequest';
import { useAppTheme } from '@/app/theme/ThemeProvider';
import type { MainStackParamList } from '@/app/navigation/types';

type MainNavProp = NativeStackNavigationProp<MainStackParamList, 'Main'>;

export function MainScreen() {
  const navigation = useNavigation<MainNavProp>();
  const { items } = useRequests();
  const { search, reset, resultId, searchError } = useSearchRequest();
  const { colors, spacing } = useAppTheme();

  // Navigate to detail when a search result is found
  useEffect(() => {
    if (resultId) {
      reset();
      navigation.navigate('RequestDetail', { id: resultId });
    }
  }, [resultId, navigation, reset]);

  const handleItemPress = (id: string) => {
    navigation.navigate('RequestDetail', { id });
  };

  const handleAddPress = () => {
    navigation.navigate('AddRequest');
  };

  return (
    <ScreenLayout style={{ backgroundColor: colors.surface }}>
      <View style={[styles.searchRow, { padding: spacing.lg, paddingBottom: 0 }]}>
        <SearchBar onSearch={search} testID="main-search" />
      </View>
      {searchError ? (
        <Text
          variant="error"
          style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm }}
          testID="search-error"
        >
          {searchError}
        </Text>
      ) : null}
      <RequestList items={items} onItemPress={handleItemPress} testID="request-list" />
      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: colors.primary,
            bottom: spacing.xl + 16,
            right: spacing.xl,
          },
        ]}
        onPress={handleAddPress}
        accessibilityRole="button"
        accessibilityLabel="Add new request"
        testID="add-button"
      >
        <Text variant="h2" color={colors.primaryText}>+</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  searchRow: { width: '100%' },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
