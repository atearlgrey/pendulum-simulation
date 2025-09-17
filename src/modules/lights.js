import * as THREE from 'three';

export function setupLights(scene) {
  // Ambient Light
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  // Directional Light
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 10, 5);
  dirLight.castShadow = true;
  scene.add(dirLight);

  return dirLight;
}