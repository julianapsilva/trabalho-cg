import * as THREE from '../../../build/three.module.js';
import {
    degreesToRadians
} from "../../../libs/util/util.js";

export default function objetos(x, z) {
    // Start setting the group
    var groupObjs = new THREE.Group();
    var barril = new THREE.Group();
   
    var barrilMeio  = corpoBarril();
    barril.add(barrilMeio)

    var barrilTopo = topoBarril()
    barrilTopo.rotateX(degreesToRadians(90))
    barrilTopo.position.y = 10/ 2;
    barril.add(barrilTopo)

    barril.position.set(x, 5.16, z)
    groupObjs.add(barril);

    var caixote = caixa();
    caixote.position.set(x+12, 5.16, z+12)
    groupObjs.add(caixote)
    
    // scene.add(groupObjs)
    
    function corpoBarril(){
        var Geometry = new THREE.CylinderGeometry(5, 5, 10, 30, 10, true);
        var Material = new THREE.MeshBasicMaterial({ color: "rgb(100,100,100)", side: THREE.DoubleSide });
        var barrilMeio = new THREE.Mesh(Geometry, Material);
        barrilMeio.castShadow = true
        return barrilMeio
    }
    function topoBarril(){
        var Geometry = new THREE.CircleGeometry(5, 30);
        var Material = new THREE.MeshBasicMaterial({ color: "rgb(100,100,100)", side: THREE.DoubleSide });
        var barrilTopo = new THREE.Mesh(Geometry, Material);
        barrilTopo.castShadow = true
        return barrilTopo   
    }
    function caixa() {
        var geometry = new THREE.BoxGeometry(10, 10, 10);
        var material = new THREE.MeshBasicMaterial({ color: 'rgb(150,75,015)' });
        var objectCaixa = new THREE.Mesh(geometry, material)
        objectCaixa.castShadow = true
        objectCaixa.position.set(0, 10, 0)
        return objectCaixa
    }
    var textureLoader = new THREE.TextureLoader();
    var madeiraCaixote = textureLoader.load('./obj/textures/caixote.jpg');
    var barrilCilindro = textureLoader.load('./obj/textures/barril.jpg');
    var barrilCirculo = textureLoader.load('./obj/textures/topobarril.jpg');
     
    // Apply texture to the 'map' property of the blocoCs
    caixote.material.map = madeiraCaixote;
    barrilTopo.material.map = barrilCirculo;
    barrilMeio.material.map = barrilCilindro;

    return groupObjs;
}