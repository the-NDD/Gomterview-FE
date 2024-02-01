import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchVideoPublic } from '@/apis/video';

/**
 * PATCH /video/${videoId}
 *
 * 비디오 상세 정보를 수정하기 위한 api입니다.
 *
 */

const useVideoPatchMutation = (videoId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      videoName,
      visibility,
      relatedVideoIds,
    }: {
      videoName: string;
      visibility: 'PUBLIC' | 'LINK_ONLY' | 'PRIVATE';
      relatedVideoIds: number[];
    }) => patchVideoPublic(videoId, videoName, visibility, relatedVideoIds),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.VIDEO_ID(videoId),
      });
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.VIDEO_ID_ONLY_RELATED(videoId),
      });
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.VIDEO_ID_RELATED_INFO(videoId),
      });
    },
  });
};

export default useVideoPatchMutation;
