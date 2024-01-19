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
       * 부연 설명: clean up함수는 이전의 status를 가지고 있기 때문에 캠 및 오디오의 연결이 끊어졌다가 다시 연결되면 해당 로직이 실행됨
       * 즉 브라우저의 권한으로 인해서 미디어가 끊어진다면 event가 감지가 되서 status가 fail이 된 후 해당 clean up이 실행됨 따라서 stopMedia가 실행이 되고 status가 pending상태가 됨
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
