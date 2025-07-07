import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

let camera, scene, renderer, npc, player, listener, ambientSound;

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
  light.position.set(0, 200, 0);
  scene.add(light);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0x228B22 })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const building = new THREE.Mesh(
    new THREE.BoxGeometry(5, 10, 5),
    new THREE.MeshStandardMaterial({ color: 0x8B0000 })
  );
  building.position.set(10, 5, -10);
  scene.add(building);

  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 5),
    new THREE.MeshStandardMaterial({ color: 0x2F4F4F })
  );
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0.01, 0);
  scene.add(road);

  const loader = new GLTFLoader();

  loader.load('models/npc.glb', gltf => {
    npc = gltf.scene;
    npc.position.set(2, 0, 0);
    scene.add(npc);
  });

  loader.load('models/character.glb', gltf => {
    player = gltf.scene;
    player.position.set(0, 0, 0);
    scene.add(player);
  });

  // Ambient Sound
  listener = new THREE.AudioListener();
  camera.add(listener);
  ambientSound = new THREE.Audio(listener);

  new THREE.AudioLoader().load('audio/ambient.mp3', buffer => {
    ambientSound.setBuffer(buffer);
    ambientSound.setLoop(true);
    ambientSound.setVolume(0.3);
    ambientSound.play();
  });

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  checkInteraction();
  renderer.render(scene, camera);
}

function checkInteraction() {
  if (player && npc) {
    const distance = player.position.distanceTo(npc.position);
    const dialog = document.getElementById('dialog');
    dialog.style.display = distance < 3 ? 'block' : 'none';
  }
}
