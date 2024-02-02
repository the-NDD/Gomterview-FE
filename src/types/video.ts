type VideoEntity = {
  id: number;
  memberId: number;
  questionId: number;
  videoName: string;
  thumbnail: string | null;
  videoLength: string;
  url: string;
  hash: string | null;
  visibility: 'PUBLIC' | 'LINK_ONLY' | 'PRIVATE';
  createdAt: string;
  isRelated: boolean;
  nickname: string;
  userThumbnail: string;
};

/**
 * GET video/all
 * 마이페이지에서 비디오 전체 리스트를 조회했을 때 응답 객체 타입
 */
export type MyVideoListResDto = Pick<
  VideoEntity,
  'id' | 'thumbnail' | 'videoName' | 'videoLength' | 'visibility' | 'createdAt'
>[];

/**
 * GET video/public
 * 비디오 전체 리스트를 조회했을 때 응답 객체 타입
 */
export type PublicVideoListResDto = Pick<
  VideoEntity,
  | 'id'
  | 'thumbnail'
  | 'videoName'
  | 'videoLength'
  | 'createdAt'
  | 'nickname'
  | 'userThumbnail'
>[];

/**
 * GET video/${videoId}
 * 비디오 아이디로 비디오를 단건 조회했을 때 응답 객체 타입
 */
export type VideoItemResDto = Pick<
  VideoEntity,
  | 'id'
  | 'nickname'
  | 'memberId'
  | 'url'
  | 'hash'
  | 'videoName'
  | 'createdAt'
  | 'visibility'
>;

/**
 * GET video/related/${videoId}
 * 비디오 아이디로 연결된 비디오 리스트"만" 조회했을 때 반환하는 객체 타입
 *
 */
export type OnlyRelatedVideoListResDto = Pick<
  VideoEntity,
  'id' | 'thumbnail' | 'videoName' | 'videoLength' | 'visibility' | 'createdAt'
>[];

/**
 * GET video/relate/${videoId}
 * 비디오 아이디로 비디오와 연결되거나 안된 모든 비디오를 조회했을 때 반환하는 객체 타입
 *
 */
export type VideoRelatedInfoListResDto = Pick<
  VideoEntity,
  'id' | 'isRelated' | 'visibility' | 'videoName' | 'createdAt'
>[];

/**
 * POST video
 * 비디오를 등록할 때 요청 객체 타입
 */
export type VideoAddReqDto = Pick<
  VideoEntity,
  'questionId' | 'videoName' | 'url' | 'thumbnail' | 'videoLength'
>;

/**
 * POST video/pre-signed
 * 비디오 등록 전 질문 아이디로 비디오 등록용 pre-signed url을 요청하는 객체 타입
 * @deprecated
 */
export type VideoPreSignedReqDto = Pick<VideoEntity, 'questionId'>;

/**
 * POST video/pre-signed
 * 비디오 등록 전 질문 아이디로 비디오 등록용 pre-signed url 응답 객체 타입
 */

export type VideoPreSignedResDto = {
  video: {
    preSignedUrl: string;
    key: string; //비디오 파일 이름입니다.
  };
  thumbnail: {
    preSignedUrl: string;
    key: string; //비디오 파일 이름입니다.
  };
};

/**
 * PATCH video/${videoId}
 * 비디오 공개, 비공개 토글시 응답 객체 타입
 *  수정을 해야만 합니다. 현재는 수정하지 않았습니다
 */
export type VideoPublicToggleResDto = Pick<VideoEntity, 'hash'>;
