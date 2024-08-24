import {
  DefaultError,
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

import { videoApi } from '@/entities/video/api';
import {
  MemberVideoResponseDto,
  RelatableVideoResponseDto,
  SingleVideoResponseDto,
  VideoDetailResponseDto,
} from '@gomterview/api';

export const VIDEO_QUERY_KEY = {
  GET_VIDEO_ALL: () => ['video', 'all'],
  GET_VIDEO_HASH_HASH: (hash: string) => ['video', 'hash', hash],
  GET_VIDEO_RELATE_VIDEOID: (videoId: number) => ['video', 'relate', videoId],
  GET_VIDEO_RELATED_VIDEOID: (videoId: number) => ['video', 'related', videoId],
  GET_VIDEO_PUBLIC: () => ['video', 'public'],
  GET_VIDEO_VIDEOID: (videoId: number) => ['video', videoId],
};

const queries = {
  getVideoAll: () => ({
    queryKey: VIDEO_QUERY_KEY.GET_VIDEO_ALL(),
    queryFn: () => videoApi.getVideoAll(),
  }),
  getVideoHashByHash: (hash: string) => ({
    queryKey: VIDEO_QUERY_KEY.GET_VIDEO_HASH_HASH(hash),
    queryFn: () => videoApi.getVideoHashByHash(hash),
  }),
  getVideoRelateByVideoId: (videoId: number) => ({
    queryKey: VIDEO_QUERY_KEY.GET_VIDEO_RELATE_VIDEOID(videoId),
    queryFn: () => videoApi.getVideoRelateByVideoId(videoId),
  }),
  getVideoRelatedByVideoId: (videoId: number) => ({
    queryKey: VIDEO_QUERY_KEY.GET_VIDEO_RELATED_VIDEOID(videoId),
    queryFn: () => videoApi.getVideoRelatedByVideoId(videoId),
  }),
  getVideoPublic: () => ({
    queryKey: VIDEO_QUERY_KEY.GET_VIDEO_PUBLIC(),
    queryFn: () => videoApi.getVideoPublic(),
  }),
  getVideoByVideoId: (videoId: number) => ({
    queryKey: VIDEO_QUERY_KEY.GET_VIDEO_VIDEOID(videoId),
    queryFn: () => videoApi.getVideoByVideoId(videoId),
  }),
};

// ---------------------- Query ------------------------------
/**
 * @tags video
 * @summary 자신의 모든 비디오 정보를 반환
 * @request GET:/api/video/all
 * @secure*/
export const useGetVideoAllQuery = <TData = SingleVideoResponseDto[],>(
  options?: Omit<
    UseQueryOptions<SingleVideoResponseDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getVideoAll(),
    ...options,
  });
};
/**
 * @tags video
 * @summary 해시값으로 비디오 정보 불러오기
 * @request GET:/api/video/hash/{hash}*/
export const useGetVideoHashByHashQuery = <TData = VideoDetailResponseDto,>(
  hash: string,
  options?: Omit<
    UseQueryOptions<VideoDetailResponseDto, DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getVideoHashByHash(hash),
    ...options,
  });
};
/**
 * @tags video
 * @summary 연관영상으로 등록할 수 있는 모든 영상을 조회한다.
 * @request GET:/api/video/relate/{videoId}
 * @secure*/
export const useGetVideoRelateByVideoIdQuery = <
  TData = RelatableVideoResponseDto[],
>(
  videoId: number,
  options?: Omit<
    UseQueryOptions<RelatableVideoResponseDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getVideoRelateByVideoId(videoId),
    ...options,
  });
};
/**
 * @tags video
 * @summary 관계된 비디오 정보 조회
 * @request GET:/api/video/related/{videoId}
 * @secure*/
export const useGetVideoRelatedByVideoIdQuery = <
  TData = SingleVideoResponseDto[],
>(
  videoId: number,
  options?: Omit<
    UseQueryOptions<SingleVideoResponseDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getVideoRelatedByVideoId(videoId),
    ...options,
  });
};
/**
 * @tags video
 * @summary 공개된 영상 조회
 * @request GET:/api/video/public*/
export const useGetVideoPublicQuery = <TData = MemberVideoResponseDto[],>(
  options?: Omit<
    UseQueryOptions<MemberVideoResponseDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getVideoPublic(),
    ...options,
  });
};
/**
 * @tags video
 * @summary 비디오 상세 정보를 반환
 * @request GET:/api/video/{videoId}
 * @secure*/
export const useGetVideoByVideoIdQuery = <TData = VideoDetailResponseDto,>(
  videoId: number,
  options?: Omit<
    UseQueryOptions<VideoDetailResponseDto, DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getVideoByVideoId(videoId),
    ...options,
  });
};

// ------------------ Suspense Query --------------------------
/**
 * @tags video
 * @summary 자신의 모든 비디오 정보를 반환
 * @request GET:/api/video/all
 * @secure*/
export const useSuspenseGetVideoAllQuery = <TData = SingleVideoResponseDto[],>(
  options?: Omit<
    UseSuspenseQueryOptions<SingleVideoResponseDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getVideoAll(),
    ...options,
  });
};
/**
 * @tags video
 * @summary 해시값으로 비디오 정보 불러오기
 * @request GET:/api/video/hash/{hash}*/
export const useSuspenseGetVideoHashByHashQuery = <
  TData = VideoDetailResponseDto,
>(
  hash: string,
  options?: Omit<
    UseSuspenseQueryOptions<VideoDetailResponseDto, DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getVideoHashByHash(hash),
    ...options,
  });
};
/**
 * @tags video
 * @summary 연관영상으로 등록할 수 있는 모든 영상을 조회한다.
 * @request GET:/api/video/relate/{videoId}
 * @secure*/
export const useSuspenseGetVideoRelateByVideoIdQuery = <
  TData = RelatableVideoResponseDto[],
>(
  videoId: number,
  options?: Omit<
    UseSuspenseQueryOptions<RelatableVideoResponseDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getVideoRelateByVideoId(videoId),
    ...options,
  });
};
/**
 * @tags video
 * @summary 관계된 비디오 정보 조회
 * @request GET:/api/video/related/{videoId}
 * @secure*/
export const useSuspenseGetVideoRelatedByVideoIdQuery = <
  TData = SingleVideoResponseDto[],
>(
  videoId: number,
  options?: Omit<
    UseSuspenseQueryOptions<SingleVideoResponseDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getVideoRelatedByVideoId(videoId),
    ...options,
  });
};
/**
 * @tags video
 * @summary 공개된 영상 조회
 * @request GET:/api/video/public*/
export const useSuspenseGetVideoPublicQuery = <
  TData = MemberVideoResponseDto[],
>(
  options?: Omit<
    UseSuspenseQueryOptions<MemberVideoResponseDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getVideoPublic(),
    ...options,
  });
};
/**
 * @tags video
 * @summary 비디오 상세 정보를 반환
 * @request GET:/api/video/{videoId}
 * @secure*/
export const useSuspenseGetVideoByVideoIdQuery = <
  TData = VideoDetailResponseDto,
>(
  videoId: number,
  options?: Omit<
    UseSuspenseQueryOptions<VideoDetailResponseDto, DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getVideoByVideoId(videoId),
    ...options,
  });
};
