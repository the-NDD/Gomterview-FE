import TabPanelItem from './QuestionTabPannel/QuestionTabPanelItem';
import { Box, Tabs } from 'gomterview-design-system';
import useWorkbookTitleListQuery from '@/entities/workbook/model/use-workbook-title-list-query';
import QuestionTabList from '@common/QuestionSelectionBox/QuestionTabList';
import WorkbookAddButton from '@common/QuestionSelectionBox/WorkbookAddButton';
import { theme } from '@gomterview/_theme';
import {
  QuestionSelectionBoxSidebarAreaDiv,
  QuestionSelectionBoxTabPanelAreaDiv,
} from '@common/QuestionSelectionBox/QuestionSelectionBox.styles';
import { css } from '@emotion/react';
import { Suspense, useState } from 'react';
import useBreakpoint from '@hooks/useBreakPoint';
import QuestionTabPanelLoading from './QuestionTabPannel/QuestionTabPanelLoading';
import { useRecoilValue } from 'recoil';
import { questionSetting } from '@atoms/interviewSetting';

const QuestionSelectionBox = () => {
  const isDeviceBreakpoint = useBreakpoint();

  const { data: workbookListData } = useWorkbookTitleListQuery();
  const { lastSelectedCategory } = useRecoilValue(questionSetting);

  const [isSidebarToggleOn, setIsSidebarToggleOn] = useState(true);

  if (!workbookListData) return null;
  console.log(workbookListData);
  return (
    <>
      <Box
        css={css`
          background-color: ${theme.colors.surface.inner};
          width: 100%;
          height: 40rem;
        `}
        data-testid="question-selection-box"
      >
        <Tabs
          css={css`
            display: flex;
            width: 100%;
            height: 100%;
            row-gap: 1.5rem;
          `}
          initialValue={lastSelectedCategory || '0'}
        >
          <QuestionSelectionBoxSidebarAreaDiv
            isSidebarToggleOn={isSidebarToggleOn}
            isTabletWidth={isDeviceBreakpoint('tablet')}
          >
            <WorkbookAddButton />
            <QuestionTabList workbookListData={workbookListData} />
          </QuestionSelectionBoxSidebarAreaDiv>
          <QuestionSelectionBoxTabPanelAreaDiv>
            {workbookListData.map((workbook, index) => (
              <Tabs.TabPanel
                key={`workbook.id-${workbook.workbookId}`}
                value={index.toString()}
                css={css`
                  height: 100%;
                `}
              >
                <Suspense fallback={<QuestionTabPanelLoading />}>
                  <TabPanelItem
                    workbook={workbook}
                    isSidebarOpen={
                      isSidebarToggleOn && isDeviceBreakpoint('tablet')
                    }
                    onSidebarToggleClick={() =>
                      setIsSidebarToggleOn((prev) => !prev)
                    }
                  />
                </Suspense>
              </Tabs.TabPanel>
            ))}
          </QuestionSelectionBoxTabPanelAreaDiv>
        </Tabs>
      </Box>
    </>
  );
};

export default QuestionSelectionBox;
