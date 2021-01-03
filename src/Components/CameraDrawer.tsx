import React, { useState } from 'react';
import { Drawer, Button } from 'antd';

type Props = {
  number?: number;
  cameraLabels?: string[];
};

const CameraDrawer: React.FC<Props> = ({ number, cameraLabels }) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Button type="primary" size="large" onClick={() => setVisible(true)}>
        Cameras
      </Button>
      <Drawer
        visible={visible}
        placement="bottom"
        onClose={() => setVisible(false)}
      >
        <p>This is a test</p>
      </Drawer>
    </>
  );
};

export default CameraDrawer;
