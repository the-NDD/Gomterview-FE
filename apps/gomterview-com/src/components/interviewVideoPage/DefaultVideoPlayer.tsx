import { IconButton, VideoPlayer, VideoPlayerFrame } from '@common/VideoPlayer';
import useVideoItemQuery from '@/entities/video/model/queries/useVideoItemQuery';
import { VideoEditModal } from '@components/interviewVideoPage/ShareRangeModal';
import { useState } from 'react';
import { css } from '@emotion/react';
import useUserInfo from '@hooks/useUserInfo';
import useVideoPatchMutation from '@/entities/video/model/mutations/useVideoPatchMutation';
import { PATH } from '@constants/path';
import { Button } from 'gomterview-design-system';
import { theme } from '@gomterview/_theme';
import { toast } from '@gomterview/toast';

type DefaultVideoPlayerProps = {
  videoId: string;
};
const DefaultVideoPlayer: React.FC<DefaultVideoPlayerProps> = ({ videoId }) => {
  const { data: videoItem } = useVideoItemQuery(Number(videoId));
  const userInfo = useUserInfo();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useVideoPatchMutation(Number(videoId));

  const editVideo = (
    videoName: string,
    videoAnswer: string,
    thumbnail: string,
    visibility: 'PUBLIC' | 'LINK_ONLY' | 'PRIVATE',
    relatedVideoIds: number[]
  ) => {
    mutate({
      videoName,
      videoAnswer,
      thumbnail,
      visibility,
      relatedVideoIds,
    });
  };
  const handleCopyLink = async () => {
    if (videoItem.hash) {
      try {
        await navigator.clipboard.writeText(
          `https://gomterview.com${PATH.INTERVIEW_VIDEO_PUBLIC(videoItem.hash)}`
        );
        toast.success('링크 복사됨'); //TODO 현재는 alert이지만 추후에 Toast로 변경 예정
      } catch (e) {
        toast.error('복사 실패');
      }
    }
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
          column-gap: 0.5rem;
        `}
      >
        {videoItem.hash && (
          <Button
            variants="secondary"
            onClick={() => void handleCopyLink()}
            disabled={!videoItem.hash}
            css={css`
              border: 1px solid ${theme.colors.border.default};
              background-color: transparent;
            `}
          >
            링크 복사
          </Button>
        )}
        {userInfo && userInfo.id === videoItem.memberId && (
          <IconButton // 해당 컴포넌트는 "나의" 영상임을 확인했을때만 반환되어야 합니다.
            text="영상 수정하기"
            iconName="edit"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </div>
      <VideoPlayerFrame
        key={videoItem.id}
        videoName={videoItem.videoName}
        createdAt={videoItem.createdAt}
        nickname={videoItem.nickname}
        videoAnswer={videoItem.videoAnswer}
      >
        <VideoPlayer url={videoItem.url} />
      </VideoPlayerFrame>
      {userInfo && userInfo.id === videoItem.memberId && (
        <VideoEditModal
          videoId={Number(videoItem.id)}
          videoName={videoItem.videoName}
          videoAnswer={videoItem.videoAnswer}
          thumbnail={videoItem.thumbnail}
          visibility={videoItem.visibility}
          isOpen={isOpen}
          editVideo={editVideo}
          closeModal={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default DefaultVideoPlayer;
