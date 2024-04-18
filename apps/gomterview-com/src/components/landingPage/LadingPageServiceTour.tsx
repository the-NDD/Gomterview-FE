import { PropsWithChildren, useState } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';
import { runState } from '@atoms/serviceTour';
import { useRecoilState } from 'recoil';
import { theme } from '@gomterview/_theme';
import ServiceTourNoticeDialog from './ServiceTourNoticeDialog';

const LandingPageServiceTour: React.FC<PropsWithChildren> = () => {
  const [{ isRunning: isRunning }, setInRunning] = useRecoilState(runState);
  const [stepIndex, setStepIndex] = useState(0);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index } = data;
    if (index === 0 && action === 'next') {
      setStepIndex(1);
    } else if (action === 'skip') {
      setInRunning({ isRunning: false });
      localStorage.setItem('skipped', new Date().toISOString());
    }
  };

  const steps: Step[] = [
    {
      content: (
        <>
          <h1>곰터뷰 튜토리얼 안내🤗</h1>
          곰터뷰가 익숙하지 않으신 분들을 위해 준비한 <br /> 튜토리얼입니다!
          함께 떠나볼까요~!
        </>
      ),
      locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
      placement: 'center',
      disableOverlayClose: true,
      target: 'body',
    },
    {
      content: <h2>곰터뷰는 로그인하지 않고도 이용하실수 있어요😎</h2>,
      locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
      disableBeacon: true,
      disableOverlayClose: true,
      hideFooter: true,
      placement: 'right',
      spotlightClicks: true,
      spotlightPadding: 20,
      styles: {
        options: {
          zIndex: 10000,
        },
        spotlight: {
          borderRadius: 30,
        },
      },
      target: '#virtual-step-target-1',
    },
  ];

  return (
    <>
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        stepIndex={stepIndex}
        run={isRunning}
        showSkipButton
        steps={steps}
        styles={{
          buttonNext: {
            backgroundColor: `${theme.colors.point.primary.default}`,
            color: 'white',
          },
        }}
      />
      <ServiceTourNoticeDialog />
    </>
  );
};

export default LandingPageServiceTour;
