import { SelectedQuestion } from '@/atoms/interviewSetting';
import useGetPreSignedUrlMutation from '@/hooks/apis/mutations/useGetPreSignedUrlMutation';
import { putBlobDataToIdrive } from '@/apis/idrive';
import useAddVideoMutation from '@/hooks/apis/mutations/useAddVideoMutation';
import { toast } from '@foundation/Toast/toast';
import { EncodingWebmToMp4, getThumbnailBlob } from '@/utils/record';
import { IDRIVE_URL } from '@constants/api';

type UploadParams = {
  blob: Blob;
  currentQuestion: SelectedQuestion;
  recordTime: string;
};

export const useUploadToIDrive = () => {
  const { mutateAsync: getPreSignedUrl } = useGetPreSignedUrlMutation();
  const { mutate: videoToServer } = useAddVideoMutation();

  const uploadToIDrive = async ({
    blob,
    currentQuestion,
    recordTime,
  }: UploadParams): Promise<void> => {
    try {
      const thumbnailBlob = await getThumbnailBlob(blob);
      const mp4Blob = await EncodingWebmToMp4(blob, recordTime);

      toast.success('성공적으로 서버에 업로드를 준비합니다.');
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
        questionId: currentQuestion.questionId,
        videoName: currentQuestion.questionContent,
        url: `${IDRIVE_URL}/videos/${video.key}`,
        thumbnail: `${IDRIVE_URL}/thumbnail/${thumbnail.key}`,
        videoLength: recordTime,
      });

      toast.success('성공적으로 서버에 업로드 되었습니다😊');
    } catch (error) {
      toast.error('업로드 중 오류 발생');
      throw error; // 오류를 다시 throw하여 호출자에게 전파
    }
  };

  return uploadToIDrive;
};
