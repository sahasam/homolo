import React, { useState } from 'react';
import { Drawer, Divider, Button, Space, Table, Tag } from 'antd';

const { Column } = Table;

const data = [
  {
    key: '1',
    name: 'Camera 1',
    ip: '192.168.55.5',
    location: 'South Wall',
    tags: ['Movement', 'Live'],
    actions: ['Live', 'History'],
  },
  {
    key: '2',
    name: 'Camera 2',
    ip: '192.168.55.5',
    location: 'North Wall',
    tags: ['Movement', 'Live'],
    actions: ['Live', 'History'],
  },
  {
    key: '3',
    name: 'Camera 3',
    ip: '192.168.55.5',
    location: 'East Wall',
    tags: ['Movement', 'Live'],
    actions: ['Live', 'History'],
  },
  {
    key: '4',
    name: 'Camera 4',
    ip: '192.168.55.5',
    location: 'West Wall',
    tags: ['Disabled'],
    actions: ['Enable', 'History'],
  },
  {
    key: '5',
    name: 'Camera 5',
    ip: '192.168.55.5',
    location: 'Side Gate',
    tags: ['Disconnected'],
    actions: ['History'],
  },
  {
    key: '6',
    name: 'Camera 6',
    ip: '192.168.55.5',
    location: 'Front Yard',
    tags: ['Movement', 'Live'],
    actions: ['Live', 'History'],
  },
  {
    key: '7',
    name: 'Camera 7',
    ip: '192.168.55.5',
    location: 'Backyard',
    tags: ['Movement', 'Live'],
    actions: ['Live', 'History'],
  },
];

const CamerasTable = () => {
  return (
    <Table pagination={false} dataSource={data}>
      <Column title="Camera Name" key="name" dataIndex="name" />
      <Column title="IP" key="ip" dataIndex="ip" />
      <Column title="Location" key="location" dataIndex="location" />
      <Column
        title="tags"
        key="tags"
        dataIndex="tags"
        render={(tags) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'Disabled' || tag === 'Disconnected') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        )}
      />
      <Column
        title=""
        key="actions"
        render={(text, record) => {
          return (
            <Space>
              {record.tags.includes('Disabled') ? (
                <Button type="link" danger>
                  Enable
                </Button>
              ) : (
                <Button type="link" danger>
                  Disable
                </Button>
              )}
              <Button
                type="link"
                disabled={
                  record.tags.includes('Disabled') ||
                  record.tags.includes('Disconnected')
                }
              >
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

const CameraDrawer = ({ number, cameraLabels }) => {
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