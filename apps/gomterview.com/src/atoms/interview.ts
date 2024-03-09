import { atom } from 'recoil';

export const recordingState = atom<{
  isRecording: boolean;
}>({
  key: 'recordingState',
  default: {
    isRecording: false,
  },
});
