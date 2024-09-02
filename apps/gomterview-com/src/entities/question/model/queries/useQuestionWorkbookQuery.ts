import useUserInfo from '@hooks/useUserInfo';
import { useSuspenseGetQuestionByWorkbookIdQuery } from '@/entities/question/api/queries';

/**
 * GET /question/${workbookId}
 *
 * workbookId로 해당 문제집의 질문과 디폴트 답안을 조회하는 api입니다.
 *
 * QuestionSelectionBox, 문제집 상세보기 페이지 등에서 사용됩니다.
 */
const useQuestionWorkbookQuery = ({ workbookId }: { workbookId: number }) => {
  const userInfo = useUserInfo();

  return useSuspenseGetQuestionByWorkbookIdQuery(workbookId, {
    refetchOnMount: !!userInfo,
    refetchOnWindowFocus: !!userInfo,
    refetchOnReconnect: !!userInfo,
  });
};

export default useQuestionWorkbookQuery;
