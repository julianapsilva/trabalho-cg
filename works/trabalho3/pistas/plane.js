import * as THREE from '../../../build/three.module.js';
import {
    degreesToRadians
} from "../../../libs/util/util.js"

export default function createPlane(scene) {
    var planeGeometry = new THREE.PlaneGeometry(1440, 1440);
    // planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
    var planeMaterial = new THREE.MeshLambertMaterial({ color: "rgb(000,15,000)", side: THREE.DoubleSide });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotateX(degreesToRadians(-90));
    // add the plane to the scene
     
    var textureLoader = new THREE.TextureLoader();
    var grama = textureLoader.load('./pistas/textures/grass.jpg');

    // Apply texture to the 'map' property of the blocoCs
    plane.material.map = grama;
    //blocoC.material.map.repeat.set(5, 5);
    plane.material.map.wrapS = THREE.RepeatWrapping;
    plane.material.map.wrapT = THREE.RepeatWrapping;
    scene.add(plane);

}