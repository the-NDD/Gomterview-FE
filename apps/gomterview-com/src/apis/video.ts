import getAPIResponseData from '@/utils/getAPIResponseData';
import { API } from '@constants/api';
import {
  VideoAddReqDto,
  VideoItemResDto,
  MyVideoListResDto,
  VideoPreSignedResDto,
  OnlyRelatedVideoListResDto,
  VideoRelatedInfoListResDto,
  PublicVideoListResDto,
} from '@/types/video';

export const postVideo = async (body: VideoAddReqDto) => {
  return await getAPIResponseData({
    method: 'post',
    url: API.VIDEO,
    data: body,
  });
};

export const postPreSignedUrl = async () => {
  return await getAPIResponseData<VideoPreSignedResDto>({
    method: 'post',
    url: API.VIDEO_PRE_SIGNED,
  });
};

/**
 * GET video/all
 * 마이페이지에서 비디오 전체 리스트를 조회
 * Res
 * 'id' | 'thumbnail' | 'videoName' | 'videoLength' | 'visibility' | 'createdAt'
 */
export const getMyVideoList = async () => {
  return await getAPIResponseData<MyVideoListResDto>({
    method: 'get',
    url: API.VIDEO_ALL,
  });
};

/**
 * GET video/all
 * 모든 영상을 보여주는 페이지에서 서비스 전체 비디오 리스트를 조회
 * Res
 * 'id' | 'thumbnail' | 'videoName' | 'videoLength' | 'visibility' | 'createdAt'
 */
export const getPublicVideoList = async () => {
  return await getAPIResponseData<PublicVideoListResDto>({
    method: 'get',
    url: API.VIDEO_PUBLIC,
  });
};

/**
 * GET video/related/${videoId}
 * 비디오 아이디로 연결된 비디오 리스트"만" 조회
 * Res => Array
 * 'id' | 'nickname' | 'url' | 'hash' | 'videoName' | 'createdAt' | 'visibility'
 */
export const getOnlyRelatedVideoList = async (videoId: number) => {
  return await getAPIResponseData<OnlyRelatedVideoListResDto>({
    method: 'get',
    url: API.VIDEO_ID_ONLY_RELATED(videoId),
  });
};

/**
 * GET video/relate/${videoId}
 * 비디오 아이디로 비디오와 연결되거나 안된 모든 비디오를 조회
 * Res => Array
 *'id' | 'isRelated' | 'visibility' | 'videoName' | 'createdAt'
 */
export const getVideoRelatedInfoList = async (videoId: number) => {
  return await getAPIResponseData<VideoRelatedInfoListResDto>({
    method: 'get',
    url: API.VIDEO_ID_RELATED_INFO(videoId),
  });
};

export const getVideoByHash = async (hash: string) => {
  return await getAPIResponseData<VideoItemResDto>({
    method: 'get',
    url: API.VIDEO_HASH(hash),
  });
};

/**
 * GET video/${videoId}
 * 비디오 아이디로 비디오를 단건 조회했을 때 응답 객체 타입
 * Res
 *  'id' | 'nickname' | 'url' | 'hash' | 'videoName' | 'createdAt' | 'visibility' | "videoAnswer"
 */
export const getVideoById = async (videoId: number) => {
  return await getAPIResponseData<VideoItemResDto>({
    method: 'get',
    url: API.VIDEO_ID(videoId),
  });
};

/**
 * Patch video/${videoId}
 * 비디오 아이디로 비디오 상세 정보를 수정하기 위해서 사용됩니다.
 * Req
 *  'videoName' | 'videoName' | 'videoAnswer' |'visibility' | 'relatedVideoIds[]'
 */
export const patchVideoPublic = async (
  videoId: number,
  videoName: string,
  videoAnswer: string,
  thumbnail: string,
  visibility: 'PUBLIC' | 'LINK_ONLY' | 'PRIVATE',
  relatedVideoIds: number[]
) => {
  return await getAPIResponseData({
    method: 'patch',
    url: API.VIDEO_ID(videoId),
    data: {
      videoName: videoName,
      videoAnswer: videoAnswer,
      thumbnail: thumbnail,
      visibility: visibility,
      relatedVideoIds: relatedVideoIds,
    },
  });
};

export const deleteVideoById = async (videoId: number) => {
  return await getAPIResponseData({
    method: 'delete',
    url: API.VIDEO_ID(videoId),
  });
};
