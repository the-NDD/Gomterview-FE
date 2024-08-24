import {
  DefaultError,
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

import { answerApi } from '@/entities/answer/api';
import { AnswerResponseDto } from '@gomterview/api';

export const ANSWER_QUERY_KEY = {
  GET_ANSWER_QUESTIONID: (questionId: number) => ['answer', questionId],
};

const queries = {
  getAnswerByQuestionId: (questionId: number) => ({
    queryKey: ANSWER_QUERY_KEY.GET_ANSWER_QUESTIONID(questionId),
    queryFn: () => answerApi.getAnswerByQuestionId(questionId),
  }),
};

// ---------------------- Query ------------------------------
/**
 * @tags answer
 * @summary 질문의 답변 리스트 반환
 * @request GET:/api/answer/{questionId}*/
export const useGetAnswerByQuestionIdQuery = <TData = AnswerResponseDto[],>(
  questionId: number,
  options?: Omit<
    UseQueryOptions<AnswerResponseDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getAnswerByQuestionId(questionId),
    ...options,
  });
};

// ------------------ Suspense Query --------------------------
/**
 * @tags answer
 * @summary 질문의 답변 리스트 반환
 * @request GET:/api/answer/{questionId}*/
export const useSuspenseGetAnswerByQuestionIdQuery = <
  TData = AnswerResponseDto[],
>(
  questionId: number,
  options?: Omit<
    UseSuspenseQueryOptions<AnswerResponseDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getAnswerByQuestionId(questionId),
    ...options,
  });
};
