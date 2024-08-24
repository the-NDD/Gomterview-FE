import { PATH } from '@constants/path';
import { css } from '@emotion/react';
import { Box } from 'gomterview-design-system';
import useDeleteVideoMutation from '@/entities/video/model/mutations/useDeleteVideoMutation';
import { theme } from '@gomterview/_theme';
import DeleteCheckModal from '../DeleteCheckModal';
import Thumbnail from '@common/Thumbnail/Thumbnail';
import { VideoItem } from '@common/VideoItem';
import { useModal } from '@gomterview/use-modal';
import { useSuspenseGetVideoAllQuery } from '@/entities/video/api/queries';
import { SingleVideoResponseDto } from '@gomterview/api';

type VideoListItemProps = {
  video: SingleVideoResponseDto;
};

const MyVideoListItem: React.FC<VideoListItemProps> = ({ video }) => {
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
      date={video.createdAt}
      path={`${PATH.INTERVIEW_VIDEO(video.id)}`}
    >
      <Thumbnail
        image={video.thumbnail ?? ''}
        videoName={video.videoName}
        videoLength={video.videoLength}
        isMyPage
        visibility={video.visibility}
        onDeleteIconClick={openDeleteCheckModal}
      />
    </VideoItem>
  );
};

const VideoListTabPanel: React.FC = () => {
  const { data } = useSuspenseGetVideoAllQuery();

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
      data-testid="video-list-tab-panel"
    >
      {data.map((video) => (
        <MyVideoListItem key={video.id} video={video} />
      ))}
    </Box>
  );
};

export default VideoListTabPanel;
