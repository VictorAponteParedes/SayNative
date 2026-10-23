import { httpClient } from '@/lib/httpClient';
import { RegisterPayload, RegisteredUser } from '../types';

interface BackendWrapper<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  timestamp: string;
}

export const authApi = {
  /**
   * Registra un nuevo usuario en SayNative a través del backend NestJS.
   * Valida obligatoriamente que `acceptedTerms` sea true.
   */
  async register(payload: RegisterPayload): Promise<RegisteredUser> {
    const response = await httpClient.post<BackendWrapper<RegisteredUser> | RegisteredUser>(
      '/users',
      payload
    );

    if (
      response.data &&
      typeof response.data === 'object' &&
      'data' in response.data &&
      response.data.data
    ) {
      return (response.data as BackendWrapper<RegisteredUser>).data;
    }

    return response.data as RegisteredUser;
  },
};

export default authApi;
