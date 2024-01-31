import { css } from '@emotion/react';
import { HTMLElementTypes } from '@/types/utils';

type LayoutProps = {
  full?: boolean;
  direction: 'column' | 'row';
  children: React.ReactNode;
  height?: string;
} & HTMLElementTypes<HTMLDivElement>;

const Layout: React.FC<LayoutProps> = ({
  full = false,
  direction = 'row',
  children,
  height = '100vh',
  ...args
}) => {
  return (
    <main
      css={css`
        display: flex;
        flex-direction: ${direction};
        width: ${full ? '100%' : 'auto'};
        max-width: ${full ? 'none' : '46.875rem'};
        margin: 0 auto;
        height: ${height};
      `}
      {...args}
    >
      {children}
    </main>
  );
};

export default Layout;
