import { API } from '@constants/api';
import { PATH } from '@constants/path';
import { toast } from '@gomterview/toast';
import dynamicImport from '@/utils/dynamicImport';
import { BASE_URL } from '@/apis/axios';

const redirectToGoogleLogin = async () => {
  if (import.meta.env.MODE === 'production') {
    window.location.href = `${BASE_URL}${API.LOGIN}`;
    return;
  }

  const cookieGeneratorModule = await dynamicImport<{
    cookieGenerator: () => Promise<void>;
  }>('../dev/cookieGenerator.ts');

  if (!cookieGeneratorModule) return;

  const { cookieGenerator } = cookieGeneratorModule;
  void (await cookieGenerator());

  toast.success('개발 모드에서 로그인 되었습니다.', {
    position: 'bottomRight',
  });

  window.location.href = `${window.location.origin}${PATH.MYPAGE}`; // dev 모드에서만 사용
};

export default redirectToGoogleLogin;
