import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '@/components/atoms/Input';
import { Text } from '@/components/atoms/Text';
import { useAppTheme } from '@/app/theme/ThemeProvider';
import type { TextInputProps } from 'react-native';

type FormFieldProps = TextInputProps & {
  label: string;
  error?: string;
  testID?: string;
};

export function FormField({ label, error, testID, style, ...inputProps }: FormFieldProps) {
  const { spacing } = useAppTheme();

  return (
    <View style={[styles.container, { gap: spacing.xs }]}>
      <Text variant="label">{label}</Text>
      <Input
        hasError={!!error}
        testID={testID}
        style={style}
        {...inputProps}
      />
      {error ? (
        <Text variant="error" testID={testID ? `${testID}-error` : undefined}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
});
