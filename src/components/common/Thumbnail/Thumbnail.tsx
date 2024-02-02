import { css } from '@emotion/react';
import { CardCover, Icon, Typography } from '@foundation/index';
import { theme } from '@styles/theme';
import { MouseEventHandler } from 'react';
import logo from '@assets/images/logo.png';

type ThumbnailProps = {
  image: string;
  videoName: string;
  videoLength: string;
  isMyPage?: boolean;
  visibility?: 'PUBLIC' | 'LINK_ONLY' | 'PRIVATE';
  onDeleteIconClick?: () => void;
};

const Thumbnail: React.FC<ThumbnailProps> = ({
  image,
  videoName,
  videoLength,
  isMyPage = false,
  visibility,
  onDeleteIconClick,
}) => {
  const handleDeleteIconClick: MouseEventHandler = (e) => {
    e.preventDefault(); //상위 요소의 Link 이벤트를 막기 위해
    if (onDeleteIconClick) onDeleteIconClick();
  };

  return (
    <CardCover
      borderRadius="1rem"
      css={css`
        &:hover .delete {
          display: block;
        }
      `}
    >
      <div
        className="thumbnail"
        css={css`
          position: relative;
          display: inline-block;
          width: 100%;

          &::after {
            content: '${videoLength}';
            position: absolute;
            right: 0.75rem;
            bottom: 0.75rem;
            //TODO 이 부분 색상은 성인님 작업 부분과 겹칠 것 같아 일단 하드코딩했습니다.
            background: rgba(0, 0, 0, 0.7);
            font-size: 0.875rem;
            color: ${theme.colors.text.white};
            padding: 0.25rem;
            border-radius: 0.25rem;
          }
        `}
      >
        {isMyPage && (
          <>
            <div
              onClick={handleDeleteIconClick}
              className="delete"
              css={css`
                display: none;
                position: absolute;
                top: 0.5rem;
                left: 0.5rem;
                padding: 0.25rem;
                border-radius: 1rem;
                background-color: ${theme.colors.surface.default};
                z-index: ${theme.zIndex.contentOverlay.overlay5};
              `}
            >
              <Icon id="trash" width="20" height="20" />
            </div>
            <div
              css={css`
                display: block;
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                padding: 0.25rem;
                border-radius: 1rem;
                background-color: ${theme.colors.surface.default};
                z-index: ${theme.zIndex.contentOverlay.overlay5};
              `}
            >
              <Typography
                variant="body3"
                color={`${theme.colors.point.primary.default};`}
              >
                {visibility}
              </Typography>
            </div>
          </>
        )}
        <img
          loading="lazy"
          crossOrigin="use-credentials"
          src={image}
          onError={(e) => (e.currentTarget.src = `${logo}`)}
          alt={videoName}
          css={css`
            aspect-ratio: 3 / 2;
            width: 100%;
            height: auto;
            object-fit: contain;
            border-radius: 1rem;
          `}
        />
      </div>
    </CardCover>
  );
};

export default Thumbnail;
