import React from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { useAppTheme } from '@/app/theme/ThemeProvider';

type Variant = 'h1' | 'h2' | 'body' | 'caption' | 'label' | 'error';

type TextProps = RNTextProps & {
  variant?: Variant;
  color?: string;
};

export function Text({ variant = 'body', color, style, children, ...rest }: TextProps) {
  const { colors, fontSizes, fontWeights } = useAppTheme();

  const variantStyles: Record<Variant, object> = {
    h1: { fontSize: fontSizes.xxl, fontWeight: fontWeights.bold, color: colors.text },
    h2: { fontSize: fontSizes.xl, fontWeight: fontWeights.semibold, color: colors.text },
    body: { fontSize: fontSizes.md, fontWeight: fontWeights.regular, color: colors.text },
    caption: { fontSize: fontSizes.sm, fontWeight: fontWeights.regular, color: colors.textSecondary },
    label: { fontSize: fontSizes.sm, fontWeight: fontWeights.medium, color: colors.text },
    error: { fontSize: fontSizes.sm, fontWeight: fontWeights.regular, color: colors.error },
  };

  return (
    <RNText style={[variantStyles[variant], color ? { color } : undefined, style]} {...rest}>
      {children}
    </RNText>
  );
}
