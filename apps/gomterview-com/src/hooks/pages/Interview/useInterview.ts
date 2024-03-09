import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { recordSetting } from '@/atoms/interviewSetting';
import {
  localDownloadWithMp4,
  localDownloadWithWebm,
  startRecording,
  stopRecording,
} from '@/utils/record';
import { useUploadToIDrive } from '@/hooks/useUploadToIdrive';
import useTimeTracker from '@/hooks/useTimeTracker';
import useInterviewFlow from '@hooks/pages/Interview/useInterviewFlow';
import useInterviewSettings from '@/hooks/atoms/useInterviewSettings';
import useMedia from '@hooks/useMedia';
import useDevice from '@hooks/useDevice';
import { recordingState } from '@atoms/interview';
import { encodingState } from '@atoms/encoding';

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
  const { uploadToIDriveWithMP4, uploadToIDriveWithWebm } = useUploadToIDrive();
  const { currentQuestion, getNextQuestion, isLastQuestion } =
    useInterviewFlow();

  const { media, connectStatus, startMedia } = useMedia();

  const { selectedMimeType, selectedDevice } = useDevice();

  const [{ isRecording: isRecording }, setIsRecording] =
    useRecoilState(recordingState);
  const { isEncodingAllow: isEncodingAllow } = useRecoilValue(encodingState);
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
        if (isEncodingAllow) {
          void uploadToIDriveWithMP4({ blob, currentQuestion, recordTime });
        } else {
          void uploadToIDriveWithWebm({ blob, currentQuestion, recordTime });
        }
        break;
      case 'local':
        if (isEncodingAllow) {
          void localDownloadWithMp4(blob, currentQuestion, recordTime);
        } else {
          void localDownloadWithWebm(blob, currentQuestion);
        }
        break;
    }

    setProcessQueue((prevQueue) => prevQueue.slice(1));
    setIsProcessing(false);
  }, [
    recordedBlobs,
    isProcessing,
    selectedMimeType,
    calculateDuration,
    method,
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
      setIsTimeOver(false);
      handleStopRecording();
      setTimeOverModalIsOpen(true);
    }
  }, [isTimeOver, setIsTimeOver]);

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
