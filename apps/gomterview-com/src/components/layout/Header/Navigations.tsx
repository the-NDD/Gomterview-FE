import { css } from '@emotion/react';
import { MenuItem, Typography } from '@foundation/index';
import { theme } from '@styles/theme';
import { PATH } from '@constants/path';
import useUserInfo from '@hooks/useUserInfo';
import redirectToGoogleLogin from '@/utils/redirectToGoogleLogin';
import { Link, useLocation } from 'react-router-dom';
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

  const { resetBoundary } = useErrorBoundary();
  const location = useLocation();

  return (
    <>
      {navigationList.map(
        (item, index) =>
          item.visibility && (
            <Tooltip
              title={item.message}
              position="bottom"
              disabled={!item.message}
              key={item.path}
              blinkInterval={
                index === 0 && location.pathname === PATH.ROOT
                  ? 5000
                  : undefined
              }
              // 면접 영상 보러가기의 tooltip은 5초 간격으로 깜빡이도록 설정
              // TODO: 추후 분리할때 로직 변경 필요 현재는 index로 구분
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
