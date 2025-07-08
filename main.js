// main.js

import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0d8ef);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas3d'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// === Cahaya ===
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(3, 10, 10);
dirLight.castShadow = true;
scene.add(dirLight);

// === Tanah ===
const groundTexture = new THREE.TextureLoader().load('assets/textures/grass.jpg');
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(50, 50);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshStandardMaterial({ map: groundTexture })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// === Karakter Utama (Player Box Placeholder) ===
const player = new THREE.Mesh(
  new THREE.BoxGeometry(1, 2, 1),
  new THREE.MeshStandardMaterial({ color: 0xffcc99 })
);
player.position.y = 1;
scene.add(player);

// === NPC ===
const npc = new THREE.Mesh(
  new THREE.BoxGeometry(1, 2, 1),
  new THREE.MeshStandardMaterial({ color: 0x99ccff })
);
npc.position.set(5, 1, 5);
scene.add(npc);

// === Dialog NPC ===
const dialogBox = document.getElementById('dialog-box');
const dialogLines = [
  "Hai! Aku Shira.",
  "Selamat datang di Dunia Juf.",
  "Jangan ragu bertualang di sini ya."
];
let dialogIndex = 0;
let showDialog = false;

document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'e' && player.position.distanceTo(npc.position) < 2.5) {
    showDialog = true;
    dialogBox.innerText = dialogLines[dialogIndex];
    dialogBox.style.display = 'block';
    dialogIndex = (dialogIndex + 1) % dialogLines.length;
  }
});

// === Joystick Kontrol ===
let velocity = { x: 0, y: 0 };
new window.VirtualJoystick("joystick-container", (dir) => {
  velocity = dir;
});

// === Kamera dan Gerakan ===
function animate() {
  requestAnimationFrame(animate);

  player.position.x += velocity.x * 0.1;
  player.position.z += velocity.y * 0.1;

  camera.position.x = player.position.x;
  camera.position.z = player.position.z + 5;
  camera.lookAt(player.position);

  const dist = player.position.distanceTo(npc.position);
  if (dist < 2) {
    if (!showDialog) dialogBox.style.display = 'block';
  } else {
    dialogBox.style.display = 'none';
    showDialog = false;
  }

  renderer.render(scene, camera);
}
animate();
