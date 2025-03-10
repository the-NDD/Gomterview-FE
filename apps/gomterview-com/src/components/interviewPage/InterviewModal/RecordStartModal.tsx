import { css } from '@emotion/react';
import { theme } from '@gomterview/_theme';

import { Typography, Modal, Button } from 'gomterview-design-system';
import { useEffect } from 'react';

type RecordStartModalProps = {
  isOpen: boolean;
  handleStartRecording: () => void;
  closeModal: () => void;
};

const RecordStartModal: React.FC<RecordStartModalProps> = ({
  isOpen,
  handleStartRecording,
  closeModal,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: { key: string; code: string }) => {
      if (event.key === ' ' || event.code === 'Space') {
        if (isOpen) {
          handleStartRecording();
          closeModal();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal, handleStartRecording, isOpen]);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Modal.content>
        <div
          css={css`
            width: 15rem;
          `}
        >
          <Typography
            paragraph
            variant="body1"
            color={theme.colors.text.default}
          >
            면접 녹화를 시작합니다 🤗
          </Typography>
          <Typography variant="body1" color={theme.colors.text.default}>
            당신의 면접을 응원합니다 😊
          </Typography>
          <div
            css={css`
              display: flex;
              justify-content: end;
              margin-top: 1.25rem;
            `}
          >
            <Button
              onClick={() => {
                handleStartRecording();
                closeModal();
              }}
            >
              녹화 시작
            </Button>
          </div>
        </div>
      </Modal.content>
    </Modal>
  );
};

export default RecordStartModal;
