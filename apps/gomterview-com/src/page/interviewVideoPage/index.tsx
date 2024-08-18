import { LoadingBounce, VideoList } from '@common/index';
import {
  DefaultVideoPlayer,
  InterviewVideoPageLayout,
} from '@components/interviewVideoPage';
import { Suspense, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { CenterLayout } from '@components/layout';
import { PATH } from '@constants/path';
import { ErrorBoundary } from 'react-error-boundary';
import { isAxiosError } from 'axios';
import useOnlyRelatedVideoQuery from '@/entities/video/model/queries/useOnlyRelatedVideoListQuery';
import { Box, Typography } from 'gomterview-design-system';
import { css } from '@emotion/react';
import { theme } from '@gomterview/_theme';

const InterviewVideoPage: React.FC = () => {
  const { videoId } = useParams();
  const [errorInfo, setErrorInfo] = useState<Partial<Response>>();
  const { data: relatedVideoItem } = useOnlyRelatedVideoQuery(Number(videoId));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!videoId) return <Navigate to={PATH.ROOT} />;

  return (
    <InterviewVideoPageLayout>
      <ErrorBoundary
        onError={(err) => {
          if (!isAxiosError(err)) return;
          setErrorInfo({
            status: err?.response?.status,
            statusText: err.response?.statusText,
          });
        }}
        fallback={<Navigate to={PATH.NOT_FOUND} state={errorInfo} />}
      >
        <Suspense
          fallback={
            <CenterLayout>
              <LoadingBounce />
            </CenterLayout>
          }
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              row-gap: 0.5rem;
            `}
          >
            <DefaultVideoPlayer videoId={videoId} />
            <Typography
              variant="title2"
              css={css`
                margin-left: 1rem;
                margin-top: 4rem;
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
                min-height: 12.5rem;
                @media (max-width: ${theme.breakpoints.tablet}) {
                  grid-template-columns: 1fr;
                  padding: 1rem;
                }
              `}
            >
              {relatedVideoItem && <VideoList videoList={relatedVideoItem} />}
            </Box>
          </div>
        </Suspense>
      </ErrorBoundary>
    </InterviewVideoPageLayout>
  );
};

export default InterviewVideoPage;
