import * as THREE from '../../build/three.module.js';
import Stats from '../../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../../libs/util/KeyboardState.js';
import createPlane from './pistas/plane.js';
import loadGLTFFile from './car/car.js';
import mudaPista from './pistas/pistas.js';
import {
    criaBoxRelogio, criaBoxRelogioCorrente,
    updateClock, criaBoxVelocidade,
    updateVelocidade,
    criaBoxMelhorVolta,
    updateMelhorVolta
} from './clock/clock.js';
import {adicionaAmbientLight, setDirectionalLighting } from './light/light.js';
import {
    initRenderer,
    InfoBox,
    initDefaultSpotlight,
    onWindowResize,
    degreesToRadians,
    lightFollowingCamera
} from "../../libs/util/util.js";


let position = 1
let toggleCamera = true
let path = []
let path2 = []
let path3 = []
let path4 = []
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
let melhorVolta


let tempoVoltas = [];
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
var target = new THREE.Vector3();
var targetLight = new THREE.Vector3(); 

var cameraHolder = new THREE.Object3D();
scene.add(tesla)
tesla.add(cameraHolder);
camera.position.set(-100, 2.6, -600)
cameraHolder.lookAt(0, 0, 0);
cameraHolder.position.set(0, 1, 3)


var newScene = new THREE.Scene();
var inspectionCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
inspectionCamera.lookAt(0, 1, 0)
inspectionCamera.position.set(37, 0, 0)

let inspectionTesla = await loadGLTFFile('car/', 'scene.gltf', 'inspection');
newScene.add(inspectionTesla)


var trackballControls = new TrackballControls(inspectionCamera, renderer.domElement);
window.addEventListener('resize', function () { onWindowResize(inspectionCamera, renderer) }, false);


adicionaAmbientLight(scene)
var lightNewscene = initDefaultSpotlight(newScene, new THREE.Vector3(100, 100, 100)); // Use default light
lightNewscene.intensity = 6


var luzDirecional =  setDirectionalLighting(tesla, tesla.position.clone().add(new THREE.Vector3(0,1, 0)))
luzDirecional.target = tesla;


// Listen window size changes
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);


createPlane(scene);
// Show text information onscreen
showInformation();
criaBoxRelogio(clockTotal);
criaBoxRelogioCorrente(clockVolta)
criaBoxVelocidade(velocidade)
criaBoxMelhorVolta(melhorVolta)
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
var ativo = false


function animate() {
    if (velocidade > 0) {
        if (ativo) {
            switch (velocidade) {
                case velocidade > 2:
                    velocidade -= 0.001
                    break;
                case velocidade > 1.4:
                    velocidade -= 0.005
                    break;
                default:
                    velocidade -= 0.01
                    break;
            }
            tesla.translateZ(velocidade);
            requestAnimationFrame(animate);
        }
    }
    else 
        ativo = false
  }  


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

    if (keyboard.up("left") || keyboard.up("right")
        || keyboard.down("left") || keyboard.down("right")) {
        if (!toggleCamera) {
            wheels[0].quaternion.slerp(inspQuaternion1, 0.9)
            wheels[2].quaternion.slerp(inspQuaternion3, 0.9)
        }
        else {
            wheels[0].quaternion.slerp(teslaQuaternion1, 0.9)
            wheels[2].quaternion.slerp(teslaQuaternion3, 0.9)
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
        if (wheels[0].rotation.y > -0.24) {
            wheels[0].rotateX(0.01)
            wheels[2].rotateX(0.01)
        }
    }

    if (toggleCamera) {
        if (keyboard.pressed("X")) {
            tesla.translateZ(velocidade);
            console.log(velocidade, "velocidade");
            if (velocidade <= velocidadeMaxima)
                velocidade += 0.01;
            if (saiuPista1 || saiuPista2 || saiuPista3 || saiuPista4) {
                if (velocidade >= velocidadeMinima)
                    velocidade -= 0.02;
            }
        }
        if (keyboard.down("X")) {
            acc = true
            ativo = false
        }
        if (keyboard.up("X")) {
            ativo = true
            animate()
        }

        if (keyboard.pressed("down")) {
            tesla.translateZ(-velocidade);
            if (velocidade <= velocidadeMinima)
                velocidade -= 0.01;
            if (saiuPista1 || saiuPista2 || saiuPista3 || saiuPista4) {
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
        // Guarda a mudan??a de estado das teclas
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
    } else if (direcao == 3) {
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


    if (isPista == 1) {
        if (tesla.position.z >= -650 && tesla.position.z <= -568
            && tesla.position.x >= -600 && tesla.position.x <= 600) {
            saiuPista1 = false;
            if (!pathAlreadyExists(1)) {
                path.push(1)
            }
        }

        else if (tesla.position.z >= -645 && tesla.position.z <= 580
            && tesla.position.x >= 550 && tesla.position.x <= 640) {
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
            console.log("saiu")
        }
    }

    if (isPista == 2) {
        if (tesla.position.z >= -642 && tesla.position.z <= 29
            && tesla.position.x >= 558 && tesla.position.x <= 648) {
            saiuPista2 = false;
            if (!pathAlreadyExists2(1)) {
                path2.push(1)
            }
        }

        else if (tesla.position.z >= -30 && tesla.position.z <= 30
            && tesla.position.x >= -30 && tesla.position.x <= 642) {
            saiuPista2 = false;
            if (!pathAlreadyExists2(2)) {
                path2.push(2)
            }
        }
        else if (tesla.position.z >= -40 && tesla.position.z <= 630
            && tesla.position.x >= -45 && tesla.position.x <= 45) {
            saiuPista2 = false;
            if (!pathAlreadyExists2(3)) {
                path2.push(3)
            }
        }
        else if (tesla.position.z >= 560 && tesla.position.z <= 640
            && tesla.position.x >= -630 && tesla.position.x <= 30) {
            saiuPista2 = false;
            if (!pathAlreadyExists2(4)) {
                path2.push(4)
            }
        }
        else if (tesla.position.z >= -635 && tesla.position.z <= 641
            && tesla.position.x >= -638 && tesla.position.x <= -550) {
            saiuPista2 = false;
            if (!pathAlreadyExists2(5)) {
                path2.push(5)
            }
        }
        else if (tesla.position.z >= -646 && tesla.position.z <= -559
            && tesla.position.x >= -635 && tesla.position.x <= 630) {
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
        if (tesla.position.z >= -647 && tesla.position.z <= -560
            && tesla.position.x >= -338 && tesla.position.x <= 639) {
            saiuPista3 = false;
            if (!pathAlreadyExists3(1)) {
                path3.push(1)
            }
        }

        else if (tesla.position.z >= -643 && tesla.position.z <= -63
            && tesla.position.x >= -348 && tesla.position.x <= -260) {
            saiuPista3 = false;
            if (!pathAlreadyExists3(2)) {
                path3.push(2)
            }
        }

        else if (tesla.position.z >= -140 && tesla.position.z <= -60
            && tesla.position.x >= -639 && tesla.position.x <= -266) {
            saiuPista3 = false;
            if (!pathAlreadyExists3(3)) {
                path3.push(3)
            }
        }

        else if (tesla.position.z >= -146 && tesla.position.z <= 640
            && tesla.position.x >= -645 && tesla.position.x <= -580) {
            saiuPista3 = false;
            if (!pathAlreadyExists3(4)) {
                path3.push(4)
            }
        }
        else if (tesla.position.z >= 555 && tesla.position.z <= 647
            && tesla.position.x >= -642 && tesla.position.x <= 638) {
            saiuPista3 = false;
            if (!pathAlreadyExists3(5)) {
                path3.push(5)
            }
        }
        else if (tesla.position.z >= -635 && tesla.position.z <= 645
            && tesla.position.x >= 565 && tesla.position.x <= 638) {
            saiuPista3 = false;
            if (!pathAlreadyExists3(6)) {
                path3.push(6)
            }
        }
        else if (tesla.position.z >= -342 && tesla.position.z <= 637
            && tesla.position.x >= 152 && tesla.position.x <= 237) {
            saiuPista3 = false;
            if (!pathAlreadyExists3(7)) {
                path3.push(7)
            }
        }
        else if (tesla.position.z >= -341 && tesla.position.z <= -232
            && tesla.position.x >= -155 && tesla.position.x <= 636) {
            saiuPista3 = false;
            if (!pathAlreadyExists3(8)) {
                path3.push(8)
            }
        }
        else {
            saiuPista3 = true;
            console.log("saiu")
        }
    }

    if (isPista == 4) {
        if (tesla.position.z >= -38 && tesla.position.z <= 635
            && tesla.position.x >= -646 && tesla.position.x <= -560) {
            saiuPista4 = false;
            if (!pathAlreadyExists4(1)) {
                path4.push(1)
            }
        }

        else if (tesla.position.z >= -30 && tesla.position.z <= 40
            && tesla.position.x >= -640 && tesla.position.x <= 330) {
            saiuPista4 = false;
            if (!pathAlreadyExists4(2)) {
                path4.push(2)
            }
        }
        else if (tesla.position.z >= -635 && tesla.position.z <= 41
            && tesla.position.x >= 260 && tesla.position.x <= 345) {
            saiuPista4 = false;
            if (!pathAlreadyExists4(3)) {
                path4.push(3)
            }
        }
        else if (tesla.position.z >= -635 && tesla.position.z <= -568
            && tesla.position.x >= -560 && tesla.position.x <= 645) {
            saiuPista4 = false;
            if (!pathAlreadyExists4(4)) {
                path4.push(4)
            }
        }
        else if (tesla.position.z >= -640 && tesla.position.z <= -263
            && tesla.position.x >= 563 && tesla.position.x <= 637) {
            saiuPista4 = false;
            if (!pathAlreadyExists4(5)) {
                path4.push(5)
            }
        }
        else if (tesla.position.z >= -345 && tesla.position.z <= -263
            && tesla.position.x >= -127 && tesla.position.x <= 643) {
            saiuPista4 = false;
            if (!pathAlreadyExists4(6)) {
                path4.push(6)
            }
        }
        else if (tesla.position.z >= -340 && tesla.position.z <= 630
            && tesla.position.x >= -142 && tesla.position.x <= -67) {
            saiuPista4 = false;
            if (!pathAlreadyExists4(7)) {
                path4.push(7)
            }
        }
        else if (tesla.position.z >= 560 && tesla.position.z <= 644
            && tesla.position.x >= -638 && tesla.position.x <= -53) {
            saiuPista4 = false;
            if (!pathAlreadyExists4(8)) {
                path4.push(8)
            }
        }
        else {
            saiuPista4 = true;
            console.log("saiu")
        }
    }
}

function checkVoltaPista() {
    if (isPista == 1) {
        if (path.length == 4 && checkStartPosition()) {
            volta++;
            console.log(volta, "volta");
            path = [];
            clockVolta.stop();
            tempoVoltas.push(clockVolta.getElapsedTime());
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
            tempoVoltas.push(clockVolta.getElapsedTime());
            clockVolta.start();
        }

        if (volta == 4 && checkStartPosition()) {
            clockTotal.stop();
            velocidade = 0;
            clockTotal.getElapsedTime();
        }
    }

    if (isPista == 3) {
        if (checkStartPosition() && path3.length >= 6) {
            volta++;
            clockVolta.stop();
            tempoVoltas.push(clockVolta.getElapsedTime());
            clockVolta.start();
            path3 = [];
        }

        if (volta == 4 && checkStartPosition()) {
            clockTotal.stop();
            velocidade = 0;
            clockTotal.getElapsedTime();
        }
    }

    if (isPista == 4) {
        if (checkStartPosition() && path4.length == 8) {
            volta++;
            path4 = [];
            clockVolta.stop();
            tempoVoltas.push(clockVolta.getElapsedTime());
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
    if (isPista == 1)
    {
        if (tesla.position.x >= -170 && tesla.position.x <= -60
            && tesla.position.z >= -640 && tesla.position.z <= -560) {
            return true;
        }
        else
            return false;
    }
    if (isPista == 2)
    {
        if (tesla.position.x >= 600
            && tesla.position.z >= -425) {
            return true;
        }
        else
            return false;
    }
    if (isPista == 3)
    {
        if (tesla.position.x > 50 && tesla.position.x < 151
            && tesla.position.z >-650 && tesla.position.z <-566 ) {
            return true;
        }
        else
            return false;
    }
    if (isPista == 4)
    {
        if (tesla.position.x >= -637 && tesla.position.x <= -568
            && tesla.position.z >= 250 && tesla.position.z <= 350) {
            return true;
        }
        else
            return false;
    }
}

function voltaMaisRapida()
{
    melhorVolta = tempoVoltas[0];
    for(let i = 0; i < tempoVoltas.length; i++)
    {
        if (tempoVoltas[i] < tempoVoltas[i+1])
            melhorVolta = tempoVoltas[i];
    }
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
    controls.add(" 1/ 2/ 3/ 4 -> Pistas");
    controls.show();
}
//-------------------------------------------------------------------------------
// Setting virtual camera MINIMAPA
//-------------------------------------------------------------------------------
var lookAtVec = new THREE.Vector3(0.0, 0.0, 0.0);
var camPosition = new THREE.Vector3(0, 550, 0);
var upVec = new THREE.Vector3(0.0, 600.0, 0.0);
var vcWidth = 300;
var vcHeidth = 300;
var projectionChanged = false;
var virtualCamera = new THREE.PerspectiveCamera(100, 1, 0.1, 1000);
virtualCamera.position.copy(camPosition);
virtualCamera.up.copy(upVec);
virtualCamera.lookAt(lookAtVec);

// Updates de 3D object that represents the virtual camera 
// and the camera helper

function controlledRender() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    // Set main viewport
    renderer.setViewport(0, 0, width, height); // Reset viewport    
    renderer.setScissorTest(false); // Disable scissor to paint the entire window
    renderer.render(scene, camera) // Render scene

    // Set virtual camera viewport 
    var offset = 100;
    renderer.setViewport(offset - 100, height - vcHeidth - offset, vcWidth, vcHeidth);  // Set virtual camera viewport  
    renderer.setScissor(offset - 100, height - vcHeidth - offset, vcWidth, vcHeidth); // Set scissor with the same size as the viewport
    renderer.setScissorTest(true); // Enable scissor to paint only the scissor are (i.e., the small viewport)
    renderer.render(scene, virtualCamera);  // Render scene of the virtual camera
}
//-------------------------------------------------------------------------------
// FIM virtual camera MINIMAPA
//-------------------------------------------------------------------------------


render()

function render() {
    stats.update(); // Update FPS
    trackballControls.update();
    keyboardUpdate();
    verifyPosition();
    cameraHolder.getWorldPosition(target);
    camera.position.copy(tesla.position.clone().add(new THREE.Vector3(-30, 25, -30)))
    camera.lookAt(target)
    checkStartPosition();
    checkVoltaPista();
    updateClock(clockTotal, clockVolta);
    updateVelocidade(velocidade);
    updateMelhorVolta(melhorVolta);
    voltaMaisRapida();
    requestAnimationFrame(render); // Show events
    if (toggleCamera) {
        renderer.render(scene, camera) // Render scene
        controlledRender()
    }
    else {
        renderer.setViewport(0, 0, window.innerWidth, window.innerHeight); // Reset viewport    
        renderer.setScissorTest(false); // Disable scissor to paint the entire window
        renderer.render(newScene, inspectionCamera) // Render scene
        lightFollowingCamera(lightNewscene, inspectionCamera)
    }
}

