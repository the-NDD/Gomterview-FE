import { PropsWithChildren, useEffect } from 'react';
import useKakaoInAppBrowserDetect from '@hooks/useKakaoInAppBrowserDetect';
import { Button, Typography } from '@foundation/index';
import { css } from '@emotion/react';
import LandingBear from '@assets/images/landing-bear/landing-bear.webp';
import LandingBear480 from '@assets/images/landing-bear/landing-bear_g8bwr9_c_scale_w_480.webp';
import LandingBear734 from '@assets/images/landing-bear/landing-bear_g8bwr9_c_scale_w_734.webp';
import LandingBear980 from '@assets/images/landing-bear/landing-bear_g8bwr9_c_scale_w_980.webp';
import LandingBear1080 from '@assets/images/landing-bear/landing-bear_g8bwr9_c_scale_w_1080.webp';

const KakaoInAppBrowserDetect: React.FC<PropsWithChildren> = ({ children }) => {
  const { isKakaoInAppBrowser, moveOtherBrowser } =
    useKakaoInAppBrowserDetect();

  useEffect(() => {
    if (isKakaoInAppBrowser) moveOtherBrowser();
  }, [isKakaoInAppBrowser, moveOtherBrowser]);

  if (isKakaoInAppBrowser)
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        `}
      >
        <img
          loading="lazy"
          src={LandingBear}
          sizes="(max-width: 1080px) 100vw, 1080px"
          srcSet={`${LandingBear480} 480w, ${LandingBear734} 734w, ${LandingBear980} 980w ${LandingBear1080} 1080w`}
          alt={'노트북을 하는 곰돌이의 뒷모습'}
          width={480}
          height={480}
          css={css`
            height: 40vw;
            width: auto;
            min-height: 30rem;
          `}
        />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
        >
          <Typography variant="body3">
            현재 카카카오 인앱 브라우저로 접속하셨어요🥲
          </Typography>
          <Typography variant="body3">
            아쉽지만 곰터뷰는 카카오 브라우저에서 완벽한 서비스를 제공하지
            못하고 있어요😂
          </Typography>
          <Typography
            variant="body3"
            css={css`
              margin-bottom: 5rem;
            `}
          >
            아래의 버튼을 클릭하셔서 다른 브라우저에서 곰터뷰를 이용해주세요!
          </Typography>
        </div>
        <Button size="lg" onClick={moveOtherBrowser}>
          곰터뷰 열기
        </Button>
      </div>
    );
  else return <>{children}</>;
};

export default KakaoInAppBrowserDetect;
