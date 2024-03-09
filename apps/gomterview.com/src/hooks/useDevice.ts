import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { useCallback, useEffect } from 'react';
import { getDevices, getSupportedMimeTypes } from '@/utils/media';
import {
  deviceListState,
  selectedDeviceIndexState,
  selectedDeviceState,
} from '@atoms/device';
import useMedia from './useMedia';

/**
 * 전역적으로 사용자의 장치를 관리하는 hook
 * @description 디바이스가 새로 연결되었는지 감지하는 사이드 이팩트를 보유중입니다.
 *
 */
const useDevice = () => {
  const [deviceList, setDeviceList] = useRecoilState(deviceListState);
  const selectedDevice = useRecoilValue(selectedDeviceState);
  const { connectStatus } = useMedia();

  const setSelectedDeviceIndex = useSetRecoilState(selectedDeviceIndexState);

  const selectedMimeType = getSupportedMimeTypes()[0];

  const updateDeviceList = useCallback(async () => {
    const newDeviceList = await getDevices();
    setDeviceList(newDeviceList);
  }, [setDeviceList]);

  useEffect(() => {
    navigator.mediaDevices.addEventListener(
      'devicechange',
      () => void updateDeviceList()
    );

    void updateDeviceList();

    return () => {
      navigator.mediaDevices.removeEventListener(
        'devicechange',
        () => void updateDeviceList()
      );
    };
  }, [updateDeviceList, connectStatus]);

  return {
    selectedMimeType,
    deviceList,
    selectedDevice,
    setSelectedDeviceIndex,
    updateDeviceList,
  };
};

export default useDevice;
