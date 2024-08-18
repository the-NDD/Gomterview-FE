import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { answerApi } from '@/entities/answer/api';
import { CreateAnswerRequestDto } from '@gomterview/api';

/**
 * POST /answer
 *
 * 질문에 대한 답안 스크립트 등록을 위한 api입니다.
 */
const useQuestionAnswerMutation = (questionId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAnswerRequestDto) => answerApi.postAnswer(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.QUESTION_ANSWER(questionId),
      });
    },
  });
};

export default useQuestionAnswerMutation;
