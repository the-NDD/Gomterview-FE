import { API } from '@constants/api';
import { http, HttpResponse } from 'msw';
import videoData from '../../data/video.json';

const videoHandlers = [
  http.post(API.VIDEO, ({ request }) => {
    return HttpResponse.json({}, { status: 201 });
  }),
  http.post(API.VIDEO_PRE_SIGNED, ({ request }) => {
    return HttpResponse.json(
      {
        preSignedUrl:
          'https://videos.k4i7.la.idrivee2-20.com/%EB%A3%A8%EC%9D%B4%EB%B7%94%ED%86%B5%ED%86%B5%ED%8A%80%EA%B8%B0%EB%84%A4_%EC%82%AD%EC%A0%9C%EB%90%9C%20%EC%A7%88%EB%AC%B8_754ad469-a5e7-48a2-b6bd-61430219c831.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=9li5IlcqRaLakjxoO16x%2F20231114%2Fe2%2Fs3%2Faws4_request&X-Amz-Date=20231114T060953Z&X-Amz-Expires=100&X-Amz-Signature=48691d27634299f2ad74ae7812b49e2bd88a0f8ab677b6b19ba0fc3921b08d24&X-Amz-SignedHeaders=host',
        key: 'Idrive에 등록될 파일 이름입니다.',
      },
      { status: 201 }
    );
  }),
  http.get(API.VIDEO_ALL, () => {
    return HttpResponse.json(videoData, { status: 200 });
  }),
  http.get(API.VIDEO_ID(), ({ params }) => {
    return HttpResponse.json(
      {
        message: '해당 비디오에 접근 권한이 없습니다.',
        errorCode: 'V02',
      },
      { status: 403 }
    );
  }),
  http.get(API.VIDEO_HASH(), () => {
    return HttpResponse.json(
      {
        message: '해당 비디오에 접근 권한이 없습니다.',
        errorCode: 'V02',
      },
      { status: 403 }
    );
  }),
  http.patch(API.VIDEO_ID(), () => {
    return HttpResponse.json(
      {
        message: '해당 비디오에 접근 권한이 없습니다.',
        errorCode: 'V02',
      },
      { status: 403 }
    );
  }),
  http.delete(API.VIDEO_ID(), () => {
    return HttpResponse.json(
      {
        message: '해당 비디오에 접근 권한이 없습니다.',
        errorCode: 'V02',
      },
      { status: 403 }
    );
  }),
];

export default videoHandlers;
