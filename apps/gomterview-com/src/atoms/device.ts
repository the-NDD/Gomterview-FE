import { getDevices } from '@/utils/media';
import { atom, selector } from 'recoil';

type Devices = {
  video: MediaDeviceInfo[];
  audioInput: MediaDeviceInfo[];
};

const asyncDevicesListEffect = ({
  setSelf,
}: {
  setSelf: (newValue: Devices | Promise<Devices>) => void;
}) => {
  const fetchData = async () => {
    const devices = await getDevices();
    setSelf(devices);
  };
  void fetchData();
};

export const deviceListState = atom<Devices>({
  key: 'deviceListState',
  default: { video: [], audioInput: [] },
  effects_UNSTABLE: [asyncDevicesListEffect],
});

// 선택한 index를 토대로 deviceListState에서 선택한 장치를 가져온다.
export const selectedDeviceState = selector<{
  video: MediaDeviceInfo | undefined;
  audioInput: MediaDeviceInfo | undefined;
}>({
  key: 'selectedDeviceState',
  get: ({ get }) => {
    const devices = get(deviceListState);
    const index = get(selectedDeviceIndexState);
    return {
      video: devices.video[index.video],
      audioInput: devices.audioInput[index.audioInput],
    };
  },
});

// 선택한 장치의 index를 저장한다.
export const selectedDeviceIndexState = atom<{
  video: number;
  audioInput: number;
}>({
  key: 'selectedDeviceIndexState',
  default: {
    video: 0,
    audioInput: 0,
  },
});
