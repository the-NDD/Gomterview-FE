import React from 'react';
import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import { HTMLElementTypes } from '@/types/utils';

type InputAreaProps = HTMLElementTypes<HTMLTextAreaElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const InputArea: React.FC<InputAreaProps> = ({ ...args }) => {
  return (
    <textarea
      rows={6}
      css={css`
        padding: 1rem;
        border: 0.0625rem solid ${theme.colors.border.default};
        border-radius: 1rem;
        resize: none;
        width: 100%;
      `}
      {...args}
    />
  );
};

export default InputArea;
