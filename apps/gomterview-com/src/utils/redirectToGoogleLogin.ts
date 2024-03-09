import { API, BASE_URL } from '@constants/api';
import { PATH } from '@constants/path';
import { toast } from '@foundation/Toast/toast';
import dynamicImport from '@/utils/dynamicImport';

const redirectToGoogleLogin = async () => {
  if (import.meta.env.MODE === 'production') {
    window.location.href = `${BASE_URL}${API.LOGIN}`;
    return;
  }

  const cookieGeneratorModule = await dynamicImport<{
    cookieGenerator: () => Promise<void>;
  }>('@/dev/cookieGenerator');

  if (!cookieGeneratorModule) return;

  const { cookieGenerator } = cookieGeneratorModule;
  void (await cookieGenerator());

  toast.success('개발 모드에서 로그인 되었습니다.', {
    position: 'bottomRight',
  });

  window.location.href = `${window.location.origin}${PATH.MYPAGE}`; // dev 모드에서만 사용
};

export default redirectToGoogleLogin;
