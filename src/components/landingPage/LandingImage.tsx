import { css } from '@emotion/react';
import LandingBear from '@assets/images/landing-bear/landing-bear.webp';
import LandingBear480 from '@assets/images/landing-bear/landing-bear-w480.webp';
import LandingBear734 from '@assets/images/landing-bear/landing-bear-w734.webp';
import LandingBear980 from '@assets/images/landing-bear/landing-bear-w980.webp';
import LandingBear1080 from '@assets/images/landing-bear/landing-bear-w1080.webp';

const LandingImage: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        justify-self: end;
        align-self: end;
      `}
    >
      <img
        loading="lazy"
        src={LandingBear}
        sizes="(max-width: 1080px) 100vw, 1080px"
        srcSet={`${LandingBear480} 480w, ${LandingBear734} 734w, ${LandingBear980} 980w, ${LandingBear1080} 1080w`}
        alt={'노트북을 하는 곰돌이의 뒷모습'}
        width={480}
        height={480}
        css={css`
          height: 40vw;
          width: auto;
          min-height: 30rem;
        `}
      />
    </div>
  );
};

export default LandingImage;
