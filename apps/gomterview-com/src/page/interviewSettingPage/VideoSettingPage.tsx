import { videoSetting } from '@/atoms/interviewSetting';
import { theme } from '@/styles/theme';
import { Mirror, ServiceTourStep } from '@common/index';
import { RecordStatus } from '@components/interviewPage/InterviewHeader';
import { Description } from '@components/interviewSettingPage';
import { css } from '@emotion/react';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import InterviewSettingContentLayout from '@components/interviewSettingPage/InterviewSettingContentLayout';
import useMedia from '@hooks/useMedia';
import AudioSelectMenu from '@components/interviewSettingPage/VideoSettingPage/AudioSelectMenu';
import VideoSelectMenu from '@components/interviewSettingPage/VideoSettingPage/VideoSelectMenu';
import useDevice from '@hooks/useDevice';
import VideoSettingPageServiceTour from '@components/interviewSettingPage/ServiceTour/VideoSettingPageServiceTour';

type VideoSettingPageProps = {
  onNextClick?: () => void;
  onPrevClick?: () => void;
};

const VideoSettingPage: React.FC<VideoSettingPageProps> = ({
  onNextClick,
  onPrevClick,
}) => {
  const [videoSettingState, setVideoSettingState] =
    useRecoilState(videoSetting);

  const { connectStatus, media, startMedia } = useMedia();
  const { selectedDevice, updateDeviceList } = useDevice();

  const mirrorVideoRef = useRef<HTMLVideoElement>(null);

  /**
   * 페이지 첫 진입시에만 미디어를 시작해야 한다.
   */
  useEffect(() => {
    connectStatus === 'pending' &&
      void startMedia({
        audioDeviceId: selectedDevice.audioInput?.deviceId,
        videoDeviceId: selectedDevice.video?.deviceId,
      });
    void updateDeviceList();
  }, []);

  if (mirrorVideoRef.current) {
    mirrorVideoRef.current.srcObject = media;
  }

  useEffect(() => {
    setVideoSettingState({
      isSuccess: connectStatus === 'connect',
    });
  }, [connectStatus, setVideoSettingState]);

  return (
    <>
      <InterviewSettingContentLayout
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        disabledNext={!videoSettingState.isSuccess}
      >
        <Description title="문제 선택">
          - 면접 시작 전, 사용하시는 장치의 화면 및 소리가 정상적으로 연결되어
          있는지 확인해 주세요.
          <br />
          - 헤드셋이나 이어폰을 사용하시면 더욱 명료한 소리로 면접에 참여하실 수
          있습니다.
          <br />
          - 화면이나 소리에 문제가 있을 경우, 잠시 면접을 중단하시고 문제를
          해결한 뒤 이어나가 주세요.
          <br />- 기타 기술적인 문제나 화면 공유 문제가 있으시면, 채팅창이나
          연락처를 통해 알려주시길 바랍니다.
        </Description>
        <div
          css={css`
            position: relative;
          `}
        >
          <div
            css={css`
              position: absolute;
              top: 1rem;
              left: 1rem;
              z-index: ${theme.zIndex.contentOverlay.overlay5};
              padding: 0.5rem;
              border-radius: 0.5rem;
              background-color: ${theme.colors.shadow.modalShadow};
            `}
          >
            <RecordStatus isRecording={connectStatus === 'connect'} />
          </div>
          <ServiceTourStep stepIndex={1}>
            <Mirror
              mirrorVideoRef={mirrorVideoRef}
              connectStatus={connectStatus}
              reloadMedia={() =>
                void startMedia({
                  audioDeviceId: selectedDevice.audioInput?.deviceId,
                  videoDeviceId: selectedDevice.video?.deviceId,
                })
              }
              isSetting
            />
          </ServiceTourStep>
          <div
            css={css`
              display: flex;
              justify-content: center;
              gap: 1rem;
              margin: 2.5rem 0rem;
            `}
          >
            <AudioSelectMenu />
            <VideoSelectMenu />
          </div>
        </div>
      </InterviewSettingContentLayout>
      <VideoSettingPageServiceTour />
    </>
  );
};

export default VideoSettingPage;
