import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- CONFIGURACIÓN DE LA ESCENA ---
const container = document.getElementById('webgl-container');
const scene = new THREE.Scene();

// Usamos alpha: true para que el fondo del canvas sea transparente
// y se vea el gradiente CSS de tu sitio web.
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true; // Habilitar sombras si el modelo las soporta
container.appendChild(renderer.domElement);

// --- CÁMARA ---
const camera = new THREE.PerspectiveCamera(
    45, 
    container.clientWidth / container.clientHeight, 
    0.1, 
    1000
);
camera.position.set(0, 2, 5); // Posición inicial temporal

// --- CONTROLES (OrbitControls) ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Movimiento suave
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

// --- ILUMINACIÓN ---
// Luz ambiental suave
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

// Luz direccional (como el sol/foco principal)
const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// Luz de acento (para que se vea bien el estilo "Gamer")
const spotLight = new THREE.SpotLight(0x7f5af0, 5);
spotLight.position.set(-5, 5, 0);
scene.add(spotLight);

// --- CARGA DEL MODELO 3D ---
let loadedModel;
let mixer; // Para animaciones si el GLB las tuviera
const loader = new GLTFLoader();

loader.load(
    'assets/3d/Setup_Gamer_Project.glb', 
    (gltf) => {
        loadedModel = gltf.scene;
        // ... dentro de loader.load(..., (gltf) => { ...

    scene.add(loadedModel);

    // AÑADIR ESTO: Ocultar texto de carga
    const loaderText = document.getElementById('loader-text');
    if(loaderText) loaderText.style.display = 'none';

    // ... el resto del código de la cámara ...
        
        // Centrar y escalar el modelo automáticamente
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Resetear posición del modelo para que gire sobre su propio eje
        loadedModel.position.x += (loadedModel.position.x - center.x);
        loadedModel.position.y += (loadedModel.position.y - center.y);
        loadedModel.position.z += (loadedModel.position.z - center.z);
        
        scene.add(loadedModel);

        // Ajustar cámara basada en el tamaño del modelo
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 * Math.tan(fov * 2));
        cameraZ *= 2.5; // Factor de zoom para alejar un poco
        
        camera.position.set(0, maxDim / 2, cameraZ);
        controls.target.set(0, 0, 0);
        controls.update();

        // Animación de entrada simple
        loadedModel.scale.set(0,0,0);
        let scale = 0;
        const entryAnim = setInterval(() => {
            scale += 0.05;
            loadedModel.scale.set(scale, scale, scale);
            if(scale >= 1) clearInterval(entryAnim);
        }, 16);

        console.log("Modelo cargado exitosamente");
    },
    (xhr) => {
        // Progreso de carga (opcional)
        // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.error('Error cargando el modelo:', error);
        container.innerHTML = '<p style="color:white; text-align:center; padding-top:20px;">Error al cargar el modelo 3D.</p>';
    }
);

// --- INTERACTIVIDAD DEL USUARIO (Botones 3D) ---
let isAutoRotating = false;

// 1. Botón Rotar
document.getElementById('rotateBtn').addEventListener('click', () => {
    isAutoRotating = !isAutoRotating;
});

// 2. Botón Cambiar Color (Randomiza el color de los materiales)
document.getElementById('colorBtn').addEventListener('click', () => {
    if (loadedModel) {
        loadedModel.traverse((child) => {
            if (child.isMesh) {
                // Generar color aleatorio vibrante
                const randomColor = new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`);
                // Clonamos el material para no afectar a otros objetos que compartan material
                child.material = child.material.clone();
                child.material.color.set(randomColor);
            }
        });
    }
});

// 3. Botón Reset
document.getElementById('resetBtn').addEventListener('click', () => {
    if (loadedModel) {
        controls.reset();
        isAutoRotating = false;
        // Restaurar color blanco base (o recargar modelo si fuera necesario)
        loadedModel.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(0xffffff);
            }
        });
    }
});


// --- LÓGICA DE LA INTERFAZ (UI) ---

// Modo Oscuro
const darkModeBtn = document.getElementById('darkModeBtn');
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeBtn.textContent = isDark ? '☀️' : '🌙';
});

// Copiar Email
const copyBtn = document.getElementById('copyEmailBtn');
const toast = document.getElementById('copyToast');

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('cauichadrian04@gmail.com').then(() => {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    });
});

// Responsive Resize
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});


// --- BUCLE DE ANIMACIÓN (Render Loop) ---
function animate() {
    requestAnimationFrame(animate);

    // Rotación automática si está activa
    if (loadedModel && isAutoRotating) {
        loadedModel.rotation.y += 0.005;
    }

    controls.update(); // Necesario para el damping
    renderer.render(scene, camera);
}

animate();