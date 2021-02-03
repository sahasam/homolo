import React, { useEffect, useState } from "react";
import { Drawer, Divider, Button, Space, Table, Tag } from "antd";
import axios from "axios";

const { Column } = Table;

const CamerasTable = () => {
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:8000/camera");

        setCameras(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Table pagination={false} dataSource={cameras}>
      <Column title="Camera Name" key="cam_id" dataIndex="cam_name" />
      <Column title="IP" key="cam_id" dataIndex="cam_ip" />
      <Column title="Location" key="cam_id" dataIndex="location" />
      <Column
        title="Status"
        key="cam_status"
        data_index="cam_status"
        render={(entry) => {
          const status = entry.status;
          return (
            <Space>
              {status === 0 ? (
                <Button type="link" danger>
                  Enable
                </Button>
              ) : (
                <Button type="link" danger>
                  Disable
                </Button>
              )}
              <Button type="link" disabled={status === 0}>
                View
              </Button>
              <Button type="link">History</Button>
            </Space>
          );
        }}
      />
    </Table>
  );
};

const MovementTable = (props) => {
  const [data, setData] = useState([]);

  const url = `http://localhost:8000/camera/${props.cam_id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await axios.get(url);
        setData(req.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
};

const CameraDrawer = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" size="large" onClick={() => setVisible(true)}>
        Cameras
      </Button>
      <Drawer
        visible={visible}
        placement="top"
        height={600}
        onClose={() => setVisible(false)}
        footer={
          <Button type="primary" danger onClick={() => setVisible(false)}>
            Close
          </Button>
        }
      >
        <CamerasTable />
        <Divider />
        <Button type="primary">Add New Camera</Button>
      </Drawer>
    </>
  );
};

export default CameraDrawer;
