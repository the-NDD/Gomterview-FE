import { QueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { memberApi } from '@/entities/member/api';

const rootLoader = async ({ queryClient }: { queryClient: QueryClient }) => {
  if (!queryClient.getQueryState(QUERY_KEY.MEMBER)) {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEY.MEMBER,
      queryFn: () => memberApi.getMember(),
      gcTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
      retry: false,
    });
  }
  return null;
};

export default rootLoader;
