
import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

// SCENE SETUP
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0d8ef);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas3d') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// LIGHTING
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(3, 10, 10);
scene.add(dirLight);

// GROUND
const groundGeo = new THREE.PlaneGeometry(200, 200);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x55aa55 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// MAP - Simple Trees and Cubes
function addTree(x, z) {
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 1),
    new THREE.MeshStandardMaterial({ color: 0x8b4513 })
  );
  trunk.position.set(x, 0.5, z);
  scene.add(trunk);

  const leaves = new THREE.Mesh(
    new THREE.SphereGeometry(0.5),
    new THREE.MeshStandardMaterial({ color: 0x228b22 })
  );
  leaves.position.set(x, 1.3, z);
  scene.add(leaves);
}
addTree(-2, -2);
addTree(3, 4);
addTree(-5, 5);

// CHARACTER
const charGroup = new THREE.Group();
const body = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1.8, 0.6),
  new THREE.MeshStandardMaterial({ color: 0xeee8aa })
);
body.position.y = 0.9;
charGroup.add(body);

const head = new THREE.Mesh(
  new THREE.SphereGeometry(0.4),
  new THREE.MeshStandardMaterial({ color: 0xffdab9 })
);
head.position.y = 2.1;
charGroup.add(head);

scene.add(charGroup);

// MOVEMENT
const keys = {};
document.addEventListener("keydown", (e) => (keys[e.key.toLowerCase()] = true));
document.addEventListener("keyup", (e) => (keys[e.key.toLowerCase()] = false));

function animate() {
  requestAnimationFrame(animate);

  const speed = 0.1;
  if (keys["w"]) charGroup.position.z -= speed;
  if (keys["s"]) charGroup.position.z += speed;
  if (keys["a"]) charGroup.position.x -= speed;
  if (keys["d"]) charGroup.position.x += speed;

  camera.position.x = charGroup.position.x;
  camera.position.z = charGroup.position.z + 5;
  camera.lookAt(charGroup.position);

  renderer.render(scene, camera);
}
animate();
