import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/features/home';
import { ExploreScreen } from '@/features/discovery';
import { ChatsScreen, PrivateChatScreen, chatsApi, useChatsStore } from '@/features/chats';
import { CoinsScreen, CoinsHistoryScreen } from '@/features/coins';
import { ProfileScreen, EditProfileScreen } from '@/features/profile';
import { NotificationsScreen } from '@/features/notifications';
import { SecurityScreen } from '@/features/security';
import { SupportScreen } from '@/features/support';
import { LobbyScreen, ActiveCallScreen } from '@/features/videocalls';
import { useAuthStore } from '@/store/useAuthStore';
import { getSocket } from '@/lib/socketClient';
import { Routes } from './routes';
import type { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack: React.FC = () => {
  const currentUserId = useAuthStore((s) => s.user?.id);

  useEffect(() => {
    if (!currentUserId) return;
    chatsApi
      .getConversations(currentUserId)
      .then((conversations) => {
        useChatsStore.getState().setChats(conversations);
      })
      .catch(() => {});
      
    const socket = getSocket({ namespace: '/chats' });
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit('register_user', { userId: currentUserId });
    socket.emit('chat:register-user', { userId: currentUserId });

    const handleNewMessage = () => {
      chatsApi
        .getConversations(currentUserId)
        .then((conversations) => {
          useChatsStore.getState().setChats(conversations);
        })
        .catch(() => {});
    };

    socket.on('new_message', handleNewMessage);
    socket.on('new_message_notification', handleNewMessage);
    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('new_message_notification', handleNewMessage);
    };
  }, [currentUserId]);

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
      <Stack.Screen
        name={Routes.App.Notifications as keyof AppStackParamList}
        component={NotificationsScreen}
      />
      <Stack.Screen
        name={Routes.App.Security as keyof AppStackParamList}
        component={SecurityScreen}
      />
      <Stack.Screen
        name={Routes.App.Support as keyof AppStackParamList}
        component={SupportScreen}
      />
      <Stack.Screen
        name={Routes.App.CallLobby as keyof AppStackParamList}
        component={LobbyScreen}
      />
      <Stack.Screen
        name={Routes.App.ActiveCall as keyof AppStackParamList}
        component={ActiveCallScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
