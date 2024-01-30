import { useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getVideoRelatedInfoList } from '@/apis/video';
import { isAxiosError } from 'axios';

/**
 * GET video/relate/${videoId}
 *
 * 비디오 아이디로 비디오와 연결되거나 안된 나의 "모든" 비디오를 조회
 *
 * video 상세 페이지에서 사용됩니다.
 */
const useVideoItemQuery = (videoId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.VIDEO_ID_RELATED_INFO(videoId),
    queryFn: () => getVideoRelatedInfoList(videoId),
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

export default useVideoItemQuery;
