import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { WorkbookAddReqDto } from '@/types/workbook';
import { workbookApi } from '@/entities/workbook/api';

/**
 * POST /workbook
 *
 * 새로운 문제집을 추가하기 위한 api입니다.
 */
const useWorkbookPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WorkbookAddReqDto) => workbookApi.postWorkbook(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.WORKBOOK_TITLE,
      });
    },
  });
};

export default useWorkbookPostMutation;
