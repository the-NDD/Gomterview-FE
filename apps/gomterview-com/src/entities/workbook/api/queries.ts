import {
  DefaultError,
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

import { WorkbookResponseDto, WorkbookTitleResponseDto } from '@gomterview/api';
import { workbookApi } from '../api';

export const WORKBOOK_QUERY_KEY = {
  GET_WORKBOOK: (params: { category: number }) => ['workbook', params],
  GET_WORKBOOK_TITLE: () => ['workbook', 'title'],
  GET_WORKBOOK_WORKBOOKID: (workbookId: number) => ['workbook', workbookId],
};

const queries = {
  getWorkbook: (params: { category: number }) => ({
    queryKey: WORKBOOK_QUERY_KEY.GET_WORKBOOK(params),
    queryFn: () => workbookApi.getWorkbook(params),
  }),
  getWorkbookTitle: () => ({
    queryKey: WORKBOOK_QUERY_KEY.GET_WORKBOOK_TITLE(),
    queryFn: () => workbookApi.getWorkbookTitle(),
  }),
  getWorkbookByWorkbookId: (workbookId: number) => ({
    queryKey: WORKBOOK_QUERY_KEY.GET_WORKBOOK_WORKBOOKID(workbookId),
    queryFn: () => workbookApi.getWorkbookByWorkbookId(workbookId),
  }),
};

// ---------------------- Query ------------------------------
/**
 * @tags workbook
 * @summary 카테고리별(null이면 전체) 문제집 조회
 * @request GET:/api/workbook*/
export const useGetWorkbookQuery = <TData = WorkbookResponseDto[],>(
  params: {
    category: number;
  },
  options?: Omit<
    UseQueryOptions<WorkbookResponseDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getWorkbook(params),
    ...options,
  });
};
/**
 * @tags workbook
 * @summary 회원의(null이면 Top5) 문제집 조회
 * @request GET:/api/workbook/title*/
export const useGetWorkbookTitleQuery = <TData = WorkbookTitleResponseDto[],>(
  options?: Omit<
    UseQueryOptions<WorkbookTitleResponseDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getWorkbookTitle(),
    ...options,
  });
};
/**
 * @tags workbook
 * @summary 문제집 단건 조회
 * @request GET:/api/workbook/{workbookId}*/
export const useGetWorkbookByWorkbookIdQuery = <TData = WorkbookResponseDto,>(
  workbookId: number,
  options?: Omit<
    UseQueryOptions<WorkbookResponseDto, DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getWorkbookByWorkbookId(workbookId),
    ...options,
  });
};

// ------------------ Suspense Query --------------------------
/**
 * @tags workbook
 * @summary 카테고리별(null이면 전체) 문제집 조회
 * @request GET:/api/workbook*/
export const useSuspenseGetWorkbookQuery = <TData = WorkbookResponseDto[],>(
  params: {
    category: number;
  },
  options?: Omit<
    UseSuspenseQueryOptions<WorkbookResponseDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getWorkbook(params),
    ...options,
  });
};
/**
 * @tags workbook
 * @summary 회원의(null이면 Top5) 문제집 조회
 * @request GET:/api/workbook/title*/
export const useSuspenseGetWorkbookTitleQuery = <
  TData = WorkbookTitleResponseDto[],
>(
  options?: Omit<
    UseSuspenseQueryOptions<WorkbookTitleResponseDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getWorkbookTitle(),
    ...options,
  });
};
/**
 * @tags workbook
 * @summary 문제집 단건 조회
 * @request GET:/api/workbook/{workbookId}*/
export const useSuspenseGetWorkbookByWorkbookIdQuery = <
  TData = WorkbookResponseDto,
>(
  workbookId: number,
  options?: Omit<
    UseSuspenseQueryOptions<WorkbookResponseDto, DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getWorkbookByWorkbookId(workbookId),
    ...options,
  });
};
