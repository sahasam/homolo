import { useGLTF } from 'drei';

export default function HouseModel() {
  const gltf = useGLTF('/LittlestTokyo.glb');
  return <primitive object={gltf.scene} position={[0, 0, 0]} />;
}
