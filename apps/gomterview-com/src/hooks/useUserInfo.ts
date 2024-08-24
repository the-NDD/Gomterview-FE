import { MemberItemResDto } from '@/types/member';
import { useQueryClient } from '@tanstack/react-query';
import { MEMBER_QUERY_KEY } from '@/entities/member/api/queries';

const useUserInfo = () => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData<MemberItemResDto | undefined>(
    MEMBER_QUERY_KEY.GET_MEMBER()
  );
  return userInfo;
};

export default useUserInfo;
