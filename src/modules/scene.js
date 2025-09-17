import * as THREE from 'three';

export function setupScene(canvas) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.22, 6.85); // Đặt camera gần hơn
  camera.lookAt(0, 2, 0); // Hướng camera vào cột gỗ
  camera.fov = 120; // Giữ FOV ở mức hợp lý
  camera.updateProjectionMatrix();
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  return { scene, camera, renderer };
}