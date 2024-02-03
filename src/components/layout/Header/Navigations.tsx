import { css } from '@emotion/react';
import { MenuItem, Typography } from '@foundation/index';
import { theme } from '@styles/theme';
import { PATH } from '@constants/path';
import useUserInfo from '@hooks/useUserInfo';
import redirectToGoogleLogin from '@/utils/redirectToGoogleLogin';
import { Link } from 'react-router-dom';
import { Tooltip } from '@foundation/index';
import { useErrorBoundary } from 'react-error-boundary';

const Navigations: React.FC = () => {
  const isLogin = useUserInfo();

  const navigationList = [
    {
      path: PATH.INTERVIEW_VIDEO_LIST,
      text: '면접 영상 보러가기',
      visibility: true,
      message: '다른 사람들의 다양한 영상들을 구경해보세요😊',
    },
    {
      path: PATH.WORKBOOK,
      text: '면접 세트 보러가기',
      visibility: true,
      message: '다른 사람들의 다양한 질문들을 구경해보세요😊',
    },
    {
      path: PATH.INTERVIEW_SETTING,
      text: '면접 연습 시작하기',
      visibility: true,
      message: '원하는 질문을 선택해 면접 연습을 시작해보세요!',
    },
    {
      path: PATH.MYPAGE,
      text: '마이페이지',
      visibility: isLogin,
      message: '',
    },
  ];

  const { resetBoundary } = useErrorBoundary(); // 가정: 에러 바운더리 리셋 함수를 제공

  return (
    <>
      {navigationList.map(
        (item) =>
          item.visibility && (
            <Tooltip
              title={item.message}
              position="bottom"
              disabled={!item.message}
              key={item.path}
            >
              <Link
                to={item.path}
                css={css`
                  text-decoration: none;
                `}
                onClick={() => {
                  resetBoundary();
                }}
              >
                <MenuItem>
                  <Typography
                    variant="body1"
                    color={theme.colors.text.subStrong}
                  >
                    {item.text}
                  </Typography>
                </MenuItem>
              </Link>
            </Tooltip>
          )
      )}
      {!isLogin && (
        <MenuItem
          onClick={() => {
            resetBoundary();
            void redirectToGoogleLogin();
          }}
        >
          <Typography variant="body1" color={theme.colors.text.subStrong}>
            로그인
          </Typography>
        </MenuItem>
      )}
    </>
  );
};

export default Navigations;
