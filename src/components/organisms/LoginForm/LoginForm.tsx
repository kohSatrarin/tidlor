import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '@/features/auth/validation/loginSchema';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { useAppTheme } from '@/app/theme/ThemeProvider';

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void;
  isLoading?: boolean;
  serverError?: string | null;
};

export function LoginForm({ onSubmit, isLoading = false, serverError }: LoginFormProps) {
  const { spacing } = useAppTheme();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { credential: '' },
  });

  return (
    <View style={[styles.container, { gap: spacing.lg }]}>
      <Controller
        control={control}
        name="credential"
        render={({ field: { onChange, value } }) => (
          <FormField
            label="National ID or Phone Number"
            value={value}
            onChangeText={onChange}
            keyboardType="number-pad"
            maxLength={13}
            placeholder="Enter 13-digit ID or 10-digit phone"
            error={errors.credential?.message}
            testID="credential-input"
          />
        )}
      />

      {serverError ? (
        <Text variant="error" testID="server-error">
          {serverError}
        </Text>
      ) : null}

      <Button
        title="Login"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
        loading={isLoading}
        fullWidth
        testID="login-button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
});
