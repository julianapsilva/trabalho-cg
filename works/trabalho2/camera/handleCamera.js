import * as THREE from '../../../build/three.module.js';

let currentPosition = new THREE.Vector3()
let currentLookAt = new THREE.Vector3()

export default function handleCamera(camera, group, axes) {
    const { position, rotation } = group

    let idealPosition
    let lookAt
    const t = 0.5
    // console.log(rotation.y)
    if (rotation.y >= 1 && rotation.y <= 1.59) {
        idealPosition = new THREE.Vector3(-20, 20, -30)
        lookAt = new THREE.Vector3(20, 7, 0)
        camera.zoom = 0.5
    }
    else if (rotation.y >= -0.4 && rotation.y <= 0.4) {
        if (rotation.x == 0 && rotation.z == 0) {
            idealPosition = new THREE.Vector3(-20, 20, -35)
            lookAt = new THREE.Vector3(-20, 7, 20)
            camera.zoom = 0.5
        }
        else {
            console.log('POSICAO 4')
            idealPosition = new THREE.Vector3(-5, 15, -40)
            lookAt = new THREE.Vector3(7, -1, -10)
            camera.zoom = 0.5
        }

    }
    else if (rotation.y <= -0.7 && rotation.y >= -1.59) {
        idealPosition = new THREE.Vector3(-30, 20, -35)
        lookAt = new THREE.Vector3(-30, 7, -20)
        camera.zoom = 0.4
    }

    else if (rotation.y >= -0.7 && rotation.y < -0.4) {
        console.log('POSICAO 4')
        idealPosition = new THREE.Vector3(-5, 15, -40)
        lookAt = new THREE.Vector3(7, -1, -10)
        camera.zoom = 0.5
    }

    else {
        idealPosition = new THREE.Vector3(-10, 20, -35)
        lookAt = new THREE.Vector3(20, 7, 0)
        camera.zoom = 0.5

    }
    camera.updateProjectionMatrix();

    idealPosition.add(position)
    lookAt.add(position)

    currentPosition.lerp(idealPosition, t)
    currentLookAt.lerp(lookAt, t)

    camera.position.copy(currentPosition)
    camera.lookAt(currentLookAt)
    camera.children[0].position.set(1,1,1)
    console.log(camera.children[0])
}
