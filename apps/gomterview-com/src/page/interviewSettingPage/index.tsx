import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { PATH, SETTING_PATH } from '@/constants/path';
import {
  questionSetting,
  recordSetting,
  serviceTerms,
  videoSetting,
} from '@/atoms/interviewSetting';
import { useRecoilState, useRecoilValue } from 'recoil';
import QuestionSettingPage from './QuestionSettingPage';
import { css } from '@emotion/react';
import RecordSettingPage from './RecordSettingPage';
import VideoSettingPage from './VideoSettingPage';
import { ProgressStepBar } from '@common/index';
import { StepPage } from 'gomterview-design-system';
import { InterviewSettingPageLayout } from '@components/interviewSettingPage';
import ServiceTermsPage from './ServiceTermsPage';
import { toast } from '@gomterview/toast';
import { encodingState } from '@atoms/encoding';
import { useEffect } from 'react';
import { canUseFFmpeg } from '@/utils/record';

const FIRST_PAGE_INDEX = 0;
const PREV_PAGE_INDEX = -1;

const InterviewSettingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [questionSettingState] = useRecoilState(questionSetting);
  const currentPage = searchParams.get('page');

  const [, setIsEncodingAllow] = useRecoilState(encodingState);
  useEffect(() => {
    void (async () => {
      const isEncodingAllow = await canUseFFmpeg();
      setIsEncodingAllow({ isEncodingAllow: isEncodingAllow });
    })();
  }, [setIsEncodingAllow]);

  const pageInfo = [
    {
      name: '약관 동의',
      path: SETTING_PATH.TERMS,
      page: (
        <ServiceTermsPage
          onPrevClick={() => navigate('/')}
          onNextClick={() => changeSearchParams(SETTING_PATH.QUESTION)}
        />
      ),
      state: useRecoilValue(serviceTerms),
    },
    {
      name: '문제 선택',
      path: SETTING_PATH.QUESTION,
      page: (
        <QuestionSettingPage
          onPrevClick={() => changeSearchParams(SETTING_PATH.TERMS)}
          onNextClick={() => changeSearchParams(SETTING_PATH.RECORD)}
        />
      ),
      state: useRecoilValue(questionSetting),
    },
    {
      name: '녹화 설정',
      path: SETTING_PATH.RECORD,
      page: (
        <RecordSettingPage
          onPrevClick={() => changeSearchParams(SETTING_PATH.QUESTION)}
          onNextClick={() => changeSearchParams(SETTING_PATH.CONNECTION)}
        />
      ),
      state: useRecoilValue(recordSetting),
    },
    {
      name: '화면과 소리설정',
      path: SETTING_PATH.CONNECTION,
      page: (
        <VideoSettingPage
          onPrevClick={() => {
            if (questionSettingState.from !== 'workbook')
              changeSearchParams(SETTING_PATH.RECORD);
            else {
              navigate(PATH.ROOT);
              toast.info('랜딩 페이지로 이동합니다.');
            }
          }}
          onNextClick={() => navigate(PATH.INTERVIEW)}
        />
      ),
      state: useRecoilValue(videoSetting),
    },
  ];

  const currentIndex = pageInfo.findIndex((item) => item.path === currentPage);

  const changeSearchParams = (newPage: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage);
    setSearchParams(newSearchParams, { replace: true });
  };

  const isValidatePath = currentIndex !== -1;
  if (!isValidatePath) {
    return <Navigate to={`?page=${SETTING_PATH.QUESTION}`} replace />;
  }

  const prevPageInfo =
    currentIndex === FIRST_PAGE_INDEX
      ? pageInfo[FIRST_PAGE_INDEX]
      : pageInfo[currentIndex + PREV_PAGE_INDEX];

  const isValidatePrevPageStatus =
    currentIndex !== FIRST_PAGE_INDEX && !prevPageInfo.state.isSuccess;

  if (isValidatePrevPageStatus) {
    return <Navigate to={`?page=${prevPageInfo.path}`} replace />;
  }

  return (
    <InterviewSettingPageLayout>
      <div
        css={css`
          width: 100%;
        `}
      >
        <ProgressStepBar>
          {pageInfo.map((item) => (
            <ProgressStepBar.Item
              key={item.name}
              name={item.name}
              isCurrent={currentPage === item.path}
              isCompleted={item.state.isSuccess}
            />
          ))}
        </ProgressStepBar>
      </div>
      <StepPage page={currentPage} data-testid={'setting-page-content'}>
        {pageInfo.map((item) => (
          <StepPage.step key={item.path} path={item.path} page={currentPage}>
            {item.page}
          </StepPage.step>
        ))}
      </StepPage>
    </InterviewSettingPageLayout>
  );
};

export default InterviewSettingPage;
