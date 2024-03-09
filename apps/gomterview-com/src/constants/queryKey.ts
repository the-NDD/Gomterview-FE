export const QUERY_KEY = {
  QUESTION_ANSWER: (questionId: number) => ['answer', questionId],
  QUESTION_WORKBOOK: (workbookId: number) => ['questions', workbookId],
  CATEGORY: ['categories'],
  MEMBER: ['member'],
  MEMBER_NICKNAME: ['member', 'nickname'],
  VIDEO: ['video'],
  VIDEO_PUBLIC: ['video_public'],
  VIDEO_ID: (videoId: number) => ['video', videoId],
  VIDEO_ID_ONLY_RELATED: (videoId: number) => [
    'video_id_only_related',
    videoId,
  ],
  VIDEO_ID_RELATED_INFO: (videoId: number) => [
    'video_id_related_info',
    videoId,
  ],
  VIDEO_HASH: (videoHash: string) => ['video', videoHash],
  WORKBOOK_CATEGORY: (categoryId: string) => ['workbook_category', categoryId],
  WORKBOOK_ID: (workbookId: number) => ['workbook', workbookId],
  WORKBOOK_TITLE: ['workbookTitle'],
  QUESTION_WORKBOOK_ID: (workbookId: number) => [
    'question',
    'workbook',
    workbookId,
  ],
};
