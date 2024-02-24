import { ServiceTourStep, StartButton } from '@common/index';
import {
  GoogleLoginButton,
  LandingImage,
  LandingPageLayout,
  WelcomeBlurb,
} from '@components/landingPage';
import LandingPageServiceTour from '@components/landingPage/LadingPageServiceTour';
import { css } from '@emotion/react';
import { useLoaderData } from 'react-router-dom';
import { encodingState } from '@atoms/encoding';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';

const LandingPage: React.FC = () => {
  const { isEncodingAllow } = useLoaderData() as { isEncodingAllow: boolean };
  const [, setIsEncodingAllow] = useRecoilState(encodingState);
  useEffect(() => {
    setIsEncodingAllow({ isEncodingAllow: isEncodingAllow });
  }, [isEncodingAllow, setIsEncodingAllow]);
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
