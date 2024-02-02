import { Header } from '@components/layout';
import Layout from '@components/layout/Layout';
import { css } from '@emotion/react';

type InterviewVideoListPageLayoutProps = {
  children: React.ReactNode;
};

const InterviewVideoListPageLayout: React.FC<
  InterviewVideoListPageLayoutProps
> = ({ children }) => {
  return (
    <div>
      <Header />
      <Layout
        direction="column"
        height="auto"
        css={css`
          align-items: center;
          padding: 1rem;
          row-gap: 1.5rem;
        `}
      >
        {children}
      </Layout>
    </div>
  );
};

export default InterviewVideoListPageLayout;
