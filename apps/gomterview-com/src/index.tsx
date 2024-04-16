import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import App from '@/App';
import * as Sentry from '@sentry/react';

async function deferRender() {
  if (import.meta.env.NODE_ENV !== 'development') {
    return;
  }
  const { worker } = await import('./mocks/browser.js');
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

//GA 추적 태그 설정
if (import.meta.env.VITE_APP_GTAG_ID) {
  ReactGA.initialize(import.meta.env.VITE_APP_GTAG_ID);
}

Sentry.init({
  dsn: import.meta.env.VITE_APP_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: [import.meta.env.VITE_APP_SENTRY_BASE_URL],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

Sentry.configureScope((scope) => {
  scope.setTag('environment', import.meta.env.NODE_ENV || 'development');
});

deferRender()
  .then(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      const root = ReactDOM.createRoot(rootElement);
      root.render(<App />);
    } else {
      console.error('Root element not found');
    }
    console.log(
      '     ヽ      |   |      /    /  \n' +
        '   ー       곰터뷰 최고!!!       ー\n' +
        '     /    /    |   |  ヽ    ヽ  \n' +
        "                    ;' ':;,       ,;'':;,\n" +
        "                  ;'   ':;,.,..,,,;'   ';,\n" +
        "                ,:'                 ::::::::､\n" +
        "              ,:'   /      ヽ      ::::::::',\n" +
        "              :'    ●      ●        ::::::::i.\n" +
        "              i ''' (_人__)  ''''   ::::::::::i\n" +
        '              :                      ::::::::i\n' +
        '               :,､                :::::::::: /\n' +
        "               ,:'         : ::::::::::::::､\n" +
        "             ,:'             : : :::::::::: :､"
    );
  })
  .catch((err) => {
    console.error('Failed to start mock gomterview-com worker', err);
  });
