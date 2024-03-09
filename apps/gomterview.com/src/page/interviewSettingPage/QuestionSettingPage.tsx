import { questionSetting } from '@/atoms/interviewSetting';
import { QuestionSelectionBox } from '@common/index';
import { useRecoilValue } from 'recoil';
import InterviewSettingContentLayout from '@components/interviewSettingPage/InterviewSettingContentLayout';
import NoticeDialog from '@common/QuestionSelectionBox/NoticeDialog/NoticeDialog';
import { QuestionSelectPageServiceTour } from '@components/interviewSettingPage';

type QuestionSettingPageProps = {
  onNextClick?: () => void;
  onPrevClick?: () => void;
};

const QuestionSettingPage: React.FC<QuestionSettingPageProps> = ({
  onNextClick,
  onPrevClick,
}) => {
  const setting = useRecoilValue(questionSetting);

  return (
    <>
      <NoticeDialog />
      <InterviewSettingContentLayout
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        disabledNext={!setting.isSuccess}
      >
        <QuestionSelectionBox />
      </InterviewSettingContentLayout>
      <QuestionSelectPageServiceTour />
    </>
  );
};

export default QuestionSettingPage;
