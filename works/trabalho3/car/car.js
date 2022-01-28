import { GLTFLoader } from '../../../build/jsm/loaders/GLTFLoader.js'
import * as THREE from '../../../build/three.module.js';
import {
    degreesToRadians,
    getMaxSize
} from "../../../libs/util/util.js";


export default function loadGLTFFile(modelPath, modelName, mode) {
    var loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
        loader.load(modelPath + modelName, function (gltf) {
            let tesla = gltf.scene;

            tesla.traverse(child => { if (child) child.castShadow = true });
            tesla.traverse(node => {
                if (node.material) node.material.side = THREE.DoubleSide
                if (node.isMesh || node.isLight) node.castShadow = true;
                if (node.isMesh || node.isLight) node.receiveShadow = true;
            });
            if (!mode) {
                tesla = normalizeAndRescale(tesla, 20);
                tesla.rotateY(degreesToRadians(90))
            }
            else {
                tesla.position.set(0, -3, 0)
                tesla = normalizeAndRescale(tesla, 20);
                tesla.rotateY(degreesToRadians(90))
            }
            resolve(tesla)
        }, onProgress, reject);
    });
}


function onProgress(xhr, model) {
    if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
    }
}

function normalizeAndRescale(obj, newScale) {
    var scale = getMaxSize(obj); // Available in 'utils.js'
    obj.scale.set(newScale * (1.0 / scale),
        newScale * (1.0 / scale),
        newScale * (1.0 / scale));
    return obj;
}