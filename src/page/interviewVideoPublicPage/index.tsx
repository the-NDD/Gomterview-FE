import { Navigate, useParams } from 'react-router-dom';
import { PATH } from '@constants/path';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { VideoItemResDto } from '@/types/video';
import {
  InterviewVideoPublicPageLayout,
  PublicVideoPlayer,
} from '@components/interviewVideoPublicPage';
import useOnlyRelatedVideoQuery from '@hooks/apis/queries/useOnlyRelatedVideoListQuery';
import { Box } from '@foundation/index';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import { VideoItem } from '@common/VideoItem';
import { Thumbnail } from '@components/myPage';
import dayjs from 'dayjs';

const InterviewVideoPublicPage: React.FC = () => {
  const { videoHash = '' } = useParams();
  const data = useQueryClient().getQueryData<VideoItemResDto>(
    QUERY_KEY.VIDEO_HASH(videoHash)
  );

  const { data: relatedVideoItem } = useOnlyRelatedVideoQuery(Number(data?.id));
  console.log(relatedVideoItem);
  if (!data) return <Navigate to={PATH.NOT_FOUND} />;

  return (
    <InterviewVideoPublicPageLayout>
      <PublicVideoPlayer {...data} />
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
        {relatedVideoItem.map((video) => (
          <VideoItem
            key={video.id}
            videoName={video.videoName}
            date={dayjs(Number(video.createdAt)).format('YYYY-MM-DD')}
            path={`${PATH.INTERVIEW_VIDEO(video.id)}`}
          >
            <Thumbnail
              image={video.thumbnail ?? ''}
              videoName={video.videoName}
              videoLength={video.videoLength}
            />
          </VideoItem>
        ))}
      </Box>
    </InterviewVideoPublicPageLayout>
  );
};

export default InterviewVideoPublicPage;
