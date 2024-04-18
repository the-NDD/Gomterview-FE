import { theme } from '@gomterview/_theme';
import { css } from '@emotion/react';

import { Icon, Tooltip, Typography } from 'gomterview-design-system';

type NextButtonProps = {
  handleNext: () => void;
};

const NextButton: React.FC<NextButtonProps> = ({ handleNext }) => {
  return (
    <Tooltip title="다음 질문으로 변경합니다" position="top">
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          gap: 0.75rem;
        `}
        onClick={handleNext}
      >
        <Icon id="next" width="2rem" height="2rem" />

        <Typography variant={'body1'} color={theme.colors.text.white}>
          다음질문
        </Typography>
      </div>
    </Tooltip>
  );
};
export default NextButton;
