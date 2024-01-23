import { getDevices, getSupportedMimeTypes } from '@/utils/media';
import { atom, selector } from 'recoil';

const mediaConnectStatus = [
  'start', //스트림이 생성된 상태
  'connect', //스트림이 비디오에 연결된 상태
  'pending', //초기상태
  'fail', //위 과정중 어디선가 오류가 발생했을 때
] as const;
export type ConnectStatus = (typeof mediaConnectStatus)[number];

export const mediaState = atom<MediaStream | null>({
  key: 'mediaState',
  default: null,
});

export const connectStatusState = atom<ConnectStatus>({
  key: 'connectStatusState',
  default: 'pending',
});

export const selectedMimeTypeState = atom<string>({
  key: 'selectedMimeTypeState',
  default: getSupportedMimeTypes()[0],
});

// 사용자의 장치에 관한 전역 상태

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
export const selectedDeviceState = selector({
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
