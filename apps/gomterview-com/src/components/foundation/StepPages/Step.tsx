import { css } from '@emotion/react';

type StepProps<T> = {
  page: T;
  path: T;
  children: React.ReactNode;
};

const Step = <T,>({ page, children, path }: StepProps<T>) => {
  return (
    page === path && (
      <div
        css={css`
          height: 100%;
        `}
      >
        {children}
      </div>
    )
  );
};

export default Step;
