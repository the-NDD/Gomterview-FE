import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { workbookApi } from '@/entities/workbook/api';

/**
 * DELETE /workbook/${workbookId}
 *
 * workbookId에 해당하는 문제집을 삭제하기 위한 api입니다.
 */
const useWorkbookDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (workbookId: number) =>
      workbookApi.deleteWorkbookByWorkbookId(workbookId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.WORKBOOK_TITLE,
      });
    },
  });
};

export default useWorkbookDeleteMutation;
