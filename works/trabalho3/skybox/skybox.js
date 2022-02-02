import * as THREE from '../../../build/three.module.js';

export default function createSkybox(scene) {
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load( './skybox/Skybox/DaylightBox_Front.png');
let texture_bk = new THREE.TextureLoader().load( './skybox/Skybox/DaylightBox_Back.png');
let texture_up = new THREE.TextureLoader().load( './skybox/Skybox/DaylightBox_Top.png');
let texture_dn = new THREE.TextureLoader().load( './skybox/Skybox/DaylightBox_Bottom.png');
let texture_rt = new THREE.TextureLoader().load( './skybox/Skybox/DaylightBox_Right.png');
let texture_lf = new THREE.TextureLoader().load( './skybox/Skybox/DaylightBox_Left.png');
  
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf })) ;
   
for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;
   
let skyboxGeo = new THREE.BoxGeometry( 1440, 1440, 1440);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );
scene.add( skybox );

}