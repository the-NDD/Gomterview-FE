import { workbookApi } from '@/entities/workbook/api';
import {
  CreateWorkbookRequestDto,
  UpdateWorkbookRequestDto,
  WorkbookIdResponseDto,
  WorkbookResponseDto,
} from '@gomterview/api';
import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';

const mutations = {
  postWorkbook: () => ({
    mutationFn: (variables: TPostWorkbookVariables) => {
      const { body } = variables;
      return workbookApi.postWorkbook(body);
    },
    mutationKey: ['workbook'],
  }),
  patchWorkbook: () => ({
    mutationFn: (variables: TPatchWorkbookVariables) => {
      const { body } = variables;
      return workbookApi.patchWorkbook(body);
    },
    mutationKey: ['workbook'],
  }),
  deleteWorkbookByWorkbookId: () => ({
    mutationFn: (variables: TDeleteWorkbookByWorkbookIdVariables) => {
      const { workbookId } = variables;
      return workbookApi.deleteWorkbookByWorkbookId(workbookId);
    },
    mutationKey: ['workbook'],
  }),
};

/**
 * @tags workbook
 * @summary 새로운 문제집 추가 추가
 * @request POST:/api/workbook
 * @secure*/
export const usePostWorkbookMutation = (
  options?: Omit<
    UseMutationOptions<
      WorkbookIdResponseDto,
      DefaultError,
      TPostWorkbookVariables
    >,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.postWorkbook(),
    ...options,
  });
};

/**
 * @tags workbook
 * @summary 문제집 수정
 * @request PATCH:/api/workbook
 * @secure*/
export const usePatchWorkbookMutation = (
  options?: Omit<
    UseMutationOptions<
      WorkbookResponseDto,
      DefaultError,
      TPatchWorkbookVariables
    >,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.patchWorkbook(),
    ...options,
  });
};

/**
 * @tags workbook
 * @summary 문제집 삭제
 * @request DELETE:/api/workbook/{workbookId}
 * @secure*/
export const useDeleteWorkbookByWorkbookIdMutation = (
  options?: Omit<
    UseMutationOptions<
      void,
      DefaultError,
      TDeleteWorkbookByWorkbookIdVariables
    >,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.deleteWorkbookByWorkbookId(),
    ...options,
  });
};

type TPostWorkbookVariables = { body: CreateWorkbookRequestDto };
type TPatchWorkbookVariables = { body: UpdateWorkbookRequestDto };
type TDeleteWorkbookByWorkbookIdVariables = { workbookId: number };
