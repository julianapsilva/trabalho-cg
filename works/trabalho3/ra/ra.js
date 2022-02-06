import * as THREE from '../../../build/three.module.js';
import {ARjs}    from  '../../../libs/AR/ar.js';
import {GLTFLoader} from '../../../build/jsm/loaders/GLTFLoader.js';
import { adicionaAmbientLight, setDirectionalLighting, initCamera } from '.././light/light.js';
import {SecondaryBox,
    getMaxSize, 
    createGroundPlane,
    degreesToRadians,
    } from "../../../libs/util/util.js";

var clock = new THREE.Clock();

var renderer	= new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize( 640, 480 );
document.body.appendChild( renderer.domElement );
//inicia camera e a cena
var raScene	= new THREE.Scene();
var camera = new THREE.Camera();
raScene.add(camera);

// array of functions for the rendering loop
var onRenderFcts= [];
//-------------------------------------------

// Handle arToolkitSource
// More info: https://ar-js-org.github.io/AR.js-Docs/marker-based/
//var arToolkitSource = new THREEx.ArToolkitSource({
var arToolkitSource = new ARjs.Source({	
	sourceType : 'image',
	sourceUrl : '../../../assets/AR/kanjiScene.jpg',

})

arToolkitSource.init(function onReady(){
	setTimeout(() => {
		onResize()
	}, 2000);
})

// handle resize
window.addEventListener('resize', function(){
	onResize()
})

function onResize(){
	arToolkitSource.onResizeElement()
	arToolkitSource.copyElementSizeTo(renderer.domElement)
	if( arToolkitContext.arController !== null ){
		arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
	}
}
//-------------------------------------------------------

// initialize arToolkitContext
//
// create atToolkitContext
//var arToolkitContext = new THREEx.ArToolkitContext({
var arToolkitContext = new ARjs.Context({
	cameraParametersUrl: '../../../libs/AR/data/camera_para.dat',
	detectionMode: 'mono',
})

// initialize it
arToolkitContext.init(function onCompleted(){
	// copy projection matrix to camera
	camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
})

// update artoolkit on every frame
onRenderFcts.push(function(){
	if( arToolkitSource.ready === false )	return
	arToolkitContext.update( arToolkitSource.domElement )
	// update raScene.visible if the marker is seen
	raScene.visible = camera.visible
})

//----------------------------------------------------------------------------
// Create a ArMarkerControls
//
// init controls for camera
//var markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
    var markerControls = new ARjs.MarkerControls(arToolkitContext, camera, {	
        type : 'pattern',
        patternUrl : '../../../libs/AR/data/patt.kanji',
        changeMatrixMode: 'cameraTransformMatrix' // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
    })
    // as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible raScene
    raScene.visible = false

    //----------------------------------------------------------------------------
// Adding object to the raScene

let windowMat = new THREE.MeshPhongMaterial({
  color: 0xF0F0F0,
})
windowMat.transparent = true
windowMat.opacity = 0.3
windowMat.castShadow = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;

var plane = createGroundPlane(2,2);
plane.material = windowMat;
plane.rotateX(degreesToRadians(-90))
raScene.add(plane);

var luzDirecional = setDirectionalLighting(raScene, new THREE.Vector3(0, 1, 0))
luzDirecional.target = plane;

var infoBox = new SecondaryBox('')
loadGLTFFile('../car/', '', 1.5, 0, true);
var mixer = new Array()
function loadGLTFFile(modelPath, modelFolder, desiredScale, angle, visibility) {

    var loader = new GLTFLoader( );
    loader.load( modelPath + modelFolder + 'scene.gltf', function ( gltf ) {
      var obj = gltf.scene;
      obj.visible = visibility;
      obj.name = modelFolder;
      obj.traverse( function ( child ) {
        if ( child ) {
            child.castShadow = true;
        }
      });
      obj.traverse( function( node )
      {
        if( node.material ) node.material.side = THREE.DoubleSide;
      });
  
      var obj = normalizeAndRescale(obj, desiredScale);
      var obj = fixPosition(obj);
      obj.rotateY(degreesToRadians(angle));
  
      raScene.add ( obj );
      
      var mixerLocal = new THREE.AnimationMixer(obj);
      mixerLocal.clipAction( gltf.animations[0] ).play();
      mixer.push(mixerLocal);
      var textureLoader = new THREE.TextureLoader();
      //var pele  = textureLoader.load('../assets/objects/dogao/dogao_baseColor.jpeg');
      //obj.material.map = pele
  
      }, onProgress, onError);
  }

function fixPosition(obj)
{
  // Fix position of the object over the ground plane
  var box = new THREE.Box3().setFromObject( obj );
  if(box.min.y > 0)
    obj.translateY(-box.min.y);
  else
    obj.translateY(-1*box.min.y);
  return obj;
}

function onProgress(xhr, model) {
	if (xhr.lengthComputable) {
	  var percentComplete = (xhr.loaded / xhr.total) * 100
	}
}
function onError() {}
// Normalize scale and multiple by the newScale
function normalizeAndRescale(obj, newScale)
{
  var scale = getMaxSize(obj); // Available in 'utils.js'
  obj.scale.set(newScale * (1.0/scale),
                newScale * (1.0/scale),
                newScale * (1.0/scale));
  return obj;
}


// controls which object should be rendered
var firstObject = true;

var controls = new function ()
{
	this.onChangeObject = function(){
		firstObject = !firstObject;
		if(firstObject)
		{
			cubeKnot.visible = true;
			torus.visible = false;
		}
		else
		{
			cubeKnot.visible = false;
			torus.visible = true;
		}
	};
};

//----------------------------------------------------------------------------
// Render the whole thing on the page

// render the raScene
onRenderFcts.push(function(){
	var delta = clock.getDelta();
	for(var i = 0; i<mixer.length; i++)
      mixer[i].update( delta );
	renderer.render( raScene, camera );
})

// run the rendering loop
requestAnimationFrame(function animate(nowMsec)
{
	var lastTimeMsec= null;	
	// keep looping
	requestAnimationFrame( animate );
	// measure time
	lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
	var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
	lastTimeMsec	= nowMsec
	// call each update function
	onRenderFcts.forEach(function(onRenderFct){
		onRenderFct(deltaMsec/1000, nowMsec/1000)
	})
})
