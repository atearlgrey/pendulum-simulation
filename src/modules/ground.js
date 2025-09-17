import * as THREE from 'three';

export function createGround(scene) {
  
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0x228B22 }) // Màu xanh lá cây cho bãi đất
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  // Mở rộng bãi cỏ để phủ đầy hai bên màn hình
  ground.scale.set(3, 3, 1); // Tăng kích thước mặt đất theo chiều ngang

  return ground;
}