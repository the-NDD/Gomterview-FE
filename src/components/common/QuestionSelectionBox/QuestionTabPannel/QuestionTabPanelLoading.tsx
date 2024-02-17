import LoadingBounce from '@common/Loading/LoadingBounce';
import { css } from '@emotion/react';

const QuestionTabPanelLoading = () => {
  return (
    <div
      css={css`
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
      `}
    >
      <LoadingBounce />
    </div>
  );
};

export default QuestionTabPanelLoading;
