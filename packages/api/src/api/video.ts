import { AxiosInstance } from 'axios';
import {
  CreateVideoRequestDto,
  MemberVideoResponseDto,
  PreSignedUrlResponseDto,
  RelatableVideoResponseDto,
  SingleVideoResponseDto,
  UpdateVideoIndexRequestDto,
  UpdateVideoRequestDto,
  VideoDetailResponseDto,
} from '../dto/dto';
import { getAPIResponseData } from '../utils/get-api-response-data';

export class VideoApi {
  private readonly instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  /**
   * @tags video
   * @summary 비디오 정보를 DB에 저장
   * @request POST:/api/video
   * @secure*/
  postVideo(data: CreateVideoRequestDto) {
    return getAPIResponseData<void, CreateVideoRequestDto>(this.instance, {
      method: 'post',
      url: `/api/video`,
      data,
    });
  }

  /**
   * @tags video
   * @summary Pre-Signed URL을 발급
   * @request POST:/api/video/pre-signed
   * @secure*/
  postVideoPreSigned() {
    return getAPIResponseData<PreSignedUrlResponseDto>(this.instance, {
      method: 'post',
      url: `/api/video/pre-signed`,
    });
  }

  /**
   * @tags video
   * @summary 자신의 모든 비디오 정보를 반환
   * @request GET:/api/video/all
   * @secure*/
  getVideoAll() {
    return getAPIResponseData<SingleVideoResponseDto[]>(this.instance, {
      method: 'get',
      url: `/api/video/all`,
    });
  }

  /**
   * @tags video
   * @summary 해시값으로 비디오 정보 불러오기
   * @request GET:/api/video/hash/{hash}*/
  getVideoHashByHash(hash: string) {
    return getAPIResponseData<VideoDetailResponseDto>(this.instance, {
      method: 'get',
      url: `/api/video/hash/${hash}`,
    });
  }

  /**
   * @tags video
   * @summary 연관영상으로 등록할 수 있는 모든 영상을 조회한다.
   * @request GET:/api/video/relate/{videoId}
   * @secure*/
  getVideoRelateByVideoId(videoId: number) {
    return getAPIResponseData<RelatableVideoResponseDto[]>(this.instance, {
      method: 'get',
      url: `/api/video/relate/${videoId}`,
    });
  }

  /**
   * @tags video
   * @summary 관계된 비디오 정보 조회
   * @request GET:/api/video/related/{videoId}
   * @secure*/
  getVideoRelatedByVideoId(videoId: number) {
    return getAPIResponseData<SingleVideoResponseDto[]>(this.instance, {
      method: 'get',
      url: `/api/video/related/${videoId}`,
    });
  }

  /**
   * @tags video
   * @summary 공개된 영상 조회
   * @request GET:/api/video/public*/
  getVideoPublic() {
    return getAPIResponseData<MemberVideoResponseDto[]>(this.instance, {
      method: 'get',
      url: `/api/video/public`,
    });
  }

  /**
   * @tags video
   * @summary 비디오 상세 정보를 반환
   * @request GET:/api/video/{videoId}
   * @secure*/
  getVideoByVideoId(videoId: number) {
    return getAPIResponseData<VideoDetailResponseDto>(this.instance, {
      method: 'get',
      url: `/api/video/${videoId}`,
    });
  }

  /**
   * @tags video
   * @summary 비디오 정보 수정(이름/공개여부/관계 영상/썸네일/답변 수정)
   * @request PATCH:/api/video/{videoId}
   * @secure*/
  patchVideoByVideoId(videoId: number, data: UpdateVideoRequestDto) {
    return getAPIResponseData<void, UpdateVideoRequestDto>(this.instance, {
      method: 'patch',
      url: `/api/video/${videoId}`,
      data,
    });
  }

  /**
   * @tags video
   * @summary 비디오 삭제
   * @request DELETE:/api/video/{videoId}
   * @secure*/
  deleteVideoByVideoId(videoId: number) {
    return getAPIResponseData<void>(this.instance, {
      method: 'delete',
      url: `/api/video/${videoId}`,
    });
  }

  /**
   * @tags video
   * @summary 비디오 순서 변경
   * @request PATCH:/api/video/index
   * @secure*/
  patchVideoIndex(data: UpdateVideoIndexRequestDto) {
    return getAPIResponseData<void, UpdateVideoIndexRequestDto>(this.instance, {
      method: 'patch',
      url: `/api/video/index`,
      data,
    });
  }
}
