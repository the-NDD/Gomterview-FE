import { atom } from 'recoil';

export const runState = atom<{
  isRunning: boolean;
}>({
  key: 'runState',
  default: {
    isRunning: false,
  },
});

export const stepIndexState = atom<{
  stepIndex: number;
}>({
  key: 'stepIndexState',
  default: {
    stepIndex: 0,
  },
});
