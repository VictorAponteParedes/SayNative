import { httpClient } from '@/lib/httpClient';

export interface UpdateProfilePayload {
  fullName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  countryCode?: string;
  countryFlag?: string;
  isAvailableToTeach?: boolean;
}

export interface UserBackendResponse {
  id: string;
  email: string;
  fullName: string;
  phone?: string | null;
  bio?: string | null;
  avatarId?: string | null;
  countryCode?: string | null;
  countryFlag?: string | null;
  isVerified: boolean;
  isAvailableToTeach: boolean;
  earningRatePerMin: number;
  learningCostPerMin: number;
  rating: number;
  totalCalls: number;
  hoursPracticed: number;
  reviewCount: number;
  acceptedTerms: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponseWrapper<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  timestamp: string;
}

export const profileApi = {
  async getProfile(userId: string): Promise<UserBackendResponse> {
    const response = await httpClient.get<
      ApiResponseWrapper<UserBackendResponse> | UserBackendResponse
    >('/users/me', {
      headers: {
        'x-user-id': userId,
      },
    });

    if (
      response.data &&
      typeof response.data === 'object' &&
      'data' in response.data &&
      response.data.data
    ) {
      return (response.data as ApiResponseWrapper<UserBackendResponse>).data;
    }

    return response.data as UserBackendResponse;
  },

  async updateProfile(
    userId: string,
    payload: UpdateProfilePayload,
  ): Promise<UserBackendResponse> {
    const response = await httpClient.patch<
      ApiResponseWrapper<UserBackendResponse> | UserBackendResponse
    >('/users/me', payload, {
      headers: {
        'x-user-id': userId,
      },
    });

    if (
      response.data &&
      typeof response.data === 'object' &&
      'data' in response.data &&
      response.data.data
    ) {
      return (response.data as ApiResponseWrapper<UserBackendResponse>).data;
    }

    return response.data as UserBackendResponse;
  },

  async toggleTeachingMode(
    userId: string,
    isAvailable: boolean,
  ): Promise<UserBackendResponse> {
    const response = await httpClient.patch<
      ApiResponseWrapper<UserBackendResponse> | UserBackendResponse
    >(
      '/users/me/teaching-mode',
      { isAvailable },
      {
        headers: {
          'x-user-id': userId,
        },
      },
    );

    if (
      response.data &&
      typeof response.data === 'object' &&
      'data' in response.data &&
      response.data.data
    ) {
      return (response.data as ApiResponseWrapper<UserBackendResponse>).data;
    }

    return response.data as UserBackendResponse;
  },
};

export default profileApi;
