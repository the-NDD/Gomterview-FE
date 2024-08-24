import { authApi } from '@/entities/auth/api';
import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';

const mutations = {
  deleteAuthLogout: () => ({
    mutationFn: () => authApi.deleteAuthLogout(),
    mutationKey: ['auth'],
  }),
  patchAuthReissue: () => ({
    mutationFn: () => authApi.patchAuthReissue(),
    mutationKey: ['auth'],
  }),
};

/**
 * @tags auth
 * @request DELETE:/api/auth/logout*/
export const useDeleteAuthLogoutMutation = (
  options?: Omit<
    UseMutationOptions<void, DefaultError, void>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.deleteAuthLogout(),
    ...options,
  });
};

/**
 * @tags auth
 * @request PATCH:/api/auth/reissue*/
export const usePatchAuthReissueMutation = (
  options?: Omit<
    UseMutationOptions<void, DefaultError, void>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.patchAuthReissue(),
    ...options,
  });
};
