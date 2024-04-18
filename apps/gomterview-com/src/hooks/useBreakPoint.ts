import useWindowSize from './useWindowSize';
import { theme } from '@gomterview/_theme';

type Breakpoints = {
  [K in keyof typeof theme.breakpoints]: string;
};

const parseBreakpoint = (value: string) => parseInt(value, 10);

const useBreakpoint = () => {
  const { width } = useWindowSize();

  const isDeviceBreakpoint = (breakpoint: keyof Breakpoints) => {
    return width < parseBreakpoint(theme.breakpoints[breakpoint]);
  };

  return isDeviceBreakpoint;
};

export default useBreakpoint;
