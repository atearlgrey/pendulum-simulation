import * as THREE from 'three';

export function createPendulum(scene) {
  const pivot = new THREE.Object3D();
  pivot.position.set(1, 4, 0); // Đặt pivot lệch sang phải đầu cột gỗ
  scene.add(pivot);

  let ropeLength = 3;
  const rope = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, ropeLength, 8),
    new THREE.MeshStandardMaterial({ color: 0x555555 })
  );
  rope.position.y = -ropeLength / 2; // Đặt sợi dây thẳng hàng
  pivot.add(rope);

  const bob = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x156289, roughness: 0.3, metalness: 0.6 })
  );
  bob.position.y = -ropeLength; // Đặt quả bóng ở cuối sợi dây
  bob.castShadow = true;
  pivot.add(bob);

  return { pivot, rope, bob, ropeLength };
}

export function createPendulumSupport(scene) {
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x8B4513, metalness: 0.8, roughness: 0.2 });

  // Vertical pole
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 4, 16), metalMat);
  pole.position.set(-1, 2, 0);
  pole.castShadow = true;
  pole.receiveShadow = true;
  scene.add(pole);

  // Horizontal bar
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2, 16), metalMat);
  bar.rotation.z = Math.PI / 2;
  bar.position.set(0, 4, 0);
  scene.add(bar);

  // Base
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.5), metalMat);
  base.position.set(-1, 0, 0);
  scene.add(base);
}