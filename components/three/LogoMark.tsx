"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { isReady, scene, SHAPES } from "@/lib/scene";
import { markShapes } from "./shapes";
import { pointer } from "./pointer";

/** The Sysnetic mark as a solid, glossy 3D object — the hero centrepiece. */
export default function LogoMark() {
  const group = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const { size } = useThree();

  const { geometry, material } = useMemo(() => {
    const shapes = markShapes(1).map((poly) => {
      const s = new THREE.Shape();
      poly.forEach(([x, y], i) => (i === 0 ? s.moveTo(x, y) : s.lineTo(x, y)));
      s.closePath();
      return s;
    });
    const geometry = new THREE.ExtrudeGeometry(shapes, {
      depth: 0.7,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.07,
      bevelSegments: 8,
      curveSegments: 1,
    });
    geometry.center();
    geometry.computeVertexNormals();
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ff1f4d"),
      metalness: 0.35,
      roughness: 0.16,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      iridescence: 0.35,
      iridescenceIOR: 1.4,
      emissive: new THREE.Color("#5a0016"),
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0,
    });
    return { geometry, material };
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    const t = state.clock.elapsedTime;
    const g = group.current!;
    const mobile = size.width < 768;
    const show = isReady() && scene.logo && scene.shape === SHAPES.galaxy;

    material.opacity = THREE.MathUtils.damp(material.opacity, show ? 1 : 0, show ? 2.2 : 5, dt);
    g.visible = material.opacity > 0.01;
    material.depthWrite = material.opacity > 0.9;

    const targetScale = (mobile ? 0.3 : 0.58) * (show ? 1 : 1.4);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, targetScale, 3, dt));
    g.position.x = THREE.MathUtils.damp(g.position.x, mobile ? 0 : scene.side * 3.9, 3, dt);
    g.position.y = (mobile ? 2.35 : 0.4) + Math.sin(t * 0.9) * 0.12;

    const s = spin.current!;
    s.rotation.y = THREE.MathUtils.damp(s.rotation.y, pointer.x * 0.55 + Math.sin(t * 0.35) * 0.25, 2.5, dt);
    s.rotation.x = THREE.MathUtils.damp(s.rotation.x, -pointer.y * 0.35 + Math.cos(t * 0.3) * 0.08, 2.5, dt);
    s.rotation.z = Math.sin(t * 0.25) * 0.05;
  });

  return (
    <group ref={group} scale={0.8}>
      <group ref={spin}>
        <mesh geometry={geometry} material={material} />
      </group>
    </group>
  );
}
