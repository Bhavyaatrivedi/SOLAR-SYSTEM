import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/ window.innerHeight,
    0.1,
    1000
);
const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-100, 100,0);
spotLight.castShadow = true;
spotLight.angle =0.2;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-10,30,30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5* Math.PI;

const gridHelper = new THREE.GridHelper(30 );
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(4);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000FF,
    wireframe: true
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10,10,0)
box.rotation.x=5;
box.rotation.y= 5;

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const gui = new dat.GUI();
const options ={
    sphereColor : '#ffea00', 
    wireframe: false,
    speed: 0.01
};
gui.addColor(options, 'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
});
gui.add(options, 'speed', 0, 0.1)

let step=0;


function animate(time){
    box.rotation.x = time/1000;
    box.rotation.y = time/1000;

    step+= options.speed;
    sphere.position.y = 10*Math.abs(Math.sin(step));
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);