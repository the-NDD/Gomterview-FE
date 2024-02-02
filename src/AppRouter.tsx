import LandingPage from '@/page/LandingPage';
import InterviewSettingPage from '@page/interviewSettingPage';
import InterviewPage from '@page/interviewPage';
import MyPage from './page/myPage';
import InterviewVideoPage from './page/interviewVideoPage';
import { PATH } from '@constants/path';
import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import myPageLoader from '@routes/myPageLoader';
import LinkOnlyVideoPage from '@page/LinkOnlyVideoPage';
import InterviewVideoPublicLoader from '@routes/interviewVideoPublicLoader';
import rootLoader from '@routes/rootLoader';
import WorkbookDetailPage from '@page/WorkbookDetailPage';
import LoaderErrorPage from '@page/errorPage/Loader';
import interviewWorkbookDetailLoader from '@routes/interviewWorkbookDetailLoader';
import InterviewVideoListPage from '@page/InterviewVideoListPage';
import WorkbookPage from '@page/workbookPage';
import UnknownErrorBoundary from './UnknownErrorBoundary';
import APIErrorBoundary from './APIErrorBoundary';
import SomethingWrongErrorPage from '@page/errorPage/SomethingWrong';
import ModalProvider from './modalProvider';
import MediaStreamPage from '@page/mediaStreamPage';
import KakaoInAppBrowserDetect from './KakaoInAppBrowserDetect';

const AppRouter = ({ queryClient }: { queryClient: QueryClient }) => {
  const routes = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: (
        <KakaoInAppBrowserDetect>
          <UnknownErrorBoundary>
            <APIErrorBoundary>
              <Outlet />
              <ModalProvider />
            </APIErrorBoundary>
          </UnknownErrorBoundary>
        </KakaoInAppBrowserDetect>
      ),
      loader: () => rootLoader({ queryClient: queryClient }),
      errorElement: <LoaderErrorPage />,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: PATH.INTERVIEW,
          element: <MediaStreamPage />,
          children: [
            {
              index: true,
              element: <InterviewPage />,
            },
            {
              path: PATH.INTERVIEW_SETTING,
              element: <InterviewSettingPage />,
            },
          ],
        },
        {
          path: PATH.WORKBOOK,
          element: <WorkbookPage />,
        },
        {
          path: PATH.INTERVIEW_VIDEO_LIST,
          element: <InterviewVideoListPage />,
        },
        {
          path: PATH.MYPAGE,
          loader: () => myPageLoader({ queryClient: queryClient }),
          element: <MyPage />,
        },
        {
          path: PATH.INTERVIEW_VIDEO(), // 영상의 상세 페이지입니다. "나의" 영상인지를 떠나서 영상이면 모두 여기서 작성됩니다.
          element: <InterviewVideoPage />,
        },
        {
          path: PATH.INTERVIEW_VIDEO_PUBLIC(), // 링크 공개로 연결된 페이지 입니다.
          element: <LinkOnlyVideoPage />,
          loader: ({ params }) =>
            InterviewVideoPublicLoader({
              params: params,
              queryClient: queryClient,
            }),
        },
        {
          path: PATH.INTERVIEW_WORKBOOK_DETAIL(),
          element: <WorkbookDetailPage />,
          loader: ({ params }) => interviewWorkbookDetailLoader(params),
        },
        {
          path: '*',
          element: <SomethingWrongErrorPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default AppRouter;
