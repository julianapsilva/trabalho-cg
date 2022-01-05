import * as THREE from '../../../build/three.module.js';

import {
    degreesToRadians
} from "../../../libs/util/util.js"

export default function createPlane(scene) {
    var planeGeometry = new THREE.PlaneGeometry(1440, 1440);
    // planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
    var planeMaterial = new THREE.MeshBasicMaterial({
        color: 'rgb(211, 154, 8)',
        side: THREE.DoubleSide,
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotateX(degreesToRadians(-90));
    // add the plane to the scene
    scene.add(plane);

}