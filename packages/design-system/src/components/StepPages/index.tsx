import enhanceChildElement from '../../utils/enhanceChildElement';
import { css } from '@emotion/react';
import Step from './Step';

type StepPageProps<T> = {
  page: T;
  children?: React.ReactNode;
};

const StepPage = <T,>({ page, children, ...args }: StepPageProps<T>) => {
  return (
    <div
      css={css`
        height: 100%;
      `}
      {...args}
    >
      {enhanceChildElement({
        children,
        component: Step<T>,
        newProps: {
          page,
        },
      })}
    </div>
  );
};

StepPage.step = Step;

export default StepPage;
