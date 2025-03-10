import { SelectedQuestion } from '@/atoms/interviewSetting';
import { putBlobDataToIdrive } from '@/apis/idrive';
import { toast } from '@gomterview/toast';
import { EncodingWebmToMp4, getThumbnailBlob } from '@/utils/record';
import { IDRIVE_URL } from '@constants/api';
import {
  usePostVideoMutation,
  usePostVideoPreSignedMutation,
} from '@/entities/video/api/mutations';

type UploadParams = {
  blob: Blob;
  currentQuestion: SelectedQuestion;
  recordTime: string;
};

export const useUploadToIDrive = () => {
  const { mutateAsync: getPreSignedUrl } = usePostVideoPreSignedMutation();
  const { mutate: videoToServer } = usePostVideoMutation();

  const uploadToIDriveWithMP4 = async ({
    blob,
    currentQuestion,
    recordTime,
  }: UploadParams): Promise<void> => {
    try {
      const thumbnailBlob = await getThumbnailBlob(blob);
      const mp4Blob = await EncodingWebmToMp4(blob, recordTime);

      const { video, thumbnail } = await getPreSignedUrl();

      await putBlobDataToIdrive({
        url: thumbnail?.preSignedUrl,
        blob: thumbnailBlob,
      });

      await putBlobDataToIdrive({
        url: video?.preSignedUrl,
        blob: mp4Blob,
      });

      videoToServer({
        body: {
          questionId: currentQuestion.questionId,
          videoName: currentQuestion.questionContent,
          videoAnswer: `${
            currentQuestion?.answerContent
              ? currentQuestion.answerContent
              : '답변이 작성되지 않았습니다.'
          }`,
          url: `${IDRIVE_URL}/videos/${video.key}`,
          thumbnail: `${IDRIVE_URL}/thumbnail/${thumbnail.key}`,
          videoLength: recordTime,
        },
      });

      toast.success('성공적으로 서버에 업로드 되었습니다😊');
    } catch (error) {
      toast.error('업로드 중 오류 발생');
      throw error; // 오류를 다시 throw하여 호출자에게 전파
    }
  };

  const uploadToIDriveWithWebm = async ({
    blob,
    currentQuestion,
    recordTime,
  }: UploadParams): Promise<void> => {
    try {
      const thumbnailBlob = await getThumbnailBlob(blob);

      const { video, thumbnail } = await getPreSignedUrl();

      await putBlobDataToIdrive({
        url: thumbnail?.preSignedUrl,
        blob: thumbnailBlob,
      });

      await putBlobDataToIdrive({
        url: video?.preSignedUrl,
        blob: blob,
      });

      videoToServer({
        body: {
          questionId: currentQuestion.questionId,
          videoName: currentQuestion.questionContent,
          videoAnswer: `${
            currentQuestion?.answerContent
              ? currentQuestion.answerContent
              : '답변이 작성되지 않았습니다.'
          }`,
          url: `${IDRIVE_URL}/videos/${video.key}`,
          thumbnail: `${IDRIVE_URL}/thumbnail/${thumbnail.key}`,
          videoLength: recordTime,
        },
      });

      toast.success('성공적으로 서버에 업로드 되었습니다😊');
    } catch (error) {
      toast.error('업로드 중 오류 발생');
      throw error; // 오류를 다시 throw하여 호출자에게 전파
    }
  };

  return { uploadToIDriveWithMP4, uploadToIDriveWithWebm };
};
