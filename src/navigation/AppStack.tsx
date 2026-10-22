import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../features/home';
import { ExploreScreen } from '../features/discovery';
import { ChatsScreen, PrivateChatScreen } from '../features/chats';
import { CoinsScreen, CoinsHistoryScreen } from '../features/coins';
import { ProfileScreen, EditProfileScreen } from '../features/profile';
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
      <Stack.Screen
        name={Routes.App.Coins as keyof AppStackParamList}
        component={CoinsScreen}
      />
      <Stack.Screen
        name={Routes.App.CoinsHistory as keyof AppStackParamList}
        component={CoinsHistoryScreen}
      />
      <Stack.Screen
        name={Routes.App.Profile as keyof AppStackParamList}
        component={ProfileScreen}
      />
      <Stack.Screen
        name={Routes.App.EditProfile as keyof AppStackParamList}
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
