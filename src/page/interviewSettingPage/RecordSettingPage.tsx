import { RecordMethod, recordSetting } from '@/atoms/interviewSetting';
import { Description, RecordRadio } from '@components/interviewSettingPage';
import { css } from '@emotion/react';
import useUserInfo from '@hooks/useUserInfo';
import { useRecoilState } from 'recoil';
import InterviewSettingContentLayout from '@components/interviewSettingPage/InterviewSettingContentLayout';

type RecordSettingPageProps = {
  onNextClick?: () => void;
  onPrevClick?: () => void;
};

const RecordSettingPage: React.FC<RecordSettingPageProps> = ({
  onNextClick,
  onPrevClick,
}) => {
  const [setting, setSetting] = useRecoilState(recordSetting);
  const userInfo = useUserInfo();
  const handleRecordChange = (name: RecordMethod) => {
    setSetting({
      isSuccess: true,
      method: name,
    });
  };

  return (
    <InterviewSettingContentLayout
      onPrevClick={onPrevClick}
      onNextClick={onNextClick}
      disabledNext={!setting.isSuccess}
    >
      <Description title="녹화 설정">
        - 면접 시작 전, 사용하시는 장치의 화면 및 소리가 정상적으로 연결되어
        있는지 확인해 주세요.
        <br />
        - 헤드셋이나 이어폰을 사용하시면 더욱 명료한 소리로 면접에 참여하실 수
        있습니다.
        <br />
        - 화면이나 소리에 문제가 있을 경우, 잠시 면접을 중단하시고 문제를 해결한
        뒤 이어나가 주세요.
        <br />- 기타 기술적인 문제나 화면 공유 문제가 있으시면, 채팅창이나
        연락처를 통해 알려주시길 바랍니다.
      </Description>
      {/* TODO: 엔터 인식해서 자동으로 줄바꿈 해주는 기능 추가 */}
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-grow: 1;
          width: 100%;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 2rem;
            width: 30rem;
          `}
        >
          <RecordRadio
            group="record"
            IconId="save-idrive"
            onChange={() => handleRecordChange('idrive')}
            disabled={!userInfo}
            defaultChecked={setting.method === 'idrive'}
          >
            서버에 저장
          </RecordRadio>
          <RecordRadio
            group="record"
            IconId="save-local"
            onChange={() => handleRecordChange('local')}
            defaultChecked={setting.method === 'local'}
          >
            로컬에 저장
          </RecordRadio>
          <RecordRadio
            group="record"
            IconId="save-not"
            onChange={() => handleRecordChange('none')}
            defaultChecked={setting.method === 'none'}
          >
            저장하지 않음
          </RecordRadio>
        </div>
      </div>
    </InterviewSettingContentLayout>
  );
};
export default RecordSettingPage;
