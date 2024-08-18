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

export class Video {
  private readonly instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  postVideo(data: CreateVideoRequestDto) {
    return getAPIResponseData<void, CreateVideoRequestDto>(this.instance, {
      method: 'post',
      url: `/api/video`,
      data,
    });
  }

  postVideoPreSigned() {
    return getAPIResponseData<PreSignedUrlResponseDto>(this.instance, {
      method: 'post',
      url: `/api/video/pre-signed`,
    });
  }

  getVideoAll() {
    return getAPIResponseData<SingleVideoResponseDto[]>(this.instance, {
      method: 'get',
      url: `/api/video/all`,
    });
  }

  getVideoHashByHash(hash: string) {
    return getAPIResponseData<VideoDetailResponseDto>(this.instance, {
      method: 'get',
      url: `/api/video/hash/${hash}`,
    });
  }

  getVideoRelateByVideoId(videoId: number) {
    return getAPIResponseData<RelatableVideoResponseDto[]>(this.instance, {
      method: 'get',
      url: `/api/video/relate/${videoId}`,
    });
  }

  getVideoRelatedByVideoId(videoId: number) {
    return getAPIResponseData<SingleVideoResponseDto[]>(this.instance, {
      method: 'get',
      url: `/api/video/related/${videoId}`,
    });
  }

  getVideoPublic() {
    return getAPIResponseData<MemberVideoResponseDto[]>(this.instance, {
      method: 'get',
      url: `/api/video/public`,
    });
  }

  getVideoByVideoId(videoId: number) {
    return getAPIResponseData<VideoDetailResponseDto>(this.instance, {
      method: 'get',
      url: `/api/video/${videoId}`,
    });
  }

  patchVideoByVideoId(videoId: number, data: UpdateVideoRequestDto) {
    return getAPIResponseData<void, UpdateVideoRequestDto>(this.instance, {
      method: 'patch',
      url: `/api/video/${videoId}`,
      data,
    });
  }

  deleteVideoByVideoId(videoId: number) {
    return getAPIResponseData<void>(this.instance, {
      method: 'delete',
      url: `/api/video/${videoId}`,
    });
  }

  patchVideoIndex(data: UpdateVideoIndexRequestDto) {
    return getAPIResponseData<void, UpdateVideoIndexRequestDto>(this.instance, {
      method: 'patch',
      url: `/api/video/index`,
      data,
    });
  }
}
