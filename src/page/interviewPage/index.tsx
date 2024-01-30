import React, { useEffect, useRef, useState } from 'react';

import { PATH } from '@constants/path';
import { Navigate } from 'react-router-dom';
import {
  InterviewHeader,
  InterviewMain,
  InterviewFooter,
  InterviewPageLayout,
  InterviewPageServiceTour,
} from '@components/interviewPage';
import {
  InterviewIntroModal,
  InterviewTimeOverModal,
} from '@components/interviewPage/InterviewModal';
import useInterview from '@/hooks/pages/Interview/useInterview';
import { useRecoilState } from 'recoil';
import { runState } from '@atoms/serviceTour';
const InterviewPage: React.FC = () => {
  const {
    isAllSuccess,
    connectStatus,
    isRecording,
    media,
    isScriptInView,
    setIsScriptInView,
    recordedBlobs,
    currentQuestion,
    isLastQuestion,
    getNextQuestion,
    handleStartRecording,
    handleStopRecording,
    timeOverModalIsOpen,
    setTimeOverModalIsOpen,
    reloadMedia,
  } = useInterview();
  const [{ isRunning: isRunning }] = useRecoilState(runState);

  const [interviewIntroModalIsOpen, setInterviewIntroModalIsOpen] =
    useState<boolean>(true);

  const mirrorVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (mirrorVideoRef.current) {
      mirrorVideoRef.current.srcObject = media;
    }
  }, [media]);

  if (!isAllSuccess || connectStatus === 'fail') {
    return <Navigate to={PATH.ROOT} />;
  } else
    return (
      <>
        <InterviewPageLayout>
          <InterviewHeader isRecording={isRecording} />
          <InterviewMain
            mirrorVideoRef={mirrorVideoRef}
            isScriptInView={isScriptInView}
            question={currentQuestion.questionContent}
            answer={currentQuestion.answerContent}
            connectStatus={connectStatus}
            reloadMedia={reloadMedia}
          />
          <InterviewFooter
            isRecording={isRecording}
            recordedBlobs={recordedBlobs}
            isLastQuestion={isLastQuestion}
            handleStartRecording={handleStartRecording}
            handleStopRecording={handleStopRecording}
            handleScript={() => setIsScriptInView((prev) => !prev)}
            handleNextQuestion={getNextQuestion}
          />
          <InterviewIntroModal
            isOpen={!isRunning && interviewIntroModalIsOpen}
            closeModal={() => setInterviewIntroModalIsOpen((prev) => !prev)}
          />
          <InterviewTimeOverModal
            isOpen={timeOverModalIsOpen}
            closeModal={() => setTimeOverModalIsOpen(false)}
          />
        </InterviewPageLayout>
        <InterviewPageServiceTour />
      </>
    );
};

export default InterviewPage;
