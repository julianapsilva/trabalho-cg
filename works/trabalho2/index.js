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
let saiuPista3 = false;
let saiuPista4 = false;
let velocidade = 0;
let velocidadeMaxima = 3;
let velocidadeMinima = 1.5;
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

var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(7, 5, -7);
camera.lookAt(scene.position);

var cameraHolder = new THREE.Object3D();

// adicionar o objeto ao carro
tesla.add(cameraHolder)
scene.add(tesla)
cameraHolder.add(camera)


var newScene = new THREE.Scene();
var inspectionCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
inspectionCamera.lookAt(0, 1, 0)
inspectionCamera.position.set(37, 0, 0)

let inspectionTesla = await loadGLTFFile('car/', 'scene.gltf', 'inspection');
newScene.add(inspectionTesla)



var trackballControls = new TrackballControls(inspectionCamera, renderer.domElement);
window.addEventListener('resize', function () { onWindowResize(inspectionCamera, renderer) }, false);

// var trackballControls1 = new TrackballControls(camera, renderer.domElement);
// window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

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


let wheelsInsp = inspectionTesla.children[0].children[0].children[0].children[0].children.slice(11, 15)
let inspQuaternion1 = new THREE.Quaternion();
let inspQuaternion3 = new THREE.Quaternion();

inspQuaternion1.copy(wheelsInsp[0].quaternion)
inspQuaternion3.copy(wheelsInsp[2].quaternion)

let wheels = tesla.children[0].children[0].children[0].children[0].children.slice(11, 15)
let teslaQuaternion1 = new THREE.Quaternion();
let teslaQuaternion3 = new THREE.Quaternion();

teslaQuaternion1.copy(wheels[0].quaternion)
teslaQuaternion3.copy(wheels[2].quaternion)


function keyboardUpdate() {
    let wheels = car.children[0].children[0].children[0].children[0].children.slice(11, 15)

    keyboard.update();

    if (keyboard.up("8")) {
        console.log(tesla.position)
        console.log('camera', camera)
    }

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
            inspQuaternion3.copy(wheels[2].quaternion)
        }
        else {
            teslaQuaternion1.copy(wheels[0].quaternion)
            teslaQuaternion3.copy(wheels[2].quaternion)
        }
    }

    if (keyboard.down("left") || keyboard.down("right")) {
        if (!toggleCamera) {
            wheels[0].quaternion.copy(inspQuaternion1)
            wheels[2].quaternion.copy(inspQuaternion3)
        }
        else {
            wheels[0].quaternion.copy(teslaQuaternion1)
            wheels[2].quaternion.copy(teslaQuaternion3)
        }
    }

    if (keyboard.pressed("X")) {
        wheels[0].rotateY(75)
        wheels[1].rotateY(75)
        wheels[2].rotateY(-75)
        wheels[3].rotateY(-75)
    }

    if (keyboard.pressed("left")) {
        if (wheels[0].rotation.y < 0.24) {
            wheels[0].rotateX(-0.01)
            wheels[2].rotateX(-0.01)
        }
    }
    if (keyboard.pressed("right")) {
        if (wheels[0].rotation.y > -0.49) {
            wheels[0].rotateX(0.01)
            wheels[2].rotateX(0.01)
        }
    }

    if (toggleCamera) {
        if (keyboard.pressed("X")) {
            tesla.translateZ(velocidade);
            if (velocidade <= velocidadeMaxima)
                velocidade += 0.01;
            if (saiuPista1 || saiuPista2) {
                 if (velocidade >= velocidadeMinima)
                     velocidade -= 0.02;
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
        var angleCar = degreesToRadians(1.5);


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

            restartCar(2)
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

    if (direcao == 2) {
        tesla.position.set(600, 2.6, -400)
    }else if (direcao == 3) {
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

function pathAlreadyExists3(number) {
    return path3.some(n => { return n == number })
}

function pathAlreadyExists4(number) {
    return path4.some(n => { return n == number })
}
function verifyPosition() {
    console.log(tesla.position.x, "x")
    console.log(tesla.position.z, "z")

    if (isPista == 1) {
        console.log(path, "path")
        if (tesla.position.z >= -650 && tesla.position.z <= -568
            && tesla.position.x >= -600 && tesla.position.x <= 600) {
            saiuPista1 = false;
            if (!pathAlreadyExists(1)) {
                path.push(1)
            }
        }

        else if (tesla.position.z >= -645 && tesla.position.z <= 580
            && tesla.position.x >= 550 && tesla.position.x <= 650) {
            saiuPista1 = false;
            if (!pathAlreadyExists(2)) {
                path.push(2)
            }
        }

        else if (tesla.position.z >= 560 && tesla.position.z <= 645
            && tesla.position.x >= -630 && tesla.position.x <= 645) {
            saiuPista1 = false;
            if (!pathAlreadyExists(3)) {
                path.push(3)
            }
        }

        else if (tesla.position.z >= -610 && tesla.position.z <= 632
            && tesla.position.x >= -650 && tesla.position.x <= -570) {
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
        if (tesla.position.z >= -650 && tesla.position.z <= -20
            && tesla.position.x >= 555 && tesla.position.x <= 640) {
            saiuPista2 = false;
            if (!pathAlreadyExists2(1)) {
                path2.push(1)
            }
        }

        else if (tesla.position.z >= -20 && tesla.position.z <= 48
            && tesla.position.x >= -42 && tesla.position.x <= 550) {
            saiuPista2 = false;
            if (!pathAlreadyExists2(2)) {
                path2.push(2)
            }
        }
        else if (tesla.position.z >= -45 && tesla.position.z <= 630
            && tesla.position.x >= -25 && tesla.position.x <= 170) {
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
            console.log("saiu")
        }
    }

    if (isPista == 3) {

        if (tesla.position.z >= -170 && tesla.position.z <= -125
            && tesla.position.x >= -171 && tesla.position.x <= 162) {
            saiuPista3 = false;
            if (!pathAlreadyExists3(1)) {
                path3.push(1)
            }
        }

        else if (tesla.position.z >= -125 && tesla.position.z <= 136
            && tesla.position.x >= 133 && tesla.position.x <= 171) {
            saiuPista3 = false;
            if (!pathAlreadyExists3(2)) {
                path3.push(2)
            }
        }

        else if (tesla.position.z >= 130 && tesla.position.z <= 170
            && tesla.position.x >= -138 && tesla.position.x <= 125) {
            saiuPista3 = false;
            if (!pathAlreadyExists3(3)) {
                path3.push(3)
            }
        }

        else if (tesla.position.z >= -130 && tesla.position.z <= 136
            && tesla.position.x >= -171 && tesla.position.x <= -131) {
            saiuPista3 = false;
            if (!pathAlreadyExists3(4)) {
                path3.push(4)
            }
        }
        else {
            saiuPista3 = true;
        }
    }

    if (isPista == 4) {
        if (tesla.position.z >= -170 && tesla.position.z <= -120
            && tesla.position.x >= -171 && tesla.position.x <= 170) {
            saiuPista4 = false;
            if (!pathAlreadyExists4(1)) {
                path4.push(1)
            }
        }

        else if (tesla.position.z >= -170 && tesla.position.z <= 25
            && tesla.position.x >= 133 && tesla.position.x <= 171) {
                saiuPista4 = false;
            if (!pathAlreadyExists4(2)) {
                path4.push(2)
            }
        }
        else if (tesla.position.z >= -30 && tesla.position.z <= 30
            && tesla.position.x >= 30 && tesla.position.x <= 170) {
                saiuPista4 = false;
            if (!pathAlreadyExists4(3)) {
                path4.push(3)
            }
        }
        else if (tesla.position.z >= -30 && tesla.position.z <= 170
            && tesla.position.x >= -30 && tesla.position.x <= 30) {
                saiuPista4 = false;
            if (!pathAlreadyExists4(4)) {
                path4.push(4)
            }
        }
        else if (tesla.position.z >= 140 && tesla.position.z <= 170
            && tesla.position.x >= -170 && tesla.position.x <= 30) {
                saiuPista4 = false;
            if (!pathAlreadyExists4(5)) {
                path4.push(5)
            }
        }
        else if (tesla.position.z >= -130 && tesla.position.z <= 136
            && tesla.position.x >= -171 && tesla.position.x <= -131) {
                saiuPista4 = false;
            if (!pathAlreadyExists4(6)) {
                path4.push(6)
            }
        }
        else {
            saiuPista4 = true;
        }
    }
}

function checkVoltaPista() {
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

    if (isPista == 3) {
        if (path3.length == 6 && checkStartPosition()) {
            volta++;
            path3 = [];
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

    if (isPista == 4) {
        if (path4.length == 6 && checkStartPosition()) {
            volta++;
            path4 = [];
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
    if (tesla.position.x >= -165 && tesla.position.x <= -64
        && tesla.position.z >=640 && tesla.position.z <= -560) {
        return true;
    }
    else
        return false;

}

function controlledRender()
{
  var width = window.innerWidth;
  var height = window.innerHeight;

  // Set main viewport
  renderer.setViewport(0, 0, width, height); // Reset viewport    
  renderer.setScissorTest(false); // Disable scissor to paint the entire window
  renderer.setClearColor("rgb(80, 70, 170)");    
  renderer.clear();   // Clean the window
  renderer.render(scene, camera);   

  // Set virtual camera viewport 
  var offset = 30; 
  renderer.setViewport(offset, height-vcHeidth-offset, vcWidth, vcHeidth);  // Set virtual camera viewport  
  renderer.setScissor(offset, height-vcHeidth-offset, vcWidth, vcHeidth); // Set scissor with the same size as the viewport
  renderer.setScissorTest(true); // Enable scissor to paint only the scissor are (i.e., the small viewport)
  renderer.setClearColor("rgb(60, 50, 150)");  // Use a darker clear color in the small viewport 
  renderer.clear(); // Clean the small viewport
  renderer.render(scene, virtualCamera);  // Render scene of the virtual camera
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
    // trackballControls1.update()
    keyboardUpdate();
    verifyPosition();
    handleCamera(camera, tesla, isPista);
    checkVoltaPista();
    checkStartPosition();
    updateClock(clockTotal, clockVolta);
    //controlledRender();
    // handleCamera(position, camera, tesla, currentPosition, currentLookAt, acc, isPista);
    requestAnimationFrame(render); // Show events
    if (toggleCamera) {
        renderer.render(scene, camera) // Render scene
    }
    else {
        renderer.render(newScene, inspectionCamera) // Render scene
        lightNewscene.position.copy(inspectionCamera.position)
    }
}

