import useUserInfo from '@hooks/useUserInfo';
import { useQueryClient } from '@tanstack/react-query';
import { WorkbookTitleListResDto } from '@/types/workbook';
import { useDeleteWorkbookByWorkbookIdMutation } from '@/entities/workbook/api/mutations';
import { WORKBOOK_QUERY_KEY } from '@/entities/workbook/api/queries';
import { QUESTION_QUERY_KEY } from '@/entities/question/api/queries';

const useWorkbookDelete = () => {
  const userInfo = useUserInfo();
  const queryClient = useQueryClient();

  const { mutate: deleteWorkbookSet } = useDeleteWorkbookByWorkbookIdMutation();

  const deleteFromServer = (workbookId: number) => {
    deleteWorkbookSet({ workbookId: Number(workbookId) });
  };

  const deleteFromState = (workbookId: number) => {
    queryClient.setQueryData<WorkbookTitleListResDto | []>(
      WORKBOOK_QUERY_KEY.GET_WORKBOOK_TITLE(),
      (prev) => prev?.filter((item) => item.workbookId !== Number(workbookId))
    );

    void queryClient.invalidateQueries({
      queryKey: QUESTION_QUERY_KEY.GET_QUESTION_WORKBOOKID(workbookId),
    });
  };

  const deleteWorkbook = (workbookId: number) => {
    userInfo ? deleteFromServer(workbookId) : deleteFromState(workbookId);
  };

  return {
    deleteWorkbook,
  };
};

export default useWorkbookDelete;
