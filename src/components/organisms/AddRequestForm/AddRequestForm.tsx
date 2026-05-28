import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { requestSchema, type RequestFormValues } from '@/features/smartCare/validation/requestSchema';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { useAppTheme } from '@/app/theme/ThemeProvider';

type AddRequestFormProps = {
  onSubmit: (values: RequestFormValues) => void;
  isSubmitting?: boolean;
};

export function AddRequestForm({ onSubmit, isSubmitting = false }: AddRequestFormProps) {
  const { spacing } = useAppTheme();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    mode: 'onChange',
    defaultValues: { title: '', description: '' },
  });

  return (
    <View style={[styles.container, { gap: spacing.lg }]}>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <FormField
            label="Title"
            value={value}
            onChangeText={onChange}
            placeholder="Brief summary of the issue"
            error={errors.title?.message}
            testID="title-input"
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <FormField
            label="Description"
            value={value}
            onChangeText={onChange}
            placeholder="Describe the issue in detail"
            multiline
            numberOfLines={4}
            error={errors.description?.message}
            testID="description-input"
          />
        )}
      />

      <Button
        title="Submit Request"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
        loading={isSubmitting}
        fullWidth
        testID="submit-button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
});
