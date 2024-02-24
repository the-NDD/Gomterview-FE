import { Typography } from '@foundation/index';
import { css } from '@emotion/react';
import BlankBear from '@assets/images/blank-bear.webp';

const QuestionTabPanelBlank = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 1rem;
        width: 100%;
        height: 100%;
      `}
    >
      <img
        height="300"
        src={BlankBear}
        alt="박스 옆에서 손을 흔드는 곰"
        css={css`
          object-fit: contain;
        `}
      />
      <Typography
        variant="title3"
        css={css`
          margin-top: 0.8rem;
          text-align: center;
        `}
      >
        이런! 면접 질문이 하나도 없어요😥
      </Typography>
    </div>
  );
};

export default QuestionTabPanelBlank;
