// background.js
import * as THREE from 'three';
import { createStars } from './modules/stars.js';
import { createPlanet } from './modules/planet.js';

export function createBackground(scene) {
  // Cập nhật màu bầu trời
  scene.background = new THREE.Color('#000010');

  // === Hành tinh ===
  const planet = createPlanet(scene);

  // === Sao trời ===
  const stars = createStars(scene);

  return { planet, stars };
}
