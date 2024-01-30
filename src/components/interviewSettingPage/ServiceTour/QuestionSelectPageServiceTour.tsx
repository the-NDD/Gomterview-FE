import { PropsWithChildren, useEffect } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';
import { runState, stepIndexState } from '@atoms/serviceTour';
import { useRecoilState } from 'recoil';
import { useLocation, useSearchParams } from 'react-router-dom';
import { questionSetting } from '@atoms/interviewSetting';
import { PATH, SETTING_PATH } from '@constants/path';
import { theme } from '@styles/theme';

const QuestionSelectPageServiceTour: React.FC<PropsWithChildren> = () => {
  const [{ isRunning: isRunning }, setInRunning] = useRecoilState(runState);
  const [{ stepIndex: stepIndex }, setStepIndex] =
    useRecoilState(stepIndexState);
  const { pathname: curPath } = useLocation();
  const [{ isSuccess }] = useRecoilState(questionSetting);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page');

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index } = data;
    if (index === 0 && action === 'next') {
      setStepIndex({ stepIndex: 1 });
    } else if (action === 'skip') {
      setInRunning({ isRunning: false });
      localStorage.setItem('skipped', new Date().toISOString());
    }
  };

  useEffect(() => {
    if (
      isRunning &&
      curPath === PATH.INTERVIEW_SETTING &&
      currentPage === SETTING_PATH.QUESTION
    ) {
      setStepIndex({ stepIndex: 0 });
    }
  }, [setInRunning, curPath, setStepIndex, isRunning, currentPage]);

  useEffect(() => {
    if (isSuccess) {
      setStepIndex({ stepIndex: 2 });
    }
  }, [isSuccess, setStepIndex]);

  const steps: Step[] = [
    {
      content: (
        <h2>
          면접 문제를 선택하는 페이지 입니다😊
          <br />
          로그인 하시면 다양한 문제를 직접 만들거나 다른 사람의 좋은 문제를
          가져올 수도 있어요!
        </h2>
      ),
      locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
      placement: 'center',
      disableOverlayClose: true,
      target: 'body',
    },
    {
      content: <h2>면접 문제를 선택해 주세요!</h2>,
      disableBeacon: true,
      disableOverlayClose: true,
      placement: 'bottom',
      hideFooter: true,
      spotlightClicks: true,
      target: '#virtual-step-target-0',
    },
    {
      content: <h2>카메라 및 마이크 연결 페이지로 이동하기</h2>,
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

export default QuestionSelectPageServiceTour;
