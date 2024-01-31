import { VideoList } from '@common/index';
import { InterviewVideoListPageLayout } from '@components/InterviewVideoListPage';

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
        면접 영상 목록
      </Typography>
      <Box
        css={css`
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          justify-content: center;
          gap: 1.5rem;
          padding: 1.5rem;
          @media (max-width: ${theme.breakpoints.tablet}) {
            grid-template-columns: 1fr;
            padding: 1rem;
          }
        `}
      >
        <VideoList videoList={allVideoList} />
      </Box>
    </InterviewVideoListPageLayout>
  );
};

export default InterviewVideoListPage;
