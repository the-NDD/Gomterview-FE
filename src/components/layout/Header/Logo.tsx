import logo from '@assets/images/logo.webp';
import { css } from '@emotion/react';
import Typography from '@foundation/Typography/Typography';
import { Link } from 'react-router-dom';
import { theme } from '@styles/theme';
import { PATH } from '@constants/path';
import { useErrorBoundary } from 'react-error-boundary';

const Logo: React.FC = () => {
  const { resetBoundary } = useErrorBoundary(); // 가정: 에러 바운더리 리셋 함수를 제공

  return (
    <Link
      to={PATH.ROOT}
      css={css`
        display: flex;
        justify-content: flex-start;
        align-items: center;
        column-gap: 1rem;
        text-decoration: none;
        cursor: pointer;
      `}
      onClick={() => {
        resetBoundary();
      }}
    >
      <img
        src={logo}
        alt={'곰돌이 로고'}
        width={40}
        height={40}
        css={css`
          width: 2.5rem;
          height: 2.5rem;
        `}
      />
      <Typography variant="title2" color={theme.colors.text.default}>
        곰터뷰
      </Typography>
    </Link>
  );
};

export default Logo;
