import { FC, ReactNode } from 'react';
import { css, Interpolation, Theme } from '@emotion/react';
import { HTMLElementTypes } from '../../types/utils';

type AccordionSummaryProps = {
  children: ReactNode;
  expanded?: boolean;
  defaultStyle?: Interpolation<Theme>;
  expandedStyle?: Interpolation<Theme>;
} & HTMLElementTypes<HTMLButtonElement>;
export const AccordionSummary: FC<AccordionSummaryProps> = ({
  children,
  expanded,
  defaultStyle,
  expandedStyle,
  ...args
}) => {
  const optionalStyle =
    expanded && expandedStyle ? expandedStyle : defaultStyle;

  return (
    <button
      css={[
        css`
          display: flex;
          padding: 1rem;
          border-radius: ${expanded ? '0.625rem 0.625rem 0 0' : '0.625rem'};
          border: none;
          cursor: pointer;
        `,
        optionalStyle,
      ]}
      {...args}
    >
      {children}
    </button>
  );
};
