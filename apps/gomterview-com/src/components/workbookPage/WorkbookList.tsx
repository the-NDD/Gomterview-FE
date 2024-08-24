import { css } from '@emotion/react';
import useBreakpoint from '@hooks/useBreakPoint';
import Workbook from './Workbook';
import GridWorkbookList from './GridWorkbookList';
import { useSuspenseGetWorkbookQuery } from '@/entities/workbook/api/queries';

type WorkbookListProps = {
  selectedCategoryId: string;
};

const WorkbookList: React.FC<WorkbookListProps> = ({ selectedCategoryId }) => {
  const isDeviceBreakpoint = useBreakpoint();
  const { data: workbookList } = useSuspenseGetWorkbookQuery({
    category: selectedCategoryId ? Number(selectedCategoryId) : null,
  });

  return (
    <ul className="workbook-list">
      {isDeviceBreakpoint('tablet') ? (
        <div
          css={css`
            display: grid;
            row-gap: 20px;
          `}
        >
          {workbookList.map((workbook) => (
            <Workbook
              key={workbook.workbookId}
              nickname={workbook.nickname}
              profileImg={workbook.profileImg}
              copyCount={workbook.copyCount}
              title={workbook.title}
              content={workbook.content}
              workbookId={workbook.workbookId}
            />
          ))}
        </div>
      ) : (
        <GridWorkbookList workbookList={workbookList} />
      )}
    </ul>
  );
};

export default WorkbookList;
