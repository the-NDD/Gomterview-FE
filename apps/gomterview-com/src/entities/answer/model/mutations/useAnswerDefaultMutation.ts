import { useQueryClient } from '@tanstack/react-query';
import { usePostAnswerDefaultMutation } from '@/entities/answer/api/mutations';
import { QUESTION_QUERY_KEY } from '@/entities/question/api/queries';

/**
 * POST /answer/default
 *
 * 디폴트 답안 스크립트 등록을 위한 api입니다.
 */
const useAnswerDefaultMutation = (workbookId: number) => {
  const queryClient = useQueryClient();

  return usePostAnswerDefaultMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUESTION_QUERY_KEY.GET_QUESTION_WORKBOOKID(workbookId),
      });
    },
  });
};

export default useAnswerDefaultMutation;
