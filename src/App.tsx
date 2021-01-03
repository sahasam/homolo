import React, { useState, useRef, Suspense } from 'react';

//Components
import { Radio, Space, Button, Drawer } from 'antd';
import { Canvas, useFrame, MeshProps, useLoader } from 'react-three-fiber';
import { Mesh, Vector3 } from 'three';
import { OrbitControls } from '@react-three/drei';
import { useGLTF } from 'drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import HouseModel from './Components/HouseModel';

//Styles
import './App.css';
//Types
import { RadioChangeEvent } from 'antd/lib/radio';

const vantage_point_names = ['Main', 'ADU'];
const vantage_point_coord = [
  [-5, -2, 10],
  [0, 0, 0],
];

// Temporary box for testing out Threejs
const Box: React.FC<MeshProps> = (props) => {
  const mesh = useRef<Mesh>();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh.current) mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

const Tokyo: React.FC = () => {
  const gltf = useLoader(GLTFLoader, './assets/3d models/LittlestTokyo.glb');
  return <primitive object={gltf.scene} position={[0, 0, 0]} />;
};

function App() {
  const [viewIndex, setViewIndex] = useState<number>(0);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  return (
    <>
      <div id="container">
        <div id="menu-container">
          <Space>
            <Radio.Group
              value={viewIndex}
              buttonStyle="solid"
              defaultValue={viewIndex.toString()}
              size="large"
              onChange={(e) => setViewIndex(e.target.value)}
            >
              {vantage_point_names.map((buttonLabel, i) => (
                <Radio.Button value={i} key={i}>
                  {buttonLabel}
                </Radio.Button>
              ))}
            </Radio.Group>

            <Button
              type="primary"
              size="large"
              onClick={() => setDrawerVisible(true)}
            >
              Cameras
            </Button>
          </Space>

          <Drawer
            visible={drawerVisible}
            onClose={() => setDrawerVisible(false)}
            placement="bottom"
          >
            <p>Sample Text</p>
          </Drawer>
        </div>

        <div id="canvas-container">
          <Canvas
            shadowMap
            colorManagement
            camera={{
              position: [0, 0, 555],
              fov: 90,
              near: 10,
              far: 100000,
            }}
          >
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={<Box />}>
              <HouseModel />
            </Suspense>
            <OrbitControls
              minPolarAngle={0}
              maxPolarAngle={(3 * Math.PI) / 5}
              maxDistance={600}
              minDistance={300}
            />
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;
