import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';
import type { AuthStackParamList } from './types';
import { RegisterScreen, LoginScreen, ForgotPasswordScreen } from '@/features/auth';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Auth.Login as keyof AuthStackParamList}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name={Routes.Auth.Login as keyof AuthStackParamList}
        component={LoginScreen}
      />
      <Stack.Screen
        name={Routes.Auth.Register as keyof AuthStackParamList}
        component={RegisterScreen}
      />
      <Stack.Screen
        name={Routes.Auth.ForgotPassword as keyof AuthStackParamList}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
