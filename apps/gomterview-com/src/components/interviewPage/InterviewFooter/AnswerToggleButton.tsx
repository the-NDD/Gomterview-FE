import { css } from '@emotion/react';
import { Tooltip } from 'gomterview-design-system';
import { Icon, Typography } from 'gomterview-design-system';
import { theme } from '@styles/theme';

type AnswerToggleButtonProps = {
  handleAnswerToggle: () => void;
};

const AnswerToggleButton: React.FC<AnswerToggleButtonProps> = ({
  handleAnswerToggle,
}) => {
  return (
    <Tooltip title="예시답변을 확인할 수 있습니다!" position="top">
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          gap: 0.75rem;
        `}
        onClick={handleAnswerToggle}
      >
        <Icon id="script" width="2rem" height="2rem" />
        <Typography variant={'body1'} color={theme.colors.text.white}>
          스크립트
        </Typography>
      </div>
    </Tooltip>
  );
};
export default AnswerToggleButton;
