import { theme } from '@styles/theme';
import { HTMLElementTypes } from '@/types/utils';
import { css } from '@emotion/react';
import React from 'react';
import logo from '@assets/images/logo.png';

type AvatarProps = {
  src?: string;
  width?: string;
  height?: string;
} & HTMLElementTypes<HTMLDivElement>;

const Avatar: React.FC<AvatarProps> = ({
  src,
  height = '7.5rem',
  width = '7.5rem',
  ...args
}) => {
  return (
    <div
      css={css`
        display: flex;
        width: ${width};
        height: ${height};
      `}
      {...args}
    >
      <img
        src={src}
        loading="lazy"
        onError={(e) => (e.currentTarget.src = `${logo}`)}
        crossOrigin="anonymous"
        css={css`
          border-radius: 50%;
          width: 100%;
          height: 100%;
          background-color: ${theme.colors.border.default};
          object-fit: cover;
          object-position: center;
        `}
      />
    </div>
  );
};

export default Avatar;
