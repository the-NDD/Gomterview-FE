import { Global, ThemeProvider } from '@emotion/react';
import { theme } from '@gomterview/_theme';
import _global from '@gomterview/_theme/global';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import GlobalSVGProvider from '@/GlobalSvgProvider';
import AppRouter from '@/AppRouter';
import { ToastContainer } from '@gomterview/toast/toastContainer';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        throwOnError: true,
      },
      mutations: {
        retry: 1,
        throwOnError: true,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Global styles={_global} />
          <AppRouter queryClient={queryClient} />
          <GlobalSVGProvider />
          <ToastContainer />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
