import httpClient from '@/lib/httpClient';
import { ApiResponse } from '@/types';
import { IceServerConfig } from '../types';

export interface InitiateCallResponse {
  callId: string;
  iceServers: IceServerConfig[];
}

export interface EndCallResponse {
  callId: string;
  durationSeconds: number;
  coinsCharged: number;
  completedAt: string;
}

export const callsApi = {
  /**
   * Obtiene la configuración de servidores STUN/TURN desde el backend
   */
  getIceServers: async (): Promise<IceServerConfig[]> => {
    try {
      const response = await httpClient.get<ApiResponse<IceServerConfig[]>>('/calls/ice-servers');
      if (response.data?.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
    } catch {
      // Fallback a servidores STUN públicos de Google
    }
    return [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
    ];
  },

  /**
   * Valida disponibilidad y saldo antes de llamar
   */
  checkPeerAvailability: async (peerId: string): Promise<boolean> => {
    try {
      const response = await httpClient.get<ApiResponse<{ available: boolean }>>(
        `/calls/check-availability/${peerId}`
      );
      return response.data?.data?.available ?? true;
    } catch {
      return true;
    }
  },

  /**
   * Finaliza la sesión de llamada por API REST (como fallback de WebSocket)
   */
  endCallSession: async (callId: string, durationSeconds: number): Promise<EndCallResponse | null> => {
    try {
      const response = await httpClient.post<ApiResponse<EndCallResponse>>(
        `/calls/${callId}/end`,
        { durationSeconds }
      );
      return response.data?.data || null;
    } catch {
      return null;
    }
  },
};

export default callsApi;
