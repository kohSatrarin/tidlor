import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { useAppTheme } from '@/app/theme/ThemeProvider';

type SearchBarProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
  testID?: string;
};

export function SearchBar({ onSearch, placeholder = 'Search by Smart Care ID', testID }: SearchBarProps) {
  const { spacing } = useAppTheme();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query.trim());
  };

  return (
    <View style={[styles.container, { gap: spacing.sm }]} testID={testID}>
      <View style={styles.inputWrapper}>
        <Input
          value={query}
          onChangeText={setQuery}
          placeholder={placeholder}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          testID={testID ? `${testID}-input` : undefined}
        />
      </View>
      <Button
        title="Search"
        onPress={handleSearch}
        variant="primary"
        testID={testID ? `${testID}-button` : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  inputWrapper: { flex: 1 },
});
