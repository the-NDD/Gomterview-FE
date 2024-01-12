import { NestedObjectKey } from '@/types/utils';
import { Theme } from '@emotion/react';
import { css, useTheme } from '@emotion/react';
import React from 'react';

const ChipMap = (theme: Theme) => {
  return {
    outlined: {
      primary: css`
        background-color: ${theme.colors.surface.default};
        border: 1px solid ${theme.colors.point.primary.default};
      `,
      secondary: css`
        background-color: ${theme.colors.surface.default};
        border: 1px solid ${theme.colors.point.secondary.default};
      `,
      tertiary: css`
        background-color: ${theme.colors.surface.default};
        border: 1px solid ${theme.colors.point.tertiary.default};
      `,
      error: css`
        background-color: ${theme.colors.surface.default};
        border: 1px solid ${theme.colors.point.error.default};
      `,
      warning: css`
        background-color: ${theme.colors.surface.default};
        border: 1px solid ${theme.colors.point.warning.default};
      `,
    },
    contained: {
      primary: css`
        background-color: ${theme.colors.point.primary.default};
        color: ${theme.colors.text.white};
      `,
      secondary: css`
        background-color: ${theme.colors.point.secondary.default};
        color: ${theme.colors.text.white};
      `,
      tertiary: css`
        background-color: ${theme.colors.point.tertiary.default};
        color: ${theme.colors.text.white};
      `,
      error: css`
        background-color: ${theme.colors.point.error.default};
        color: ${theme.colors.text.white};
      `,
      warning: css`
        background-color: ${theme.colors.point.warning.default};
        color: ${theme.colors.text.white};
      `,
    },
  } as const;
};

type ChipProps = {
  color?: NestedObjectKey<ReturnType<typeof ChipMap>>;
  variant?: keyof ReturnType<typeof ChipMap>;
  children: React.ReactNode;
};

const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'contained',
  color = 'primary' as const,
}) => {
  const theme = useTheme();

  return (
    <div
      css={[
        css`
          padding: 0.8rem;
          border-radius: 1rem;
        `,
        ChipMap(theme)[variant][color],
      ]}
    >
      {children}
    </div>
  );
};

export default Chip;
