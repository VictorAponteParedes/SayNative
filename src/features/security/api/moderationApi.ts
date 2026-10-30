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
    const response = await httpClient.post<unknown>(
      '/moderation/blocks',
      payload,
      { headers: getHeaders() }
    );
    const raw = response.data;
    if (raw && typeof raw === 'object' && 'data' in raw) {
      return (raw as { data: ModerationActionResponse }).data;
    }
    return raw as ModerationActionResponse;
  },

  /**
   * Desbloquea a un usuario previamente bloqueado
   */
  async unblockUser(blockedId: string): Promise<ModerationActionResponse> {
    const response = await httpClient.delete<unknown>(
      `/moderation/blocks/${blockedId}`,
      { headers: getHeaders() }
    );
    const raw = response.data;
    if (raw && typeof raw === 'object' && 'data' in raw) {
      return (raw as { data: ModerationActionResponse }).data;
    }
    return raw as ModerationActionResponse;
  },

  /**
   * Obtiene la lista real de usuarios bloqueados desde el backend
   */
  async getBlockedUsers(): Promise<BlockedUserBackendItem[]> {
    const response = await httpClient.get<unknown>(
      '/moderation/blocks',
      { headers: getHeaders() }
    );
    const raw = response.data;
    if (raw && typeof raw === 'object' && 'data' in raw && Array.isArray((raw as { data: unknown }).data)) {
      return (raw as { data: BlockedUserBackendItem[] }).data;
    }
    if (Array.isArray(raw)) {
      return raw as BlockedUserBackendItem[];
    }
    return [];
  },

  /**
   * Consulta el estado de bloqueo respecto a un usuario específico
   */
  async checkBlockStatus(
    partnerId: string
  ): Promise<{ isBlockedByMe: boolean; isBlocked: boolean }> {
    try {
      const response = await httpClient.get<unknown>(
        `/moderation/blocks/check/${partnerId}`,
        { headers: getHeaders() }
      );
      const raw = response.data;
      if (raw && typeof raw === 'object' && 'data' in raw && (raw as { data: unknown }).data) {
        return (raw as { data: { isBlockedByMe: boolean; isBlocked: boolean } }).data;
      }
      return (raw as { isBlockedByMe: boolean; isBlocked: boolean }) || {
        isBlockedByMe: false,
        isBlocked: false,
      };
    } catch {
      return { isBlockedByMe: false, isBlocked: false };
    }
  },

  /**
   * Envía un reporte formal a la tabla de moderación en el backend
   */
  async reportUser(payload: ReportUserPayload): Promise<ModerationActionResponse> {
    const response = await httpClient.post<unknown>(
      '/moderation/reports',
      payload,
      { headers: getHeaders() }
    );
    const raw = response.data;
    if (raw && typeof raw === 'object' && 'data' in raw) {
      return (raw as { data: ModerationActionResponse }).data;
    }
    return raw as ModerationActionResponse;
  },
};

export default moderationApi;
