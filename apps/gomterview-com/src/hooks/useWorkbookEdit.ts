import useUserInfo from '@hooks/useUserInfo';
import {
  WorkbookPatchReqDto,
  WorkbookResDto,
  WorkbookTitleListResDto,
} from '@/types/workbook';
import { useQueryClient } from '@tanstack/react-query';
import { usePatchWorkbookMutation } from '@/entities/workbook/api/mutations';
import { WORKBOOK_QUERY_KEY } from '@/entities/workbook/api/queries';

type useWorkbookEditProps = {
  onSuccess?: () => void;
};
const useWorkbookEdit = ({ onSuccess }: useWorkbookEditProps) => {
  const userInfo = useUserInfo();
  const queryClient = useQueryClient();

  const { mutate: patchInterviewSet } = usePatchWorkbookMutation();

  const editWorkbookToServer = (workbook: WorkbookPatchReqDto) => {
    patchInterviewSet({ body: workbook });
  };

  const editWorkbookToState = (workbook: WorkbookPatchReqDto) => {
    queryClient.setQueryData<WorkbookTitleListResDto | []>(
      WORKBOOK_QUERY_KEY.GET_WORKBOOK_TITLE(),
      (prev) =>
        prev?.map((item) =>
          item.workbookId === workbook.workbookId
            ? { ...item, title: workbook.title }
            : item
        ) ?? []
    );

    queryClient.setQueryData<WorkbookResDto>(
      WORKBOOK_QUERY_KEY.GET_WORKBOOK_WORKBOOKID(workbook.workbookId),
      (prev) =>
        prev && {
          ...prev,
          categoryId: workbook.categoryId,
          title: workbook.title,
          content: workbook.content,
        }
    );
  };

  const editWorkbook = (workbook: WorkbookPatchReqDto) => {
    userInfo ? editWorkbookToServer(workbook) : editWorkbookToState(workbook);
    onSuccess?.();
  };

  return { editWorkbook };
};

export default useWorkbookEdit;
