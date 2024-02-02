import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getOnlyRelatedVideoList } from '@/apis/video';
import { isAxiosError } from 'axios';

/**
 * GET video/related/${videoId}
 *
 * videoId로 해당 비디오와 "연결된" 리스트 만 조회
 *
 * video 상세 페이지에서 사용됩니다.
 */
const useOnlyRelatedVideoQuery = (videoId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.VIDEO_ID_ONLY_RELATED(videoId),
    queryFn: () => getOnlyRelatedVideoList(videoId),
    retry: (_, error) => {
      if (isAxiosError(error)) {
        const statusCode = error.response?.status;
        if (statusCode === 404 || statusCode === 401) {
          return false;
        }
      }
      return true;
    },
  });
};

export default useOnlyRelatedVideoQuery;
