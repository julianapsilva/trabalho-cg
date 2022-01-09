import * as THREE from '../../../build/three.module.js';

export function setDirectionalLighting(scene, position) {
    var dirLight = new THREE.DirectionalLight('#fff');

    dirLight.position.copy(position);
    dirLight.shadow.mapSize.width = 512;
    dirLight.shadow.mapSize.height = 512;
    dirLight.castShadow = true;

    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 20;
    dirLight.shadow.camera.left = -5;
    dirLight.shadow.camera.right = 5;
    dirLight.shadow.camera.top = 5;
    dirLight.shadow.camera.bottom = -5;
    dirLight.name = "Direction Light";
    dirLight.visible = true;
    dirLight.intensity = 5
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