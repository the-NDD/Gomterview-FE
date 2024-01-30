import { Box, Button, Icon, Typography } from '@foundation/index';
import { css, keyframes } from '@emotion/react';
import { theme } from '@styles/theme';
import { useEffect, useState } from 'react';
import { runState } from '@atoms/serviceTour';
import { useRecoilState } from 'recoil';

const ShowDialog = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const ServiceTourNoticeDialog = () => {
  const [visible, setVisible] = useState(false);
  const [{ isRunning: isRunning }, setInRunning] = useRecoilState(runState);

  useEffect(() => {
    if (!isRunning) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isRunning]);

  if (!visible) return null;
  return (
    <Box
      css={css`
        position: fixed;
        left: 1rem;
        bottom: 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        row-gap: 0.5rem;
        margin-right: 30rem;
        padding: 0.5rem;
        width: 15rem;
        height: auto;

        background-color: ${theme.colors.surface.default};
        z-index: ${theme.zIndex.contentOverlay.overlay5};
        animation: 1s cubic-bezier(0.5, 1.5, 0.5, 1) 0s 1 ${ShowDialog};
      `}
    >
      <Button
        variants="secondary"
        size="sm"
        onClick={() => setVisible(false)}
        css={css`
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          display: flex;
          border: none;
          z-index: ${theme.zIndex.contentOverlay.overlay5};
        `}
      >
        <Icon id="close-black" />
      </Button>
      <div
        css={css`
          width: 100%;
        `}
      >
        <Typography variant="body1">
          <br />
          아직 곰터뷰가 어려우신가요😂
          <br />
          튜토리얼을 통해서 곰터뷰에 <br />
          익숙해지는건 어떨까요?
        </Typography>
      </div>
      <Button size="sm" onClick={() => setInRunning({ isRunning: true })}>
        튜토리얼 시작하기
      </Button>
    </Box>
  );
};

export default ServiceTourNoticeDialog;
