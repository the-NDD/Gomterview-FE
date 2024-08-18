import { useMutation } from '@tanstack/react-query';
import { questionApi } from '@/entities/question/api';

/**
 * DELETE /question/${questionId}
 *
 * questionId 해당하는 질문을 서버에서 지우기 위한 api입니다.
 */
const useDeleteQuestionMutation = () => {
  return useMutation({
    mutationFn: (questionId: number) =>
      questionApi.deleteQuestionByQuestionId(questionId),
  });
};

export default useDeleteQuestionMutation;
