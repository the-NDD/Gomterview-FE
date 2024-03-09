import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { patchWorkbookById } from '@/apis/workbook';
import { WorkbookPatchReqDto, WorkbookPatchResDto } from '@/types/workbook';
import { QUERY_KEY } from '@constants/queryKey';

/**
 * PATCH /workbook
 *
 * workbookId에 해당하는 문제집의 메타정보(title, category, content)를 수정하기 위한 api입니다.
 */
const useWorkbookPatchMutation = (
  options?: UseMutationOptions<WorkbookPatchResDto, Error, WorkbookPatchReqDto>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchWorkbookById,
    ...options,
    onSuccess: ({ workbookId }) => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.WORKBOOK_TITLE,
      });
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.WORKBOOK_ID(workbookId),
      });
    },
  });
};

export default useWorkbookPatchMutation;
