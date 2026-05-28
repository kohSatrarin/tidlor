import React from 'react';
import { useAppSelector } from '@/features/shared/hooks/useAppDispatch';
import { selectIsLoggedIn } from '@/features/auth/store/authSlice';
import { AuthStack } from './AuthStack';
import { MainStack } from './MainStack';

export function RootNavigator() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return isLoggedIn ? <MainStack /> : <AuthStack />;
}
