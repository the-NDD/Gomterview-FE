import {
  DefaultError,
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

import { authApi } from '../api';

export const AUTH_QUERY_KEY = {
  GET_AUTH_LOGIN: () => ['auth', 'login'],
  GET_AUTH_GOOGLE: () => ['auth', 'google'],
};

const queries = {
  getAuthLogin: () => ({
    queryKey: AUTH_QUERY_KEY.GET_AUTH_LOGIN(),
    queryFn: () => authApi.getAuthLogin(),
  }),
  getAuthGoogle: () => ({
    queryKey: AUTH_QUERY_KEY.GET_AUTH_GOOGLE(),
    queryFn: () => authApi.getAuthGoogle(),
  }),
};

// ---------------------- Query ------------------------------
/**
 * @tags auth
 * @request GET:/api/auth/login*/
export const useGetAuthLoginQuery = <TData = void,>(
  options?: Omit<
    UseQueryOptions<void, DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getAuthLogin(),
    ...options,
  });
};
/**
 * @tags auth
 * @request GET:/api/auth/google*/
export const useGetAuthGoogleQuery = <TData = void,>(
  options?: Omit<
    UseQueryOptions<void, DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getAuthGoogle(),
    ...options,
  });
};

// ------------------ Suspense Query --------------------------
/**
 * @tags auth
 * @request GET:/api/auth/login*/
export const useSuspenseGetAuthLoginQuery = <TData = void,>(
  options?: Omit<
    UseSuspenseQueryOptions<void, DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getAuthLogin(),
    ...options,
  });
};
/**
 * @tags auth
 * @request GET:/api/auth/google*/
export const useSuspenseGetAuthGoogleQuery = <TData = void,>(
  options?: Omit<
    UseSuspenseQueryOptions<void, DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getAuthGoogle(),
    ...options,
  });
};
