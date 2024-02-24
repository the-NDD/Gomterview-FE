import { atom } from 'recoil';

export const encodingState = atom<{
  isEncodingAllow: boolean;
}>({
  key: 'encodingState',
  default: {
    isEncodingAllow: false,
  },
});
