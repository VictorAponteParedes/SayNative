import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './src/features/home';
import { ExploreScreen } from './src/features/discovery';
import { useAppConfigStore } from './src/store/useAppConfigStore';

export const App: React.FC = () => {
  const currentTab = useAppConfigStore((state) => state.currentTab);

  const renderActiveScreen = () => {
    switch (currentTab) {
      case 'Explorar':
        return <ExploreScreen />;
      case 'Inicio':
      default:
        return <HomeScreen />;
    }
  };

  return <SafeAreaProvider>{renderActiveScreen()}</SafeAreaProvider>;
};

export default App;
