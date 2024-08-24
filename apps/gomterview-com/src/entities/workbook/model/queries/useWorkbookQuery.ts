import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { WorkbookEntity } from '@/types/workbook';
import useUserInfo from '@hooks/useUserInfo';
import { workbookApi } from '@/entities/workbook/api';
import { useGetCategoryQuery } from '@/entities/category/api/queries';

export type WorkbookQueryResult = WorkbookEntity & {
  categoryName: string;
};

/**
 * GET /workbook/${workbookId}
 *
 * workbookId로 문제집을 단건 조회하는 api입니다.
 *
 * 문제집 상세보기, 문제집 수정 페이지 등에서 사용됩니다.
 */
const useWorkbookQuery = ({
  workbookId,
}: {
  workbookId: number;
}): UseSuspenseQueryResult<WorkbookQueryResult, unknown> => {
  const userInfo = useUserInfo();
  const { data: categories } = useGetCategoryQuery();
  const findCategoryName = (categoryId?: number) =>
    categories?.find((category) => category.id === categoryId)?.name ?? '';

  return useSuspenseQuery({
    queryKey: QUERY_KEY.WORKBOOK_ID(workbookId),
    refetchOnMount: userInfo ? true : false,
    refetchOnWindowFocus: userInfo ? true : false,
    refetchOnReconnect: userInfo ? true : false,
    queryFn: () => workbookApi.getWorkbookByWorkbookId(workbookId),
    select: (data) => {
      const categoryName = findCategoryName(data.categoryId);
      return {
        ...data,
        categoryName,
      };
    },
  });
};

export default useWorkbookQuery;
