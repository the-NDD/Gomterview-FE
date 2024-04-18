import { css, keyframes } from '@emotion/react';
import { theme } from '@gomterview/_theme';
import React from 'react';
import { Typography } from '..';
import { positionStyles } from './Tooltip.styles';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const blink = keyframes`
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

type TooltipProps = {
  children: React.ReactNode;
  title: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean;
  blinkInterval?: number;
};

const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  position = 'top',
  disabled = false,
  blinkInterval,
}) => {
  const animationDuration = blinkInterval ? `${blinkInterval / 1000}s` : '0s';

  return (
    <div
      css={css`
        position: relative;
        &:hover > span:first-of-type {
          display: ${!disabled && 'block'};
          animation: ${fadeIn} 0.2s linear;
        }
      `}
    >
      <Typography
        variant="body3"
        noWrap
        css={[
          css`
            display: ${blinkInterval ? 'block' : 'none'};
            position: absolute;
            padding: 0.3rem 0.5rem;
            background-color: ${theme.colors.surface.tooltip};

            color: ${theme.colors.text.white};
            border-radius: 0.5rem;
            z-index: ${theme.zIndex.tooltip.content};
            animation: ${blink} ${animationDuration} infinite;
          `,
          positionStyles[position],
        ]}
      >
        {title}
      </Typography>
      {children}
    </div>
  );
};

export default Tooltip;
