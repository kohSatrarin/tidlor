import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '@/features/smartCare/screens/MainScreen';
import { AddRequestScreen } from '@/features/smartCare/screens/AddRequestScreen';
import { RequestDetailScreen } from '@/features/smartCare/screens/RequestDetailScreen';
import type { MainStackParamList } from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ title: 'Smart Care' }}
      />
      <Stack.Screen
        name="AddRequest"
        component={AddRequestScreen}
        options={{ title: 'New Request' }}
      />
      <Stack.Screen
        name="RequestDetail"
        component={RequestDetailScreen}
        options={{ title: 'Request Detail' }}
      />
    </Stack.Navigator>
  );
}
