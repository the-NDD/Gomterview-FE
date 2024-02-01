import { css } from '@emotion/react';
import Modal from '@foundation/Modal';
import { Button, CheckBox, Input, Typography } from '@foundation/index';

import { theme } from '@styles/theme';
import ModalHeader from '@foundation/Modal/ModalHeader';
import LabelBox from '@common/QuestionSelectionBox/WorkbookGeneratorModal/LabelBox';
import useInput from '@hooks/useInput';
import { toast } from '@foundation/Toast/toast';
import { FormEventHandler, useEffect, useState } from 'react';
import useRelatedInfoListQuery from '@hooks/apis/queries/useVideoRelatedInfoListQuery';

const visibilityOptions: {
  title: string;
  status: 'PUBLIC' | 'LINK_ONLY' | 'PRIVATE';
}[] = [
  { title: '공개', status: 'PUBLIC' },
  { title: '링크 공개', status: 'LINK_ONLY' },
  { title: '비공개', status: 'PRIVATE' },
];

type VideoEditModalProps = {
  videoId: number;
  videoName: string;
  visibility: 'PUBLIC' | 'LINK_ONLY' | 'PRIVATE';
  isOpen: boolean;
  editVideo: (
    videoName: string,
    visibility: 'PUBLIC' | 'LINK_ONLY' | 'PRIVATE',
    relatedVideoIds: number[]
  ) => void;
  closeModal: () => void;
};
const VideoEditModal: React.FC<VideoEditModalProps> = ({
  videoId,
  videoName,
  visibility,
  isOpen,
  editVideo,
  closeModal,
}) => {
  const { data: relatedInfoList } = useRelatedInfoListQuery(videoId);
  const [activeValidationError, setActiveValidationError] = useState(false);
  const [selectedVisibility, setSelectedVisibility] = useState<
    'PUBLIC' | 'LINK_ONLY' | 'PRIVATE'
  >('PUBLIC');
  const [selectedVideoInfo, setSelectedVideoInfo] = useState<number[]>([]);
  const {
    value: videoTitle,
    onChange: handleVideoTitleChange,
    isEmpty: isVideoTitleEmpty,
  } = useInput<HTMLInputElement>(videoName ?? ''); // 초기 값

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;
    !selectedVideoInfo.includes(Number(id))
      ? selectVideoInfo(Number(id))
      : unSelectVideoInfo(Number(id));
  };

  const selectVideoInfo = (id: number) =>
    setSelectedVideoInfo((pre) => [...pre, id]);

  const unSelectVideoInfo = (id: number) =>
    setSelectedVideoInfo((pre) => pre.filter((item) => item !== id));

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (isVideoTitleEmpty()) {
      setActiveValidationError(true);
      return;
    }

    editVideo(videoTitle, selectedVisibility, selectedVideoInfo);
    toast.success('성공적으로 영상정보가 수정되었습니다.');
  };

  useEffect(() => {
    if (visibility) {
      setSelectedVisibility(visibility);
    } else {
      setSelectedVisibility('PRIVATE');
    }
    if (selectedVideoInfo.length === 0)
      relatedInfoList?.map((info) => {
        if (info.isRelated) {
          setSelectedVideoInfo((pre) => [...pre, info.id]);
        }
      });
  }, [isOpen, relatedInfoList, visibility, selectedVideoInfo]);

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      css={css`
        width: 30rem;
        @media (max-width: ${theme.breakpoints.tablet}) {
          width: 25rem;
        }
        @media (max-width: ${theme.breakpoints.mobileL}) {
          width: 100%;
          margin: 0 0.5rem;
        }
      `}
    >
      <ModalHeader closeModal={closeModal}>면접 영상 정보 수정</ModalHeader>
      <div
        css={css`
          max-height: 80vh;
          padding: 1.5rem;
        `}
      >
        <form
          onSubmit={handleSubmit}
          onReset={closeModal}
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 1rem;
          `}
        >
          <LabelBox
            labelName="제목"
            labelColor={
              activeValidationError && isVideoTitleEmpty()
                ? theme.colors.border.error
                : theme.colors.border.default
            }
          >
            <Input
              onChange={handleVideoTitleChange}
              value={videoTitle}
              css={css`
                border-color: ${activeValidationError &&
                isVideoTitleEmpty() &&
                theme.colors.border.error};
              `}
            />
          </LabelBox>
          <LabelBox labelName="공개여부">
            <div
              css={css`
                display: flex;
                column-gap: 1rem;
                padding-left: 0.25rem;
                cursor: pointer;
              `}
            >
              {visibilityOptions.map(({ title, status }, index) => (
                <Typography
                  key={index}
                  variant="title4"
                  onClick={() => {
                    setSelectedVisibility(status);
                  }}
                  color={
                    selectedVisibility === status
                      ? theme.colors.text.default
                      : theme.colors.text.subStrong
                  }
                >
                  {title}
                </Typography>
              ))}
            </div>
          </LabelBox>
          <LabelBox labelName="연관 영상 선택">
            <div
              css={css`
                width: 100%;
                gap: 1rem;
                max-height: 200px;
                overflow-y: scroll;
              `}
            >
              {relatedInfoList?.map((info) => (
                <CheckBox
                  id={info.id.toString()}
                  key={info.id}
                  checked={selectedVideoInfo.includes(info.id)}
                  onInputChange={handleCheckBox}
                >
                  <Typography
                    css={css`
                      margin-left: 1rem;
                    `}
                  >
                    {info.videoName}
                  </Typography>
                </CheckBox>
              ))}
            </div>
          </LabelBox>
          <div
            css={css`
              display: flex;
              justify-content: flex-end;
              column-gap: 0.5rem;
              margin-top: 1rem;
            `}
          >
            <Button variants="secondary" type="reset">
              취소
            </Button>
            <Button variants="primary" type="submit">
              수정하기
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default VideoEditModal;
