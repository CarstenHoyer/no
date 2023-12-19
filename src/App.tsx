import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model } from "./Model";
import { useRef, useState } from "react";
import { Box3 } from "three";

const Scene = () => {
  const modelRef = useRef<any>();
  const [zoomed, setZoomed] = useState(false);

  useFrame(({ camera }) => {
    if (!zoomed) {
      if (modelRef.current?.children.length) {
        const bbox = new Box3();
        bbox.setFromObject(modelRef.current.children[0]);
        const z = modelRef.current.children[0].position.z;
        camera.position.set(
          camera.position.x,
          camera.position.y,
          z + Math.abs(bbox.max.z + bbox.min.z) * 10
        );
        camera.lookAt(modelRef.current.children[0].position);
        console.log("zoomed");
        setZoomed(true);
      }
    }
  });

  return (
    <>
      <OrbitControls autoRotate={true} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} intensity={70} />
      <group ref={modelRef}>
        <Model />
      </group>
    </>
  );
};

function App() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}

export default App;
