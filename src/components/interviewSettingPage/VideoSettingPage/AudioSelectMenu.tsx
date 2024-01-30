import { css } from '@emotion/react';
import { Button, Menu, MenuItem } from '@foundation/index';
import useDevice from '@hooks/useDevice';
import useMedia from '@hooks/useMedia';
import { useState } from 'react';

const AudioSelectMenu = () => {
  const [micMenuOpen, setMicMenuOpen] = useState(false);
  const { startMedia, stopMedia } = useMedia();
  const { deviceList, selectedDevice, setSelectedDeviceIndex } = useDevice();

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      {selectedDevice.audioInput?.label && (
        <>
          <Button onClick={() => setMicMenuOpen(true)}>
            {selectedDevice.audioInput.label}
          </Button>
          <Menu
            open={micMenuOpen}
            closeMenu={() => setMicMenuOpen(false)}
            css={css`
              border: 1px solid #e0e0e0;
            `}
          >
            {deviceList.audioInput.map((device, index) => (
              <MenuItem
                key={device.deviceId}
                onClick={() => {
                  setSelectedDeviceIndex((pre) => ({
                    ...pre,
                    audioInput: index,
                  }));
                  stopMedia();
                  void startMedia({
                    audioDeviceId: device.deviceId,
                    videoDeviceId: selectedDevice.video?.deviceId,
                  });
                }}
                css={css`
                  text-align: left;
                `}
              >
                {device.deviceId === selectedDevice.audioInput?.deviceId &&
                  '[선택됨] '}
                {device.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </div>
  );
};

export default AudioSelectMenu;
