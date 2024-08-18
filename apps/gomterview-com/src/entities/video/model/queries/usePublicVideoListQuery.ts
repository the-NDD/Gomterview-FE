import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { videoApi } from '@/entities/video/api';

/**
 * GET /video/all
 *
 * 공유된 모든 비디오 목록을 조회하는 api입니다.
 *
 * 마이페이지에서 사용됩니다.
 */
const usePublicVideoListQuery = () => {
  return useQuery({
    queryKey: QUERY_KEY.VIDEO_PUBLIC,
    queryFn: () => videoApi.getVideoPublic(),
  });
};

export default usePublicVideoListQuery;
