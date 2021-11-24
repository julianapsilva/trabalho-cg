import * as THREE from '../../build/three.module.js';
import Stats from '../../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../../libs/util/KeyboardState.js';
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

var clock = new THREE.Clock();
var light = initDefaultSpotlight(scene, new THREE.Vector3(35, 20, 30)); // Use default light
var lightSphere = createSphere(0.3, 10, 10);
lightSphere.position.copy(light.position);
scene.add(lightSphere);

// Listen window size changes
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);


var planeGeometry = new THREE.PlaneGeometry(130, 130);
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

var p1 = [];
var p2 = [];

//Pista 1
function pista1() {

    // create a cube
    var cubeGeometry = new THREE.BoxGeometry(10, 10, 0.3);
    var cubeMaterial = new THREE.MeshBasicMaterial({ color: 'rgb(50,50,50)' });
    var cube;

    for (let i = -50; i < 51; i += 10) {
        for (let j = -50; j < 51; j += 10) {
            if (i == -50 || i == 50 || j == -50 || j == 50) {
                cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                // position the cube
                cube.position.set(i, j, 0.15);
                // add the cube to the scene
                scene.add(cube);
            }
        }
    }
    var cubeInitGeometry = new THREE.BoxGeometry(10, 10, 0.3);
    var cubeInitMaterial = new THREE.MeshBasicMaterial({ color: 'rgb(255, 0, 0)', });
    var cubeInit;
    cubeInit = new THREE.Mesh(cubeInitGeometry, cubeInitMaterial);
    // position the cube
    cubeInit.position.set(44, 2.3, -42);

    // add the cube to the scene
    scene.add(cubeInit);
}


// To use the keyboard
var keyboard = new KeyboardState();

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

//-------------------------------------------------------------------
// Start setting the group

var group = new THREE.Group();

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12);

// Set the parts of the pseudo-car
var body = createCylinder(2.0, 2.7, 12.0, 20, 20, false, 1);
body.rotateX(degreesToRadians(90));
body.position.set(0.0, 0.5, 0.0);

var front = createRectangle();
front.position.set();
//eixos carrinho
var axis1 = createCylinder(0.3, 0.3, 7.0, 10, 10, false);
axis1.rotateZ(degreesToRadians(90));
axis1.position.set(0.0, -1.0, 4.0);

var axis2 = createCylinder(0.3, 0.3, 7.0, 10, 10, false);
axis2.rotateZ(degreesToRadians(90));
axis2.position.set(0.0, -1.0, -4.0);

var roda1 = createTorus(1.0, 0.3, 20, 20, Math.PI * 2);
roda1.position.set(3.5, -1.0, 4.0);

var roda2 = createTorus(1.0, 0.3, 20, 20, Math.PI * 2);
roda2.position.set(-3.5, -1.0, 4.0);

var roda3 = createTorus(1.0, 0.3, 20, 20, Math.PI * 2);
roda3.position.set(3.5, -1.0, -4.0);

var roda4 = createTorus(1.0, 0.3, 20, 20, Math.PI * 2);
roda4.position.set(-3.5, -1.0, -4.0);

//var lateralDir = createRectangle(1.5, 0.5, 3.0);
//lateralDir.position.set(-3.0, 1.0, 2.0);

//var lateralEsq = createRectangle(1.5, 0.5, 3.0);
//lateralEsq.position.set(3.0, 1.0, 2.0);

var atras = createRectangle(10.5, 0.5, 2.0);
atras.position.set(0.0, 1.5, -6.9);

var frente = createRectangle(7.5, 0.5, 2.0);
frente.position.set(0.0, 0.5, 6.9);

// Add objects to the group
group.add(axesHelper);
group.add(body);
group.add(axis1);
group.add(axis2);
group.add(roda1);
group.add(roda2);
group.add(roda3);
group.add(roda4);
//group.add( lateralDir);
//group.add( lateralEsq);
group.add(frente);
group.add(atras);

// Add group to the scene
scene.add(group);


group.translateY(2.3);
group.rotateY(degreesToRadians(-90));
group.position.set(44, 2.3, -42)

render();


function createCylinder(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, color) {
    var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded);
    var material;
    if (!color)
        material = new THREE.MeshBasicMaterial({ color: "rgb(125,0,0)" });
    else
        material = new THREE.MeshBasicMaterial({ color: "rgb(0,0,0)" });
    var object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    return object;
}

function createTorus(radius, tube, radialSegments, tubularSegments, arc) {
    var geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
    var material = new THREE.MeshBasicMaterial({ color: "rgb(255,255,255)" });
    var object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    object.rotateY(degreesToRadians(90));
    return object;
}

function createSphere(radius, widthSegments, heightSegments) {
    var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments, 0, Math.PI * 2, 0, Math.PI);
    var material = new THREE.MeshBasicMaterial({ color: "rgb(10,10,10)" });
    var object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    return object;
}

function createRectangle(width, height, depth) {
    var geometry = new THREE.BoxGeometry(width, height, depth);
    var material = new THREE.MeshBasicMaterial({ color: "rgb(12, 96, 126)" });
    var object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    return object;
}
function handleCamera() {
    let idealOffset
    let idealLookAt

    switch (position) {
        case 1:
            idealOffset = new THREE.Vector3(20, 17, -30)
            idealLookAt = new THREE.Vector3(10, 7, -10)
            camera.zoom = 1.3
            break;
        case 2:
            idealOffset = new THREE.Vector3(-25, 10, -20)
            idealLookAt = new THREE.Vector3(25, -5, 5)
            camera.zoom = 0.9
            break;
        case 3:
            idealOffset = new THREE.Vector3(-15, 10, 20)
            idealLookAt = new THREE.Vector3(5, -5, 0)
            camera.zoom = 0.5
            break;
        case 4:
            idealOffset = new THREE.Vector3(35, 15, 30)
            idealLookAt = new THREE.Vector3(17, 5, 0)
            camera.zoom = 0.5
            break;
    }
    camera.updateProjectionMatrix();

    idealOffset.applyQuaternion(group.quaternion)
    idealOffset.add(group.position)

    idealLookAt.applyQuaternion(group.quaternion)
    idealLookAt.add(group.position)

    const t = 0.05
    currentPosition.lerp(idealOffset, t)
    currentLookAt.lerp(idealLookAt, t)

    camera.position.copy(currentPosition)
    camera.lookAt(currentLookAt)
}

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

}

function verifyPosition() {

    // if (group.position.x <= 28 && group.position.x >= -43.5) {
    //   position = 1
    // }

    // if (group.position.x > -43 && group.position.x < -37) {
    //   // upVec.x = Math.sin(degreesToRadians(90));
    //   // upVec.y = Math.cos(degreesToRadians(-90));
    //   // camera.up.copy(upVec);
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
    handleCamera();
    verifyPosition()
    requestAnimationFrame(render); // Show events
    renderer.render(scene, camera) // Render scene
}
