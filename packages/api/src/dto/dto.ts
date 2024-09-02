export interface MemberResponseDto {
  /**
   * 회원의 ID
   * @example 1
   */
  id: number;
  /**
   * 회원의 이메일
   * @example "foo@example.com"
   */
  email: string;
  /**
   * 회원의 닉네임
   * @example "foobar"
   */
  nickname: string;
  /**
   * 프로필 이미지의 주소
   * @example "https://example.com"
   */
  profileImg: string;
}

export interface MemberNicknameResponseDto {
  /**
   * 회원의 닉네임
   * @example "foobar"
   */
  nickname: string;
}

export interface CategoryResponseDto {
  /**
   * 카테고리 ID
   * @example 1
   */
  id: number;
  /**
   * 카테고리 이름
   * @example "BE"
   */
  name: string;
}

export interface CreateQuestionRequestDto {
  /**
   * 문제집 id
   * @example "1"
   */
  workbookId: number;
  /**
   * 질문 내용
   * @example "이장희는 누구일까요"
   */
  content: string;
}

export interface QuestionResponseDto {
  /**
   * 질문의 ID
   * @example 1
   */
  questionId: number;
  /**
   * 질문 내용
   * @example "이장희는 누구인가요?"
   */
  questionContent: string;
  /**
   * 대표답변의 ID
   * @example 1
   */
  answerId: number;
  /**
   * 대표답변 내용
   * @example "존잘 백엔드 캠퍼!"
   */
  answerContent: string;
}

export interface CopyQuestionRequestDto {
  /**
   * 문제집 id
   * @example 1
   */
  workbookId: number;
  /**
   * 복사할 질문들의 id
   * @example [1,2,3,4,5]
   */
  questionIds: number[];
}

export interface WorkbookIdResponseDto {
  /**
   * 답변 ID
   * @example 1
   */
  workbookId: number;
}

export interface UpdateIndexInWorkbookRequestDto {
  /**
   * 문제집 id
   * @example "1"
   */
  workbookId: number;
  /**
   * 질문의 id
   * @example [1,2,3,4,5]
   */
  ids: number[];
}

export interface CreateVideoRequestDto {
  /**
   * 문제 ID
   * @example 1
   */
  questionId: number;
  /**
   * 비디오 파일 이름
   * @example "example.mp4"
   */
  videoName: string;
  /**
   * 비디오 URL
   * @example "https://u2e0.c18.e2-4.dev/videos/example.mp4"
   */
  url: string;
  /**
   * 비디오 썸네일 URL
   * @example "https://thumb-example.com"
   */
  thumbnail: string;
  /**
   * 비디오 길이
   * @example "03:29"
   */
  videoLength: string;
  /**
   * 답변 스크립트
   * @example "예시 답변입니다."
   */
  videoAnswer: string;
}

export interface PreSignedUrlResponseDto {
  /** 비디오 업로드를 위한 Pre-Signed URL과 파일명 */
  video: {
    /**
     * 비디오 업로드를 위한 Pre-Signed URL
     * @example "https://video-example.com"
     */
    preSignedUrl: string;
    /**
     * video 파일명
     * @example "video-example.mp4"
     */
    key: string;
  };
  /** 썸네일 업로드를 위한 Pre-Signed URL과 파일명 */
  thumbnail: {
    /**
     * 썸네일 업로드를 위한 Pre-Signed URL
     * @example "https://thumbnail-example.com"
     */
    preSignedUrl: string;
    /**
     * 썸네일 파일명
     * @example "thumbnail-example.png"
     */
    key: string;
  };
}

export interface SingleVideoResponseDto {
  /**
   * 비디오 ID
   * @example 1
   */
  id: number;
  /**
   * 비디오 썸네일 이미지
   * @example "https://thumbnail.com"
   */
  thumbnail: string;
  /**
   * 비디오 이름
   * @example "test.webm"
   */
  videoName: string;
  /**
   * 비디오 길이
   * @example "03:29"
   */
  videoLength: string;
  /**
   * 영상 공개여부
   * @example "PUBLIC"
   */
  visibility: 'PUBLIC' | 'LINK_ONLY' | 'PRIVATE';
  /**
   * 영상 생성 일자
   * @example "1998.09.05"
   */
  createdAt: string;
}

export interface VideoDetailResponseDto {
  /**
   * 비디오의 ID
   * @example 1
   */
  id: number;
  /**
   * 회원의 ID
   * @example 1
   */
  memberId: number;
  /**
   * 회원의 닉네임
   * @example "foobar"
   */
  nickname: string;
  /**
   * 비디오의 URL
   * @example "https://example-video.com"
   */
  url: string;
  /**
   * 비디오 파일의 이름
   * @example "example-video.webm"
   */
  videoName: string;
  /**
   * 비디오의 URL 해시값
   * @example "65f031b26799cc74755bdd3ef4a304eaec197e402582ef4a834edb58e71261a0"
   */
  hash: string | null;
  /**
   * 영상 생성 일자
   * @example "1998.09.05"
   */
  createdAt: string;
  /**
   * 영상 공개여부
   * @example "PUBLIC"
   */
  visibility: 'PUBLIC' | 'LINK_ONLY' | 'PRIVATE';
  /**
   * 비디오 썸네일
   * @example "https://example.com"
   */
  thumbnail: string;
  /**
   * 답변 스크립트
   * @example "예시 답변입니다."
   */
  videoAnswer: string;
}

export interface RelatableVideoResponseDto {
  /**
   * 비디오 ID
   * @example 1
   */
  id: number;
  /**
   * 이미 연관되어있는지 여부
   * @example true
   */
  isRelated: boolean;
  /**
   * 영상 공개여부
   * @example "PUBLIC"
   */
  visibility: 'PUBLIC' | 'LINK_ONLY' | 'PRIVATE';
  /**
   * 영상 이름
   * @example "츄 직캠"
   */
  videoName: string;
  /**
   * 생성일자
   * @example "1998.09.05"
   */
  createdAt: string;
}

export interface MemberVideoResponseDto {
  /**
   * 비디오 ID
   * @example 1
   */
  id: number;
  /**
   * 영상 썸네일
   * @example "https://jangsarchive.tistory.com"
   */
  thumbnail: string;
  /**
   * 영상 이름
   * @example "RESTful하다는 것은 무엇일까요?"
   */
  videoName: string;
  /**
   * 영상 길이
   * @example "03:00"
   */
  videoLength: string;
  /**
   * 영상 생성 일자
   * @example "1998.09.05"
   */
  createdAt: string;
  /**
   * 회원 닉네임
   * @example "장아장"
   */
  nickname: string;
  /**
   * 회원 프로필
   * @example "https://jangsarchive.tistory.com"
   */
  userThumbnail: string;
}

export interface UpdateVideoIndexRequestDto {
  /**
   * 영상의 id
   * @example [1,2,3,4,5]
   */
  ids: number[];
}

export interface UpdateVideoRequestDto {
  /**
   * 비디오 파일 이름
   * @example "example.mp4"
   */
  videoName: string;
  /**
   * 영상 공개여부
   * @example "PUBLIC"
   */
  visibility: 'PUBLIC' | 'LINK_ONLY' | 'PRIVATE';
  /**
   * 연관 비디오 id배열
   * @example [1,4,3,2]
   */
  relatedVideoIds: number[];
  /**
   * 비디오 썸네일 주소
   * @example "https://exmaple-thumnail.com"
   */
  thumbnail: string;
  /**
   * 답변 스크립트
   * @example "예시 답변입니다."
   */
  videoAnswer: string;
}

export interface CreateAnswerRequestDto {
  /**
   * 문제 ID
   * @example 1
   */
  questionId: number;
  /**
   * 등록할 답변 내용
   * @example "이장희는 존잘 백엔드 캠퍼!"
   */
  content: string;
}

export interface AnswerResponseDto {
  /**
   * 답변 ID
   * @example 1
   */
  answerId: number;
  /**
   * 답변 내용
   * @example "답변 내용입니다"
   */
  content: string;
  /**
   * 회원 ID
   * @example 1
   */
  memberId: number;
  /**
   * 회원 이름
   * @example "이장희"
   */
  memberName: string;
  /**
   * 회원 프로필 이미지 주소
   * @example "https://jangsarchive.tistory.com/"
   */
  profileImg: string;
}

export interface DefaultAnswerRequestDto {
  /**
   * 문제 ID
   * @example 1
   */
  questionId: number;
  /**
   * 답변 ID
   * @example 1
   */
  answerId: number;
}

export interface CreateWorkbookRequestDto {
  /**
   * 문제집 이름
   * @example "장희문제집"
   */
  title: string;
  /**
   * 문제집에 대한 설명
   * @example "나만볼꺼다요 메롱"
   */
  content: string;
  /**
   * 카테고리 id
   * @example 1
   */
  categoryId: number;
  /**
   * 문제집 공개여부
   * @example true
   */
  isPublic: boolean;
}

export interface WorkbookResponseDto {
  /**
   * 문제집 ID
   * @example 1
   */
  workbookId: number;
  /**
   * 카테고리 ID
   * @example 1
   */
  categoryId: number;
  /**
   * 회원 닉네임
   * @example "이장희"
   */
  nickname: string;
  /**
   * 회원 프로필 사진 주소
   * @example "https://jangsarchive.tistory.com"
   */
  profileImg: string;
  /**
   * 문제집 복사 횟수
   * @example 1
   */
  copyCount: number;
  /**
   * 문제집 제목
   * @example "이장희의 면접 문제집"
   */
  title: string;
  /**
   * 문제집 설명
   * @example "내꺼 건들 ㄴㄴ해"
   */
  content: string;
  /**
   * 문제집 공개여부
   * @example true
   */
  isPublic: boolean;
}

export interface WorkbookTitleResponseDto {
  /**
   * 문제집 ID
   * @example 1
   */
  workbookId: number;
  /**
   * 문제집 제목
   * @example "이장희의 면접 문제집"
   */
  title: string;
}

export interface UpdateWorkbookRequestDto {
  /**
   * 문제집 id
   * @example 1
   */
  workbookId: number;
  /**
   * 문제집 이름
   * @example "장희문제집"
   */
  title: string;
  /**
   * 문제집에 대한 설명
   * @example "나만볼꺼다요 메롱"
   */
  content: string;
  /**
   * 카테고리 id
   * @example 1
   */
  categoryId: number;
  /**
   * 문제집 공개여부
   * @example true
   */
  isPublic: boolean;
}
