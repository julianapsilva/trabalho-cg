import * as THREE from '../../build/three.module.js';
import Stats from '../../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../../libs/util/KeyboardState.js';
import mountCar from './car/mountCar.js';
import handleCamera from './camera/handleCamera.js';
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

var scene = new THREE.Scene();    // Create main scene
var stats = new Stats();          // To show FPS information
var renderer = initRenderer();    // View function in util/utils
renderer.setClearColor("rgb(30, 30, 40)");
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.lookAt(0, 0, 0);
camera.position.set(5, 15, 50);
camera.up.set(0, 1, 0);
var upVec = new THREE.Vector3(0, 1, 0);
// camera.up.set(upVec);



var newScene = new THREE.Scene();    // Create main scene
var inspectionCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
let car = mountCar()
car.position.set(0, 0, 0)
newScene.add(car)

inspectionCamera.lookAt(0, 0, 0)
inspectionCamera.position.set(47, 0, 0)




var clock = new THREE.Clock();
var light = initDefaultSpotlight(scene, new THREE.Vector3(35, 20, 30)); // Use default light
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


var planeGeometry = new THREE.PlaneGeometry(360, 360);
// planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
var planeMaterial = new THREE.MeshBasicMaterial({
    color: 'rgb(211, 154, 8)',
    side: THREE.DoubleSide,
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotateX(degreesToRadians(-90));
// add the plane to the scene
scene.add(plane);
// Show text information onscreen
showInformation();

var pista1_obj = [];
var pista2_obj = [];

var isPista = 0; // 1 >> Modo pista 1 || 2 >> Modo pista 2
function blocoComum(x, z){
  var cubeGeometry = new THREE.BoxGeometry(50, 0.3, 50);
  var cubeMaterial = new THREE.MeshBasicMaterial({ color: 'rgb(50,50,50)' });
  var cube;

  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(x, 0.15, z);
  scene.add(cube);
}
function blocoInicio(x, z){
  var cubeGeometry = new THREE.BoxGeometry(50, 0.4, 50);
  var cubeMaterial = new THREE.MeshBasicMaterial({ color: 'rgb(255, 0, 0)', });
  var cube;

  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(x, 0.15, z);

  scene.add(cube);
}
function mudarPista() {
  //Pista 1
  if (isPista == 1) {
    for (let i = -150; i < 151; i += 30) {
      for (let j = -150; j < 151; j += 30) {
        if (i == -150 || i == 150 || j == -150 || j == 150) {
          blocoComum(i,j);
        }
        if (i == -30 && j == -150) {
          blocoInicio(i,j);
        }
      }
    }
  }
  //Pista 2
  if (isPista == 2) {
    for (let i = -150; i < 151; i += 30) {
      for (let j = -150; j < 151; j += 30) {
        if (i == -150) // reta 1
        {
          blocoComum(i,j);
        }
        if (j == 150 && i <= 0) // reta 2
        {
          blocoComum(i,j);
        }
        if (i == 0 && j >= 0) // reta 3
        {
          blocoComum(i,j);
        }
        if (j == 0 && i >= 0) // reta 4
        {
          blocoComum(i,j);
        }
        if (i == 150 && j <= 0) // reta 5
        {
          blocoComum(i,j);
        }
        if (j == -150) // reta 6
        {
          blocoComum(i,j);
        }
        if (i == -30 && j == -150) {
          blocoInicio(i,j);
        }
      }
    }
    scene.children[4].userData.teste = 'um teste'
    // scene.children.map(child => console.table(child.position))
  }
}


// To use the keyboard
var keyboard = new KeyboardState();

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(inspectionCamera, renderer.domElement);

var group = mountCar()
scene.add(group)
camera.position.set(97, 19, -91)

render()


function keyboardUpdate() {

    keyboard.update();

    if (keyboard.down("A")) axesHelper.visible = !axesHelper.visible;

    if (keyboard.pressed("up")) {
        group.translateZ(0.5);
    }
    if (keyboard.pressed("down")) group.translateZ(-0.5);

    var angle = degreesToRadians(5);
    if (keyboard.pressed("left")) group.rotateY(angle);
    if (keyboard.pressed("right")) group.rotateY(-angle);
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
    if (keyboard.pressed("6")) {
        scene.visible = true
    }
    // Muda o tipo de pista
    if (keyboard.down("7")) {
        isPista = 1;
        mudarPista();
    }
    if (keyboard.down("8")) {
        isPista = 2;
        mudarPista();
    }

}



function verifyPosition() {

    // if (group.position.x <= 28 && group.position.x >= -43.5) {
    //   position = 1
    // }

    // if (group.position.x > -43 && group.position.x < -37) {
    //   position = 2
    // }
    // if (group.position.x >= -35 && group.position.x <= 33) {
    //   position = 3;
    // }

}

function colision() {
    //   scene.children.map((child) => {
    //     if (child.type == 'Mesh' && child.id == 70) {
    //     console.log(child.id)
    const firstBB = new THREE.Box3().setFromObject(groundPlane)
    const secondBB = new THREE.Box3().setFromObject(roda1);
    var collision = firstBB.intersectsBox(secondBB);
    console.log(collision, firstBB, secondBB)
    //   }
    // })
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
    handleCamera(position, camera, group, currentPosition, currentLookAt);
    verifyPosition()
    requestAnimationFrame(render); // Show events
    if (toggleCamera) {
        renderer.render(scene, camera) // Render scene
    }
    else
        renderer.render(newScene, inspectionCamera) // Render scene

}
