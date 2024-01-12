type Id = number;
type Hash = string;

export const BASE_URL = process.env.REACT_APP_BASE_API_URL;
export const IDRIVE_URL = `https://u2e0.c18.e2-4.dev`;
export const FFMPEG_URL = `https://unpkg.com/@ffmpeg/core-mt@0.12.4/dist/umd`;

export const API = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REISSUE: () => `/auth/reissue?v=${Date.now()}`,
  MEMBER: () => `/member?v=${Date.now()}`,
  MEMBER_NAME: () => `/member/name?v=${Date.now()}`,
  VIDEO: '/video',
  VIDEO_PRE_SIGNED: '/video/pre-signed',
  VIDEO_ALL: '/video/all',
  VIDEO_ID: (id?: Id) => `/video/${id ?? ':id'}`,
  VIDEO_HASH: (hash?: Hash) => `/video/hash/${hash ?? ':hash'}`,
  QUESTION: '/question',
  QUESTION_ID: (id?: Id) => `/question/${id ?? ':id'}`,
  QUESTION_COPY: `/question/copy`,
  ANSWER: '/answer',
  ANSWER_DEFAULT: '/answer/default',
  ANSWER_ID: (id?: Id) => `/answer/${id ?? ':id'}`,
  CATEGORY: '/category',
  CATEGORY_ID: (id?: Id) => `/category/${id ?? ':id'}`,
  WORKBOOK: '/workbook',
  WORKBOOK_TITLE: '/workbook/title',
  WORKBOOK_ID: (id?: Id) => `/workbook/${id ?? ':id'}`,
  WORKBOOK_CATEGORY_ID: (id?: string) => `/workbook?category=${id ?? ':id'}`,
} as const;
