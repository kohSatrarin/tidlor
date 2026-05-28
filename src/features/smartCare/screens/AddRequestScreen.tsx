import React from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormLayout } from '@/components/templates/FormLayout';
import { AddRequestForm } from '@/components/organisms/AddRequestForm';
import { useAppDispatch } from '@/features/shared/hooks/useAppDispatch';
import { addRequest } from '@/features/smartCare/store/smartCareSlice';
import type { RequestFormValues } from '@/features/smartCare/validation/requestSchema';
import type { MainStackParamList } from '@/app/navigation/types';

type AddNavProp = NativeStackNavigationProp<MainStackParamList, 'AddRequest'>;

export function AddRequestScreen() {
  const navigation = useNavigation<AddNavProp>();
  const dispatch = useAppDispatch();

  const handleSubmit = (values: RequestFormValues) => {
    dispatch(addRequest({ title: values.title, description: values.description }));
    navigation.goBack();
  };

  return (
    <FormLayout testID="add-request-screen">
      <AddRequestForm onSubmit={handleSubmit} />
    </FormLayout>
  );
}
