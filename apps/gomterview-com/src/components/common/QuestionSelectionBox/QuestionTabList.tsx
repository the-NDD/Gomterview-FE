import { SelectionBox, Tabs, Typography } from 'gomterview-design-system';
import { WorkbookTitleListResDto } from '@/types/workbook';
import { css } from '@emotion/react';
import { useSetRecoilState } from 'recoil';
import { questionSetting } from '@atoms/interviewSetting';

type QuestionTabListProps = {
  workbookListData: WorkbookTitleListResDto;
};
const QuestionTabList: React.FC<QuestionTabListProps> = ({
  workbookListData,
}) => {
  const setQuestionSetting = useSetRecoilState(questionSetting);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
      `}
    >
      {workbookListData.map((workbook, index) => (
        <Tabs.Tab value={index.toString()} key={workbook.workbookId}>
          <SelectionBox
            id={`workbook-${workbook.workbookId.toString()}`}
            name="workbook"
            onClick={() => {
              setQuestionSetting((pre) => ({
                ...pre,
                lastSelectedCategory: index.toString(),
              }));
            }}
          >
            <Typography variant="title4" noWrap component="p">
              {workbook.title}
            </Typography>
          </SelectionBox>
        </Tabs.Tab>
      ))}
    </div>
  );
};

export default QuestionTabList;
