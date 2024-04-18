import { theme } from '@styles/theme';
import { css } from '@emotion/react';
import { Tooltip } from 'gomterview-design-system';
import { Icon, Typography } from 'gomterview-design-system';

type InterviewExitButtonProps = {
  handleInterviewExit: () => void;
};

const InterviewExitButton: React.FC<InterviewExitButtonProps> = ({
  handleInterviewExit,
}) => {
  return (
    <Tooltip title="면접을 종료합니다" position="top">
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          gap: 0.75rem;
        `}
        onClick={handleInterviewExit}
      >
        <Icon id="close-circle" width="2rem" height="2rem" />
        <Typography variant={'body1'} color={theme.colors.text.white}>
          나가기
        </Typography>
      </div>
    </Tooltip>
  );
};
export default InterviewExitButton;
