import { theme } from '@styles/theme';
import { css } from '@emotion/react';
import { Icon, Typography } from '@foundation/index';

import RecordStartModal from '../InterviewModal/RecordStartModal';
import { useEffect, useState } from 'react';

type RecordControlButtonProps = {
  isRecording: boolean;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
};

const RecordControlButton: React.FC<RecordControlButtonProps> = ({
  isRecording,
  handleStartRecording,
  handleStopRecording,
}) => {
  const [recordStartModalIsOpen, setRecordStartModalIsOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: { key: string; code: string }) => {
      if (event.key === ' ' || event.code === 'Space') {
        if (isRecording) {
          handleStopRecording();
        } else {
          setRecordStartModalIsOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRecording, handleStopRecording, setRecordStartModalIsOpen]);

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        `}
        onClick={
          isRecording
            ? handleStopRecording
            : () => setRecordStartModalIsOpen(true)
        }
      >
        {isRecording ? (
          <Icon id="record-stop" width="2rem" height="2rem" />
        ) : (
          <Icon id="record-start" width="2rem" height="2rem" />
        )}
        <Typography variant={'body1'} color={theme.colors.text.white}>
          {isRecording ? '녹화종료' : '녹화시작'}
        </Typography>
      </div>
      <RecordStartModal
        isOpen={recordStartModalIsOpen}
        handleStartRecording={handleStartRecording}
        closeModal={() => setRecordStartModalIsOpen(false)}
      />
    </>
  );
};
export default RecordControlButton;
