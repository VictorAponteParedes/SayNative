import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../features/home';
import { ExploreScreen } from '../features/discovery';
import { ChatsScreen, PrivateChatScreen } from '../features/chats';
import { Routes } from './routes';
import type { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name={Routes.App.Home as keyof AppStackParamList}
        component={HomeScreen}
      />
      <Stack.Screen
        name={Routes.App.Explore as keyof AppStackParamList}
        component={ExploreScreen}
      />
      <Stack.Screen
        name={Routes.App.Chats as keyof AppStackParamList}
        component={ChatsScreen}
      />
      <Stack.Screen
        name={Routes.App.PrivateChat as keyof AppStackParamList}
        component={PrivateChatScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
