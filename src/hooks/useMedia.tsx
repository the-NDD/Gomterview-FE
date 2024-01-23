import { useRecoilState } from 'recoil';
import { connectStatusState, mediaState } from '@atoms/media';
import { useCallback, useEffect } from 'react';
import { closeMedia, getMedia } from '@/utils/media';
import useModal from '@hooks/useModal';
import { MediaDisconnectedModal } from '@components/interviewPage/InterviewModal';

/**
 * 전역적으로 사용자의 미디어를 관리하는 hook
 * @description media stream에서 연결이 중단되었는지 감지하는 사이드 이팩트를 보유중입니다.
 */
const useMedia = () => {
  const [media, setMedia] = useRecoilState(mediaState);
  const [connectStatus, setConnectStatus] = useRecoilState(connectStatusState);

  const { openModal: openErrorModal, closeModal } = useModal(() => {
    return <MediaDisconnectedModal closeModal={closeModal} />;
  });

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

  return {
    media,
    connectStatus,
    startMedia,
    stopMedia,
  };
};

export default useMedia;
