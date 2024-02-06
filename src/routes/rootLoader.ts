import { QueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getMemberInfo } from '@/apis/member';
import { getFFmpeg } from '@/utils/record';

const rootLoader = async ({ queryClient }: { queryClient: QueryClient }) => {
  void getFFmpeg(); // Root에서 FFmpeg module을 받습니다.

  if (!queryClient.getQueryState(QUERY_KEY.MEMBER)) {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEY.MEMBER,
      queryFn: getMemberInfo,
      gcTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
    });
  }
  return null;
};

export default rootLoader;
