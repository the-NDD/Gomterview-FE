import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  connectStatusState,
  deviceListState,
  mediaState,
  selectedDeviceIndexState,
  selectedDeviceState,
  selectedMimeTypeState,
} from '@atoms/media';
import { useCallback, useEffect } from 'react';
import { closeMedia, getDevices, getMedia } from '@/utils/media';
import useModal from '@hooks/useModal';
import { MediaDisconnectedModal } from '@components/interviewPage/InterviewModal';

/**
 * 전역적으로 사용자의 미디어를 관리하는 hook
 */
const useMedia = () => {
  const [media, setMedia] = useRecoilState(mediaState);
  const [connectStatus, setConnectStatus] = useRecoilState(connectStatusState);

  const [deviceList, setDeviceList] = useRecoilState(deviceListState);

  const selectedMimeType = useRecoilValue(selectedMimeTypeState);
  // TODO: 상태 제거
  /**
   * 2개의 global state로 선택된 device를 관리한다.
   */
  const selectedDevice = useRecoilValue(selectedDeviceState);
  const setSelectedDeviceIndex = useSetRecoilState(selectedDeviceIndexState);
  // element

  const { openModal: openErrorModal, closeModal } = useModal(() => {
    return <MediaDisconnectedModal closeModal={closeModal} />;
  });

  const updateDeviceList = useCallback(async () => {
    const newDeviceList = await getDevices();
    setDeviceList(newDeviceList);
  }, [setDeviceList]);

  const startMedia = useCallback(
    async ({
      audioDeviceId,
      videoDeviceId,
    }: {
      audioDeviceId?: string;
      videoDeviceId?: string;
    }) => {
      try {
        const newMedia = await getMedia({
          selectedAudio: audioDeviceId,
          selectedVideo: videoDeviceId,
        });
        setMedia(newMedia);
        setConnectStatus('connect');
      } catch (e) {
        setConnectStatus('fail');
        openErrorModal();
      }
    },
    [setMedia, setConnectStatus, openErrorModal]
  );

  const stopMedia = useCallback(() => {
    closeMedia(media);
    setMedia(null);
    setConnectStatus('pending');
  }, [media, setConnectStatus, setMedia]);
  /**
   * media가 연결되었을때 해당 videoStream track에 이벤트 리스너를 추가해 종료 여부를 감지하고 있는다.
   */
  useEffect(() => {
    if (!media) return;

    const checkTrackEnded = () => {
      setConnectStatus('fail');
    };

    const tracks = media.getTracks();
    tracks.forEach((track) => {
      track.addEventListener('ended', checkTrackEnded);
    });

    return () => {
      tracks.forEach((track) => {
        track.removeEventListener('ended', checkTrackEnded);
      });
    };
  }, [media, setConnectStatus]);

  /**
   * useMedia hook 호출시 사용자가 사용가능한 미디어 장치 목록과 미디어 장치 상태를 동기화 시킴
   */

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
  }, []);

  return {
    media,
    connectStatus,
    selectedMimeType,
    deviceList,
    selectedDevice,
    setSelectedDeviceIndex,
    updateDeviceList,
    startMedia,
    stopMedia,
  };
};

export default useMedia;
