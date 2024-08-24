import { Navigate, useParams } from 'react-router-dom';
import { PATH } from '@constants/path';
import { useQueryClient } from '@tanstack/react-query';
import { VideoItemResDto } from '@/types/video';
import {
  LinkOnlyVideoPageLayout,
  LinkOnlyVideoPlayer,
} from '@components/linkOnlyVideoPage';
import { Box, Typography } from 'gomterview-design-system';
import { css } from '@emotion/react';
import { theme } from '@gomterview/_theme';
import { VideoList } from '@common/index';
import {
  useGetVideoRelatedByVideoIdQuery,
  VIDEO_QUERY_KEY,
} from '@/entities/video/api/queries';

const LinkOnlyVideoPage: React.FC = () => {
  const { videoHash = '' } = useParams();
  const data = useQueryClient().getQueryData<VideoItemResDto>(
    VIDEO_QUERY_KEY.GET_VIDEO_HASH_HASH(videoHash)
  );
  const { data: relatedVideoItem } = useGetVideoRelatedByVideoIdQuery(
    Number(data?.id)
  );

  if (!data) return <Navigate to={PATH.NOT_FOUND} />;

  return (
    <LinkOnlyVideoPageLayout>
      <LinkOnlyVideoPlayer {...data} />
      <Typography
        variant="title2"
        css={css`
          margin-top: 4rem;
          margin-left: 1rem;
        `}
      >
        꼬리 질문 보기🤗
      </Typography>
      <Box
        css={css`
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          justify-content: center;
          max-width: 64svw;
          gap: 1.5rem;
          padding: 1.5rem;
          @media (max-width: ${theme.breakpoints.tablet}) {
            grid-template-columns: 1fr;
            padding: 1rem;
          }
        `}
      >
        {relatedVideoItem && <VideoList videoList={relatedVideoItem} />}
      </Box>
    </LinkOnlyVideoPageLayout>
  );
};

export default LinkOnlyVideoPage;
