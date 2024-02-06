import { PropsWithChildren, useEffect } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';
import { runState, stepIndexState } from '@atoms/serviceTour';
import { useRecoilState } from 'recoil';
import { theme } from '@styles/theme';
import { recordingState } from '@atoms/interview';

const InterviewPageServiceTour: React.FC<PropsWithChildren> = () => {
  const [{ isRunning: isRunning }, setIsRunning] = useRecoilState(runState);
  const [{ stepIndex: stepIndex }, setStepIndex] =
    useRecoilState(stepIndexState);
  const [{ isRecording: isRecording }] = useRecoilState(recordingState);
  useEffect(() => {
    setStepIndex({ stepIndex: 0 });
  }, [setStepIndex]);

  useEffect(() => {
    if (stepIndex === 4 && isRecording) {
      setStepIndex({ stepIndex: 5 });
    } else if (!isRecording && stepIndex === 6) {
      setStepIndex({ stepIndex: 7 });
    }
  }, [isRecording, setStepIndex, stepIndex]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, type } = data;
    if (action === 'next' && index === 0 && type === 'step:after') {
      setStepIndex({ stepIndex: 1 });
    } else if (action === 'next' && index === 1 && type === 'step:after') {
      setStepIndex({ stepIndex: 2 });
    } else if (action === 'next' && index === 2 && type === 'step:after') {
      setStepIndex({ stepIndex: 3 });
    } else if (action === 'next' && index === 3 && type === 'step:after') {
      setStepIndex({ stepIndex: 4 });
    } else if (action === 'next' && index === 5 && type === 'step:after') {
      setStepIndex({ stepIndex: 6 });
    } else if (action === 'skip') {
      setIsRunning({ isRunning: false });
      localStorage.setItem('skipped', new Date().toISOString());
    }
  };

  const steps: Step[] = [
    {
      content: (
        <>
          <h1>곰터뷰 모의 면접 안내</h1>
          면접화면에서의 기능설명을 시작해 볼게요!🤗
          <br />
          <span style={{ color: 'gray' }}>(Space를 눌러보세요!)</span>
        </>
      ),
      locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
      placement: 'center',
      disableOverlayClose: true,

      target: 'body',
    },
    {
      content: <h2>면접 질문입니다! 잘 고민해서 대답해 주세요!</h2>,
      locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
      disableBeacon: true,
      disableOverlayClose: true,
      hideBackButton: true,
      placement: 'bottom',
      spotlightClicks: true,
      showSkipButton: false,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      target: '#virtual-step-target-1',
    },
    {
      content: (
        <h2>
          녹화 상태를 확인합니다!! <br /> 현재는 녹화준비 상태입니다
        </h2>
      ),
      locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
      disableBeacon: true,
      disableOverlayClose: true,
      hideBackButton: true,
      placement: 'bottom',
      showSkipButton: false,
      spotlightClicks: true,
      target: '#virtual-step-target-2',
    },
    {
      content: (
        <h2>
          현재 녹화 진행 시간을 안내합니다.
          <br /> 5분이상 소요되면 녹화는 종료됩니다!
        </h2>
      ),
      locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
      disableBeacon: true,
      disableOverlayClose: true,
      hideBackButton: true,
      placement: 'bottom',
      showSkipButton: false,
      spotlightClicks: true,
      target: '#virtual-step-target-3',
    },
    {
      content: (
        <h2>
          녹화를 시작하는 버튼입니다!
          <br /> 클릭해주세요! 혹은 space를 눌러주세요!
        </h2>
      ),
      locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
      disableBeacon: true,
      disableOverlayClose: true,
      placement: 'top',
      spotlightClicks: true,
      hideFooter: true,
      target: '#virtual-step-target-4',
    },
    {
      content: (
        <h2>
          녹화 상태를 확인합니다!! <br /> 현재는 녹화 중 입니다
        </h2>
      ),
      locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
      disableBeacon: true,
      disableOverlayClose: true,
      hideBackButton: true,
      showSkipButton: false,
      placement: 'bottom',
      target: '#virtual-step-target-2',
    },
    {
      content: (
        <h2>
          녹화를 종료하는 버튼입니다!
          <br /> 클릭해주세요! 혹은 space를 눌러주세요!
        </h2>
      ),
      locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
      disableBeacon: true,
      disableOverlayClose: true,
      placement: 'top',
      spotlightClicks: true,
      hideFooter: true,
      target: '#virtual-step-target-4',
    },
    {
      content: (
        <h2>
          면접이 모두 종료되었습니다🤗
          <br /> 튜토리얼을 함께 해주셔서 정말 감사합니다!
        </h2>
      ),
      locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
      disableBeacon: false,
      disableOverlayClose: true,
      placement: 'top',
      spotlightClicks: true,
      hideFooter: true,
      target: '#virtual-step-target-5',
    },
  ];

  return (
    <Joyride
      callback={handleJoyrideCallback}
      stepIndex={stepIndex}
      continuous
      hideCloseButton
      showSkipButton
      run={isRunning}
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

export default InterviewPageServiceTour;
