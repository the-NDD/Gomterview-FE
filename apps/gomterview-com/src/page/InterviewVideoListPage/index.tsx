import { LoadingBounce, VideoList } from '@common/index';
import { InterviewVideoListPageLayout } from '@components/InterviewVideoListPage';
import { CenterLayout } from '@components/layout';

import { css } from '@emotion/react';

import { Box, Typography } from '@foundation/index';
import usePublicVideoListQuery from '@hooks/apis/queries/usePublicVideoListQuery';
import { theme } from '@styles/theme';

const InterviewVideoListPage: React.FC = () => {
  const { data: allVideoList } = usePublicVideoListQuery();

  return (
    <InterviewVideoListPageLayout>
      <Typography
        variant="title1"
        css={css`
          margin: 0 0.5rem;
          align-self: flex-start;
        `}
      >
        공개된 면접 영상
      </Typography>
      <Box
        css={css`
          display: grid;
          grid-template-columns: ${allVideoList
            ? 'repeat(2, minmax(0, 1fr));'
            : 'none'};
          justify-content: center;
          gap: 1.5rem;
          padding: 1.5rem;
          min-height: 18.75rem;
          @media (max-width: ${theme.breakpoints.tablet}) {
            grid-template-columns: 1fr;
            padding: 1rem;
          }
        `}
      >
        {allVideoList ? (
          <VideoList videoList={allVideoList} />
        ) : (
          <CenterLayout>
            <LoadingBounce />
          </CenterLayout>
        )}
      </Box>
    </InterviewVideoListPageLayout>
  );
};

export default InterviewVideoListPage;
