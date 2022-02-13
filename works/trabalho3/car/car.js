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
            console.log(tesla);
            let capo = tesla.children[0].children[0].children[0].children[0].children[1].children[0]
            let teto = tesla.children[0].children[0].children[0].children[0].children[1].children[1] //.material.color
            let lateral = tesla.children[0].children[0].children[0].children[0].children[1].children[2]
            var textureLoader = new THREE.TextureLoader();
            var vaca = textureLoader.load('./car/textures/vaca.jpg');

            capo.material.map = vaca;
            teto.material.map = vaca;
            // console.log(teto);
            lateral.material.map = vaca;
            var branco = '100'
            tesla.children[0].children[0].children[0].children[0].children[1].children[0].material.color.r = branco; 
            tesla.children[0].children[0].children[0].children[0].children[1].children[0].material.color.g = branco; 
            tesla.children[0].children[0].children[0].children[0].children[1].children[0].material.color.b = branco;   
            // Set defaults
            var repeatFactor = 4;
            var wrapModeS  = THREE.RepeatWrapping;
            var wrapModeT  = THREE.RepeatWrapping;
            var minFilter = THREE.LinearFilter;
            var magFilter = THREE.LinearFilter;
            updateTexture();
            function updateTexture()
            {
            teto.material.map.repeat.set(repeatFactor,repeatFactor);
            teto.material.map.wrapS = wrapModeS;
            teto.material.map.wrapT = wrapModeT;
            teto.material.map.minFilter = minFilter;
            teto.material.map.magFilter = magFilter;
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