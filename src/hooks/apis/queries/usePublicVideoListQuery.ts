import { useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getPublicVideoList } from '@/apis/video';

/**
 * GET /video/all
 *
 * 공유된 모든 비디오 목록을 조회하는 api입니다.
 *
 * 마이페이지에서 사용됩니다.
 */
const usePublicVideoListQuery = () => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.VIDEO_PUBLIC,
    queryFn: () => getPublicVideoList(),
  });
};

export default usePublicVideoListQuery;
