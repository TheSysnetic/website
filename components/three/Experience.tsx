"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, PerformanceMonitor } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useEffect, useState } from "react";
import Particles from "./Particles";
import LogoMark from "./LogoMark";
import { bindPointer } from "./pointer";

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-5, -2, 3]} intensity={30} color="#3d6bff" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={4} position={[0, 4, 4]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#3d6bff" position={[-6, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 4, 1]} />
        <Lightformer form="rect" intensity={2} color="#ff1f4d" position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 4, 1]} />
        <Lightformer form="ring" intensity={3} position={[2, 2, -6]} scale={4} />
      </Environment>
    </>
  );
}

export default function Experience() {
  const [highQuality, setHighQuality] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    bindPointer();
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const lowCpu = (navigator.hardwareConcurrency ?? 8) <= 4;
    setCount(mobile || lowCpu ? 7000 : 16000);
    if (mobile) setHighQuality(false);
  }, []);

  if (!count) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Canvas
        dpr={[1, highQuality ? 1.75 : 1.25]}
        camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance", stencil: false }}
      >
        <color attach="background" args={["#05070f"]} />
        <PerformanceMonitor onDecline={() => setHighQuality(false)} flipflops={2} />
        <Lighting />
        <Particles count={count} />
        <LogoMark />
        {highQuality && (
          <EffectComposer multisampling={0}>
            <Bloom mipmapBlur intensity={1.1} luminanceThreshold={0.18} luminanceSmoothing={0.3} radius={0.72} />
            <Vignette eskil={false} offset={0.25} darkness={0.7} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
