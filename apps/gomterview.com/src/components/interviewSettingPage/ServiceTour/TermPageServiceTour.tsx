import { PropsWithChildren, useEffect } from 'react';
import Joyride, { Step } from 'react-joyride';
import { runState, stepIndexState } from '@atoms/serviceTour';
import { useRecoilState } from 'recoil';
import { useLocation, useSearchParams } from 'react-router-dom';
import { serviceTerms } from '@atoms/interviewSetting';
import { PATH, SETTING_PATH } from '@constants/path';

const TermPageServiceTour: React.FC<PropsWithChildren> = () => {
  const [{ isRunning: isRunning }, setInRunning] = useRecoilState(runState);
  const [{ stepIndex: stepIndex }, setStepIndex] =
    useRecoilState(stepIndexState);
  const { pathname: curPath } = useLocation();
  const [{ isSuccess }] = useRecoilState(serviceTerms);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page');

  useEffect(() => {
    if (
      isRunning &&
      curPath === PATH.INTERVIEW_SETTING &&
      currentPage === SETTING_PATH.TERMS
    ) {
      setStepIndex({ stepIndex: 0 });
    }
  }, [setInRunning, curPath, setStepIndex, isRunning, currentPage]);

  useEffect(() => {
    if (isSuccess) {
      setStepIndex({ stepIndex: 1 });
    }
  }, [isSuccess, setStepIndex]);

  const steps: Step[] = [
    {
      content: (
        <>
          <h1>서비스 이용안내</h1>
          곰터뷰 서비스를 사용하시며 저장된 영상들은 유저의 별도 설정으로
          인해서만 공개됩니다!
        </>
      ),
      disableBeacon: true,
      hideFooter: true,
      disableOverlayClose: true,
      placement: 'bottom',
      spotlightClicks: true,
      target: '#virtual-step-target-0',
    },
    {
      content: <h2>문제 설정 페이지로 이동하기</h2>,
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
      continuous
      hideCloseButton
      stepIndex={stepIndex}
      run={isRunning}
      showProgress
      showSkipButton
      hideBackButton
      steps={steps}
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
    />
  );
};

export default TermPageServiceTour;
