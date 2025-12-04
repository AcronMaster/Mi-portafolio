import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Referencias DOM
const container = document.getElementById('webgl-container');
if (!container) {
  console.error('Contenedor #webgl-container no encontrado. Asegúrate de que exista en el HTML.');
}

// Escena
const scene = new THREE.Scene();
// Fondo negro para que el modelo destaque (sin alterar el GLB)
scene.background = new THREE.Color(0x000000);

// Función utilitaria para obtener tamaño seguro
function getContainerSize() {
  if (!container) return { width: window.innerWidth, height: window.innerHeight };
  const rect = container.getBoundingClientRect();
  const width = rect.width || container.clientWidth || window.innerWidth;
  const height = rect.height || container.clientHeight || window.innerHeight;
  return { width, height };
}

const { width: initW, height: initH } = getContainerSize();

// Cámara
const camera = new THREE.PerspectiveCamera(75, initW / Math.max(1, initH), 0.1, 1000);
camera.position.set(0, 1.5, 3);

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(initW, initH);
if (container) container.appendChild(renderer.domElement);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Luces
// Luces: ligeros ajustes para que se noten mejor sobre fondo oscuro
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

const pointLight1 = new THREE.PointLight(0xffaa00, 2.6, 6);
pointLight1.position.set(0, 2, 2);
scene.add(pointLight1);
const pointLight2 = new THREE.PointLight(0x00aaff, 2.0, 6);
pointLight2.position.set(-2, 1, -2);
scene.add(pointLight2);

// Cargar modelo GLB (con manejo de errores y preservando texturas si existen)
let model = null;
const loader = new GLTFLoader();
loader.load(
  'models/Setup_Gamer_Project9.glb',
  (gltf) => {
    model = gltf.scene;

    model.traverse((child) => {
      if (child.isMesh) {
        const original = child.material;
        // Obtener color base si está disponible
        const baseColor = original && original.color ? original.color.clone() : new THREE.Color(0xaaaaaa);
        const newMat = new THREE.MeshStandardMaterial({
          color: baseColor,
          emissive: new THREE.Color(0x222222),
          metalness: 0.5,
          roughness: 0.5,
        });
        // preservar mapas/propiedades comunes
        if (original && original.map) newMat.map = original.map;
        if (original && original.normalMap) newMat.normalMap = original.normalMap;
        if (original && original.roughnessMap) newMat.roughnessMap = original.roughnessMap;
        newMat.needsUpdate = true;
        child.material = newMat;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error('Error al cargar el modelo GLB:', error);
    // Mostrar mensaje sencillo en la UI
    const msg = document.createElement('div');
    msg.textContent = 'No se pudo cargar el modelo 3D (archivo faltante o inválido).';
    msg.style.color = '#900';
    if (container) container.appendChild(msg);
  }
);

// Botones: comprobar existencia antes de añadir listeners
let rotate = false;
const rotateBtn = document.getElementById('rotateBtn');
const colorBtn = document.getElementById('colorBtn');
const resetBtn = document.getElementById('resetBtn');
const darkModeBtn = document.getElementById('darkModeBtn');

if (rotateBtn) rotateBtn.addEventListener('click', () => (rotate = !rotate));
if (colorBtn) colorBtn.addEventListener('click', () => {
  if (!model) return;
  model.traverse((child) => {
    if (child.isMesh && child.material && child.material.color) {
      child.material.color.setHex(Math.floor(Math.random() * 0xffffff));
    }
  });
});
if (resetBtn) resetBtn.addEventListener('click', () => {
  if (!model) return;
  model.rotation.set(0, 0, 0);
  model.position.set(0, 0, 0);
});
if (darkModeBtn) darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Animación
function animate() {
  requestAnimationFrame(animate);
  if (rotate && model) model.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Redimensionar de forma robusta
function onWindowResize() {
  const { width, height } = getContainerSize();
  camera.aspect = width / Math.max(1, height);
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

window.addEventListener('resize', onWindowResize);

// Copiar email al portapapeles y mostrar toast
const copyBtn = document.getElementById('copyEmailBtn');
const copyToast = document.getElementById('copyToast');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('cauichadrian04@gmail.com');
      if (copyToast) {
        copyToast.setAttribute('aria-hidden', 'false');
        copyToast.classList.add('show');
        setTimeout(() => {
          if (copyToast) {
            copyToast.classList.remove('show');
            copyToast.setAttribute('aria-hidden', 'true');
          }
        }, 1800);
      }
    } catch (err) {
      console.error('No se pudo copiar el email:', err);
    }
  });
}
