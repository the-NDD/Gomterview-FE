import React from 'react';
import { css } from '@emotion/react';
import { Typography } from 'gomterview-design-system';
import { theme } from '@gomterview/_theme';

type LabelBoxProps = {
  children: React.ReactNode;
  labelName: string;
  labelColor?: string;
};

const LabelBox: React.FC<LabelBoxProps> = ({
  children,
  labelName,
  labelColor,
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 0.25rem;
      `}
    >
      <Typography
        component="label"
        variant="captionWeak"
        color={labelColor ?? theme.colors.text.subStrong}
        css={css`
          padding-left: 0.25rem;
        `}
      >
        {labelName}
      </Typography>
      {children}
    </div>
  );
};

export default LabelBox;
