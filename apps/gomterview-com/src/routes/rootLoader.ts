import { QueryClient } from '@tanstack/react-query';
import { memberApi } from '@/entities/member/api';
import { MEMBER_QUERY_KEY } from '@/entities/member/api/queries';

const rootLoader = async ({ queryClient }: { queryClient: QueryClient }) => {
  if (!queryClient.getQueryState(MEMBER_QUERY_KEY.GET_MEMBER())) {
    await queryClient.prefetchQuery({
      queryKey: MEMBER_QUERY_KEY.GET_MEMBER(),
      queryFn: () => memberApi.getMember(),
      gcTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
      retry: false,
    });
  }
  return null;
};

export default rootLoader;
