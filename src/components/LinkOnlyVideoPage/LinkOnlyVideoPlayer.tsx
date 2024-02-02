import { VideoItemResDto } from '@/types/video';
import { VideoPlayer, VideoPlayerFrame } from '@common/VideoPlayer';

type LinkOnlyVideoPlayerProps = Omit<VideoItemResDto, 'hash'>;
const LinkOnlyVideoPlayer: React.FC<LinkOnlyVideoPlayerProps> = ({
  id,
  url,
  videoName,
  createdAt,
  nickname,
}) => {
  return (
    <VideoPlayerFrame
      key={id}
      videoName={videoName}
      createdAt={createdAt}
      nickname={nickname}
    >
      <VideoPlayer url={url} />
    </VideoPlayerFrame>
  );
};

export default LinkOnlyVideoPlayer;
