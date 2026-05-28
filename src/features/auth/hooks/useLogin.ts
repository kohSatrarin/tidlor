import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '../validation/loginSchema';
import { useAppDispatch, useAppSelector } from '@/features/shared/hooks/useAppDispatch';
import { login } from '../store/authSlice';
import { selectAuthStatus, selectAuthError } from '../store/authSlice';

export function useLogin() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAuthStatus);
  const authError = useAppSelector(selectAuthError);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { credential: '' },
  });

  const onSubmit = form.handleSubmit(async (data: LoginFormValues) => {
    await dispatch(login(data.credential));
  });

  return {
    form,
    onSubmit,
    isLoading: status === 'loading',
    authError,
  };
}
