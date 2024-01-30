import { PropsWithChildren, useEffect } from 'react';
import Joyride, { Step } from 'react-joyride';
import { runState, stepIndexState } from '@atoms/serviceTour';
import { useRecoilState } from 'recoil';
import { useLocation, useSearchParams } from 'react-router-dom';
import { recordSetting } from '@atoms/interviewSetting';
import { PATH, SETTING_PATH } from '@constants/path';

const RecordPageServiceTour: React.FC<PropsWithChildren> = () => {
  const [{ isRunning: isRunning }, setInRunning] = useRecoilState(runState);
  const [{ stepIndex: stepIndex }, setStepIndex] =
    useRecoilState(stepIndexState);
  const { pathname: curPath } = useLocation();
  const [{ isSuccess }] = useRecoilState(recordSetting);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page');
  useEffect(() => {
    if (
      isRunning &&
      curPath === PATH.INTERVIEW_SETTING &&
      currentPage === SETTING_PATH.RECORD
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
          <h1>로컬 저장 선택😚</h1>
          <div>별도의 서버가 아닌 컴퓨터에 면접영상을 저장합니다.</div>
          <div>하지만 로그인 하면 마이페이지에서 확인이 가능하다고...?!!</div>
        </>
      ),
      hideFooter: true,
      disableOverlayClose: true,
      placement: 'right',
      spotlightClicks: true,
      target: '#virtual-step-target-0',
    },
    {
      content: (
        <h2>
          설정하시느라 고생하셨어요😊
          <br /> 이제 면접을 시작해볼까요?!
        </h2>
      ),
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

export default RecordPageServiceTour;
