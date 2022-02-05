import * as THREE from '../../../build/three.module.js';

export function setDirectionalLighting(scene, position) {
    var dirLight = new THREE.DirectionalLight('#fff');

    dirLight.position.copy(position);
    dirLight.shadow.mapSize.width = 2064;
    dirLight.shadow.mapSize.height = 2064;
    dirLight.castShadow = true;

    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 500;
    dirLight.shadow.camera.left = -5;
    dirLight.shadow.camera.right = 5;
    dirLight.shadow.camera.top = 5;
    dirLight.shadow.camera.bottom = -5;
    dirLight.name = "Direction Light";
    dirLight.visible = true;
    dirLight.intensity = 10
    scene.add(dirLight);
    return dirLight
}

export function adicionaAmbientLight(scene) {
    var ambientLight = new THREE.AmbientLight(0x343434);
    ambientLight.name = "ambientLight";
    ambientLight.receiveShadow = true
    ambientLight.intensity = 0.5
    scene.add(ambientLight);
}

export function initCamera(initialPosition) {
    var position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-30, 40, 30);
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.copy(position);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
}