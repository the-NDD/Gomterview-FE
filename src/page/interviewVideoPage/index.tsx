import { LoadingBounce } from '@common/index';
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

const InterviewVideoPage: React.FC = () => {
  const { videoId } = useParams();
  const [errorInfo, setErrorInfo] = useState<Partial<Response>>();

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
          <DefaultVideoPlayer videoId={videoId} />
        </Suspense>
      </ErrorBoundary>
    </InterviewVideoPageLayout>
  );
};

export default InterviewVideoPage;
