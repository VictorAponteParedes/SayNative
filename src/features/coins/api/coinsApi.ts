import { httpClient } from '@/lib/httpClient';

export interface CoinBackendTransaction {
  id: string;
  walletId: string;
  userId: string;
  amount: number;
  type: string;
  description: string;
  referenceId?: string | null;
  createdAt: string;
}

export interface RechargeCoinsPayload {
  packageId: string;
  amount: number;
  pricePaid?: number;
  currency?: string;
}

export interface RewardCoinsPayload {
  rewardType: 'AD_WATCH' | 'DAILY_BONUS';
  amount: number;
}

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  timestamp: string;
}

export const coinsApi = {
  /**
   * Obtiene el saldo actual de monedas del usuario desde el backend
   */
  async getBalance(userId: string): Promise<number> {
    const response = await httpClient.get<ApiResponse<{ balance: number }> | { balance: number }>(
      '/coins/balance',
      {
        headers: {
          'x-user-id': userId,
        },
      }
    );

    const data =
      response.data && typeof response.data === 'object' && 'data' in response.data
        ? (response.data as ApiResponse<{ balance: number }>).data
        : (response.data as { balance: number });

    return data?.balance ?? 0;
  },

  /**
   * Obtiene el historial de transacciones contables del usuario
   */
  async getHistory(userId: string, limit = 50): Promise<CoinBackendTransaction[]> {
    const response = await httpClient.get<
      ApiResponse<CoinBackendTransaction[]> | CoinBackendTransaction[]
    >('/coins/history', {
      headers: {
        'x-user-id': userId,
      },
      params: {
        limit,
      },
    });

    const data =
      response.data && typeof response.data === 'object' && 'data' in response.data
        ? (response.data as ApiResponse<CoinBackendTransaction[]>).data
        : (response.data as CoinBackendTransaction[]);

    return Array.isArray(data) ? data : [];
  },

  /**
   * Registra una recarga de monedas
   */
  async recharge(
    userId: string,
    payload: RechargeCoinsPayload
  ): Promise<{ balance: number; transaction: CoinBackendTransaction }> {
    const response = await httpClient.post<
      | ApiResponse<{ balance: number; transaction: CoinBackendTransaction }>
      | { balance: number; transaction: CoinBackendTransaction }
    >('/coins/recharge', payload, {
      headers: {
        'x-user-id': userId,
      },
    });

    const data =
      response.data && typeof response.data === 'object' && 'data' in response.data
        ? (
            response.data as ApiResponse<{
              balance: number;
              transaction: CoinBackendTransaction;
            }>
          ).data
        : (response.data as { balance: number; transaction: CoinBackendTransaction });

    return data;
  },

  /**
   * Reclama monedas por recompensa de anuncio o bono
   */
  async claimReward(
    userId: string,
    payload: RewardCoinsPayload
  ): Promise<{ balance: number; transaction: CoinBackendTransaction }> {
    const response = await httpClient.post<
      | ApiResponse<{ balance: number; transaction: CoinBackendTransaction }>
      | { balance: number; transaction: CoinBackendTransaction }
    >('/coins/reward', payload, {
      headers: {
        'x-user-id': userId,
      },
    });

    const data =
      response.data && typeof response.data === 'object' && 'data' in response.data
        ? (
            response.data as ApiResponse<{
              balance: number;
              transaction: CoinBackendTransaction;
            }>
          ).data
        : (response.data as { balance: number; transaction: CoinBackendTransaction });

    return data;
  },
};

export default coinsApi;
