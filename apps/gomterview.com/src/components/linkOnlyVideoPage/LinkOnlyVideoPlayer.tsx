import { VideoItemResDto } from '@/types/video';
import { VideoPlayer, VideoPlayerFrame } from '@common/VideoPlayer';

type LinkOnlyVideoPlayerProps = Omit<VideoItemResDto, 'hash'>;
const LinkOnlyVideoPlayer: React.FC<LinkOnlyVideoPlayerProps> = ({
  id,
  url,
  videoName,
  createdAt,
  nickname,
  videoAnswer,
}) => {
  return (
    <VideoPlayerFrame
      key={id}
      videoName={videoName}
      createdAt={createdAt}
      nickname={nickname}
      videoAnswer={videoAnswer}
    >
      <VideoPlayer url={url} />
    </VideoPlayerFrame>
  );
};

export default LinkOnlyVideoPlayer;
