import { css } from '@emotion/react';
import LandingBear from '@assets/images/landing-bear.png';

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
