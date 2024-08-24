import { answerApi } from '@/entities/answer/api';
import {
  AnswerResponseDto,
  CreateAnswerRequestDto,
  DefaultAnswerRequestDto,
} from '@gomterview/api';
import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';

const mutations = {
  postAnswer: () => ({
    mutationFn: (variables: TPostAnswerVariables) => {
      const { body } = variables;
      return answerApi.postAnswer(body);
    },
    mutationKey: ['answer'],
  }),
  postAnswerDefault: () => ({
    mutationFn: (variables: TPostAnswerDefaultVariables) => {
      const { body } = variables;
      return answerApi.postAnswerDefault(body);
    },
    mutationKey: ['answer'],
  }),
  deleteAnswerByAnswerId: () => ({
    mutationFn: (variables: TDeleteAnswerByAnswerIdVariables) => {
      const { answerId } = variables;
      return answerApi.deleteAnswerByAnswerId(answerId);
    },
    mutationKey: ['answer'],
  }),
};

/**
 * @tags answer
 * @summary 질문에 새로운 답변 추가
 * @request POST:/api/answer
 * @secure*/
export const usePostAnswerMutation = (
  options?: Omit<
    UseMutationOptions<AnswerResponseDto, DefaultError, TPostAnswerVariables>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.postAnswer(),
    ...options,
  });
};

/**
 * @tags answer
 * @summary 질문의 대표답변 설정
 * @request POST:/api/answer/default
 * @secure*/
export const usePostAnswerDefaultMutation = (
  options?: Omit<
    UseMutationOptions<void, DefaultError, TPostAnswerDefaultVariables>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.postAnswerDefault(),
    ...options,
  });
};

/**
 * @tags answer
 * @summary 답변 삭제
 * @request DELETE:/api/answer/{answerId}
 * @secure*/
export const useDeleteAnswerByAnswerIdMutation = (
  options?: Omit<
    UseMutationOptions<void, DefaultError, TDeleteAnswerByAnswerIdVariables>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.deleteAnswerByAnswerId(),
    ...options,
  });
};

type TPostAnswerVariables = { body: CreateAnswerRequestDto };
type TPostAnswerDefaultVariables = { body: DefaultAnswerRequestDto };
type TDeleteAnswerByAnswerIdVariables = { answerId: number };
