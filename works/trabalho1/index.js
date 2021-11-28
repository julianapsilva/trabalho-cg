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
let saveCameraState
let toggleCamera = true
let path = []
let path2 = []
var isPista;
let volta = 0;
let fim = false;
let saiuPista1 = false;
let saiuPista2 = false;
let velocidade = 1.5;


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
newScene.add(lightSphere);

inspectionCamera.lookAt(0, 0, 0)
inspectionCamera.position.set(47, 0, 0)


var clock = new THREE.Clock();
var light = initDefaultSpotlight(scene, new THREE.Vector3(100, 100, 100)); // Use default light
var lightNewscene = initDefaultSpotlight(newScene, new THREE.Vector3(100, 100, 100)); // Use default light

var lightSphere = createSphere(0.5, 10, 10);
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

var pressionadoLeft = false;
var pressionadoRight = false;
var group1 = mudaPista(scene, 1);
var group2 = mudaPista(scene, 2);

function keyboardUpdate() {

    keyboard.update();

    if (keyboard.down("A")) axesHelper.visible = !axesHelper.visible;

    if (keyboard.pressed("up")) {
        group.translateZ(velocidade);
    }
    if (keyboard.pressed("down")) group.translateZ(velocidade);

    var angleCar = degreesToRadians(2);
    
    if (keyboard.pressed("left")) {
        pressionadoLeft = true;
        group.rotateY(angleCar);
        group.children[11].rotateY(.02);
        group.children[12].rotateY(.02);
    }
    if (keyboard.pressed("right")) {
        pressionadoRight = true;
        group.rotateY(-angleCar);
        group.children[11].rotateY(-.02);
        group.children[12].rotateY(-.02);
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

    if (keyboard.down("6")) {
        console.log(group.position)
    }

    // Muda o tipo de pista
    if (keyboard.down("7")) {
        isPista = 1;
        restartCar()
        scene.add(group1);
        group2.visible = false
        group1.visible = true
    }
    if (keyboard.down("8")) {
        isPista = 2;
        restartCar()
        scene.add(group2);
        group1.visible = false
        group2.visible = true
    }
    // Guarda a mudança de estado das teclas
    if (keyboard.up("left")) {
        pressionadoLeft = false;
        group.children[11].rotateY(-.02);
        group.children[12].rotateY(-.02);
    }
    if (keyboard.up("right")) {
        pressionadoRight = false;
        group.children[11].rotateY(.02);
        group.children[12].rotateY(.02);
    }
}

function restartCar() {
    position = 1;
    group.position.set(-30, 2.6, -150)
}

function pathAlreadyExists(number) {
    return path.some(n => { return n == number })
}

function pathAlreadyExists2(number) {
    return path2.some(n => { return n == number })
}
function verifyPosition() {
    if (isPista == 1) {

        if (group.position.z >= -170 && group.position.z <= -125
            && group.position.x >= -171 && group.position.x <= 162) {
            console.log("Pista1 - reta1")
            saiuPista1 = false;
            if (!pathAlreadyExists(1)) {
                path.push(1)
            }
        }

        else if (group.position.z >= -125 && group.position.z <= 136
            && group.position.x >= 133 && group.position.x <= 171) {
            console.log("Pista1 - reta2")
            saiuPista1 = false;
            if (!pathAlreadyExists(2)) {
                path.push(2)
            }
        }

        else if (group.position.z >= 130 && group.position.z <= 170
            && group.position.x >= -138 && group.position.x <= 125) {
            console.log("Pista1 - reta3")
            saiuPista1 = false;
            if (!pathAlreadyExists(3)) {
                path.push(3)
            }
        }

        else if (group.position.z >= -130 && group.position.z <= 136
            && group.position.x >= -171 && group.position.x <= -131) {
            console.log("Pista1 - reta4")
            saiuPista1 = false;
            if (!pathAlreadyExists(4)) {
                path.push(4)
            }
        }
        else {
            saiuPista1 = true;
            console.log("saiu");
        }
    }
    if (isPista == 2) {
        if (group.position.z >= -170 && group.position.z <= -120
            && group.position.x >= -171 && group.position.x <= 170) {
            console.log("Pista2 - reta1")
            saiuPista2 = false;
            if (!pathAlreadyExists2(1)) {
                path2.push(1)
            }
        }

        if (group.position.z >= -170 && group.position.z <= 25
            && group.position.x >= 133 && group.position.x <= 171) {
            console.log("Pista2 - reta2")
            saiuPista2 = false;
            if (!pathAlreadyExists2(2)) {
                path2.push(2)
            }
        }
        else if (group.position.z >= -30 && group.position.z <= 30
            && group.position.x >= 30 && group.position.x <= 170) {
            console.log("Pista2 - reta3")
            saiuPista2 = false;
            if (!pathAlreadyExists2(3)) {
                path2.push(3)
            }
        }
        else if (group.position.z >= -30 && group.position.z <= 170
            && group.position.x >= -30 && group.position.x <= 30) {
            console.log("Pista2 - reta4")
            saiuPista2 = false;
            if (!pathAlreadyExists2(4)) {
                path2.push(4)
            }
        }
        else if (group.position.z >= 150 && group.position.z <= 170
            && group.position.x >= -170 && group.position.x <= 30) {
            console.log("Pista2 - reta5")
            saiuPista2 = false;
            if (!pathAlreadyExists2(5)) {
                path2.push(5)
            }
        }
        else if (group.position.z >= -130 && group.position.z <= 136
            && group.position.x >= -171 && group.position.x <= -131) {
            console.log("Pista2 - reta6")
            saiuPista2 = false;
            if (!pathAlreadyExists2(6)) {
                path2.push(6)
            }
        }
        else 
        {
            saiuPista2 = true;
            console.log("saiu");
        }
    }
}

function checkVoltaPista1() {
    if (isPista == 1) {
        if (path.length == 4) {
            volta++;
            path = [];
            console.log(path);
            console.log(volta);
        }

        if (volta == 4 && checkStartPosition()) {
            console.log("fim");
            clock.stop;
        }
    }
}

function checkVoltaPista2() {
    if (isPista == 2) {
        if (path2.length == 6) {
            volta++;
            path2 = [];
            console.log(path2);
            console.log(volta);
        }

        if (volta == 4 && checkStartPosition()) {
            console.log("fim");
            clock.stop;
        }
    }

}

function checkVelocityPista1() {
    if (saiuPista1 == true) {
        velocidade = 0.5;
    }
    else {
        velocidade = 1.5;
    }
}

function checkVelocityPista2() {
    if (saiuPista2 == true) {
        velocidade = 0.5;
    }
    else {
        velocidade = 1.5;
    }
}

function checkStartPosition() {
    if (group.position.x >= -64 && group.position.x <= -20 && group.position.z >= -169 && group.position.z <= -130) {
        return true;
    }
    else
        return false;
}

function showInformation() {
    // Use this to show information onscreen
    var controls = new InfoBox();
    controls.add("Rockin Roll Racing");
    controls.addParagraph();
    controls.add("Use o mouse para controlar camera");
    controls.add("Up / Acelera");
    controls.add("Left / Right curvas");
    controls.add("Pressione 'A' para exibir ou esconder Axis");
    controls.add(" 1 / 2 - Pista 1 / Pista 2");
    controls.show();
}

function render() {
    stats.update(); // Update FPS
    trackballControls.update();
    clock.start();
    keyboardUpdate();
    handleCamera(position, camera, group, currentPosition, currentLookAt);
    verifyPosition();
    checkVoltaPista1();
    checkVoltaPista2
    checkVelocityPista1();
    checkVelocityPista2();
    checkStartPosition();
    requestAnimationFrame(render); // Show events
    if (toggleCamera) {
        renderer.render(scene, camera) // Render scene
    }
    else
        renderer.render(newScene, inspectionCamera) // Render scene
}

