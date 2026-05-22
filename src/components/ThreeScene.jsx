import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 7;
    const group = new THREE.Group();
    scene.add(group);
    const cyan = new THREE.Color(0x54f5ff);
    const red = new THREE.Color(0xff5c6c);
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const coreMat = new THREE.MeshBasicMaterial({ color: cyan, wireframe: true, transparent: true, opacity: 0.28 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);
    const torusItems = [];
    [2.1, 2.8, 3.35].forEach((radius, i) => {
      const geo = new THREE.TorusGeometry(radius, 0.008, 8, 140);
      const mat = new THREE.MeshBasicMaterial({ color: i === 1 ? red : cyan, transparent: true, opacity: i === 2 ? 0.14 : 0.24 });
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.x = Math.PI / (2.4 + i * 0.2);
      ring.rotation.y = i * 0.45;
      torusItems.push([geo, mat]);
      group.add(ring);
    });
    const count = reduced ? 160 : 420;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      const c = Math.random() > 0.76 ? red : cyan;
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.78 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);
    let frame = 0;
    let last = 0;
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const animate = (time) => {
      if (reduced || time - last > 33) {
        last = time;
        group.rotation.y += 0.004;
        group.rotation.x += 0.0015;
        core.scale.setScalar(1 + Math.sin(time * 0.0018) * 0.03);
        stars.rotation.y = time * 0.00003;
        renderer.render(scene, camera);
      }
      if (!reduced) frame = window.requestAnimationFrame(animate);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    frame = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      coreGeo.dispose(); coreMat.dispose(); starGeo.dispose(); starMat.dispose();
      torusItems.forEach(([geo, mat]) => { geo.dispose(); mat.dispose(); });
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="three-scene" aria-hidden="true" />;
}
