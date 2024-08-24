import { theme } from '@gomterview/_theme';
import { css } from '@emotion/react';
import { Avatar, Box, Typography } from 'gomterview-design-system';
import { AnswerResponseDto } from '@gomterview/api';

type AnswerScriptProps = {
  answer: AnswerResponseDto;
  onClick: () => void;
};

const AnswerScript: React.FC<AnswerScriptProps> = ({ answer, onClick }) => {
  return (
    <Box
      onClick={onClick}
      css={css`
        cursor: pointer;
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 0.5rem;
          align-items: center;
          padding: 0.6rem;
          background-color: ${theme.colors.point.secondary.default};
          color: ${theme.colors.text.white};
          border-radius: 1rem 1rem 0 0;
        `}
      >
        <Avatar width="1.5rem" height="1.5rem" src={answer.profileImg} />
        <Typography>{answer.memberName}</Typography>
      </div>
      <Typography
        component="p"
        css={css`
          padding: 0.7rem;
        `}
      >
        {answer.content}
      </Typography>
    </Box>
  );
};

export default AnswerScript;
