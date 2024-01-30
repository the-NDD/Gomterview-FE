import { PATH } from '@constants/path';
import { css } from '@emotion/react';
import { Box } from '@foundation/index';
import useDeleteVideoMutation from '@hooks/apis/mutations/useDeleteVideoMutation';
import useVideoListQuery from '@hooks/apis/queries/useVideoListQuery';
import { theme } from '@styles/theme';
import dayjs from 'dayjs';
import DeleteCheckModal from '../DeleteCheckModal';
import Thumbnail from '../Thumbnail';
import { VideoItem } from '../VideoItem';
import useModal from '@hooks/useModal';
import { MyVideoListResDto } from '@/types/video';
import { ExcludeArray } from '@/types/utils';

type VideoListItemProps = {
  video: ExcludeArray<MyVideoListResDto>;
};

const VideoListItem: React.FC<VideoListItemProps> = ({ video }) => {
  const { mutate } = useDeleteVideoMutation();
  const { openModal: openDeleteCheckModal, closeModal: closeDeleteCheckModal } =
    useModal(() => {
      return (
        <DeleteCheckModal
          content="영상을 삭제 하시겠습니까?"
          closeModal={closeDeleteCheckModal}
          confirmModal={handleConfirmModal}
        />
      );
    });

  const handleConfirmModal = () => {
    closeDeleteCheckModal();
    mutate(video.id);
  };

  return (
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
        onDeleteIconClick={openDeleteCheckModal}
      />
    </VideoItem>
  );
};

const VideoListTabPanel: React.FC = () => {
  const { data } = useVideoListQuery();

  return (
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
      {data.map((video) => (
        <VideoListItem key={video.id} video={video} />
      ))}
    </Box>
  );
};

export default VideoListTabPanel;
