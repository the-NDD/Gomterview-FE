import { theme } from '@gomterview/_theme';
import { Tooltip } from 'gomterview-design-system';
import { css } from '@emotion/react';
import { Icon, Typography } from 'gomterview-design-system';

import RecordStartModal from '../InterviewModal/RecordStartModal';
import { useEffect, useState } from 'react';
import { ServiceTourStep } from '@common/index';
import { useRecoilState } from 'recoil';
import { runState, stepIndexState } from '@atoms/serviceTour';

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
  const [{ isRunning: isRunning }, setIsRunning] = useRecoilState(runState);
  const [{ stepIndex: stepIndex }, setStepIndex] =
    useRecoilState(stepIndexState);

  useEffect(() => {
    const handleKeyDown = (event: { key: string; code: string }) => {
      if (event.key === ' ' || event.code === 'Space') {
        if (isRecording) {
          handleStopRecording();
        } else if (!recordStartModalIsOpen) {
          setRecordStartModalIsOpen(true);
        }
      }
    };
    if ((isRunning && stepIndex === 4) || stepIndex === 6 || !isRunning)
      window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    recordStartModalIsOpen,
    isRecording,
    handleStopRecording,
    setRecordStartModalIsOpen,
    isRunning,
    stepIndex,
  ]);

  return (
    <>
      <Tooltip
        title={`녹화를 ${isRecording ? '종료' : '시작'}합니다`}
        position="top"
      >
        <ServiceTourStep stepIndex={4}>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              cursor: pointer;
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
        </ServiceTourStep>
      </Tooltip>

      <RecordStartModal
        isOpen={recordStartModalIsOpen}
        handleStartRecording={handleStartRecording}
        closeModal={() => setRecordStartModalIsOpen(false)}
      />
    </>
  );
};
export default RecordControlButton;
