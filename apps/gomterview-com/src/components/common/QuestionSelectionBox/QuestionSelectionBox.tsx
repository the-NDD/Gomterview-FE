import TabPanelItem from './QuestionTabPannel/QuestionTabPanelItem';
import { Box, Tabs } from '@foundation/index';
import useWorkbookTitleListQuery from '@hooks/apis/queries/useWorkbookTitleListQuery';
import QuestionTabList from '@common/QuestionSelectionBox/QuestionTabList';
import WorkbookAddButton from '@common/QuestionSelectionBox/WorkbookAddButton';
import { theme } from '@styles/theme';
import {
  QuestionSelectionBoxSidebarAreaDiv,
  QuestionSelectionBoxTabPanelAreaDiv,
} from '@common/QuestionSelectionBox/QuestionSelectionBox.styles';
import { css } from '@emotion/react';
import { Suspense, useState } from 'react';
import useBreakpoint from '@hooks/useBreakPoint';
import QuestionTabPanelLoading from './QuestionTabPannel/QuestionTabPanelLoading';

const QuestionSelectionBox = () => {
  const isDeviceBreakpoint = useBreakpoint();

  const { data: workbookListData } = useWorkbookTitleListQuery();

  const [isSidebarToggleOn, setIsSidebarToggleOn] = useState(true);

  if (!workbookListData) return null;
  return (
    <>
      <Box
        css={css`
          background-color: ${theme.colors.surface.inner};
          width: 100%;
          height: 40rem;
        `}
      >
        <Tabs
          css={css`
            display: flex;
            width: 100%;
            height: 100%;
            row-gap: 1.5rem;
          `}
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
