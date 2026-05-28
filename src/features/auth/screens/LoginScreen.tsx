import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenLayout } from '@/components/templates/ScreenLayout';
import { LoginForm } from '@/components/organisms/LoginForm';
import { Text } from '@/components/atoms/Text';
import { useAppDispatch, useAppSelector } from '@/features/shared/hooks/useAppDispatch';
import { login, selectAuthStatus, selectAuthError } from '@/features/auth/store/authSlice';
import { useAppTheme } from '@/app/theme/ThemeProvider';
import type { LoginFormValues } from '@/features/auth/validation/loginSchema';

export function LoginScreen() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAuthStatus);
  const authError = useAppSelector(selectAuthError);
  const { spacing } = useAppTheme();

  const handleSubmit = (values: LoginFormValues) => {
    dispatch(login(values.credential));
  };

  return (
    <ScreenLayout>
      <View style={[styles.container, { padding: spacing.xl }]}>
        <View style={[styles.header, { marginBottom: spacing.xxl }]}>
          <Text variant="h1" testID="screen-title">Smart Care System</Text>
          <Text variant="body">Sign in to continue</Text>
        </View>
        <LoginForm
          onSubmit={handleSubmit}
          isLoading={status === 'loading'}
          serverError={authError}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  header: { alignItems: 'center' },
});
