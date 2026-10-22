import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { navigationRef } from './src/navigation/NavigationRef';
import AppNavigation from './src/navigation/AppNavigation';
import './src/lang'; // Inicialización global de i18n

export const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
