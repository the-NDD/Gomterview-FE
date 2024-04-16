import dayjs from 'dayjs';
import { atom } from 'recoil';

export const runState = atom<{
  isRunning: boolean;
}>({
  key: 'runState',
  default: {
    isRunning: (() => {
      const skipped = localStorage.getItem('skipped');
      if (!skipped) {
        return true;
      }
      return dayjs(skipped).isAfter(dayjs());
    })(),
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
