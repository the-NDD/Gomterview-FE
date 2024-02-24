import { getQuestion } from '@/apis/question';
import { QUERY_KEY } from '@/constants/queryKey';
import { useSuspenseQuery } from '@tanstack/react-query';
import useUserInfo from '@hooks/useUserInfo';

/**
 * GET /question/${workbookId}
 *
 * workbookId로 해당 문제집의 질문과 디폴트 답안을 조회하는 api입니다.
 *
 * QuestionSelectionBox, 문제집 상세보기 페이지 등에서 사용됩니다.
 */
const useQuestionWorkbookQuery = ({ workbookId }: { workbookId: number }) => {
  const userInfo = useUserInfo();

  const query = useSuspenseQuery({
    queryKey: QUERY_KEY.QUESTION_WORKBOOK(workbookId),
    queryFn: () => getQuestion(workbookId),
    refetchOnMount: userInfo ? true : false,
    refetchOnWindowFocus: userInfo ? true : false,
    refetchOnReconnect: userInfo ? true : false,
  });

  return query;
};

export default useQuestionWorkbookQuery;
