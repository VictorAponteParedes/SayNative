import { httpClient } from '@/lib/httpClient';
import { useAuthStore } from '@/store/useAuthStore';
import i18n from '@/lang/i18n';

export interface BlockUserPayload {
  blockedId: string;
  reason?: string;
}

export interface ReportUserPayload {
  reportedId: string;
  reason?: string;
  details?: string;
}

export interface BlockedUserBackendItem {
  id: string;
  blockedUserId: string;
  name: string;
  avatarUrl: string | null;
  countryCode: string | null;
  countryFlag: string | null;
  reason: string | null;
  blockedAt: string;
}

export interface ModerationActionResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

const getHeaders = () => {
  const userId = useAuthStore.getState().user.id;
  const lang = i18n.language || 'es';
  return {
    'x-user-id': userId,
    'accept-language': lang,
  };
};

export const moderationApi = {
  /**
   * Bloquea a un usuario y lo persiste en la base de datos
   */
  async blockUser(payload: BlockUserPayload): Promise<ModerationActionResponse> {
    const response = await httpClient.post<ModerationActionResponse>(
      '/moderation/blocks',
      payload,
      { headers: getHeaders() }
    );
    return response.data;
  },

  /**
   * Desbloquea a un usuario previamente bloqueado
   */
  async unblockUser(blockedId: string): Promise<ModerationActionResponse> {
    const response = await httpClient.delete<ModerationActionResponse>(
      `/moderation/blocks/${blockedId}`,
      { headers: getHeaders() }
    );
    return response.data;
  },

  /**
   * Obtiene la lista real de usuarios bloqueados desde el backend
   */
  async getBlockedUsers(): Promise<BlockedUserBackendItem[]> {
    const response = await httpClient.get<BlockedUserBackendItem[]>(
      '/moderation/blocks',
      { headers: getHeaders() }
    );
    return response.data || [];
  },

  /**
   * Consulta el estado de bloqueo respecto a un usuario específico
   */
  async checkBlockStatus(
    partnerId: string
  ): Promise<{ isBlockedByMe: boolean; isBlocked: boolean }> {
    try {
      const response = await httpClient.get<{
        isBlockedByMe: boolean;
        isBlocked: boolean;
      }>(`/moderation/blocks/check/${partnerId}`, {
        headers: getHeaders(),
      });
      return response.data || { isBlockedByMe: false, isBlocked: false };
    } catch {
      return { isBlockedByMe: false, isBlocked: false };
    }
  },

  /**
   * Envía un reporte formal a la tabla de moderación en el backend
   */
  async reportUser(payload: ReportUserPayload): Promise<ModerationActionResponse> {
    const response = await httpClient.post<ModerationActionResponse>(
      '/moderation/reports',
      payload,
      { headers: getHeaders() }
    );
    return response.data;
  },
};

export default moderationApi;
