import { css } from '@emotion/react';
import { Button, Menu, MenuItem } from '@foundation/index';
import useMedia from '@hooks/useMedia';
import { useState } from 'react';

const VideoSelectMenu = () => {
  const [videoMenuOpen, setVideoMenuOpen] = useState(false);
  const {
    deviceList,
    startMedia,
    stopMedia,
    selectedDevice,
    setSelectedDeviceIndex,
  } = useMedia();

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <Button onClick={() => setVideoMenuOpen(true)}>
        {selectedDevice.video.label}
      </Button>
      <Menu
        open={videoMenuOpen}
        closeMenu={() => setVideoMenuOpen(false)}
        css={css`
          border: 1px solid #e0e0e0;
        `}
      >
        {deviceList.video.map((device, index) => (
          <MenuItem
            key={device.deviceId}
            onClick={() => {
              setSelectedDeviceIndex((pre) => ({
                ...pre,
                video: index,
              }));
              stopMedia();
              void startMedia({
                audioDeviceId: selectedDevice.audioInput.deviceId,
                videoDeviceId: device.deviceId,
              });
            }}
            css={css`
              text-align: left;
            `}
          >
            {device.deviceId === selectedDevice.video.deviceId && '[선택됨] '}
            {device.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default VideoSelectMenu;
