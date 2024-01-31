import { LoadingBounce, VideoList } from '@common/index';
import {
  InterviewVideoPageLayout,
  DefaultVideoPlayer,
} from '@components/interviewVideoPage';
import { Suspense, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { CenterLayout } from '@components/layout';
import { PATH } from '@constants/path';
import { ErrorBoundary } from 'react-error-boundary';
import { isAxiosError } from 'axios';
import useOnlyRelatedVideoQuery from '@hooks/apis/queries/useOnlyRelatedVideoListQuery';
import { Box } from '@foundation/index';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import { IconButton } from '@common/VideoPlayer';
// import { VideoShareModal } from '@components/interviewVideoPage/ShareRangeModal';

const InterviewVideoPage: React.FC = () => {
  const { videoId } = useParams();
  const [errorInfo, setErrorInfo] = useState<Partial<Response>>();
  const { data: relatedVideoItem } = useOnlyRelatedVideoQuery(Number(videoId));
  const [isOpen, setIsOpen] = useState(false);

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
            <IconButton // 해당 컴포넌트는 "나의" 영상임을 확인했을때만 반환되어야 합니다.
              text="영상 수정하기"
              iconName="edit"
              onClick={() => setIsOpen(!isOpen)}
            />
            <DefaultVideoPlayer videoId={videoId} />
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
              <VideoList videoList={relatedVideoItem} />
            </Box>
          </div>
        </Suspense>
      </ErrorBoundary>
    </InterviewVideoPageLayout>
  );
};

export default InterviewVideoPage;
