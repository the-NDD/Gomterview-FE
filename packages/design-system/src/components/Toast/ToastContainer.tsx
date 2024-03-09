import { css } from '@emotion/react';
import { ToastPositionStyle } from '@/components/Toast/styles/Toast.styles';
import useToastContainer from '@/components/Toast/useToastContainer';
import ToastItem from '@/components/Toast/ToastItem/ToastItem';
import { theme } from '@/styles/theme';

export const ToastContainer = () => {
  const { getToastPositionGroupToRender } = useToastContainer();
  const positionGroup = getToastPositionGroupToRender();

  return Array.from(positionGroup).map(([position, toasts]) => (
    <div
      key={position}
      css={[
        css`
          position: fixed;
          display: flex;
          flex-direction: column;
          row-gap: 0.5rem;
          pointer-events: none;
          touch-action: none;
          z-index: ${theme.zIndex.toast.content};
          min-width: 20rem;
          max-width: 32rem;
          @media (max-width: ${theme.breakpoints.mobileL}) {
            left: 0.25rem;
            right: 0.25rem;
            min-width: auto;
            max-width: 100%;
          }
        `,
        ToastPositionStyle[position],
      ]}
    >
      {toasts.map((toastProps) => (
        <ToastItem key={toastProps.toastId} {...toastProps} />
      ))}
    </div>
  ));
};
