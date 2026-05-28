import 'react-native-get-random-values';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { store } from '@/app/store';
import { ThemeProvider } from '@/app/theme/ThemeProvider';
import { RootNavigator } from '@/app/navigation/RootNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
