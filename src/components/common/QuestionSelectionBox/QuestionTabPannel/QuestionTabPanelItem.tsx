import { questionSetting } from '@atoms/interviewSetting';
import { theme } from '@styles/theme';
import { css } from '@emotion/react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import useQuestionWorkbookQuery from '@hooks/apis/queries/useQuestionWorkbookQuery';
import { Button, Icon, Tabs, Toggle, Typography } from '@foundation/index';
import { WorkbookTitleListResDto } from '@/types/workbook';
import { ExcludeArray } from '@/types/utils';
import QuestionTabPanelHeader from '@common/QuestionSelectionBox/QuestionTabPannel/QuestionTabPanelHeader';
import useTabs from '@foundation/Tabs/useTabs';
import useBreakpoint from '@hooks/useBreakPoint';
import QuestionAccordionList from './QuestionAccordionList';
import EmptySuspense from '@foundation/EmptySuspense/EmptySuspense';
import QuestionTabPanelBlank from './QuestionTabPanelBlank';
import QuestionTabPanelEditHeader from './QuestionTabPanelEditHeader';
import useWorkbookQuery from '@hooks/apis/queries/useWorkbookQuery';

type TabPanelItemProps = {
  tabIndex: string;
  workbook: ExcludeArray<WorkbookTitleListResDto>;
  isSidebarOpen: boolean;
  onSidebarToggleClick: () => void;
};

const TabPanelItem: React.FC<TabPanelItemProps> = ({
  workbook,
  tabIndex,
  isSidebarOpen,
  onSidebarToggleClick,
}) => {
  const isDeviceBreakpoint = useBreakpoint();

  const settingPage = useRecoilValue(questionSetting);
  const selectedQuestions = settingPage.selectedData.filter(
    (question) => question.workbookId === workbook.workbookId
  );

  const { currentValue, setCurrentValue } = useTabs();
  const [onlySelectedOption, setOnlySelectedOption] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleShowSelectionOption = () => {
    setOnlySelectedOption((prev) => !prev);
  };

  const { data: questionAPIData } = useQuestionWorkbookQuery({
    workbookId: workbook.workbookId,
    enabled: currentValue === tabIndex,
  });

  const questionData = onlySelectedOption ? selectedQuestions : questionAPIData;

  const { data: workbookInfo } = useWorkbookQuery({
    workbookId: workbook.workbookId,
  });
  if (!workbookInfo) return null;
  return (
    <Tabs.TabPanel
      key={`workbook.id-${workbook.workbookId}`}
      value={tabIndex}
      css={css`
        height: 100%;
      `}
    >
      <div
        css={css`
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
        `}
      >
        {isEditMode ? (
          <QuestionTabPanelEditHeader
            workbookInfo={workbookInfo}
            closeEditMode={() => setIsEditMode(false)}
          />
        ) : (
          <QuestionTabPanelHeader
            workbookInfo={workbookInfo}
            onWorkbookDelete={() => setCurrentValue('0')}
            onEditButtonClick={() => setIsEditMode(true)}
          />
        )}

        <EmptySuspense callback={<QuestionTabPanelBlank />}>
          <QuestionAccordionList
            isEditMode={isEditMode}
            cancelEditMode={() => setIsEditMode(false)}
            questionData={questionData}
            workbookId={workbook.workbookId}
          />
        </EmptySuspense>
        {!isEditMode && (
          <div
            css={css`
              display: flex;
              justify-content: ${isDeviceBreakpoint('tablet')
                ? 'space-between'
                : 'flex-end'};
              align-items: center;
              column-gap: 0.5rem;
              padding: 1rem;
              border-radius: ${isSidebarOpen ? '0 0 1rem 1rem' : '0 0 1rem 0'};
              background-color: ${theme.colors.surface.default};
            `}
          >
            <Button
              variants="secondary"
              onClick={onSidebarToggleClick}
              visible={isDeviceBreakpoint('tablet')}
              css={css`
                bottom: 0.5rem;
                display: flex;
                align-items: center;
                border: none;
                border-radius: 1rem;
                padding: 0.5rem;
              `}
            >
              <Icon id="menu" width="24" height="24" />
            </Button>

            <div
              onClick={toggleShowSelectionOption}
              css={css`
                display: flex;
                flex-wrap: wrap;
                gap: 0.25rem;
                cursor: pointer;
              `}
            >
              <Toggle
                onClick={toggleShowSelectionOption}
                isToggled={onlySelectedOption}
              />
              {!isSidebarOpen && isDeviceBreakpoint('mobile') ? null : (
                <Typography variant="body3">선택된 질문만 보기</Typography>
              )}
            </div>
          </div>
        )}
      </div>
    </Tabs.TabPanel>
  );
};

export default TabPanelItem;
