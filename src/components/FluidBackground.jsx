"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function AnimatedSphere() {
  const sphereRef = useRef();

  useFrame((state) => {
    const { x, y } = state.pointer;
    // Gently tilt the fluid sphere toward mouse coordinates
    sphereRef.current.rotation.x = THREE.MathUtils.lerp(sphereRef.current.rotation.x, y * 0.4, 0.1);
    sphereRef.current.rotation.y = THREE.MathUtils.lerp(sphereRef.current.rotation.y, x * 0.4, 0.1);
  });

  return (
    <Sphere ref={sphereRef} args={[4, 128, 128]} scale={1.6}>
      <MeshDistortMaterial 
        color="#002266" 
        attach="material" 
        distort={0.5} 
        speed={2} 
        roughness={0.15}
        metalness={0.9}
        emissive="#001133"
      />
    </Sphere>
  );
}

export default function FluidBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 2]} intensity={2} color="#00E5FF" />
        <directionalLight position={[-3, -5, -2]} intensity={1.5} color="#001A4D" />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}