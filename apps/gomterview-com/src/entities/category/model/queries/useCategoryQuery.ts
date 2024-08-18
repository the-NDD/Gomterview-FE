import { QUERY_KEY } from '@constants/queryKey';
import { useSuspenseQuery } from '@tanstack/react-query';
import { categoryApi } from '@/entities/category/api';

/**
 * GET /category
 *
 * 문제집의 모든 카테고리 리스트를 조회하는 api입니다.
 *
 * ex) FE, BE, CS, Android
 */
const useCategoryQuery = () => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.CATEGORY,
    queryFn: () => categoryApi.getCategory(),
  });
};

export default useCategoryQuery;
