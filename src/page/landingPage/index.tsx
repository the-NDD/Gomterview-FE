import { ServiceTourStep, StartButton } from '@common/index';
import {
  GoogleLoginButton,
  LandingImage,
  LandingPageLayout,
  WelcomeBlurb,
} from '@components/landingPage';
import LandingPageServiceTour from '@components/landingPage/LadingPageServiceTour';
import { css } from '@emotion/react';

const LandingPage: React.FC = () => {

  return (
    <>
      <LandingPageLayout>
        <WelcomeBlurb />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 2rem;
          `}
        >
          <ServiceTourStep stepIndex={1}>
            <StartButton />
          </ServiceTourStep>
          <GoogleLoginButton />
        </div>
        <LandingImage />
      </LandingPageLayout>
      <LandingPageServiceTour />
    </>
  );
};

export default LandingPage;
