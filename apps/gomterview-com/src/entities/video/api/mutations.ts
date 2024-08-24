import {
  CreateVideoRequestDto,
  PreSignedUrlResponseDto,
  UpdateVideoIndexRequestDto,
  UpdateVideoRequestDto,
} from '@gomterview/api';
import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import { videoApi } from '../api';

const mutations = {
  postVideo: () => ({
    mutationFn: (variables: TPostVideoVariables) => {
      const { body } = variables;
      return videoApi.postVideo(body);
    },
    mutationKey: ['video'],
  }),
  postVideoPreSigned: () => ({
    mutationFn: () => videoApi.postVideoPreSigned(),
    mutationKey: ['video'],
  }),
  patchVideoByVideoId: () => ({
    mutationFn: (variables: TPatchVideoByVideoIdVariables) => {
      const { videoId, body } = variables;
      return videoApi.patchVideoByVideoId(videoId, body);
    },
    mutationKey: ['video'],
  }),
  deleteVideoByVideoId: () => ({
    mutationFn: (variables: TDeleteVideoByVideoIdVariables) => {
      const { videoId } = variables;
      return videoApi.deleteVideoByVideoId(videoId);
    },
    mutationKey: ['video'],
  }),
  patchVideoIndex: () => ({
    mutationFn: (variables: TPatchVideoIndexVariables) => {
      const { body } = variables;
      return videoApi.patchVideoIndex(body);
    },
    mutationKey: ['video'],
  }),
};

/**
 * @tags video
 * @summary 비디오 정보를 DB에 저장
 * @request POST:/api/video
 * @secure*/
export const usePostVideoMutation = (
  options?: Omit<
    UseMutationOptions<void, DefaultError, TPostVideoVariables>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.postVideo(),
    ...options,
  });
};

/**
 * @tags video
 * @summary Pre-Signed URL을 발급
 * @request POST:/api/video/pre-signed
 * @secure*/
export const usePostVideoPreSignedMutation = (
  options?: Omit<
    UseMutationOptions<PreSignedUrlResponseDto, DefaultError, void>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.postVideoPreSigned(),
    ...options,
  });
};

/**
 * @tags video
 * @summary 비디오 정보 수정(이름/공개여부/관계 영상/썸네일/답변 수정)
 * @request PATCH:/api/video/{videoId}
 * @secure*/
export const usePatchVideoByVideoIdMutation = (
  options?: Omit<
    UseMutationOptions<void, DefaultError, TPatchVideoByVideoIdVariables>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.patchVideoByVideoId(),
    ...options,
  });
};

/**
 * @tags video
 * @summary 비디오 삭제
 * @request DELETE:/api/video/{videoId}
 * @secure*/
export const useDeleteVideoByVideoIdMutation = (
  options?: Omit<
    UseMutationOptions<void, DefaultError, TDeleteVideoByVideoIdVariables>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.deleteVideoByVideoId(),
    ...options,
  });
};

/**
 * @tags video
 * @summary 비디오 순서 변경
 * @request PATCH:/api/video/index
 * @secure*/
export const usePatchVideoIndexMutation = (
  options?: Omit<
    UseMutationOptions<void, DefaultError, TPatchVideoIndexVariables>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.patchVideoIndex(),
    ...options,
  });
};

type TPostVideoVariables = { body: CreateVideoRequestDto };
type TPatchVideoByVideoIdVariables = {
  videoId: number;
  body: UpdateVideoRequestDto;
};
type TDeleteVideoByVideoIdVariables = { videoId: number };
type TPatchVideoIndexVariables = { body: UpdateVideoIndexRequestDto };
