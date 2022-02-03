import * as THREE from '../../../build/three.module.js';
import {
    degreesToRadians
} from "../../../libs/util/util.js";

export default function cone(scene, x, z) {
    // Start setting the group
    var groupCone = new THREE.Group();

    var base = baseCone();
    base.position.set(x, 0.16, z)
    groupCone.add(base)

    var cone = corpoCone();
    cone.position.set(x, 0.16, z)
    groupCone.add(cone)
  
    scene.add(groupCone)
    // return group;

    function baseCone() {
        var geometry = new THREE.BoxGeometry(5, 2, 5);
        var material = new THREE.MeshBasicMaterial({ color: 'rgb(250,90,000)' });
        var object = new THREE.Mesh(geometry, material)
        object.castShadow = true
        return object
    }
    function corpoCone() {
        var geometry = new THREE.CylinderGeometry(1, 4, 15,64)
        var material = new THREE.MeshBasicMaterial({ color: 'rgb(250,90,000)' });
        var object = new THREE.Mesh(geometry, material)
        object.castShadow = true
        return object
    }

}