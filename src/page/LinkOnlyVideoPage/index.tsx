import { Navigate, useParams } from 'react-router-dom';
import { PATH } from '@constants/path';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { VideoItemResDto } from '@/types/video';
import {
  LinkOnlyVideoPageLayout,
  LinkOnlyVideoPlayer,
} from '@components/LinkOnlyVideoPage';
import useOnlyRelatedVideoQuery from '@hooks/apis/queries/useOnlyRelatedVideoListQuery';
import { Box } from '@foundation/index';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import { VideoList } from '@common/index';

const LinkOnlyVideoPage: React.FC = () => {
  const { videoHash = '' } = useParams();
  const data = useQueryClient().getQueryData<VideoItemResDto>(
    QUERY_KEY.VIDEO_HASH(videoHash)
  );
  const { data: relatedVideoItem } = useOnlyRelatedVideoQuery(Number(data?.id));

  if (!data) return <Navigate to={PATH.NOT_FOUND} />;

  return (
    <LinkOnlyVideoPageLayout>
      <LinkOnlyVideoPlayer {...data} />
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
