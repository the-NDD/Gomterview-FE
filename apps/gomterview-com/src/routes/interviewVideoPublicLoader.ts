import { QUERY_KEY } from '@constants/queryKey';
import { Params } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { videoApi } from '@/entities/video/api';

const interviewVideoPublicLoader = async ({
  params,
  queryClient,
}: {
  params: Params<string>;
  queryClient: QueryClient;
}) => {
  const { videoHash = '' } = params;
  await queryClient.ensureQueryData({
    queryKey: QUERY_KEY.VIDEO_HASH(videoHash),
    queryFn: () => videoApi.getVideoHashByHash(videoHash),
  });
  return null;
};

export default interviewVideoPublicLoader;
