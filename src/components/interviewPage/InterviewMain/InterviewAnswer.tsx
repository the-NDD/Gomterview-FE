import { css } from '@emotion/react';
import { theme } from '@styles/theme';

import { Typography } from '@foundation/index';
import { Resizable } from 're-resizable';

type InterviewAnswerProps = {
  answer: string;
};
const InterviewAnswer: React.FC<InterviewAnswerProps> = ({ answer }) => {
  return (
    <div
      css={css`
        position: absolute;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        width: 62.5rem;

        @media (max-width: ${theme.breakpoints.laptop}) {
          max-width: ${theme.breakpoints.laptop};
          width: 80%;
        }

        @media (max-width: ${theme.breakpoints.mobileL}) {
          max-width: ${theme.breakpoints.mobileL};
          width: 90%;
          height: 14rem;
        }
      `}
    >
      <Resizable
        defaultSize={{
          width: '100%',
          height: '160px',
        }}
        css={css`
          display: flex;
          justify-content: center;
          z-index: ${theme.zIndex.contentOverlay.overlay5};
          background-color: ${theme.colors.surface.black100};
          color: ${theme.colors.text.white};
          opacity: 60%;
          border-radius: 2rem;

          border-top: 5px solid transparent; // 초기 border-top 스타일 설정
          transition: border-top 0.3s ease-in-out; // transition 추가
          border-radius: 2rem;
          &:hover {
            border-top: 5px solid ${theme.colors.point.primary.default}; // 마우스 오버 시 border-top 스타일 변경
          }

          padding: 1.25rem;
          height: 100%;
          overflow-y: auto;
        `}
      >
        <Typography>{answer}</Typography>
      </Resizable>
    </div>
  );
};
export default InterviewAnswer;
