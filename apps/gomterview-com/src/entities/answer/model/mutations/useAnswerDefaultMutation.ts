import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { answerApi } from '@/entities/answer/api';
import { DefaultAnswerRequestDto } from '@gomterview/api';

/**
 * POST /answer/default
 *
 * 디폴트 답안 스크립트 등록을 위한 api입니다.
 */
const useAnswerDefaultMutation = (categoryId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DefaultAnswerRequestDto) =>
      answerApi.postAnswerDefault(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.QUESTION_WORKBOOK(categoryId),
      });
    },
  });
};

export default useAnswerDefaultMutation;
