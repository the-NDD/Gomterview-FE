import { canUseFFmpeg, getFFmpeg } from '@/utils/record';
import { json } from 'react-router-dom';

const landingLoader = async () => {
  await getFFmpeg(); // Root에서 FFmpeg module을 받습니다.
  const isEncodingAllow = await canUseFFmpeg();

  return json({
    isEncodingAllow: isEncodingAllow,
  });
};

export default landingLoader;
