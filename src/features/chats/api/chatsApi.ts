import httpClient from '@/lib/httpClient';
import { ApiResponse } from '@/types';
import { resolveAvatarUrl } from '@/utils/resolveAvatarUrl';
import {
  ChatConversation,
  OnlinePeer,
  BackendUserItem,
  ChatRoom,
  BackendChatMessage,
  SendMessagePayload,
  BackendChatFilterOption,
} from '../types';

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
   * Obtiene las conversaciones de chat activas desde el backend con filtrado dinámico.
   * Si el endpoint /chats no está disponible aún en el backend,
   * mapea automáticamente a los usuarios reales registrados.
   */
  async getConversations(
    currentUserId?: string,
    filter?: string,
  ): Promise<ChatConversation[]> {
    try {
      const url = filter && filter !== 'all' ? `/chats?filter=${filter}` : '/chats';
      const response = await httpClient.get<
        ApiResponse<ChatConversation[]> | ChatConversation[]
      >(url, {
        headers: currentUserId ? { 'x-user-id': currentUserId } : {},
      });

      const rawData =
        response.data && typeof response.data === 'object' && 'data' in response.data
          ? (response.data as ApiResponse<ChatConversation[]>).data
          : (response.data as ChatConversation[]);

      if (Array.isArray(rawData) && rawData.length > 0) {
        return rawData.map((item) => {
          const hasLastMsg = Boolean(item.lastMessage && item.lastMessage.trim().length > 0);
          return {
            ...item,
            lastMessage: hasLastMsg
              ? item.lastMessage
              : '¡Hola! Me encantaría practicar idiomas contigo.',
            time: item.time || 'Hoy',
            countryFlag: item.countryFlag || '🇪🇸',
          };
        });
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
        partnerId: u.id,
        name: u.fullName || 'Compañero',
        avatarUrl: resolveAvatarUrl(u.avatar?.url || ''),
        countryFlag: u.countryFlag || '🇪🇸',
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
   * Obtiene las opciones dinámicas de filtrado desde el backend (Backend-Driven)
   */
  async getFilterOptions(
    currentUserId?: string,
  ): Promise<BackendChatFilterOption[]> {
    try {
      const response = await httpClient.get<
        ApiResponse<BackendChatFilterOption[]> | BackendChatFilterOption[]
      >('/chats/filters', {
        headers: currentUserId ? { 'x-user-id': currentUserId } : {},
      });

      const rawData =
        response.data && typeof response.data === 'object' && 'data' in response.data
          ? (response.data as ApiResponse<BackendChatFilterOption[]>).data
          : (response.data as BackendChatFilterOption[]);

      return Array.isArray(rawData) ? rawData : [];
    } catch {
      return [];
    }
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
        avatarUrl: resolveAvatarUrl(u.avatar?.url || ''),
        countryFlag: u.countryFlag || '🌐',
        isOnline: true,
        ratePerMinute: Number(u.learningCostPerMin) || 10,
      };
    });
  },

  /**
   * Crea o abre una sala de chat con un compañero
   */
  async createOrGetRoom(currentUserId: string, partnerId: string): Promise<ChatRoom | null> {
    try {
      const response = await httpClient.post<ApiResponse<ChatRoom> | ChatRoom>(
        '/chats/rooms',
        { partnerId },
        {
          headers: { 'x-user-id': currentUserId },
        }
      );
      if (response.data && typeof response.data === 'object' && 'data' in response.data) {
        return (response.data as ApiResponse<ChatRoom>).data;
      }
      return response.data as ChatRoom;
    } catch (err: any) {
      if (__DEV__) {
        console.warn('[chatsApi] Error al crear/obtener sala:', err?.response?.data || err?.message);
      }
      return null;
    }
  },

  /**
   * Obtiene el historial de mensajes de una conversación
   */
  async getRoomMessages(roomId: string, currentUserId: string): Promise<BackendChatMessage[]> {
    try {
      const response = await httpClient.get<ApiResponse<BackendChatMessage[]> | BackendChatMessage[]>(
        `/chats/${roomId}/messages`,
        {
          headers: { 'x-user-id': currentUserId },
        }
      );
      const list =
        response.data && typeof response.data === 'object' && 'data' in response.data
          ? (response.data as ApiResponse<BackendChatMessage[]>).data
          : (response.data as BackendChatMessage[]);
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  },

  /**
   * Envía un mensaje a una conversación
   */
  async sendMessage(
    currentUserId: string,
    payload: SendMessagePayload
  ): Promise<BackendChatMessage | null> {
    try {
      const response = await httpClient.post<ApiResponse<BackendChatMessage> | BackendChatMessage>(
        '/chats/messages',
        payload,
        {
          headers: { 'x-user-id': currentUserId },
        }
      );
      if (response.data && typeof response.data === 'object' && 'data' in response.data) {
        return (response.data as ApiResponse<BackendChatMessage>).data;
      }
      return response.data as BackendChatMessage;
    } catch {
      return null;
    }
  },

  /**
   * Marca los mensajes de la conversación como leídos
   */
  async markAsRead(roomId: string, currentUserId: string): Promise<void> {
    try {
      await httpClient.patch(
        `/chats/${roomId}/read`,
        {},
        {
          headers: { 'x-user-id': currentUserId },
        }
      );
    } catch {
      // Ignorar errores al marcar como leído
    }
  },

  /**
   * Traduce un mensaje de chat usando DeepL con soporte de caché y circuit breaker
   */
  async translateMessage(
    messageId: string,
    currentUserId?: string,
    targetLang = 'ES',
  ): Promise<{ translatedText: string } | null> {
    try {
      const response = await httpClient.post<
        ApiResponse<{ translatedText: string }> | { translatedText: string }
      >(
        `/translations/messages/${messageId}`,
        { targetLang },
        {
          headers: currentUserId ? { 'x-user-id': currentUserId } : {},
        },
      );

      if (
        response.data &&
        typeof response.data === 'object' &&
        'data' in response.data
      ) {
        return (response.data as ApiResponse<{ translatedText: string }>).data;
      }
      return response.data as { translatedText: string };
    } catch (err: any) {
      if (__DEV__) {
        console.warn('[chatsApi] Error al traducir mensaje:', err?.response?.data || err?.message);
      }
      return null;
    }
  },
};

export default chatsApi;
