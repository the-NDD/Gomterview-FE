import { css } from '@emotion/react';
import NextButton from './NextButton';
import { useState } from 'react';
import { theme } from '@gomterview/_theme';

import {
  InterviewExitButton,
  AnswerToggleButton,
  RecordControlButton,
} from './index';

import {
  InterviewExitModal,
  InterviewFinishModal,
} from '../InterviewModal/index';
import { ServiceTourStep } from '@common/index';
type InterviewFooterProps = {
  isRecording: boolean;
  recordedBlobs: Blob[];
  isLastQuestion: boolean;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  handleScript: () => void;
  handleNextQuestion: () => void;
};

const InterviewFooter: React.FC<InterviewFooterProps> = ({
  isRecording,
  recordedBlobs,
  isLastQuestion,
  handleStartRecording,
  handleStopRecording,
  handleScript,
  handleNextQuestion,
}) => {
  const [interviewExitModalIsOpen, setInterviewExitModalIsOpen] =
    useState<boolean>(false);
  const [InterviewFinishModalIsOpen, setInterviewFinishModalIsOpen] =
    useState<boolean>(false);

  const handleNext = () => {
    if (!isLastQuestion) handleNextQuestion();
    else setInterviewFinishModalIsOpen(true);
  };

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 6.25rem;
        background-color: ${theme.colors.surface.black100};
        gap: 2.5rem;
      `}
    >
      <InterviewExitButton
        handleInterviewExit={() => setInterviewExitModalIsOpen(true)}
      />
      <AnswerToggleButton handleAnswerToggle={handleScript} />

      <RecordControlButton
        isRecording={isRecording}
        handleStartRecording={handleStartRecording}
        handleStopRecording={handleStopRecording}
      />
      <ServiceTourStep stepIndex={5}>
        {!isRecording && recordedBlobs.length === 0 ? (
          <NextButton handleNext={handleNext} />
        ) : (
          <div></div>
        )}
      </ServiceTourStep>
      <InterviewExitModal
        isOpen={interviewExitModalIsOpen}
        closeModal={() => setInterviewExitModalIsOpen((prev) => !prev)}
      />
      <InterviewFinishModal isOpen={InterviewFinishModalIsOpen} />
    </div>
  );
};
export default InterviewFooter;
