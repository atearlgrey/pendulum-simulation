import * as THREE from 'three';

// === Tạo hành tinh ===
export function createPlanet(scene) {
  const planetTexture = new THREE.TextureLoader().load(
    import.meta.env.BASE_URL + 'textures/planet.jpg'
  );
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(15, 64, 64),
    new THREE.MeshStandardMaterial({
      map: planetTexture,
      side: THREE.DoubleSide // Ensure texture is applied to all sides
    })
  );
  planet.position.set(0, 25, -50);
  scene.add(planet);

  return planet;
}