import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  type TouchableOpacityProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useAppTheme } from '@/app/theme/ThemeProvider';
import { Text } from '../Text';
import { LoadingSpinner } from '../LoadingSpinner';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
};

export function Button({
  title,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  ...rest
}: ButtonProps) {
  const { colors, spacing, radius } = useAppTheme();

  const isDisabled = disabled || loading;

  const containerStyle: StyleProp<ViewStyle> = [
    styles.base,
    {
      backgroundColor:
        variant === 'primary'
          ? isDisabled ? colors.textDisabled : colors.primary
          : 'transparent',
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: variant === 'outline' ? colors.primary : undefined,
      borderRadius: radius.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      opacity: isDisabled && variant !== 'primary' ? 0.5 : 1,
    },
    fullWidth && styles.fullWidth,
    style as StyleProp<ViewStyle>,
  ];

  const textColor =
    variant === 'primary'
      ? colors.primaryText
      : variant === 'outline'
      ? colors.primary
      : colors.text;

  return (
    <TouchableOpacity
      style={containerStyle}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      {...rest}
    >
      {loading ? (
        <LoadingSpinner size="small" color={textColor} />
      ) : (
        <Text variant="label" color={textColor} style={styles.label}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  fullWidth: { width: '100%' },
  label: { textAlign: 'center' },
});
