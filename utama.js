import * as THREE from 'https://cdn.skypack.dev/three';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(hemiLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(3, 10, 10);
scene.add(dirLight);

const textureLoader = new THREE.TextureLoader();
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshStandardMaterial({ color: 0x228B22 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const player = new THREE.Group();
const body = new THREE.Mesh(new THREE.BoxGeometry(1, 1.8, 0.6), new THREE.MeshStandardMaterial({ color: 0xeee8aa }));
body.position.y = 0.9;
player.add(body);
const head = new THREE.Mesh(new THREE.SphereGeometry(0.4), new THREE.MeshStandardMaterial({ color: 0xffdab9 }));
head.position.y = 2.1;
player.add(head);
scene.add(player);

const npc = new THREE.Group();
const npcBody = new THREE.Mesh(new THREE.BoxGeometry(1, 1.8, 0.6), new THREE.MeshStandardMaterial({ color: 0x8ac }));
npcBody.position.y = 0.9;
npc.add(npcBody);
const npcHead = new THREE.Mesh(new THREE.SphereGeometry(0.4), new THREE.MeshStandardMaterial({ color: 0xfec }));
npcHead.position.y = 2.1;
npc.add(npcHead);
npc.position.set(5, 0, 5);
scene.add(npc);

const building = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 4), new THREE.MeshStandardMaterial({ color: 0x999999 }));
building.position.set(-5, 1.5, -5);
scene.add(building);

const dialogBox = document.createElement('div');
dialogBox.id = 'dialog';
dialogBox.style.position = 'absolute';
dialogBox.style.bottom = '20px';
dialogBox.style.left = '50%';
dialogBox.style.transform = 'translateX(-50%)';
dialogBox.style.background = 'rgba(255,255,255,0.9)';
dialogBox.style.padding = '10px 20px';
dialogBox.style.borderRadius = '10px';
dialogBox.style.color = 'black';
dialogBox.style.display = 'none';
document.body.appendChild(dialogBox);

const dialogLines = [
  'Hai! Aku Shira. Senang bertemu kamu.',
  'Apa kamu tersesat? Dunia ini luas, tapi kamu tidak sendirian.',
  'Ingat, kamu bisa belajar dari setiap langkahmu.'
];
let dialogIndex = 0;

const keys = {};
document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
  if (e.key.toLowerCase() === 'e') {
    const dist = player.position.distanceTo(npc.position);
    if (dist < 2) {
      dialogBox.innerText = dialogLines[dialogIndex];
      dialogBox.style.display = 'block';
      dialogIndex = (dialogIndex + 1) % dialogLines.length;
    }
  }
});
document.addEventListener("keyup", (e) => keys[e.key.toLowerCase()] = false);

function animate() {
  requestAnimationFrame(animate);

  const speed = 0.1;
  if (keys["w"]) player.position.z -= speed;
  if (keys["s"]) player.position.z += speed;
  if (keys["a"]) player.position.x -= speed;
  if (keys["d"]) player.position.x += speed;

  camera.position.x = player.position.x;
  camera.position.z = player.position.z + 5;
  camera.lookAt(player.position);

  const dist = player.position.distanceTo(npc.position);
  if (dist >= 2) dialogBox.style.display = 'none';

  renderer.render(scene, camera);
}
animate();