import React, { useState, useRef } from 'react';

//Components
import { Radio, Row } from 'antd';
import { Canvas, useFrame, MeshProps } from 'react-three-fiber';
import type { Mesh } from 'three';
import { OrbitControls } from '@react-three/drei';

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

function App() {
  const [viewIndex, setViewIndex] = useState<number>(0);

  return (
    <>
      <div id="container">
        <div id="menu-container">
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
        </div>

        <div id="canvas-container">
          <Canvas
            shadowMap
            colorManagement
            camera={{ position: [-5, -2, 10], fov: 90 }}
          >
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;
