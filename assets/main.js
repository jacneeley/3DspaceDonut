import './style.css'
import * as THREE from 'three';

//to start off I need a 1. Scene 2. Camera and 3. Renderer
const scene = new THREE.Scene();

//orbit controls - move the scene with the mouse
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GridHelper } from 'three';

//takes 3 arguments FOV, Aspect Ratio, and View Frustum.
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//pass scene and camera as arguments, that is what needs to be rendered lol.
renderer.render(scene, camera); 
 
//provide vector arguments to build a shape.
const geometry = new THREE.TorusGeometry(10,3,16,100)

//create texture
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

//ambient lighting
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//lightHelper shows use the position of the point light
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper,gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(.25,24,24);
  const material = new THREE.MeshStandardMaterial ({color: 0xffffff});
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  //change position of objects with scroll

  //change camera
  camera.position.z = t * -.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t* -0.0002;
}
document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += .01;
  torus.rotation.y += .005;
  torus.rotation.z += .01;

  controls.update();

  renderer.render(scene,camera);
}

animate()


