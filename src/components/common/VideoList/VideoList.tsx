import {
  OnlyRelatedVideoListResDto,
  PublicVideoListResDto,
} from '@/types/video';
import { VideoItem } from '@common/VideoItem';
import { Thumbnail } from '@components/myPage';
import { PATH } from '@constants/path';
import dayjs from 'dayjs';
import BlankBear from '@assets/images/blank-bear.png';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import { Typography } from '@foundation/index';

type VideoListProps = {
  videoList: PublicVideoListResDto | OnlyRelatedVideoListResDto;
};

const VideoList: React.FC<VideoListProps> = ({ videoList }) => {
  return (
    <>
      {videoList.length > 0 ? (
        videoList.map((video) => (
          <VideoItem
            key={video.id}
            videoName={video.videoName}
            date={dayjs(Number(video.createdAt)).format('YYYY-MM-DD')}
            path={`${PATH.INTERVIEW_VIDEO(video.id)}`}
          >
            <Thumbnail
              image={video.thumbnail ?? ''}
              videoName={video.videoName}
              videoLength={video.videoLength}
            />
          </VideoItem>
        ))
      ) : (
        <>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              row-gap: 1rem;
              padding: 1rem;
              width: 100%;
              border-radius: 1rem;
              background-color: ${theme.colors.surface.default};
            `}
          >
            <Typography variant="title4">
              이런! 이번 영상에는 꼬리 질문이 없네요!😥
              <br />
              곧 꼬리 질문을 추가해 주실거에요!!
              <br />
            </Typography>
          </div>
          <div
            css={css`
              display: flex;
              justify-content: center;
            `}
          >
            <img
              height="350"
              src={BlankBear}
              alt="박스 옆에서 손을 흔드는 곰"
            />
          </div>
        </>
      )}
    </>
  );
};

export default VideoList;
