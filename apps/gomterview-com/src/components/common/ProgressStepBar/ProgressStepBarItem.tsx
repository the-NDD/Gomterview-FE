import { Typography } from 'gomterview-design-system';
import { theme } from '@gomterview/_theme';
import { HTMLElementTypes } from '@/types/utils';
import { css, keyframes } from '@emotion/react';

type ProgressStepBarItemProps = {
  name?: string;
  isCompleted?: boolean;
  isCurrent?: boolean;
} & HTMLElementTypes<HTMLDivElement>;

const blink = keyframes`
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.9;
  }
  100%{
    opacity: 0.3;
  }
`;

const ProgressStepBarItem: React.FC<ProgressStepBarItemProps> = ({
  name,
  isCompleted,
  isCurrent,
}) => {
  return (
    <div
      css={css`
        width: 100%;
        text-align: center;
      `}
    >
      <div
        css={css`
          height: 0.625rem;
          border-radius: 1.25rem;
          background-color: ${isCompleted || isCurrent
            ? theme.colors.point.primary.default
            : theme.colors.surface.weak};
          margin-bottom: 1rem;
          animation: ${isCurrent
            ? css`
                ${blink} 1s linear infinite
              `
            : 'none'};
        `}
      ></div>
      <Typography>{name}</Typography>
    </div>
  );
};

export default ProgressStepBarItem;
