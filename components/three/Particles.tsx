"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { scene, SHAPES, isReady } from "@/lib/scene";
import { buildAttributes, buildShapes } from "./shapes";
import { pointer } from "./pointer";

const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
uniform float uScatter;
uniform float uWave;
uniform vec3 uMouse;
attribute float aRandom;
attribute vec3 aColor;
varying vec3 vColor;
varying float vAlpha;
${noise}
void main(){
  vec3 p = position;
  float t = uTime * 0.12;
  // living drift + scatter burst during morphs
  vec3 drift = vec3(
    snoise(p * 0.35 + vec3(t, 0.0, 0.0)),
    snoise(p * 0.35 + vec3(0.0, t + 17.0, 0.0)),
    snoise(p * 0.35 + vec3(0.0, 0.0, t + 31.0))
  );
  p += drift * (0.05 + uScatter * (0.6 + aRandom));
  // rolling terrain for the wave state
  p.y += uWave * (sin(p.x * 0.55 + uTime * 0.9) * 0.45 + cos(p.z * 0.7 + uTime * 0.7) * 0.35);

  vec4 world = modelMatrix * vec4(p, 1.0);
  // cursor repulsion (screen-plane distance in world space)
  vec2 d = world.xy - uMouse.xy;
  float dist = length(d);
  float push = smoothstep(1.8, 0.0, dist);
  world.xy += normalize(d + 0.0001) * push * 0.55;
  world.z += push * 0.6;

  vec4 mv = viewMatrix * world;
  gl_Position = projectionMatrix * mv;
  float twinkle = 0.75 + 0.25 * sin(uTime * 2.0 + aRandom * 40.0);
  gl_PointSize = uSize * (0.35 + aRandom * 0.9) * twinkle * uPixelRatio / -mv.z;
  vColor = mix(aColor, vec3(1.0, 0.25, 0.4), push * 0.8);
  vAlpha = 0.35 + 0.65 * aRandom;
}`;

const fragmentShader = /* glsl */ `
uniform float uOpacity;
varying vec3 vColor;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.05, d);
  a *= a;
  gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
}`;

type ShapeLayout = { x: number; y: number; scale: number };

function layoutFor(shape: number, side: number, mobile: boolean): ShapeLayout {
  if (mobile) {
    switch (shape) {
      case SHAPES.wave:
        return { x: 0, y: -2.6, scale: 0.75 };
      case SHAPES.helix:
        return { x: 0, y: 0, scale: 0.55 };
      case SHAPES.logo:
        return { x: 0, y: 1.2, scale: 0.55 };
      case SHAPES.galaxy:
        return { x: 0, y: 2.2, scale: 0.5 };
      default:
        return { x: 0, y: 0.8, scale: 0.6 };
    }
  }
  switch (shape) {
    case SHAPES.galaxy:
      return { x: side * 3.4, y: 0.3, scale: 0.78 };
    case SHAPES.logo:
      return { x: side * 2.8, y: 0, scale: 0.85 };
    case SHAPES.sphere:
      return { x: side * 3.2, y: 0, scale: 1 };
    case SHAPES.wave:
      return { x: 0, y: -2.4, scale: 1 };
    case SHAPES.helix:
      return { x: 0, y: 0, scale: 1 };
    default:
      return { x: 0, y: 0, scale: 1 };
  }
}

function dampAngle(current: number, target: number, k: number) {
  const diff = ((((target - current + Math.PI) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) - Math.PI;
  return current + diff * k;
}

export default function Particles({ count }: { count: number }) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const { camera, size, gl } = useThree();

  const data = useMemo(() => {
    const { scatter, targets } = buildShapes(count);
    const attrs = buildAttributes(count);
    const geometry = new THREE.BufferGeometry();
    const positions = scatter.slice();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(attrs.colors, 3));
    geometry.setAttribute("aRandom", new THREE.BufferAttribute(attrs.randoms, 1));
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 50);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
        uSize: { value: 70 },
        uScatter: { value: 0 },
        uWave: { value: 0 },
        uOpacity: { value: 0 },
        uMouse: { value: new THREE.Vector3(99, 99, 0) },
      },
    });
    return { geometry, material, positions, scatter, targets, speeds: attrs.speeds };
  }, [count]);

  const tmp = useMemo(() => ({ v: new THREE.Vector3(), dir: new THREE.Vector3(), mouse: new THREE.Vector3(99, 99, 0) }), []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    const t = state.clock.elapsedTime;
    const mobile = size.width < 768;
    const ready = isReady();
    const shape = scene.shape;
    const target = ready ? data.targets[shape] : data.scatter;

    // CPU morph: each particle eases toward its target at its own pace (organic, interruptible)
    const pos = data.positions;
    const speeds = data.speeds;
    // frame-rate independent: uses real (lightly capped) delta so slow devices morph just as fast
    const base = 1 - Math.pow(1 - 0.045, Math.min(delta, 0.1) * 60);
    for (let i = 0, n = speeds.length; i < n; i++) {
      const k = base * speeds[i];
      const j = i * 3;
      pos[j] += (target[j] - pos[j]) * k;
      pos[j + 1] += (target[j + 1] - pos[j + 1]) * k;
      pos[j + 2] += (target[j + 2] - pos[j + 2]) * k;
    }
    data.geometry.attributes.position.needsUpdate = true;

    const u = data.material.uniforms;
    u.uTime.value = t;
    u.uPixelRatio.value = gl.getPixelRatio();
    u.uSize.value = mobile ? 55 : 70;
    const since = (performance.now() - scene.changedAt) / 1000;
    const burst = scene.changedAt ? Math.sin(Math.min(since / 1.4, 1) * Math.PI) : 0;
    u.uScatter.value = THREE.MathUtils.damp(u.uScatter.value, burst * 0.9, 6, dt);
    u.uWave.value = THREE.MathUtils.damp(u.uWave.value, shape === SHAPES.wave ? 1 : 0, 3, dt);
    // on small screens particles sit behind body copy, so keep them calmer outside the hero
    const mobileDim = mobile && !(scene.logo && shape === SHAPES.galaxy) ? 0.55 : 1;
    const opacityTarget = ready ? scene.intensity * mobileDim * (scene.logo && shape === SHAPES.galaxy ? 0.85 : 1) : 0.0;
    u.uOpacity.value = THREE.MathUtils.damp(u.uOpacity.value, opacityTarget, ready ? 1.6 : 4, dt);

    // project the cursor onto the z=0 plane
    tmp.v.set(pointer.x, pointer.y, 0.5).unproject(camera);
    tmp.dir.copy(tmp.v).sub(camera.position).normalize();
    const dist = -camera.position.z / tmp.dir.z;
    tmp.mouse.copy(camera.position).addScaledVector(tmp.dir, dist);
    if (!pointer.active) tmp.mouse.set(99, 99, 0);
    (u.uMouse.value as THREE.Vector3).lerp(tmp.mouse, 1 - Math.pow(0.001, dt));

    // layout & motion per state
    const L = layoutFor(shape, scene.side, mobile);
    const g = outer.current!;
    g.position.x = THREE.MathUtils.damp(g.position.x, L.x, 2.2, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, L.y, 2.2, dt);
    const s = THREE.MathUtils.damp(g.scale.x, L.scale, 2.2, dt);
    g.scale.setScalar(s);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.y * 0.12, 2, dt);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * 0.18, 2, dt);

    const r = inner.current!;
    let rx = 0;
    let ry = 0;
    let rz = 0;
    switch (shape) {
      case SHAPES.galaxy:
        ry = t * 0.06;
        break;
      case SHAPES.logo:
        ry = Math.sin(t * 0.5) * 0.35;
        rx = Math.sin(t * 0.3) * 0.08;
        break;
      case SHAPES.sphere:
        ry = t * 0.15;
        rz = 0.3;
        break;
      case SHAPES.wave:
        rx = 0.32;
        ry = Math.sin(t * 0.15) * 0.12;
        break;
      case SHAPES.helix:
        rx = t * 0.35;
        rz = mobile ? Math.PI / 2 : -0.18;
        break;
    }
    const k = 1 - Math.pow(0.02, dt);
    r.rotation.x = dampAngle(r.rotation.x, rx, k);
    r.rotation.y = dampAngle(r.rotation.y, ry, k);
    r.rotation.z = dampAngle(r.rotation.z, rz, k);
  });

  return (
    <group ref={outer}>
      <group ref={inner}>
        <points geometry={data.geometry} material={data.material} frustumCulled={false} />
      </group>
    </group>
  );
}
