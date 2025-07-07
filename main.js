import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

let scene, camera, renderer, player, npc;

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa0a0a0);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  scene.add(light);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0x556B2F })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const geometry = new THREE.BoxGeometry(1, 2, 1);
  const playerMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
  const npcMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

  player = new THREE.Mesh(geometry, playerMaterial);
  player.position.set(0, 1, 0);
  scene.add(player);

  npc = new THREE.Mesh(geometry, npcMaterial);
  npc.position.set(3, 1, 0);
  scene.add(npc);

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  checkProximity();
  renderer.render(scene, camera);
}

function checkProximity() {
  if (!player || !npc) return;
  const distance = player.position.distanceTo(npc.position);
  const dialog = document.getElementById('dialog');
  dialog.style.display = distance < 3 ? 'block' : 'none';
}
