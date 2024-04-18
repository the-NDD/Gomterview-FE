import { css } from '@emotion/react';
import Typography from '@foundation/Typography/Typography';
import { theme } from '@styles/theme';
import React, { PropsWithChildren } from 'react';
import { VideoItemResDto } from '@/types/video';
import { Box } from 'gomterview-design-system';

type VideoItemProps = PropsWithChildren &
  Pick<VideoItemResDto, 'videoName' | 'createdAt' | 'nickname' | 'videoAnswer'>;

const VideoPlayerFrame: React.FC<VideoItemProps> = ({
  children,
  videoName,
  createdAt,
  nickname,
  videoAnswer = '제출된 답변이 없습니다😂',
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        width: 64svw;
      `}
    >
      {children}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 0.5rem;
          cursor: pointer;
        `}
      >
        <Typography
          variant="title2"
          css={css`
            line-height: 1.7;
          `}
        >
          {videoName}
        </Typography>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <Typography variant="title4">{nickname}</Typography>

          <Typography variant="body3" color={theme.colors.text.subStrong}>
            {createdAt}
          </Typography>
        </div>
        <Typography
          variant="title3"
          css={css`
            line-height: 1.7;
            margin-top: 4rem;
          `}
        >
          답변 다시 보기
        </Typography>
        <Box
          css={css`
            display: flex;
            max-width: 64svw;
            gap: 1.5rem;
            padding: 1.5rem;
            min-height: 12.5rem;
            margin-top: 0.5rem;
          `}
        >
          <Typography
            variant="body3"
            css={css`
              line-height: 1.7;
            `}
          >
            {videoAnswer}
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default VideoPlayerFrame;
