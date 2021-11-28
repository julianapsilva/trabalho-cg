import * as THREE from '../../build/three.module.js';
import Stats from '../../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../../libs/util/KeyboardState.js';
import mountCar from './car/mountCar.js';
import handleCamera from './camera/handleCamera.js';
import createPlane from './pistas/plane.js';
import mudaPista from './pistas/pistas.js';
import {
    initRenderer,
    InfoBox,
    initDefaultSpotlight,
    onWindowResize,
    degreesToRadians
} from "../../libs/util/util.js";
let currentPosition = new THREE.Vector3()
let currentLookAt = new THREE.Vector3()
let position = 1
let toggleCamera = true
let path = []
let switchPista = 2
let acc = false

var scene = new THREE.Scene();    // Create main scene
var stats = new Stats();          // To show FPS information
var renderer = initRenderer();    // View function in util/utils
renderer.setClearColor("rgb(30, 30, 40)");

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.lookAt(0, 0, 0);
camera.position.set(5, 15, 50);
camera.up.set(0, 1, 0);

var newScene = new THREE.Scene();    // Create main scene
var inspectionCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
let car = mountCar()
car.position.set(0, 0, 0)
newScene.add(car)


inspectionCamera.lookAt(0, 0, 0)
inspectionCamera.position.set(47, 0, 0)


var clock = new THREE.Clock();
var light = initDefaultSpotlight(scene, new THREE.Vector3(200, 200, 200)); // Use default light
var lightSphere = createSphere(0.3, 10, 10);
lightSphere.position.copy(light.position);
scene.add(lightSphere);

// Listen window size changes
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

function createSphere(radius, widthSegments, heightSegments) {
    var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments, 0, Math.PI * 2, 0, Math.PI);
    var material = new THREE.MeshBasicMaterial({ color: "rgb(10,10,10)" });
    var object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    return object;
}

createPlane(scene);
// Show text information onscreen
showInformation();

// To use the keyboard
var keyboard = new KeyboardState();

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(inspectionCamera, renderer.domElement);

var group = mountCar()
scene.add(group)
camera.position.set(97, 19, -91)
render()

mudaPista(scene, 2);

var pressionadoLeft = false;
var pressionadoRight = false;

function keyboardUpdate() {

    keyboard.update();

    if (keyboard.down("A")) axesHelper.visible = !axesHelper.visible;


    if (keyboard.pressed("up")) {
        group.translateZ(0.8);

    }
    if (keyboard.down("up")) {
        acc = true
        console.log(camera.position)
    }
    if (keyboard.up("up")) {
        acc = false
    }
    if (keyboard.pressed("down")) group.translateZ(-1);

    var angleCar = degreesToRadians(1);
    var angleRoda = degreesToRadians(1);

    if (keyboard.pressed("left")) {
        pressionadoLeft = true;
        group.rotateY(angleCar);
        group.children[11].rotateY(angleRoda);
    }
    if (keyboard.pressed("right")) {
        pressionadoRight = true;
        group.rotateY(-angleCar);
        group.children[11].rotateY(-angleRoda)
    }
    if (keyboard.pressed("2")) {
        position = 2;
    }

    if (keyboard.pressed("3")) {
        position = 3;
    }

    if (keyboard.pressed("4")) {
        position = 4;
    }
    if (keyboard.pressed("1")) {
        position = 1;
    }

    if (keyboard.down("space")) {
        toggleCamera = !toggleCamera
        if (!toggleCamera)
            scene.visible = false
        else
            scene.visible = true
    }

    if (keyboard.down("5")) {
        position = 5
    }

    if (keyboard.down("6")) {
        acc = false
    }

    // Muda o tipo de pista
    if (keyboard.down("7")) {
        mudaPista(scene, 1);
    }
    if (keyboard.down("8")) {
        mudaPista(scene, 2);
    }
    // Guarda a mudança de estado das teclas
    if (keyboard.up("left")) {
        pressionadoLeft = false;
    }
    if (keyboard.up("right")) {
        pressionadoRight = false;
    }

}
//Faz o movimento das rodas
function moveRoda() {
    /*var angleRoda = degreesToRadians(0.75);

    if (pressionadoLeft) { // Gira para esquerda
        if (group.children[11].rotateY() < 0.45) {
            group.children[11].rotateY(angleRoda)
        }
    }else{
        if (group.children[11].rotateY() > 0) {
            group.children[11].rotateY(angleRoda)
        }
    }
    
    if (pressionadoRight) { // Gira para direita
        if (group.children[11].rotateY() > -0.45) {
            group.children[11].rotateY()
        }
    }else{
        if (group.children[11].rotateY() < 0) {
            group.children[11].rotateY(angleRoda)
        }
    }*/
}

function pathAlreadyExists(number) {
    return path.some(n => { return n == number })
}



function verifyPosition() {

    if (group.position.z >= -170 && group.position.z <= -125
        && group.position.x >= 117 && group.position.x <= 162
        && group.quaternion.w >= -1 && group.quaternion.w <= 1.01
        && group.quaternion.y >= -0.18 && group.quaternion.y <= 0.13
    ) {
        // console.log("INTERSEÇÃO 1")
        position = 2
    }

    if (group.position.z >= 130 && group.position.z <= 160
        && group.position.x >= -160 && group.position.x <= -120
        && group.quaternion.w >= -0.23 && group.quaternion.w <= 0.42
        && group.quaternion.y >= -0.98 && group.quaternion.y <= 1
    ) {
        // console.log("INTERSEÇÃO 3")
        position = 4
    }

    if (group.position.z >= -171 && group.position.z <= -138
        && group.position.x >= -164 && group.position.x <= -120) {
        console.log("INTERSEÇÃO 4")
        position = 1
    }


    if (switchPista == 1) {
        if (group.position.z >= 134 && group.position.z <= 162
            && group.position.x >= 130 && group.position.x <= 171
            && group.quaternion.w <= 0.81 && group.quaternion.y >= -0.81
        ) {
            // console.log("INTERSEÇÃO 2") 
            position = 3
        }
    }


    if (switchPista == 2) {
        if (group.position.z >= -20 && group.position.z <= 23
            && group.position.x >= 22.2 && group.position.x <= 26
        ) {
            // console.log("INTERSEÇÃO 2") 
            position = 2
        }


        if (group.position.z >= -24 && group.position.z <= 8
            && group.position.x >= 127 && group.position.x <= 162
        ) {
            // console.log("INTERSEÇÃO 2") 
            console.log(group.quaternion)
            position = 3
        }

        if (group.position.z >= 120 && group.position.z <= 154
            && group.position.x >= -20 && group.position.x <= 17
        ) {
            // console.log("INTERSEÇÃO 2") 
            position = 3
        }
    }





    if (group.position.z >= -170 && group.position.z <= -125
        && group.position.x >= -171 && group.position.x <= 162) {
        // console.log("reta1")
        if (group.position.x >= 73 && group.position.x <= 87
            && group.position.z >= -171 && group.position.z <= -132)
            position = 1  // AQUI TAVA 5
        if (!pathAlreadyExists(1)) {
            path.push(1)
        }
    }

    else if (group.position.z >= -125 && group.position.z <= 136
        && group.position.x >= 133 && group.position.x <= 171) {
        // console.log("reta2")
        if (!pathAlreadyExists(2)) {
            path.push(2)
        }
    }

    else if (group.position.z >= 130 && group.position.z <= 170
        && group.position.x >= -138 && group.position.x <= 125) {
        console.log("reta3")
        if (!pathAlreadyExists(3)) {
            path.push(3)
        }
    }

    else if (group.position.z >= -130 && group.position.z <= 136
        && group.position.x >= -171 && group.position.x <= -131) {
        console.log("reta4")
        if (!pathAlreadyExists(4)) {
            path.push(4)
        }
    }

}

function showInformation() {
    // Use this to show information onscreen
    var controls = new InfoBox();
    controls.add("Group Example");
    controls.addParagraph();
    controls.add("Use mouse to rotate/pan/zoom the camera");
    controls.add("Up / Arrow to walk");
    controls.add("Left / Right arrow to turn");
    controls.add("Press 'A' to show/hide axes");
    controls.show();
}

function render() {
    stats.update(); // Update FPS
    trackballControls.update();
    keyboardUpdate();
    handleCamera(position, camera, group, currentPosition, currentLookAt, acc);
    verifyPosition()
    requestAnimationFrame(render); // Show events
    if (toggleCamera) {
        renderer.render(scene, camera) // Render scene
        moveRoda();
    }
    else
        renderer.render(newScene, inspectionCamera) // Render scene

}
