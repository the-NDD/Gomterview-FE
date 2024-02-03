import { css } from '@emotion/react';
import { Typography } from '@foundation/index';

const MyPageHeader: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <Typography variant="title1">마이페이지</Typography>
    </div>
  );
};
export default MyPageHeader;
