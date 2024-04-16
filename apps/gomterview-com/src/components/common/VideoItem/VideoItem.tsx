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
        text-decoration: none;
        color: ${theme.colors.text.default};

        &:hover {
          > div {
            text-decoration: underline;
            text-decoration-color: ${theme.colors.text.subStrong};
          }
        }
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
          cursor: pointer;
        `}
      >
        <Typography
          variant="body2"
          css={css`
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.25rem;
          `}
        >
          {videoName}
        </Typography>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 0.6rem;
          `}
        >
          {userThumbnail && nickname && (
            <>
              <Avatar
                src={userThumbnail}
                css={css`
                  max-width: 1.5rem;
                  min-width: 1.5rem;
                  height: auto;
                `}
              />
              <Typography
                variant="body3"
                noWrap
                css={css`
                  overflow: hidden;
                  flex-grow: 1;
                  text-overflow: ellipsis; // 넘치는 텍스트에 말줄임표 표시
                `}
              >
                {nickname}
              </Typography>
            </>
          )}
          <Typography variant="body3" color={theme.colors.text.subStrong}>
            {date}
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default VideoItem;
