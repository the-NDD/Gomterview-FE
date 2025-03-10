import React, { ReactNode } from 'react';
import { HTMLElementTypes } from '../../types/utils';
import { css } from '@emotion/react';
import { Button } from '../../components/index';

type MenuItemProps = {
  children: ReactNode;
  visible?: boolean;
} & HTMLElementTypes<HTMLButtonElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  visible = true,
  ...args
}) => {
  if (!visible) return null;
  return (
    <li
      css={css`
        list-style: none;
      `}
      role="menuitem"
    >
      <Button
        variants="secondary"
        css={css`
          border: none;
          background-color: transparent;
        `}
        {...args}
      >
        {children}
      </Button>
    </li>
  );
};

export default MenuItem;
