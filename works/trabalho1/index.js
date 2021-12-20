import * as THREE from '../../build/three.module.js';
import Stats from '../../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../../libs/util/KeyboardState.js';
import mountCar from './car/mountCar.js';
import handleCamera from './camera/handleCamera.js';
import createPlane from './pistas/plane.js';
import mudaPista from './pistas/pistas.js';
import { criaBoxRelogio, criaBoxRelogioCorrente, updateClock } from './clock/clock.js';
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
let path2 = []
var isPista;
let volta = 0;
let saiuPista1 = false;
let saiuPista2 = false;
let velocidade = 0;
let velocidadeMaxima = 1;
let velocidadeMinima = 0.5;

var clockTotal = new THREE.Clock();
var clockVolta = new THREE.Clock();

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
newScene.add(lightSphere);

inspectionCamera.lookAt(0, 0, 0)
inspectionCamera.position.set(47, 0, 0)




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
criaBoxRelogio(clockTotal);
criaBoxRelogioCorrente(clockVolta)
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
var group1 = mudaPista(scene, 1);
var group2 = mudaPista(scene, 2);
var group3 = mudaPista(scene, 3);
var group4 = mudaPista(scene, 4);

function keyboardUpdate() {

    keyboard.update();

    if (keyboard.pressed("X")) {
        group.translateZ(velocidade);
        if (velocidade <= velocidadeMaxima)
            velocidade += 0.01;
        if (saiuPista1 || saiuPista2) {
            // if (velocidade >= velocidadeMinima)
            //     velocidade -= 0.02;
        }
    }
    if (keyboard.down("X")) {
        acc = true
    }
    if (keyboard.up("X")) {
        acc = false
    }
    if (keyboard.pressed("down")) {
        group.translateZ(-velocidade);
        if (velocidade <= velocidadeMinima)
            velocidade -= 0.01;
        if (saiuPista1 || saiuPista2) {
            if (velocidade >= velocidadeMaxima)
                velocidade += 0.02;
        }

    }
    var angleCar = degreesToRadians(2);


    if (keyboard.pressed("left")) {
        pressionadoLeft = true;
        if(acc == true){
            group.rotateY(angleCar);
            group.children[11].rotateY(.02);
            group.children[12].rotateY(.02);
        }
    }
    if (keyboard.pressed("right")) {
        pressionadoRight = true;
        if(acc == true){
            group.rotateY(-angleCar);
            group.children[11].rotateY(-.02);
            group.children[12].rotateY(-.02);
        }
    }

    if (keyboard.down("space")) {
        toggleCamera = !toggleCamera
        if (!toggleCamera)
            scene.visible = false
        else
            scene.visible = true
    }

    // Muda o tipo de pista
    if (keyboard.down("1")) {
        isPista = 1;
        clockTotal.start();
        clockVolta.start();

        restartCar()
        scene.add(group1);
        group1.visible = true
        group2.visible = false
        group3.visible = false
        group4.visible = false
    }
    if (keyboard.down("2")) {
        isPista = 2;
        clockTotal.start();
        clockVolta.start();

        restartCar()
        scene.add(group2);
        group1.visible = false
        group2.visible = true
        group3.visible = false
        group4.visible = false
    }
    if (keyboard.down("3")) {
        isPista = 3;
        clockTotal.start();
        clockVolta.start();

        restartCar(3)
        scene.add(group3);
        group1.visible = false
        group2.visible = false
        group3.visible = true
        group4.visible = false
    }
    if (keyboard.down("4")) {
        isPista = 4;
        clockTotal.start();
        clockVolta.start();

        restartCar(4)
        scene.add(group4);
        group1.visible = false
        group2.visible = false
        group3.visible = false
        group4.visible = true
    }
    // Guarda a mudança de estado das teclas
    if (keyboard.up("left")) {
        if(acc == true){
            pressionadoLeft = false;
            group.children[11].rotateY(-.5);
            group.children[12].rotateY(-.5);
        }
    }
    if (keyboard.up("right")) {
        if(acc == true){
            pressionadoRight = false;
            group.children[11].rotateY(.5);
            group.children[12].rotateY(.5);
        }
    }
}

function restartCar(direcao) {
    position = 1;
    if(direcao == 3){
        group.position.set(100, 2.6, -600)
    }if(direcao == 4){
        group.position.set(-600, 2.6, 300)
    }else{
    group.position.set(-100, 2.6, -600)
    }
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
            saiuPista1 = false;
            if (!pathAlreadyExists(1)) {
                path.push(1)
            }
        }

        else if (group.position.z >= -125 && group.position.z <= 136
            && group.position.x >= 133 && group.position.x <= 171) {
            saiuPista1 = false;
            if (!pathAlreadyExists(2)) {
                path.push(2)
            }
        }

        else if (group.position.z >= 130 && group.position.z <= 170
            && group.position.x >= -138 && group.position.x <= 125) {
            saiuPista1 = false;
            if (!pathAlreadyExists(3)) {
                path.push(3)
            }
        }

        else if (group.position.z >= -130 && group.position.z <= 136
            && group.position.x >= -171 && group.position.x <= -131) {
            saiuPista1 = false;
            if (!pathAlreadyExists(4)) {
                path.push(4)
            }
        }
        else {
            saiuPista1 = true;
        }
    }
    if (isPista == 2) {
        if (group.position.z >= -170 && group.position.z <= -120
            && group.position.x >= -171 && group.position.x <= 170) {
            saiuPista2 = false;
            if (!pathAlreadyExists2(1)) {
                path2.push(1)
            }
        }

        else if (group.position.z >= -170 && group.position.z <= 25
            && group.position.x >= 133 && group.position.x <= 171) {
            saiuPista2 = false;
            if (!pathAlreadyExists2(2)) {
                path2.push(2)
            }
        }
        else if (group.position.z >= -30 && group.position.z <= 30
            && group.position.x >= 30 && group.position.x <= 170) {
            saiuPista2 = false;
            if (!pathAlreadyExists2(3)) {
                path2.push(3)
            }
        }
        else if (group.position.z >= -30 && group.position.z <= 170
            && group.position.x >= -30 && group.position.x <= 30) {
            saiuPista2 = false;
            if (!pathAlreadyExists2(4)) {
                path2.push(4)
            }
        }
        else if (group.position.z >= 140 && group.position.z <= 170
            && group.position.x >= -170 && group.position.x <= 30) {
            saiuPista2 = false;
            if (!pathAlreadyExists2(5)) {
                path2.push(5)
            }
        }
        else if (group.position.z >= -130 && group.position.z <= 136
            && group.position.x >= -171 && group.position.x <= -131) {
            saiuPista2 = false;
            if (!pathAlreadyExists2(6)) {
                path2.push(6)
            }
        }
        else {
            saiuPista2 = true;
        }
    }
}

function getIntersections() {
    if (group.position.z >= -170 && group.position.z <= -125
        && group.position.x >= 117 && group.position.x <= 162
        && group.quaternion.w >= -1 && group.quaternion.w <= 1.01
        && group.quaternion.y >= -0.18 && group.quaternion.y <= 0.13
    ) {
        position = 2
    }

    if (group.position.z >= 130 && group.position.z <= 160
        && group.position.x >= -160 && group.position.x <= -120
        && group.quaternion.w >= -0.23 && group.quaternion.w <= 0.42
        && group.quaternion.y >= -0.98 && group.quaternion.y <= 1
    ) {
        position = 4
    }

    if (group.position.z >= -171 && group.position.z <= -138
        && group.position.x >= -164 && group.position.x <= -120) {
        position = 1
    }

    if (isPista == 1) {
        if (group.position.z >= 134 && group.position.z <= 162
            && group.position.x >= 130 && group.position.x <= 171
            && group.quaternion.w <= 1 && group.quaternion.y >= -0.81
        ) {
            position = 3
        }
    }


    if (isPista == 2) {
        if (group.position.z >= -20 && group.position.z <= 23
            && group.position.x >= 10 && group.position.x <= 26
            && group.quaternion.w >= 0.81 && group.quaternion.w <= 0.98
            && group.quaternion.y >= -0.57 && group.quaternion.y <= -0.18
        ) {
            position = 2
        }


        if (group.position.z >= -24 && group.position.z <= 8
            && group.position.x >= 127 && group.position.x <= 162
        ) {
            position = 3
        }

        if (group.position.z >= 120 && group.position.z <= 154
            && group.position.x >= -20 && group.position.x <= 17
        ) {

            position = 5
        }
    }

    if (group.position.z >= -170 && group.position.z <= -125
        && group.position.x >= -171 && group.position.x <= 162) {
        if (group.position.x >= 73 && group.position.x <= 87
            && group.position.z >= -171 && group.position.z <= -132)
            position = 1

    }
}

function checkVoltaPista1() {
    if (isPista == 1) {
        if (path.length == 4 && checkStartPosition()) {
            volta++;
            path = [];
            clockVolta.stop();
            clockVolta.getElapsedTime();
            clockVolta.start();
        }

        if (volta == 4 && checkStartPosition()) {
            clockTotal.stop();
            clockTotal.getElapsedTime();
        }
    }
}

function checkVoltaPista2() {
    if (isPista == 2) {
        if (path2.length == 6 && checkStartPosition()) {
            volta++;
            path2 = [];
            clockVolta.stop();
            clockVolta.getElapsedTime();
            clockVolta.start();
            
        }

        if (volta == 4 && checkStartPosition()) {
            clockTotal.stop();
            velocidade = 0;
            clockTotal.getElapsedTime();
        }
    }
}

function checkStartPosition() {
    if (group.position.x >= -64 && group.position.x <= -20
        && group.position.z >= -169 && group.position.z <= -130) {
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
    controls.add("X / Acelera");
    controls.add("<- / -> curvas");
    controls.add("Pressione 'A' para exibir ou esconder Axis");
    controls.add(" 1 / 2 - Pista 1 / Pista 2");
    controls.show();
}


function render() {
    stats.update(); // Update FPS
    trackballControls.update();
    keyboardUpdate();
    verifyPosition();
    getIntersections();
    checkVoltaPista1();
    checkVoltaPista2();
    checkStartPosition();
    updateClock(clockTotal, clockVolta);
    handleCamera(position, camera, group, currentPosition, currentLookAt, acc, isPista);
    requestAnimationFrame(render); // Show events
    if (toggleCamera) {
        renderer.render(scene, camera) // Render scene
    }
    else
        renderer.render(newScene, inspectionCamera) // Render scene
}

