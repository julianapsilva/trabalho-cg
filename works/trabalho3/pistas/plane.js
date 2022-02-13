import * as THREE from '../../../build/three.module.js';
import {
    degreesToRadians,
} from "../../../libs/util/util.js"

export default function createPlane(scene) {
    var planeGeometry = new THREE.PlaneGeometry(1440, 1440);
    // planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
    var planeMaterial = new THREE.MeshLambertMaterial({ color: "rgb(20,20,20)", side: THREE.DoubleSide });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotateX(degreesToRadians(-90));
    
    
    var textureLoader = new THREE.TextureLoader();
    var texturaPlano = textureLoader.load('./pistas/textures/sand.jpg');

      // Apply texture to the 'map' property of the blocoCs
    plane.material.map = texturaPlano;
    
    // Set defaults
    var repeatFactor = 14.40;
    var wrapModeS  = THREE.RepeatWrapping;
    var wrapModeT  = THREE.RepeatWrapping;
    var minFilter = THREE.LinearFilter;
    var magFilter = THREE.LinearFilter;
    updateTexture();

    function updateTexture()
    {
        plane.material.map.repeat.set(repeatFactor,repeatFactor);
        plane.material.map.wrapS = wrapModeS;
        plane.material.map.wrapT = wrapModeT;
        plane.material.map.minFilter = minFilter;
        plane.material.map.magFilter = magFilter;
    }
  
    plane.material.map.wrapS = THREE.RepeatWrapping;
    plane.material.map.wrapT = THREE.RepeatWrapping;
   
    scene.add(plane);

}