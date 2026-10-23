import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';
import type { AuthStackParamList } from './types';
import { AppText, AppButton } from '@/components';
import { useAuthStore } from '@/store/useAuthStore';
import { colors } from '@/theme';
import { RegisterScreen } from '@/features/auth';

const Stack = createNativeStackNavigator<AuthStackParamList>();

interface LoginPlaceholderProps {
  navigation: {
    navigate: (route: string) => void;
  };
}

const LoginPlaceholder: React.FC<LoginPlaceholderProps> = ({ navigation }) => {
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
      <AppButton
        title="Crear Cuenta"
        variant="secondary"
        onPress={() => navigation.navigate(Routes.Auth.Register)}
        style={[styles.button, styles.registerButton]}
      />
    </View>
  );
};

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Auth.Register as keyof AuthStackParamList}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name={Routes.Auth.Register as keyof AuthStackParamList}
        component={RegisterScreen}
      />
      <Stack.Screen
        name={Routes.Auth.Login as keyof AuthStackParamList}
        component={LoginPlaceholder as React.ComponentType}
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
  registerButton: {
    marginTop: 12,
  },
});

export default AuthStack;
