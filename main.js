
import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0d8ef);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas3d') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(hemiLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(3, 10, 10);
scene.add(dirLight);

const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load('grass.jpg');
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(50, 50);
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshStandardMaterial({ map: groundTexture })
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
dialogBox.style.display = 'none';
dialogBox.innerText = 'Hai! Aku Shira. Senang bertemu kamu.';
document.body.appendChild(dialogBox);

const listener = new THREE.AudioListener();
camera.add(listener);
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('ambient.mp3', function(buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.4);
  sound.play();
});

const keys = {};
document.addEventListener("keydown", (e) => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", (e) => keys[e.key.toLowerCase()] = false);
let showDialog = false;
let dialogIndex = 0;
const dialogLines = [
  'Hai! Aku Shira. Senang bertemu kamu.',
  'Apa kamu tersesat? Dunia ini luas, tapi kamu tidak sendirian.',
  'Ingat, kamu bisa belajar dari setiap langkahmu.'
];

const dialogBox = document.createElement('div');
dialogBox.style.position = 'absolute';
dialogBox.style.bottom = '150px';
dialogBox.style.left = '50%';
dialogBox.style.transform = 'translateX(-50%)';
dialogBox.style.background = 'rgba(0,0,0,0.6)';
dialogBox.style.color = 'white';
dialogBox.style.padding = '10px 20px';
dialogBox.style.borderRadius = '8px';
dialogBox.style.display = 'none';
document.body.appendChild(dialogBox);

document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'e' && player.position.distanceTo(npc.position) < 2) {
    showDialog = true;
    dialogBox.innerText = dialogLines[dialogIndex];
    dialogBox.style.display = 'block';
    dialogIndex = (dialogIndex + 1) % dialogLines.length;
  }
});
  
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
  dialogBox.style.display = dist < 2 ? 'block' : 'none';

  renderer.render(scene, camera);
}
animate();


// === LOAD GLB CHARACTER ===
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('anime_girl_character.glb', function(gltf) {
  const model = gltf.scene;
  model.scale.set(1.5, 1.5, 1.5);
  model.position.set(2, 0, 2);
  scene.add(model);
}, undefined, function(error) {
  console.error(error);
});
