import { PropsWithChildren, useEffect } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';
import { runState, stepIndexState } from '@atoms/serviceTour';
import { useRecoilState } from 'recoil';
import { useLocation, useSearchParams } from 'react-router-dom';
import { videoSetting } from '@atoms/interviewSetting';
import { PATH, SETTING_PATH } from '@constants/path';
import { theme } from '@styles/theme';

const VideoSettingPageServiceTour: React.FC<PropsWithChildren> = () => {
  const [{ isRunning: isRunning }, setIsRunning] = useRecoilState(runState);
  const [{ stepIndex: stepIndex }, setStepIndex] =
    useRecoilState(stepIndexState);
  const { pathname: curPath } = useLocation();
  const [{ isSuccess }] = useRecoilState(videoSetting);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page');

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index } = data;
    if (index === 0 && action === 'next') {
      setStepIndex({ stepIndex: 1 });
    } else if (index === 1 && action === 'next' && isSuccess) {
      setStepIndex({ stepIndex: 2 });
    } else if (action === 'skip') {
      setIsRunning({ isRunning: false });
      localStorage.setItem('skipped', new Date().toISOString());
    }
  };

  useEffect(() => {
    if (
      isRunning &&
      curPath === PATH.INTERVIEW_SETTING &&
      currentPage === SETTING_PATH.CONNECTION
    ) {
      setStepIndex({ stepIndex: 0 });
    }
  }, [curPath, setStepIndex, isRunning, currentPage, setIsRunning]);

  useEffect(() => {
    if (isSuccess) {
      setStepIndex({ stepIndex: 2 });
    } else {
      setStepIndex({ stepIndex: 1 });
    }
  }, [isSuccess, setStepIndex]);

  const steps: Step[] = [
    {
      content: <h2>면접에 필요한 카메라와 마이크를 설정합니다😊</h2>,
      locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
      placement: 'center',
      disableOverlayClose: true,
      target: 'body',
    },
    {
      content: (
        <h2>
          카메라 연결이 되지 않았다면, 브라우저 설정에서 카메라 및 마이크 연결을
          확인해주세요😚
        </h2>
      ),
      disableBeacon: true,
      disableOverlayClose: true,
      placement: 'right',
      spotlightClicks: true,
      hideFooter: isSuccess ? false : true,
      hideBackButton: true,
      spotlightPadding: 100,
      target: '#virtual-step-target-1',
    },
    {
      content: (
        <h2>
          카메라 연결도 완료하셨군요🎉 <br />
          이제 면접을 시작해 봐요!😊
        </h2>
      ),
      disableBeacon: true,
      disableOverlayClose: true,
      hideFooter: true,
      placement: 'top',
      spotlightClicks: true,
      target: '#virtual-step-target-99',
    },
  ];

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      stepIndex={stepIndex}
      run={isRunning}
      showProgress
      showSkipButton
      steps={steps}
      styles={{
        buttonNext: {
          backgroundColor: `${theme.colors.point.primary.default}`,
          color: 'white',
        },
      }}
    />
  );
};

export default VideoSettingPageServiceTour;
