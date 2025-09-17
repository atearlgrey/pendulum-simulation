import * as THREE from 'three';
import { createStarTexture } from './starTexture.js';

// === Sinh ngẫu nhiên các ngôi sao ===
export function createStars(scene) {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 200; // số lượng sao
  const positions = [];

  for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 400;
    const z = (Math.random() - 0.5) * 400;
    positions.push(x, y, z);
  }

  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  // Dùng texture vẽ bằng canvas
  const starTexture = createStarTexture();
  const starMaterial = new THREE.PointsMaterial({
    map: starTexture,
    size: 3,
    transparent: true,
    opacity: 0.9,
    depthWrite: false
  });

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  return stars;
}