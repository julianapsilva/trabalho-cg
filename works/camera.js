import * as THREE from '../../build/three.module.js';
import { TrackballControls } from '../../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../../libs/util/KeyboardState.js';
import {
    initRenderer,
    initDefaultSpotlight,
    createGroundPlane,
    onWindowResize,
    degreesToRadians
} from "../../libs/util/util.js";

var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
var keyboard = new KeyboardState();


var light = initDefaultSpotlight(scene, new THREE.Vector3(5.0, 5.0, 5.0)); // Use default light    

// Main camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.lookAt(0.0, 0.0, 0.0);
camera.position.set(10.0, 30.0, 1.0);
camera.up.set(0.0, 1.0, 0.0);

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

// Listen window size changes
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

var groundPlane = createGroundPlane(100, 100, 50, 50); // width, height, resolutionW, resolutionH
groundPlane.rotateX(degreesToRadians(-90));
scene.add(groundPlane);


var group = new THREE.Group();

var body = createCylinder(2.0, 2.7, 10.0, 10, 20, false, 1);
body.rotateX(degreesToRadians(90));
body.position.set(0.0, 0.5, 0.0)

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

// Add objects to the group
group.add(body);
group.add(axis1);
group.add(axis2);
group.add(roda1);
group.add(roda2);
group.add(roda3);
group.add(roda4);

// Add group to the scene
scene.add(group);

// Move all to the start position
group.translateY(2.3);
group.position.set(35.0, 2.3, 0.0);
group.rotateY(degreesToRadians(-90));
camera.lookAt(group.position);

render();


function createCylinder(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, color) {
    var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded);
    var material;
    if (!color)
        material = new THREE.MeshPhongMaterial({ color: "rgb(255,0,0)" });
    else
        material = new THREE.MeshPhongMaterial({ color: "rgb(230,120,50)" });
    var object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    return object;
}

function createTorus(radius, tube, radialSegments, tubularSegments, arc) {
    var geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
    var material = new THREE.MeshPhongMaterial({ color: "rgb(125,125,125)" });
    var object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    object.rotateY(degreesToRadians(90));
    return object;
}



function keyboardUpdate() {
    var angle = degreesToRadians(10);
    keyboard.update();
    if (keyboard.pressed("up")) group.translateZ(1);
    if (keyboard.pressed("down")) group.translateZ(-1);
    if (keyboard.pressed("left")) group.rotateY(angle);
    if (keyboard.pressed("right")) group.rotateY(-angle);
}


function controlledRender() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    // Set main viewport
    renderer.setViewport(0, 0, width, height); // Reset viewport    
    renderer.setScissorTest(false); // Disable scissor to paint the entire window
    renderer.setClearColor("rgb(80, 70, 170)");
    renderer.clear();   // Clean the window
    renderer.render(scene, camera);

}

function render() {
    trackballControls.update();
    keyboardUpdate();
    camera.lookAt(group.position);
    controlledRender();
    requestAnimationFrame(render);
}