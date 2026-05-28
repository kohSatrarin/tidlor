import 'react-native-get-random-values';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'expo-status-bar';
import { store, persistor } from '@/app/store';
import { ThemeProvider } from '@/app/theme/ThemeProvider';
import { RootNavigator } from '@/app/navigation/RootNavigator';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner';
import { seedRequests, selectAllRequests } from '@/features/smartCare/store/smartCareSlice';
import { mockSeedData } from '@/features/smartCare/services/mockSeed';

function AppSeed({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const items = useSelector(selectAllRequests);

  React.useEffect(() => {
    if (items.length === 0) {
      dispatch(seedRequests(mockSeedData));
    }
  }, []); // run once after mount (post-rehydration — PersistGate ensures store is rehydrated before render)

  return <>{children}</>;
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner size="large" />} persistor={persistor}>
        <ThemeProvider>
          <AppSeed>
            <NavigationContainer>
              <StatusBar style="auto" />
              <RootNavigator />
            </NavigationContainer>
          </AppSeed>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
