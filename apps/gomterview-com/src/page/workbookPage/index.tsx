import { LoadingBounce } from '@common/index';
import { CenterLayout } from '@components/layout';
import {
  CategoryMenu,
  WorkbookList,
  WorkbookPageLayout,
} from '@components/workbookPage';
import { css } from '@emotion/react';

import { Typography } from 'gomterview-design-system';

import { Suspense, useState } from 'react';

const WorkbookPage: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const handleTabChange = (v: string) => {
    setSelectedCategoryId(v);
  };

  return (
    <WorkbookPageLayout>
      <Typography
        variant="title1"
        css={css`
          margin: 0 0.5rem;
        `}
      >
        공개된 면접 세트
      </Typography>
      <Suspense
        fallback={
          <CenterLayout>
            <LoadingBounce />
          </CenterLayout>
        }
      >
        <CategoryMenu onTabChange={handleTabChange} />
        <WorkbookList selectedCategoryId={selectedCategoryId} />
      </Suspense>
    </WorkbookPageLayout>
  );
};

export default WorkbookPage;
