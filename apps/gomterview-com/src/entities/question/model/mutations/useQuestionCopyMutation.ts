import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { usePostQuestionCopyMutation } from '@/entities/question/api/mutations';

/**
 * POST question/copy
 *
 * 다른사람의 문제집에서 질문을 가져올 때 질문을 복제하기 위한 api입니다.
 */
const useQuestionCopyMutation = () => {
  const queryClient = useQueryClient();

  return usePostQuestionCopyMutation({
    onSuccess: (_, req) => {
      const {
        body: { workbookId },
      } = req;

      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.WORKBOOK_ID(workbookId),
      });
    },
  });
};

export default useQuestionCopyMutation;
