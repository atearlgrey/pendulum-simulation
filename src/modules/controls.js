import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function setupControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 5; // Khoảng cách gần nhất
  controls.maxDistance = 20; // Khoảng cách xa nhất
  return controls;
}