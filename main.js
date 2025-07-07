
import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // biru langit

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 5);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas3d') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Pencahayaan
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Tanah
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Karakter (kotak placeholder)
const characterGeometry = new THREE.BoxGeometry(1, 2, 1);
const characterMaterial = new THREE.MeshLambertMaterial({ color: 0xffcc00 });
const character = new THREE.Mesh(characterGeometry, characterMaterial);
character.position.y = 1;
scene.add(character);

// Kontrol gerak sederhana
const keys = {};
document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

function animate() {
  requestAnimationFrame(animate);

  const speed = 0.1;
  if (keys['w']) character.position.z -= speed;
  if (keys['s']) character.position.z += speed;
  if (keys['a']) character.position.x -= speed;
  if (keys['d']) character.position.x += speed;

  camera.position.x = character.position.x;
  camera.position.z = character.position.z + 5;
  camera.lookAt(character.position);

  renderer.render(scene, camera);
}
animate();
