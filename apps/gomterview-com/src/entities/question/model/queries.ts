import {
  DefaultError,
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

import { questionApi } from '@/entities/question/api';
import { QuestionResponseDto } from '@gomterview/api';

export const QUESTION_QUERY_KEY = {
  GET_QUESTION_WORKBOOKID: (workbookId: number) => ['question', workbookId],
};

const queries = {
  getQuestionByWorkbookId: (workbookId: number) => ({
    queryKey: QUESTION_QUERY_KEY.GET_QUESTION_WORKBOOKID(workbookId),
    queryFn: () => questionApi.getQuestionByWorkbookId(workbookId),
  }),
};

// ---------------------- Query ------------------------------
/**
 * @tags question
 * @summary 카테고리별 질문 리스트 조회
 * @request GET:/api/question/{workbookId}*/
export const useGetQuestionByWorkbookIdQuery = <TData = QuestionResponseDto[],>(
  workbookId: number,
  options?: Omit<
    UseQueryOptions<QuestionResponseDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getQuestionByWorkbookId(workbookId),
    ...options,
  });
};

// ------------------ Suspense Query --------------------------
/**
 * @tags question
 * @summary 카테고리별 질문 리스트 조회
 * @request GET:/api/question/{workbookId}*/
export const useSuspenseGetQuestionByWorkbookIdQuery = <
  TData = QuestionResponseDto[],
>(
  workbookId: number,
  options?: Omit<
    UseSuspenseQueryOptions<QuestionResponseDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getQuestionByWorkbookId(workbookId),
    ...options,
  });
};
