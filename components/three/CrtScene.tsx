"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCrtScreenTexture } from "@/components/three/CrtScreenTexture";

function CrtScreen({
  animate,
  channelIndex,
}: {
  animate: boolean;
  channelIndex: number;
}) {
  const texture = useCrtScreenTexture({
    active: true,
    channelIndex,
    animate,
  });

  return (
    <mesh position={[0, 0.05, 0.23]}>
      <boxGeometry args={[1.75, 1.25, 0.02]} />
      <meshStandardMaterial
        map={texture ?? undefined}
        color={texture ? "#ffffff" : "#0a1628"}
        emissive="#4edea3"
        emissiveIntensity={texture ? 0.55 : 0.2}
        emissiveMap={texture ?? undefined}
        toneMapped={false}
      />
    </mesh>
  );
}

function CrtMonitor({
  animate,
  channelIndex,
}: {
  animate: boolean;
  channelIndex: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current || !animate) return;
    groupRef.current.rotation.y = Math.sin(performance.now() * 0.0003) * 0.15;
    groupRef.current.rotation.x = Math.sin(performance.now() * 0.0002) * 0.05;
    groupRef.current.position.y = Math.sin(performance.now() * 0.001) * 0.03;
  });

  const bezelColor = "#1a1d1f";

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      <mesh position={[0, -1.05, 0.15]} castShadow>
        <boxGeometry args={[0.9, 0.08, 0.5]} />
        <meshStandardMaterial color="#141618" metalness={0.4} roughness={0.6} />
      </mesh>
      <mesh position={[0, -1.35, 0.35]} castShadow>
        <boxGeometry args={[1.4, 0.06, 0.7]} />
        <meshStandardMaterial color="#141618" metalness={0.3} roughness={0.7} />
      </mesh>

      <mesh castShadow>
        <boxGeometry args={[2.2, 1.65, 0.45]} />
        <meshStandardMaterial color={bezelColor} metalness={0.2} roughness={0.8} />
      </mesh>

      <CrtScreen animate={animate} channelIndex={channelIndex} />

      <mesh position={[0.95, -0.72, 0.24]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial
          color="#4edea3"
          emissive="#4edea3"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}

type CrtSceneProps = {
  animate: boolean;
  channelIndex: number;
};

export function CrtScene({ animate, channelIndex }: CrtSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 3.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#191c1e"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={0.9} color="#ffffff" />
      <pointLight position={[-2, 1, 2]} intensity={0.8} color="#4edea3" />
      <CrtMonitor animate={animate} channelIndex={channelIndex} />
    </Canvas>
  );
}
