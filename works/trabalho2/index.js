import * as THREE from '../../build/three.module.js';
import Stats from '../../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../../libs/util/KeyboardState.js';
import handleCamera from './camera/handleCamera.js';
import createPlane from './pistas/plane.js';
import loadGLTFFile from './car/car.js';
import mudaPista from './pistas/pistas.js';
import { criaBoxRelogio, criaBoxRelogioCorrente, updateClock } from './clock/clock.js';
import {
    initRenderer,
    InfoBox,
    initDefaultSpotlight,
    onWindowResize,
    degreesToRadians,
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
let velocidadeMaxima = 2;
let velocidadeMinima = 0.5;
let tesla

var clockTotal = new THREE.Clock();
var clockVolta = new THREE.Clock();

let acc = false

var scene = new THREE.Scene();    // Create main scene
var stats = new Stats();          // To show FPS information
var renderer = initRenderer();    // View function in util/utils
renderer.setClearColor("rgb(30, 30, 40)");

tesla = await loadGLTFFile('car/', 'scene.gltf');
let car = tesla

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.lookAt(0, 0, 0);
camera.up.set(0, 1, 0);
camera.position.set(97, 19, -91)
scene.add(camera)
scene.add(tesla)

var newScene = new THREE.Scene();
var inspectionCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
inspectionCamera.lookAt(0, 1, 0)
inspectionCamera.position.set(37, 0, 0)

let inspectionTesla = await loadGLTFFile('car/', 'scene.gltf', 'inspection');
newScene.add(inspectionTesla)

var trackballControls = new TrackballControls(inspectionCamera, renderer.domElement);
window.addEventListener('resize', function () { onWindowResize(inspectionCamera, renderer) }, false);

var light = initDefaultSpotlight(scene, new THREE.Vector3(100, 100, 100)); // Use default light
var lightNewscene = initDefaultSpotlight(newScene, inspectionCamera.position); // Use default light
light.intensity = 7

camera.add(light)
// light.position.set(0, 0, 1);
light.target = camera;

lightNewscene.intensity = 6

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
mudaPista(scene, 2);

var pressionadoLeft = false;
var pressionadoRight = false;
var group1 = mudaPista(scene, 1);
var group2 = mudaPista(scene, 2);
var group3 = mudaPista(scene, 3);
var group4 = mudaPista(scene, 4);


let wheelsInsp = inspectionTesla.children[0].children[0].children[0].children[0].children.slice(11,15)
let inspQuaternion1 = new THREE.Quaternion();
let inspQuaternion2 = new THREE.Quaternion();
let inspQuaternion3 = new THREE.Quaternion();
let inspQuaternion4 = new THREE.Quaternion();

inspQuaternion1.copy(wheelsInsp[0].quaternion)
inspQuaternion2.copy(wheelsInsp[1].quaternion)
inspQuaternion3.copy(wheelsInsp[2].quaternion)
inspQuaternion4.copy(wheelsInsp[3].quaternion)


let wheels = tesla.children[0].children[0].children[0].children[0].children.slice(11,15)
let teslaQuaternion1 = new THREE.Quaternion();
let teslaQuaternion2 = new THREE.Quaternion();
let teslaQuaternion3 = new THREE.Quaternion();
let teslaQuaternion4 = new THREE.Quaternion();

teslaQuaternion1.copy(wheels[0].quaternion)
teslaQuaternion2.copy(wheels[1].quaternion)
teslaQuaternion3.copy(wheels[2].quaternion)
teslaQuaternion4.copy(wheels[3].quaternion)




function keyboardUpdate() {
    let wheels = car.children[0].children[0].children[0].children[0].children.slice(11,15)

    keyboard.update();

    if (keyboard.down("space")) {
        toggleCamera = !toggleCamera
        if (!toggleCamera) {
            car = inspectionTesla
            scene.visible = false
            renderer.setClearColor("rgb(30, 100, 40)");
        }
        else {
            scene.visible = true
            renderer.setClearColor("rgb(30, 30, 40)");
            car = tesla
        }
    }

    if (keyboard.up("left") || keyboard.up("right")) {
        if (!toggleCamera) {
            inspQuaternion1.copy(wheels[0].quaternion)
            inspQuaternion2.copy(wheels[1].quaternion)
            inspQuaternion3.copy(wheels[2].quaternion)
            inspQuaternion4.copy(wheels[3].quaternion)
        }
        else {
            teslaQuaternion1.copy(wheels[0].quaternion)
            teslaQuaternion2.copy(wheels[1].quaternion)
            teslaQuaternion3.copy(wheels[2].quaternion)
            teslaQuaternion4.copy(wheels[3].quaternion)
        }
    }

    if (keyboard.down("left") || keyboard.down("right")) {
        if (!toggleCamera) {
            wheels[0].quaternion.copy(inspQuaternion1)
            wheels[1].quaternion.copy(inspQuaternion2)
            wheels[2].quaternion.copy(inspQuaternion3)
            wheels[3].quaternion.copy(inspQuaternion4)
        }
        else {
            wheels[0].quaternion.copy(teslaQuaternion1)
            wheels[1].quaternion.copy(teslaQuaternion2)
            wheels[2].quaternion.copy(teslaQuaternion3)
            wheels[3].quaternion.copy(teslaQuaternion4)
        }
    }

    if (keyboard.pressed("X")) {
        wheels[0].rotateY(75)
        wheels[1].rotateY(75)
        wheels[2].rotateY(-75)
        wheels[3].rotateY(-75)
    }

    if (keyboard.pressed("left")) {
        if (wheels[0].rotation.y > -0.45) {
            wheels[0].rotateX(0.01)
            wheels[1].rotateX(0.01)
            wheels[2].rotateX(0.01)
            wheels[3].rotateX(0.01)
        }
    }
    if (keyboard.pressed("right")) {
        if (wheels[0].rotation.y < 0.45) {
            wheels[0].rotateX(-0.01)
            wheels[1].rotateX(-0.01)
            wheels[2].rotateX(-0.01)
            wheels[3].rotateX(-0.01)
        }
    }

    if (toggleCamera) {
        if (keyboard.pressed("X")) {
            tesla.translateZ(velocidade);
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
            // acc = false
        }
        if (keyboard.pressed("down")) {
            tesla.translateZ(-velocidade);
            if (velocidade <= velocidadeMinima)
                velocidade -= 0.01;
            if (saiuPista1 || saiuPista2) {
                if (velocidade >= velocidadeMaxima)
                    velocidade += 0.02;
            }

        }
        var angleCar = degreesToRadians(1);


        if (keyboard.pressed("left")) {
            pressionadoLeft = true;
            if (acc == true) {
                tesla.rotateY(angleCar);
            }
        }
        if (keyboard.pressed("right")) {
            pressionadoRight = true;
            if (acc == true) {
                tesla.rotateY(-angleCar);
            }
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
            if (acc == true) {
                pressionadoLeft = false;
            }
        }
        if (keyboard.up("right")) {
            if (acc == true) {
                pressionadoRight = false;
            }
        }
    }

}

function restartCar(direcao) {
    position = 1;

    if (direcao == 3) {
        tesla.position.set(100, 2.6, -600)
    } else if (direcao == 4) {
        tesla.position.set(-600, 2.6, 300)
    } else {
        tesla.position.set(-100, 2.6, -600)
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

        if (tesla.position.z >= -170 && tesla.position.z <= -125
            && tesla.position.x >= -171 && tesla.position.x <= 162) {
            saiuPista1 = false;
            if (!pathAlreadyExists(1)) {
                path.push(1)
            }
        }

        else if (tesla.position.z >= -125 && tesla.position.z <= 136
            && tesla.position.x >= 133 && tesla.position.x <= 171) {
            saiuPista1 = false;
            if (!pathAlreadyExists(2)) {
                path.push(2)
            }
        }

        else if (tesla.position.z >= 130 && tesla.position.z <= 170
            && tesla.position.x >= -138 && tesla.position.x <= 125) {
            saiuPista1 = false;
            if (!pathAlreadyExists(3)) {
                path.push(3)
            }
        }

        else if (tesla.position.z >= -130 && tesla.position.z <= 136
            && tesla.position.x >= -171 && tesla.position.x <= -131) {
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
        if (tesla.position.z >= -170 && tesla.position.z <= -120
            && tesla.position.x >= -171 && tesla.position.x <= 170) {
            saiuPista2 = false;
            if (!pathAlreadyExists2(1)) {
                path2.push(1)
            }
        }

        else if (tesla.position.z >= -170 && tesla.position.z <= 25
            && tesla.position.x >= 133 && tesla.position.x <= 171) {
            saiuPista2 = false;
            if (!pathAlreadyExists2(2)) {
                path2.push(2)
            }
        }
        else if (tesla.position.z >= -30 && tesla.position.z <= 30
            && tesla.position.x >= 30 && tesla.position.x <= 170) {
            saiuPista2 = false;
            if (!pathAlreadyExists2(3)) {
                path2.push(3)
            }
        }
        else if (tesla.position.z >= -30 && tesla.position.z <= 170
            && tesla.position.x >= -30 && tesla.position.x <= 30) {
            saiuPista2 = false;
            if (!pathAlreadyExists2(4)) {
                path2.push(4)
            }
        }
        else if (tesla.position.z >= 140 && tesla.position.z <= 170
            && tesla.position.x >= -170 && tesla.position.x <= 30) {
            saiuPista2 = false;
            if (!pathAlreadyExists2(5)) {
                path2.push(5)
            }
        }
        else if (tesla.position.z >= -130 && tesla.position.z <= 136
            && tesla.position.x >= -171 && tesla.position.x <= -131) {
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
    if (tesla.position.x >= -64 && tesla.position.x <= -20
        && tesla.position.z >= -169 && tesla.position.z <= -130) {
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

render()

function render() {
    stats.update(); // Update FPS
    trackballControls.update();
    keyboardUpdate();
    verifyPosition();
    checkVoltaPista1();
    checkVoltaPista2();
    checkStartPosition();
    updateClock(clockTotal, clockVolta);
    handleCamera(position, camera, tesla, currentPosition, currentLookAt, acc, isPista);
    requestAnimationFrame(render); // Show events
    if (toggleCamera) {
        renderer.render(scene, camera) // Render scene
    }
    else {
        renderer.render(newScene, inspectionCamera) // Render scene
        lightNewscene.position.copy(inspectionCamera.position)
    }
}

