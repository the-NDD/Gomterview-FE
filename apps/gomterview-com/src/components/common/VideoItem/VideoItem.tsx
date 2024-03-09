import { css } from '@emotion/react';
import { Avatar, Typography } from '@foundation/index';
import { theme } from '@styles/theme';
import { Link } from 'react-router-dom';

type VideoItemProps = {
  children?: React.ReactNode;
  videoName: string;
  date: string;
  userThumbnail?: string;
  nickname?: string;
  path: string;
};

const VideoItem: React.FC<VideoItemProps> = ({
  children,
  videoName,
  date,
  userThumbnail,
  nickname,
  path,
}) => {
  return (
    <Link
      to={path}
      css={css`
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: ${theme.colors.text.default};
      `}
    >
      {children}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          row-gap: 0.5rem;
          padding: 1rem 0.5rem;
          height: 100%;
          cursor: pointer;
        `}
      >
        <Typography
          variant="body2"
          css={css`
            line-height: 1.25rem;

            &:hover {
              text-decoration: underline;
              text-decoration-color: ${theme.colors.text.subStrong};
            }
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
          <div
            css={css`
              display: flex;
              gap: 0.625rem;
            `}
          >
            {userThumbnail && nickname && (
              <>
                <Avatar src={userThumbnail} width="1.5rem" height="1.5rem" />
                <Typography variant="body3">{nickname}</Typography>
              </>
            )}
          </div>
          <Typography variant="body3" color={theme.colors.text.subStrong}>
            {date}
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default VideoItem;
