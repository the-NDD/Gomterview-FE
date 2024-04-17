import { colors } from './_colors';
import { typography } from './_typography';
import { shadow } from './_shadow';
import { gradient } from './_gradient';
import { breakpoints } from './_breakpoints';
import { zIndex } from './_zIndex';

export const theme = {
  colors,
  typography,
  shadow,
  gradient,
  breakpoints,
  zIndex,
};
export type ThemeType = typeof theme;

/*
    useTheme를 통해 테마를 불러올 때 타입 자동완성을 위한 코드입니다.
 */
declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
