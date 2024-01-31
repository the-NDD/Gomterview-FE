import Layout from '@/components/layout/Layout';
import { Header } from '@components/layout';
import { css } from '@emotion/react';

type InterviewVideoPublicPageLayoutProps = {
  children: React.ReactNode;
};

const InterviewVideoPublicPageLayout: React.FC<
  InterviewVideoPublicPageLayoutProps
> = ({ children }) => {
  return (
    <div>
      <Header />
      <Layout
        direction="column"
        full
        height="auto"
        css={css`
          align-items: center;
          row-gap: 1rem;
          padding: 1rem;
        `}
      >
        {children}
      </Layout>
    </div>
  );
};

export default InterviewVideoPublicPageLayout;
