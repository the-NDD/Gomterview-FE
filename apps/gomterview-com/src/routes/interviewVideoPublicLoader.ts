import { Params } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { videoApi } from '@/entities/video/api';
import { VIDEO_QUERY_KEY } from '@/entities/video/api/queries';

const interviewVideoPublicLoader = async ({
  params,
  queryClient,
}: {
  params: Params<string>;
  queryClient: QueryClient;
}) => {
  const { videoHash = '' } = params;
  await queryClient.ensureQueryData({
    queryKey: VIDEO_QUERY_KEY.GET_VIDEO_HASH_HASH(videoHash),
    queryFn: () => videoApi.getVideoHashByHash(videoHash),
  });
  return null;
};

export default interviewVideoPublicLoader;
