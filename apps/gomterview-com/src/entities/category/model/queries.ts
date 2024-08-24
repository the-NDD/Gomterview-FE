import {
  DefaultError,
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

import { categoryApi } from '@/entities/category/api';
import { CategoryResponseDto } from '@gomterview/api';

export const CATEGORY_QUERY_KEY = {
  GET_CATEGORY: () => ['category'],
};

const queries = {
  getCategory: () => ({
    queryKey: CATEGORY_QUERY_KEY.GET_CATEGORY(),
    queryFn: () => categoryApi.getCategory(),
  }),
};

// ---------------------- Query ------------------------------
/**
 * @tags category
 * @summary 전체 카테고리를 조회한다.
 * @request GET:/api/category*/
export const useGetCategoryQuery = <TData = CategoryResponseDto[],>(
  options?: Omit<
    UseQueryOptions<CategoryResponseDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getCategory(),
    ...options,
  });
};

// ------------------ Suspense Query --------------------------
/**
 * @tags category
 * @summary 전체 카테고리를 조회한다.
 * @request GET:/api/category*/
export const useSuspenseGetCategoryQuery = <TData = CategoryResponseDto[],>(
  options?: Omit<
    UseSuspenseQueryOptions<CategoryResponseDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getCategory(),
    ...options,
  });
};
