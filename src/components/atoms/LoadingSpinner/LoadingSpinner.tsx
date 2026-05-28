import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useAppTheme } from '@/app/theme/ThemeProvider';

type LoadingSpinnerProps = {
  size?: 'small' | 'large';
  color?: string;
  testID?: string;
};

export function LoadingSpinner({ size = 'small', color, testID }: LoadingSpinnerProps) {
  const { colors } = useAppTheme();
  return (
    <View style={styles.container} testID={testID}>
      <ActivityIndicator size={size} color={color ?? colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
});
