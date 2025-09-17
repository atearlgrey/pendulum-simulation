import * as THREE from 'three';

// === Tạo texture ngôi sao 4 cánh từ Canvas ===
export function createStarTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, size, size);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 6;

  // Vẽ 2 đường chéo tạo thành 4 cánh
  ctx.beginPath();
  ctx.moveTo(size / 2, 0);
  ctx.lineTo(size / 2, size);
  ctx.moveTo(0, size / 2);
  ctx.lineTo(size, size / 2);
  ctx.stroke();

  // Vẽ vòng tròn ở giữa
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 8, 0, Math.PI * 2);
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}