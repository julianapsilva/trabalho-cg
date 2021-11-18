import * as THREE from  '../build/three.module.js';
import Stats from       '../build/jsm/libs/stats.module.js';
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../libs/util/KeyboardState.js';
import {initRenderer, 
        InfoBox,
        initCamera,
        initDefaultSpotlight,
        createGroundPlane,
        onWindowResize, 
        degreesToRadians} from "../libs/util/util.js";


var scene = new THREE.Scene();    // Create main scene
var stats = new Stats();          // To show FPS information
var renderer = initRenderer();    // View function in util/utils
 
  // Main camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.lookAt(0.0, 0.0, 0.0);
camera.position.set(0, -80.0, 50);
camera.up.set(0.0, 1.0, 0.0);

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);



// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

/*--------------------------------------- CRIANDO PLANO E PISTA ---------------------------------------*/
var planeGeometry = new THREE.PlaneGeometry(120, 120);
planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
var planeMaterial = new THREE.MeshBasicMaterial({
    color:'rgb(211, 154, 8)',
    side: THREE.DoubleSide,
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
// add the plane to the scene
scene.add(plane);
// Show text information onscreen
showInformation();

// To use the keyboard
var keyboard = new KeyboardState();


var p1 = [];
var p2 = [];

//Pista 1
function pista1(){
  
// create a cube
var cubeGeometry = new THREE.BoxGeometry(10, 10, 0.3);
var cubeMaterial = new THREE.MeshBasicMaterial({color:'rgb(50,50,50)'});
var cube;

for (let i = -50; i < 51; i+=10) {
    for(let j = -50; j < 51; j+=10){
      if(i == -50 || i == 50 || j == -50 || j == 50){
        cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        // position the cube
        cube.position.set(i, j, 0.15);
        // add the cube to the scene
        scene.add(cube);
      } 
    }
}
var cubeInitGeometry = new THREE.BoxGeometry(10, 10, 0.3);
var cubeInitMaterial = new THREE.MeshBasicMaterial({color:'rgb(255, 0, 0)',});
var cubeInit;
cubeInit = new THREE.Mesh(cubeInitGeometry, cubeInitMaterial);
// position the cube
cubeInit.position.set(-10, -50, 0.15);
// add the cube to the scene
scene.add(cubeInit);
}
//Pista 2
function pista2(){
  
  // create a cube
  var cubeGeometry = new THREE.BoxGeometry(10, 10, 0.3);
  var cubeMaterial = new THREE.MeshBasicMaterial({color:'rgb(50,50,50)'});
  var cube;
  
  for (let i = -50; i < 51; i+=10) {
      for(let j = -50; j < 51; j+=10){
        if(i == -50) // reta 1
        {
          cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          // position the cube
          p2 = cube.position.set(i, j, 0.15);
          // add the cube to the scene
          scene.add(cube);
        } 
        if(j == 50 && i<=0 ) // reta 2
        {
          cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          // position the cube
          cube.position.set(i, j, 0.15);
          // add the cube to the scene
          scene.add(cube);
        } 
           
        if(i == 0 && j>=0 ) // reta 3
        {
          cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          // position the cube
          cube.position.set(i, j, 0.15);
          // add the cube to the scene
          scene.add(cube);
        } 
        
        if(j == 0 && i>=0 ) // reta 4
        {
          cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          // position the cube
          cube.position.set(i, j, 0.15);
          // add the cube to the scene
          scene.add(cube);
        }
        if(i == 50 && j<=0 ) // reta 5
        {
          cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          // position the cube
          cube.position.set(i, j, 0.15);
          // add the cube to the scene
          scene.add(cube);
        } 
        if(j == -50) // reta 6
        {
          cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          // position the cube
          cube.position.set(i, j, 0.15);
          // add the cube to the scene
          scene.add(cube);
        } 
      }
  }
  var cubeInitGeometry = new THREE.BoxGeometry(10, 10, 0.3);
  var cubeInitMaterial = new THREE.MeshBasicMaterial({color:'rgb(255, 0, 0)',});
  var cubeInit;
  cubeInit = new THREE.Mesh(cubeInitGeometry, cubeInitMaterial);
  // position the cube
  cubeInit.position.set(-10, -50, 0.15);
  // add the cube to the scene
  scene.add(cubeInit);
  }
//-------------------------------------------------------------------


// Start setting the group
var group = new THREE.Group();

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 12 );

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
  roda1.position.set( 3.5, -1.0, 4.0);

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
group.add( axesHelper );
group.add( body );
group.add( axis1);
group.add( axis2);
group.add( roda1 );
group.add( roda2 );
group.add( roda3 );
group.add( roda4 );
//group.add( lateralDir);
//group.add( lateralEsq);
group.add( frente);
group.add( atras);

// Add group to the scene
scene.add(group);

// Move all to the start position
group.translateZ(2.6);
group.translateY(-50);
group.rotateY(degreesToRadians(-90));
group.rotateZ(degreesToRadians(-90));
group.position.set(0, -50, 2.6);
camera.lookAt(group.position);

render();


function createCylinder(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, color)
{
  var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded);
  var material;
  if(!color)
    material = new THREE.MeshBasicMaterial({color:"rgb(125,0,0)"});
  else
    material = new THREE.MeshBasicMaterial({color:"rgb(0,0,0)"});
  var object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
  return object;
}

function createTorus(radius, tube, radialSegments, tubularSegments, arc)
{
  var geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
  var material = new THREE.MeshBasicMaterial({color:"rgb(255,255,255)"});
  var object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    object.rotateY(degreesToRadians(90));
  return object;
}

function createSphere(radius, widthSegments, heightSegments)
{
  var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments, 0, Math.PI * 2, 0, Math.PI);
  var material = new THREE.MeshBasicMaterial({color:"rgb(10,10,10)"});
  var object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
  return object;
}

function createRectangle(width, height, depth)
{
  var geometry = new THREE.BoxGeometry(width, height, depth);
  var material = new THREE.MeshBasicMaterial({color:"rgb(12, 96, 126)"});
  var object = new THREE.Mesh(geometry,material);
  object.castShadow = true;
  return object;
}

function keyboardUpdate() {

  keyboard.update();

  if ( keyboard.down("A") ) axesHelper.visible = !axesHelper.visible;

  if ( keyboard.pressed("up") )    group.translateZ(  1 );
  if ( keyboard.pressed("down") )  group.translateZ( -1 );

  var angle = degreesToRadians(10);
  if ( keyboard.pressed("left") )  group.rotateY(  angle );
  if ( keyboard.pressed("right") ) group.rotateY( -angle );

}

function showInformation()
{
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

function render()
{
  stats.update(); // Update FPS
  trackballControls.update();
  keyboardUpdate();
  camera.lookAt(group.position);
  //pista1();
  pista2();
  requestAnimationFrame(render); // Show events
  renderer.render(scene, camera) // Render scene
}
