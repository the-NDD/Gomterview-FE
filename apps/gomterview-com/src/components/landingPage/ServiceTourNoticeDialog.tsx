import { Box, Button, Typography } from '@foundation/index';
import { css, keyframes } from '@emotion/react';
import { theme } from '@styles/theme';
import { runState } from '@atoms/serviceTour';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

const showDialogAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const hideDialogAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(110%);
  }
`;

const ServiceTourNoticeDialog = () => {
  const [{ isRunning }, setInRunning] = useRecoilState(runState);
  const [visible, setVisible] = useState(!isRunning);

  useEffect(() => {
    if (!isRunning) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isRunning]);

  return (
    <Box
      css={css`
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        display: ${isRunning ? 'none' : 'flex'};
        flex-direction: column;
        row-gap: 0.8rem;
        padding: 1rem;
        width: 15rem;
        height: auto;

        background-color: ${theme.colors.surface.default};
        z-index: ${theme.zIndex.contentOverlay.overlay5};

        animation: 1s cubic-bezier(0.4, 0, 0.2, 1) 0s 1
          ${visible ? showDialogAnimation : hideDialogAnimation};
        animation-fill-mode: forwards;
      `}
    >
      <Typography variant="body1">
        아직 곰터뷰가 어려우신가요😂
        <br />
        튜토리얼을 통해서 곰터뷰에 <br />
        익숙해지는건 어떨까요?
      </Typography>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          white-space: nowrap;
        `}
      >
        <Button
          size="sm"
          variants="secondary"
          onClick={() => setVisible(false)}
        >
          닫기
        </Button>
        <Button size="sm" onClick={() => setInRunning({ isRunning: true })}>
          튜토리얼 시작하기
        </Button>
      </div>
    </Box>
  );
};

export default ServiceTourNoticeDialog;
