import { SelectedQuestion } from '@/atoms/interviewSetting';
import React, { MutableRefObject } from 'react';
import { toast } from '@foundation/Toast/toast';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { isAndroid, isIOSUser } from '@/utils/userAgent';
import { FFMPEG_URL } from '@constants/api';

type StartRecordingProps = {
  media: MediaStream | null;
  selectedMimeType: string;
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>;
  setRecordedBlobs: React.Dispatch<React.SetStateAction<Blob[]>>;
};

type VideoRecordQueue = {
  recordTime: string;
  toastId?: string;
  questionNumber: number;
}[];

const ffmpeg = new FFmpeg();

let index = 1;
const videoRecordQueue: VideoRecordQueue = [];

const ffmpegLogCallback = ({ message }: { message: string }) => {
  if (!videoRecordQueue[0]) {
    return;
  }

  const { toastId, recordTime, questionNumber } = videoRecordQueue[0];

  if (toastId) {
    const curProgressMessage = compareProgress(message, recordTime);
    curProgressMessage &&
      toast.update(toastId, `질문${questionNumber} : ${curProgressMessage}`);
    return;
  }

  videoRecordQueue[0].toastId = toast.info(
    '영상 인코딩을 시작합니다.\n새로고침 혹은 화면을 종료시 데이터가 소실될 수 있습니다.',
    {
      autoClose: false,
      closeOnClick: false,
      toggle: true,
      position: 'bottomLeft',
    }
  );
};

ffmpeg.on('log', ffmpegLogCallback);

export const startRecording = ({
  media,
  selectedMimeType,
  mediaRecorderRef,
  setRecordedBlobs,
}: StartRecordingProps) => {
  if (!media) {
    toast.error('미디어 스트림이 연결되지 않았습니다.');
    return;
  }

  try {
    mediaRecorderRef.current = new MediaRecorder(media, {
      mimeType: selectedMimeType,
      videoBitsPerSecond: 300000,
    });

    mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
      if (event.data && event.data.size > 0) {
        setRecordedBlobs((prevBlobs) => [...prevBlobs, event.data]);
      }
    };

    mediaRecorderRef.current.start();
  } catch (error) {
    toast.error('미디어 레코딩 중 오류가 발생했습니다.');
  }
};

export const stopRecording = (
  mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>
) => {
  if (mediaRecorderRef.current) {
    mediaRecorderRef.current.stop();
  }
};

export const getFFmpeg = async () => {
  if (!ffmpeg.loaded) {
    await ffmpeg.load({
      coreURL: await toBlobURL(
        `${FFMPEG_URL}/ffmpeg-core.js`,
        'text/javascript'
      ),
      wasmURL: await toBlobURL(
        `${FFMPEG_URL}/ffmpeg-core.wasm`,
        'application/wasm'
      ),
      workerURL: await toBlobURL(
        `${FFMPEG_URL}/ffmpeg-core.worker.js`,
        'text/javascript'
      ),
    });
  }
};

export const canUseFFmpeg = async () => {
  let isCan = false;
  if (!ffmpeg.loaded) await getFFmpeg();
  await ffmpeg.writeFile('input.webm', await fetchFile('/check-ffmpeg.webm'));

  const result = await ffmpeg.exec(
    [
      '-i',
      'input.webm', // 입력 파일
      '-s',
      '640x360',
      '-r',
      '30', // 프레임 레이트 설정: 30fps
      '-threads',
      '4',
      'output.mp4', // 출력 파일
    ],
    10000
  );

  isCan = result === 0 ? true : false;

  console.log(`인코딩 종료!! 😊 ${isCan}`, {
    position: 'bottomLeft',
  });

  return isCan;
};

export const localDownloadWithMp4 = async (
  blob: Blob,
  currentQuestion: SelectedQuestion,
  recordTime: string
) => {
  const mp4Blob = await EncodingWebmToMp4(blob, recordTime);
  const url = window.URL.createObjectURL(mp4Blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = `${currentQuestion.questionContent}.mp4`;

  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const localDownloadWithWebm = (
  blob: Blob,
  currentQuestion: SelectedQuestion
) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = `${currentQuestion.questionContent}.webm`;

  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const EncodingWebmToMp4 = async (blob: Blob, recordTime: string) => {
  if (isIOSUser() || isAndroid()) {
    return blob;
  }

  videoRecordQueue.push({ recordTime, questionNumber: index++ });

  // if (!ffmpeg.loaded) await getFFmpeg();

  if (ffmpeg.loaded) {
    const arrayBuffer = await blob.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    // ffmpeg의 파일 시스템에 파일 작성

    await ffmpeg.writeFile('input.webm', uint8Array);

    await ffmpeg.exec([
      '-i',
      'input.webm', // 입력 파일
      '-s',
      '640x360',
      '-r',
      '30', // 프레임 레이트 설정: 30fps
      '-threads',
      '4',
      'output.mp4', // 출력 파일
    ]);

    const data = await ffmpeg.readFile('output.mp4');
    const newBlob = new Blob([data], { type: 'video/mp4' });
    toast.info('성공적으로 Mp4 인코딩이 완료되었습니다😊', {
      position: 'bottomLeft',
    });
    toast.delete(videoRecordQueue[0].toastId!);
    videoRecordQueue.shift();
    return newBlob;
  } else {
    return blob;
  }
};

/**
 * Blob 에 대한 0.1초 시점의 썸네일을 생성해, 썸네일에 대한 blob 으로 반환합니다.
 */
export const getThumbnailBlob = async (blob: Blob) => {
  const video = document.createElement('video');
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const loadVideo = new Promise((resolve) => {
    video.addEventListener('loadeddata', resolve);

    video.src = URL.createObjectURL(blob);
    video.currentTime = 0.3; // 썸네일을 캡처할 시점 (초단위)
  });

  await loadVideo;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context?.drawImage(video, 0, 0, canvas.width, canvas.height);

  return new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        resolve(new Blob());
      }
    }, 'image/png');
  });
};

const compareProgress = (logMessage: string, recordTime: string) => {
  const timeMatch = logMessage.match(
    /time=([0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{2})/
  );
  if (!timeMatch) return null;

  const currentTimeStr = timeMatch[1];
  const currentTime = convertTimeToSeconds(currentTimeStr);
  const targetTime = convertTimeToMinutes(recordTime);

  if (currentTime >= targetTime) {
    return null;
  } else {
    const progressPercent = ((currentTime / targetTime) * 100).toFixed(2);
    return `인코딩 ${progressPercent}% 진행중`;
  }
};

const convertTimeToSeconds = (timeStr: string) => {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const convertTimeToMinutes = (timeStr: string) => {
  const [minutes, seconds] = timeStr.split(':').map(Number);
  return minutes * 60 + seconds;
};
