import React from 'react';
import {
  TextInput,
  StyleSheet,
  type TextInputProps,
} from 'react-native';
import { useAppTheme } from '@/app/theme/ThemeProvider';

type InputProps = TextInputProps & {
  hasError?: boolean;
};

export function Input({ hasError = false, style, ...rest }: InputProps) {
  const { colors, spacing, radius, fontSizes } = useAppTheme();

  return (
    <TextInput
      style={[
        styles.base,
        {
          backgroundColor: colors.inputBackground,
          borderColor: hasError ? colors.error : colors.border,
          borderRadius: radius.md,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          fontSize: fontSizes.md,
          color: colors.text,
        },
        style,
      ]}
      placeholderTextColor={colors.placeholder}
      autoCapitalize="none"
      autoCorrect={false}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: { borderWidth: 1, width: '100%' },
});
