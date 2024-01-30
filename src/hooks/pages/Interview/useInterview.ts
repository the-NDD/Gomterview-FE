import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { recordSetting } from '@/atoms/interviewSetting';
import { localDownload, startRecording, stopRecording } from '@/utils/record';
import { useUploadToIDrive } from '@/hooks/useUploadToIdrive';
import useTimeTracker from '@/hooks/useTimeTracker';
import useInterviewFlow from '@hooks/pages/Interview/useInterviewFlow';
import useInterviewSettings from '@/hooks/atoms/useInterviewSettings';
import useMedia from '@hooks/useMedia';
import useDevice from '@hooks/useDevice';
import { recordingState } from '@atoms/interview';

const useInterview = () => {
  const {
    startTimer,
    stopTimer,
    calculateDuration,
    isTimeOver,
    setIsTimeOver,
  } = useTimeTracker();
  const { isAllSuccess } = useInterviewSettings();
  const { method } = useRecoilValue(recordSetting);
  const uploadToDrive = useUploadToIDrive();
  const { currentQuestion, getNextQuestion, isLastQuestion } =
    useInterviewFlow();

  const { media, connectStatus, startMedia } = useMedia();

  const { selectedMimeType, selectedDevice } = useDevice();

  const [{ isRecording: isRecording }, setIsRecording] =
    useRecoilState(recordingState);
  const [isScriptInView, setIsScriptInView] = useState(true);
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [timeOverModalIsOpen, setTimeOverModalIsOpen] =
    useState<boolean>(false);

  const [queue, setProcessQueue] = useState<Blob[][]>([]);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartRecording = useCallback(() => {
    startRecording({
      media,
      selectedMimeType,
      mediaRecorderRef,
      setRecordedBlobs,
    });
    setIsRecording({ isRecording: true });
    startTimer();
  }, [media, selectedMimeType, setIsRecording, startTimer]);

  const handleStopRecording = useCallback(() => {
    stopRecording(mediaRecorderRef);
    setIsRecording({ isRecording: false });
    stopTimer();
  }, [setIsRecording, stopTimer]);

  const handleProcessing = useCallback(() => {
    if (recordedBlobs.length === 0 || isProcessing) {
      return;
    }

    setIsProcessing(true);

    const blob = new Blob(recordedBlobs, { type: selectedMimeType });
    setRecordedBlobs([]);

    const recordTime = calculateDuration();

    switch (method) {
      case 'idrive':
        void uploadToDrive({ blob, currentQuestion, recordTime });
        break;
      case 'local':
        void localDownload(blob, currentQuestion, recordTime);
        break;
    }

    setProcessQueue((prevQueue) => prevQueue.slice(1));
    setIsProcessing(false);
  }, [
    recordedBlobs,
    isProcessing,
    setIsProcessing,
    selectedMimeType,
    calculateDuration,
    method,
    setProcessQueue,
    uploadToDrive,
    currentQuestion,
  ]);

  useEffect(() => {
    if (!isRecording && recordedBlobs.length > 0) {
      setProcessQueue((prevQueue) => [...prevQueue, recordedBlobs]);
    }
  }, [isRecording, recordedBlobs, setProcessQueue]);

  useEffect(() => {
    if (queue.length > 0 && !isProcessing) {
      handleProcessing();
    }
  }, [queue, handleProcessing, isProcessing]);

  useEffect(() => {
    if (isTimeOver) {
      handleStopRecording();
      setTimeOverModalIsOpen(true);
      setIsTimeOver(false);
    }
  }, [handleStopRecording, isTimeOver, setIsTimeOver]);

  return {
    media,
    isAllSuccess,
    connectStatus,
    isRecording,
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
    reloadMedia: () =>
      void startMedia({
        audioDeviceId: selectedDevice.audioInput?.deviceId,
        videoDeviceId: selectedDevice.video?.deviceId,
      }),
  };
};

export default useInterview;
