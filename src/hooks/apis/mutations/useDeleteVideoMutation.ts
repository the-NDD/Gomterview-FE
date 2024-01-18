import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteVideoById } from '@/apis/video';
import { VideoListResDto } from '@/types/video';

/**
 * DELETE /video/${videoId}
 *
 * videoId에 해당하는 비디오 정보를 서버에서 지우기 위한 api입니다.
 */
const useDeleteVideoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVideoById,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.VIDEO,
      });
    },
    onMutate: (videoId) => {
      const previousVideoList = queryClient.getQueryData<VideoListResDto>(
        QUERY_KEY.VIDEO
      );
      queryClient.setQueryData<VideoListResDto>(
        QUERY_KEY.VIDEO,
        (oldVideoList) => {
          return oldVideoList?.filter((video) => video.id !== videoId);
        }
      );

      return { previousVideoList };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(QUERY_KEY.VIDEO, context?.previousVideoList);
    },
  });
};

export default useDeleteVideoMutation;
