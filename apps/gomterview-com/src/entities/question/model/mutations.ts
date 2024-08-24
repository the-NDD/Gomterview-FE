import { questionApi } from '@/entities/question/api';
import {
  CopyQuestionRequestDto,
  CreateQuestionRequestDto,
  QuestionResponseDto,
  UpdateIndexInWorkbookRequestDto,
  WorkbookIdResponseDto,
} from '@gomterview/api';
import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';

const mutations = {
  postQuestion: () => ({
    mutationFn: (variables: TPostQuestionVariables) => {
      const { body } = variables;
      return questionApi.postQuestion(body);
    },
    mutationKey: ['question'],
  }),
  postQuestionCopy: () => ({
    mutationFn: (variables: TPostQuestionCopyVariables) => {
      const { body } = variables;
      return questionApi.postQuestionCopy(body);
    },
    mutationKey: ['question'],
  }),
  patchQuestionIndex: () => ({
    mutationFn: (variables: TPatchQuestionIndexVariables) => {
      const { body } = variables;
      return questionApi.patchQuestionIndex(body);
    },
    mutationKey: ['question'],
  }),
  deleteQuestionByQuestionId: () => ({
    mutationFn: (variables: TDeleteQuestionByQuestionIdVariables) => {
      const { questionId } = variables;
      return questionApi.deleteQuestionByQuestionId(questionId);
    },
    mutationKey: ['question'],
  }),
};

/**
 * @tags question
 * @summary 커스텀 질문 저장
 * @request POST:/api/question
 * @secure*/
export const usePostQuestionMutation = (
  options?: Omit<
    UseMutationOptions<
      QuestionResponseDto,
      DefaultError,
      TPostQuestionVariables
    >,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.postQuestion(),
    ...options,
  });
};

/**
 * @tags question
 * @summary 질문 복제
 * @request POST:/api/question/copy
 * @secure*/
export const usePostQuestionCopyMutation = (
  options?: Omit<
    UseMutationOptions<
      WorkbookIdResponseDto,
      DefaultError,
      TPostQuestionCopyVariables
    >,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.postQuestionCopy(),
    ...options,
  });
};

/**
 * @tags question
 * @summary 질문들의 인덱스 조정
 * @request PATCH:/api/question/index
 * @secure*/
export const usePatchQuestionIndexMutation = (
  options?: Omit<
    UseMutationOptions<void, DefaultError, TPatchQuestionIndexVariables>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.patchQuestionIndex(),
    ...options,
  });
};

/**
 * @tags question
 * @summary 질문 삭제
 * @request DELETE:/api/question/{questionId}
 * @secure*/
export const useDeleteQuestionByQuestionIdMutation = (
  options?: Omit<
    UseMutationOptions<
      void,
      DefaultError,
      TDeleteQuestionByQuestionIdVariables
    >,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.deleteQuestionByQuestionId(),
    ...options,
  });
};

type TPostQuestionVariables = { body: CreateQuestionRequestDto };
type TPostQuestionCopyVariables = { body: CopyQuestionRequestDto };
type TPatchQuestionIndexVariables = { body: UpdateIndexInWorkbookRequestDto };
type TDeleteQuestionByQuestionIdVariables = { questionId: number };
