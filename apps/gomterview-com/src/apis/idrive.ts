import axios from 'axios';

type IdriveUploadParams = {
  url?: string;
  blob: Blob;
};

/**
 * Idrive에 Blob 데이터 직접 업로드를 수행합니다.
 */
export const putBlobDataToIdrive = async ({
  url,
  blob,
}: IdriveUploadParams): Promise<void> => {
  if (!url) {
    throw new Error('URL is required for uploading the video');
  }

  try {
    await axios.put<null>(url, blob);
  } catch (error) {
    console.error('Error occurred while uploading video:', error);
    throw error;
  }
  return;
};
