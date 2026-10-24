import httpClient from '@/lib/httpClient';
import { ApiResponse } from '@/types';
import { ChatConversation, OnlinePeer, BackendUserItem } from '../types';

export const chatsApi = {
  /**
   * Obtiene la lista de usuarios reales del backend NestJS
   */
  async getUsers(currentUserId?: string): Promise<BackendUserItem[]> {
    try {
      const response = await httpClient.get<ApiResponse<BackendUserItem[]> | BackendUserItem[]>('/users', {
        headers: currentUserId ? { 'x-user-id': currentUserId } : {},
      });

      const rawData =
        response.data && typeof response.data === 'object' && 'data' in response.data
          ? (response.data as ApiResponse<BackendUserItem[]>).data
          : (response.data as BackendUserItem[]);

      if (Array.isArray(rawData)) {
        return rawData.filter((user) => user.id !== currentUserId);
      }
      return [];
    } catch {
      return [];
    }
  },

  /**
   * Obtiene las conversaciones de chat activas desde el backend.
   * Si el endpoint /chats no está disponible aún en el backend,
   * mapea automáticamente a los usuarios reales registrados.
   */
  async getConversations(currentUserId?: string): Promise<ChatConversation[]> {
    try {
      const response = await httpClient.get<ApiResponse<ChatConversation[]> | ChatConversation[]>('/chats', {
        headers: currentUserId ? { 'x-user-id': currentUserId } : {},
      });

      const rawData =
        response.data && typeof response.data === 'object' && 'data' in response.data
          ? (response.data as ApiResponse<ChatConversation[]>).data
          : (response.data as ChatConversation[]);

      if (Array.isArray(rawData) && rawData.length > 0) {
        return rawData;
      }
    } catch {
      // Fallback a los usuarios reales
    }

    const users = await this.getUsers(currentUserId);
    return users.map((u) => {
      const hasBio = Boolean(u.bio && u.bio.trim().length > 0);
      const isTeacher = Boolean(u.isAvailableToTeach);

      return {
        id: u.id,
        name: u.fullName || 'Compañero',
        avatarUrl: u.avatar?.url || '',
        countryFlag: u.countryFlag || '🌐',
        isOnline: true,
        badge: isTeacher ? 'Super Tutor' : undefined,
        lastMessage: hasBio
          ? (u.bio as string)
          : '¡Hola! Me encantaría practicar idiomas contigo.',
        time: 'Hoy',
        unreadCount: 0,
        isRead: true,
        messageType: 'text',
        ratePerMinute: Number(u.learningCostPerMin) || 10,
      };
    });
  },

  /**
   * Obtiene los compañeros en línea reales
   */
  async getOnlinePeers(currentUserId?: string): Promise<OnlinePeer[]> {
    try {
      const response = await httpClient.get<ApiResponse<OnlinePeer[]> | OnlinePeer[]>('/chats/online-peers', {
        headers: currentUserId ? { 'x-user-id': currentUserId } : {},
      });

      const rawData =
        response.data && typeof response.data === 'object' && 'data' in response.data
          ? (response.data as ApiResponse<OnlinePeer[]>).data
          : (response.data as OnlinePeer[]);

      if (Array.isArray(rawData) && rawData.length > 0) {
        return rawData;
      }
    } catch {
      // Fallback a los usuarios reales
    }

    const users = await this.getUsers(currentUserId);
    return users.map((u) => {
      const firstName = u.fullName?.trim().split(' ')[0] || u.fullName || 'Compañero';
      return {
        id: u.id,
        name: firstName,
        avatarUrl: u.avatar?.url || '',
        countryFlag: u.countryFlag || '🌐',
        isOnline: true,
        ratePerMinute: Number(u.learningCostPerMin) || 10,
      };
    });
  },
};

export default chatsApi;
