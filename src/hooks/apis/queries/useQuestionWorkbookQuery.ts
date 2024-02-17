import { getQuestion } from '@/apis/question';
import { QUERY_KEY } from '@/constants/queryKey';
import { EmptyContext } from '@foundation/EmptySuspense/EmptySuspense';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';

/**
 * GET /question/${workbookId}
 *
 * workbookId로 해당 문제집의 질문과 디폴트 답안을 조회허는 api입니다.
 *
 * QuestionSelectionBox, 문제집 상세보기 페이지 등에서 사용됩니다.
 */
const useQuestionWorkbookQuery = ({ workbookId }: { workbookId: number }) => {
  const { setIsEmpty } = useContext(EmptyContext);
  const query = useSuspenseQuery({
    queryKey: QUERY_KEY.QUESTION_WORKBOOK(workbookId),
    queryFn: () => getQuestion(workbookId),
  });

  useEffect(() => {
    if (query.isSuccess) {
      setIsEmpty(query.data?.length === 0);
    }
  }, [query.data?.length, query.isSuccess, setIsEmpty]);

  return query;
};

export default useQuestionWorkbookQuery;
