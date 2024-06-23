import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postQuestionCopy } from '@/apis/question';
import { QUERY_KEY } from '@constants/queryKey';

/**
 * POST question/copy
 *
 * 다른사람의 문제집에서 질문을 가져올 때 질문을 복제하기 위한 api입니다.
 */
const useQuestionCopyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postQuestionCopy,
    onSuccess: (res, req) => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.WORKBOOK_ID(req.workbookId),
      });
    },
  });
};

export default useQuestionCopyMutation;
