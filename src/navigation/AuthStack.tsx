import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';
import type { AuthStackParamList } from './types';
import { AppText, AppButton } from '../componentes';
import { useAuthStore } from '../store/useAuthStore';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const LoginPlaceholder: React.FC = () => {
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  return (
    <View style={styles.container}>
      <AppText variant="h1" style={styles.title}>
        SayNative
      </AppText>
      <AppText variant="bodyMedium" style={styles.subtitle}>
        Aprende idiomas con hablantes nativos reales
      </AppText>
      <AppButton
        title="Iniciar Sesión"
        onPress={() => setAuthenticated(true)}
        style={styles.button}
      />
    </View>
  );
};

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name={Routes.Auth.Login as keyof AuthStackParamList}
        component={LoginPlaceholder}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    width: '100%',
  },
});

export default AuthStack;
