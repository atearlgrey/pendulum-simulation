import * as THREE from 'three';
import { setupControls } from './modules/controls.js';
import { createBackground } from './background.js';
import { createGround } from './modules/ground.js';
import { setupLights } from './modules/lights.js';
import { setupScene } from './modules/scene.js';
import { createPendulumSupport, createPendulum } from './modules/pendulum.js';

// ====== Scene, Camera, Renderer ======
const canvas = document.querySelector('#app');
const { scene, camera, renderer } = setupScene(canvas);

const controls = setupControls(camera, renderer);

// ====== Background Planet ======
const planet = createBackground(scene);

// ====== Light ======
setupLights(scene);

// ====== Pendulum Support (L-shaped stand) ======
createPendulumSupport(scene);

// ====== Pendulum ======
const { pivot, rope, bob, ropeLength } = createPendulum(scene);

// ====== Ground ======
const ground = createGround(scene);
scene.add(ground);

// ====== Variables ======
let isDragging = false;
let isRunning = false;
let startTime = 0;
let alpha0 = 0; // biên độ góc
let phi = 0;
const g = 9.81;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const clock = new THREE.Clock();

// ====== Mouse events ======
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);

function onMouseDown(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(bob);
  if (intersects.length > 0) {
    isDragging = true;
    isRunning = false;
    controls.enabled = false; // Vô hiệu hóa camera khi kéo quả cầu
  }
}

function onMouseMove(event) {
  if (!isDragging) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const pos = new THREE.Vector3();
  raycaster.ray.intersectPlane(plane, pos);

  const dx = pos.x - pivot.position.x;
  const dy = pos.y - pivot.position.y;
  const theta = Math.atan2(dx, -dy);

  pivot.rotation.z = theta;
  alpha0 = theta; // lưu biên độ
}

function onMouseUp() {
  if (isDragging) {
    isDragging = false;
    isRunning = true;
    startTime = clock.getElapsedTime();
    phi = 0;
    controls.enabled = true; // Bật lại camera sau khi thả chuột
  }
}

// ====== Camera Info ======
function updateCameraInfo() {
  const position = `(${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)})`;
  const lookAt = '(0, 2, 0)'; // Giá trị cố định từ camera.lookAt
  const fov = camera.fov.toFixed(2);
  const aspect = camera.aspect.toFixed(2);
  const near = camera.near.toFixed(2);
  const far = camera.far.toFixed(2);

  document.getElementById('camera-position').textContent = position;
  document.getElementById('camera-lookat').textContent = lookAt;
  document.getElementById('camera-fov').textContent = fov;
  document.getElementById('camera-aspect').textContent = aspect;
  document.getElementById('camera-near').textContent = near;
  document.getElementById('camera-far').textContent = far;
}

// ====== Animate ======
function animate() {
  requestAnimationFrame(animate);

  const t = clock.getElapsedTime();

  let alpha = 0, velocity = 0, accel = 0;

  if (isRunning && !isDragging) {
    const elapsed = t - startTime;
    const omega = Math.sqrt(g / ropeLength);
    alpha = alpha0 * Math.cos(omega * elapsed + phi);

    pivot.rotation.z = alpha;

    const S = ropeLength * alpha0; // biên độ cung
    velocity = -omega * S * Math.sin(omega * elapsed + phi);
    accel = -omega * omega * ropeLength * alpha; 
  } else {
    // nếu đang kéo thì hiển thị góc kéo
    alpha = pivot.rotation.z;
  }

  // Update overlay text
  document.getElementById('alpha').textContent = alpha.toFixed(3);
  document.getElementById('velocity').textContent = velocity.toFixed(3);
  document.getElementById('acceleration').textContent = accel.toFixed(3);

  // Cập nhật thông số camera
  updateCameraInfo();

  // Xoay hành tinh
  planet.planet.rotation.y += 0.001;
  planet.stars.rotation.y += 0.0005;
  renderer.render(scene, camera);
}
animate();

// ====== Resize ======
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.getElementById('apply-settings').addEventListener('click', () => {
  const ropeLengthInput = parseFloat(document.getElementById('rope-length').value);
  const bobWeightInput = parseFloat(document.getElementById('bob-weight').value);

  if (ropeLengthInput > 0 && bobWeightInput > 0) {
    ropeLength = ropeLengthInput;

    // Update rope length
    rope.scale.y = ropeLength / 3; // Scale dựa trên chiều dài ban đầu là 3
    rope.position.y = -ropeLength / 2;

    // Update bob weight
    bob.geometry.dispose();
    bob.geometry = new THREE.SphereGeometry(Math.cbrt(bobWeightInput) * 0.2, 32, 32);
    bob.position.y = -ropeLength;
  } else {
    alert('Please enter valid values for rope length and bob weight.');
  }
});

