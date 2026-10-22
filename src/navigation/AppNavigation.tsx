import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { useAuthStore } from '../store/useAuthStore';
import { colors } from '../theme';

export const AppNavigation: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <View style={styles.container}>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default AppNavigation;
