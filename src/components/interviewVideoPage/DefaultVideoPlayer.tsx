import { VideoPlayer, VideoPlayerFrame } from '@common/VideoPlayer';
import useVideoItemQuery from '@hooks/apis/queries/useVideoItemQuery';
// import { VideoShareModal } from '@components/interviewVideoPage/ShareRangeModal';
// import { useState } from 'react';
import { css } from '@emotion/react';

type DefaultVideoPlayerProps = {
  videoId: string;
};
const DefaultVideoPlayer: React.FC<DefaultVideoPlayerProps> = ({ videoId }) => {
  const { data: videoItem } = useVideoItemQuery(Number(videoId));

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
      `}
    >
      <VideoPlayerFrame
        key={videoItem.id}
        videoName={videoItem.videoName}
        createdAt={videoItem.createdAt}
      >
        <VideoPlayer url={videoItem.url} />
      </VideoPlayerFrame>
      {/* <VideoShareModal
        videoId={Number(videoItem.id)}
        videoName={videoItem.videoName}
        hash={videoItem.hash}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      /> */}
    </div>
  );
};

export default DefaultVideoPlayer;
