import * as THREE from '../build/three.module.js';
import Stats from '../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../libs/util/KeyboardState.js';
import {
  initRenderer,
  InfoBox,
  initCamera,
  initDefaultSpotlight,
  createGroundPlane,
  onWindowResize,
  degreesToRadians
} from "../libs/util/util.js";


var scene = new THREE.Scene();    // Create main scene
var stats = new Stats();          // To show FPS information
var renderer = initRenderer();    // View function in util/utils

// Main camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.lookAt(0.0, 0.0, 0.0);
camera.position.set(0, -240.0, 150);
camera.up.set(0.0, 1.0, 0.0);

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);



// Listen window size changes
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

//================================== Modelagem da pista ==================================
var planeGeometry = new THREE.PlaneGeometry(360, 360);
//planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
var planeMaterial = new THREE.MeshBasicMaterial({
  color: 'rgb(211, 154, 8)',
  side: THREE.DoubleSide,
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
// add the plane to the scene
scene.add(plane);

// Show text information onscreen
showInformation();

// To use the keyboard
var keyboard = new KeyboardState();


var pista1_obj = [];
var pista2_obj = [];

var isPista = true; // true >> Modo pista 1 || false >> Modo pista 2
function blocoComum(x, y){
  var cubeGeometry = new THREE.BoxGeometry(50, 50, 0.3);
  var cubeMaterial = new THREE.MeshBasicMaterial({ color: 'rgb(50,50,50)' });
  var cube;

  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(x, y, 0.15);
  //pista1_obj = cube;
  scene.add(cube);
}
function blocoInicio(x, y){
  var cubeGeometry = new THREE.BoxGeometry(50, 50, 0.3);
  var cubeMaterial = new THREE.MeshBasicMaterial({ color: 'rgb(255, 0, 0)', });
  var cube;

  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(x, y, 0.15);

  pista1_obj = cube;

  scene.add(cube);
}
function mudarPista() {
  //Pista 1
  if (isPista == true) {
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
  if (isPista == false) {
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

// Move all to the start position
group.translateZ(2.6);
group.translateY(-150);
group.rotateY(degreesToRadians(-90));
group.rotateZ(degreesToRadians(-90));
group.position.set(-30, -150, 2.6);
camera.lookAt(group.position);
console.log(scene)

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

function keyboardUpdate() {

  keyboard.update();

  // Muda o tipo de pista
  if (keyboard.down("1")) {
    isPista = true;
  }
  if (keyboard.down("2")) {
    isPista = false;
  }
  if (keyboard.pressed("5")) {
    console.log(group.position)
  }
  if (keyboard.down("A")) axesHelper.visible = !axesHelper.visible;

  if (keyboard.pressed("up")) group.translateZ(1);
  if (keyboard.pressed("down")) group.translateZ(-1);

  var angle = degreesToRadians(10);
  if (keyboard.pressed("left")) group.rotateY(angle);
  if (keyboard.pressed("right")) group.rotateY(-angle);
}


function verifyPosition() {
  if (group.position.y >= -171 && group.position.y <= -132
    && group.position.x >= -152 && group.position.x <= 150) {
    console.log('esta')
  }
  else
    console.log(group.position)

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
  controls.add(" 1 / 2 - Pista 1 / Pista 2");
  controls.show();
}

function render() {
  stats.update(); // Update FPS
  keyboardUpdate();
  verifyPosition();
  requestAnimationFrame(render); // Show events
  renderer.render(scene, camera) // Render scene
  if(isPista==false){
    renderer.render(scene, camera) // Render scene
    mudarPista();
  }else{
    renderer.render(scene, camera) // Render scene
    mudarPista();
  }   

  trackballControls.update();
}
