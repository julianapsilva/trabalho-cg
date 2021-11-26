import * as THREE from '../../../build/three.module.js';

export default function handleCamera(position, camera, group, currentPosition, currentLookAt) {

    let idealOffset
    let idealLookAt

    switch (position) {
        case 1:
            idealOffset = new THREE.Vector3(30, 17, -30)
            idealLookAt = new THREE.Vector3(10, 7, -10)
            camera.zoom = 1
            break;
        case 2:
            idealOffset = new THREE.Vector3(-25, 10, -20)
            idealLookAt = new THREE.Vector3(25, -5, 5)
            camera.zoom = 0.6
            break;
        case 3:
            idealOffset = new THREE.Vector3(-15, 10, 20)
            idealLookAt = new THREE.Vector3(5, -5, 0)
            camera.zoom = 0.5
            break;
        case 4:
            idealOffset = new THREE.Vector3(20, 9, 30)
            idealLookAt = new THREE.Vector3(-20, -5, 0)
            camera.zoom = 0.7
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
