import { Outlet } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import useMedia from '@hooks/useMedia';
import useInterviewSettings from '@hooks/atoms/useInterviewSettings';

const MediaStreamPage = () => {
  const { resetAllSettings } = useInterviewSettings();
  const { stopMedia, connectStatus } = useMedia();
  const preConnectStatus = useRef(connectStatus);
  // 이전의 connectStatus 상태를 serving해주는 ref

  preConnectStatus.current = connectStatus;

  useEffect(() => {
    return () => {
      if (preConnectStatus.current === 'fail') return;
      // EDGE: 연결 도중 권한 문제로 끊어진다면 stopMedia를 실행해서 status를 pending상태로 만들지 않는다.
      /**
       * 부연 설명: clean up함수는 이전의 status를 가지고 있기 때문에 캠 및 오디오의 연결이 끊어졌다가 다시 연결되면 해당 로직이 실행되고 connectStatus가 이전 랜더링의 state를 가지고 있음.
       * 1. 권한 문제로 끊어지면 connectStatus로 인해서 effect가 실행이된다.
       * 2. 다만 권한문제로 끊어지면 connectStatus가 fail이지만 clean up 함수는 이전의 connectStatus인 connect를 가지고 있다.
       * 3. 따라서 이전의 connectStatus가 connect이기 때문에 stopMedia가 실행이 되어 버리고 최종적으로는 connectStatus가 pending이 되어버린다.
       * 4. 따라서 연결이 비 정상적으로 끊어지면 connectStatus는 pending이 되어버리는 결론이 난다.
       *
       */
      if (connectStatus === 'connect') stopMedia();
    };
  }, [connectStatus, stopMedia]);

  useEffect(() => {
    return () => {
      resetAllSettings();
    };
  }, [resetAllSettings]);

  return <Outlet />;
};

export default MediaStreamPage;
