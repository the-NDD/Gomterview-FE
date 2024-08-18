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

  postVideo(data: CreateVideoRequestDto) {
    return getAPIResponseData<void, CreateVideoRequestDto>(this.instance, {
      method: 'post',
      url: `/video`,
      data,
    });
  }

  postVideoPreSigned() {
    return getAPIResponseData<PreSignedUrlResponseDto>(this.instance, {
      method: 'post',
      url: `/video/pre-signed`,
    });
  }

  getVideoAll() {
    return getAPIResponseData<SingleVideoResponseDto[]>(this.instance, {
      method: 'get',
      url: `/video/all`,
    });
  }

  getVideoHashByHash(hash: string) {
    return getAPIResponseData<VideoDetailResponseDto>(this.instance, {
      method: 'get',
      url: `/video/hash/${hash}`,
    });
  }

  getVideoRelateByVideoId(videoId: number) {
    return getAPIResponseData<RelatableVideoResponseDto[]>(this.instance, {
      method: 'get',
      url: `/video/relate/${videoId}`,
    });
  }

  getVideoRelatedByVideoId(videoId: number) {
    return getAPIResponseData<SingleVideoResponseDto[]>(this.instance, {
      method: 'get',
      url: `/video/related/${videoId}`,
    });
  }

  getVideoPublic() {
    return getAPIResponseData<MemberVideoResponseDto[]>(this.instance, {
      method: 'get',
      url: `/video/public`,
    });
  }

  getVideoByVideoId(videoId: number) {
    return getAPIResponseData<VideoDetailResponseDto>(this.instance, {
      method: 'get',
      url: `/video/${videoId}`,
    });
  }

  patchVideoByVideoId(videoId: number, data: UpdateVideoRequestDto) {
    return getAPIResponseData<void, UpdateVideoRequestDto>(this.instance, {
      method: 'patch',
      url: `/video/${videoId}`,
      data,
    });
  }

  deleteVideoByVideoId(videoId: number) {
    return getAPIResponseData<void>(this.instance, {
      method: 'delete',
      url: `/video/${videoId}`,
    });
  }

  patchVideoIndex(data: UpdateVideoIndexRequestDto) {
    return getAPIResponseData<void, UpdateVideoIndexRequestDto>(this.instance, {
      method: 'patch',
      url: `/video/index`,
      data,
    });
  }
}
