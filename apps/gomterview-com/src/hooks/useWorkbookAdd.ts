import useUserInfo from '@hooks/useUserInfo';
import {
  WorkbookAddReqDto,
  WorkbookResDto,
  WorkbookTitleListResDto,
} from '@/types/workbook';
import { useQueryClient } from '@tanstack/react-query';
import { usePostWorkbookMutation } from '@/entities/workbook/api/mutations';
import { WORKBOOK_QUERY_KEY } from '@/entities/workbook/api/queries';

type useWorkbookAddProps = {
  onSuccess?: () => void;
};
const useWorkbookAdd = ({ onSuccess }: useWorkbookAddProps) => {
  const userInfo = useUserInfo();
  const queryClient = useQueryClient();

  const { mutate: postInterviewSet } = usePostWorkbookMutation();

  const generateNewWorkbookId = () => {
    const lastId =
      queryClient
        .getQueryData<WorkbookTitleListResDto>(
          WORKBOOK_QUERY_KEY.GET_WORKBOOK_TITLE()
        )
        ?.at(-1)?.workbookId ?? 0;

    return lastId > 0 ? 0 : lastId - 1;
  };

  const createNewWorkbookTitleItem = (
    workbook: WorkbookAddReqDto,
    newId: number
  ) => {
    return { workbookId: newId, title: workbook.title };
  };

  const createNewWorkbookEntity = (
    workbook: WorkbookAddReqDto,
    newId: number
  ) => {
    return {
      workbookId: newId,
      categoryId: workbook.categoryId,
      nickname: '비회원',
      profileImg: '',
      copyCount: 0,
      title: workbook.title,
      content: workbook.content,
      isPublic: workbook.isPublic,
    };
  };

  const addWorkbookToServer = (workbook: WorkbookAddReqDto) => {
    postInterviewSet({ body: workbook });
  };

  const addWorkbookToState = (workbook: WorkbookAddReqDto) => {
    const newId = generateNewWorkbookId();

    queryClient.setQueryData<WorkbookTitleListResDto | []>(
      WORKBOOK_QUERY_KEY.GET_WORKBOOK_TITLE(),
      (prev) =>
        !prev || !prev.length
          ? [createNewWorkbookTitleItem(workbook, newId)]
          : [...prev, createNewWorkbookTitleItem(workbook, newId)]
    );
    queryClient.setQueryData<WorkbookResDto>(
      WORKBOOK_QUERY_KEY.GET_WORKBOOK_WORKBOOKID(newId),
      (_) => createNewWorkbookEntity(workbook, newId)
    );
  };

  const addWorkbook = (workbook: WorkbookAddReqDto) => {
    userInfo ? addWorkbookToServer(workbook) : addWorkbookToState(workbook);
    onSuccess?.();
  };

  return { addWorkbook };
};

export default useWorkbookAdd;
