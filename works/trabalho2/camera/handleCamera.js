import * as THREE from '../../../build/three.module.js';

export default function handleCamera(camera, tesla, isPista) {
    // let position = 3
    // let position = getIntersections(tesla, isPista)
    // console.log('position', position)
    // switch (position) {
    //     case 1:
    //         camera.position.lerp(new THREE.Vector3(7, 5, -7), 0.2);
    //         camera.rotation.set(-2.52, 0.68, 2.72)
    //         break;
    //     case 2:
    //         camera.position.lerp(new THREE.Vector3(-8, 5, -6), 0.05);
    //         camera.rotation.set(-2.45, -0.8, -2.6)
    //         // camera.quaternion.lerp(new THREE.Vector3(-2.45, -0.8, -2.6), 0.01)
    //         // camera.rotation.lerp(new THREE.Vector3(-2.45, -0.8, -2.6), 0.2);
    //         // camera.position.set(-8, 5, -6)
    //         break;
    //     case 3:
    //         camera.position.set(-9.6, 5, 3)
    //         camera.rotation.set(-0.98, -1.05, -1)
    //         break;
    // }
}



function getIntersections(tesla, isPista) {
    const [x, y, z] = [tesla.position.x, tesla.position.y, tesla.position.z]

    if (x < 583 && z > 556) {
        return 3
    }
    if (z < -550 || z == 0) {
        return 1
    }

    if (z > -550) {
        return 2
    }
}