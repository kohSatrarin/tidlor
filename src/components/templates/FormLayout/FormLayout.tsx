import React from 'react';
import { View, StyleSheet, type ViewStyle, type StyleProp } from 'react-native';
import { ScreenLayout } from '../ScreenLayout';
import { useAppTheme } from '@/app/theme/ThemeProvider';

type FormLayoutProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function FormLayout({ children, style, testID }: FormLayoutProps) {
  const { spacing } = useAppTheme();

  return (
    <ScreenLayout scrollable testID={testID} style={style}>
      <View style={[styles.form, { gap: spacing.lg }]}>
        {children}
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  form: { width: '100%' },
});
