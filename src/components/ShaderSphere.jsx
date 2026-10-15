import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ShaderSphere() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 80;
    const height = container.clientHeight || 80;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 2.45;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Dynamic Radiant Chrome Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const rimLightBlue = new THREE.DirectionalLight(0x70a5ff, 3.5);
    rimLightBlue.position.set(-4, -2, -2);
    scene.add(rimLightBlue);

    const topFill = new THREE.DirectionalLight(0xfff0dd, 2.5);
    topFill.position.set(0, 5, 2);
    scene.add(topFill);

    const frontPoint = new THREE.PointLight(0xffffff, 2.8, 12);
    frontPoint.position.set(0, 0, 3);
    scene.add(frontPoint);

    // Create 3D Faceted Tech Crystal / Sphere
    const geometry = new THREE.SphereGeometry(0.88, 64, 64);

    // Procedural Polished Liquid Chrome Material
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xf0f4ff),
      metalness: 0.96,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 1.0,
      iridescence: 0.95,
      iridescenceIOR: 1.65,
      iridescenceThicknessRange: [150, 450],
      sheen: 0.5,
      sheenColor: new THREE.Color(0xaaccff)
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth || 80;
      const h = container.clientHeight || 80;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth auto rotation
      mesh.rotation.y = elapsed * 0.7;
      mesh.rotation.x = Math.sin(elapsed * 0.45) * 0.28;

      // Mouse inertia follow
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      mesh.position.x = mouseX * 0.12;
      mesh.position.y = mouseY * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
        filter: 'drop-shadow(0 4px 16px rgba(100, 160, 255, 0.4))'
      }}
    />
  );
}
