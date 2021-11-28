import * as THREE from '../../../build/three.module.js';
let i = 30, j = -30, k = 7, z = -10
let a = -25, b = -20, c = 15
let d = 30, e = -20
let f = -15, g = 5, h = 20, m = 12


export default function handleCamera(position, camera, group, currentPosition, currentLookAt, acc) {

    let idealOffset
    let idealLookAt
    const t = 0.05


    switch (position) {
        case 1:
            if (i >= -25 && acc) {
                i -= 0.2;
            }
            if (j >= -20 && acc) {
                j -= 0.1
            }

            if (k >= -5 && acc) {
                k -= 0.1
            }

            if (camera.zoom >= 0.6) {
                camera.zoom -= 0.002
            }

            if (z <= 5) {
                z += 0.1
            }

            idealOffset = new THREE.Vector3(i, 17, j)
            idealLookAt = new THREE.Vector3(10, k, z)

            break;
        case 2:

            if (a <= -15 && acc) {
                a += 0.05
            }

            if (b <= 20 && acc) {
                b += 0.09
            }

            // if (camera.zoom > 0.5 && acc) {
            //     camera.zoom -= 0.002
            // }

            if (c > 5) {
                c -= 0.005
            }

            console.log(b)



            idealOffset = new THREE.Vector3(a, 10, b)
            idealLookAt = new THREE.Vector3(c, -5, 5)
            camera.zoom = 0.5
            break;
        case 3:

            if (f < 20 && acc) {
                f += 0.05
            }

            if (g > -20 && acc) {
                g -= 0.035
            }

            if (h < 30 && acc) {
                h += 0.001
            }

            if (m > 0 && acc) {
                m -= 0.0001
            }

            idealOffset = new THREE.Vector3(f, 10, h)
            idealLookAt = new THREE.Vector3(g, -5, m)
            camera.zoom = 0.5
            break;
        case 4:

            if (d > -30 && acc) {
                d -= 0.5
            }

            if (e < 10 && acc) {
                e += 0.05
            }



            idealOffset = new THREE.Vector3(20, 9, d)
            idealLookAt = new THREE.Vector3(e, -5, 0)
            camera.zoom = 0.7
            break;
    }
    camera.updateProjectionMatrix();

    idealOffset.applyQuaternion(group.quaternion)
    idealOffset.add(group.position)

    idealLookAt.applyQuaternion(group.quaternion)
    idealLookAt.add(group.position)

    currentPosition.lerp(idealOffset, t)
    currentLookAt.lerp(idealLookAt, t)

    camera.position.copy(currentPosition)
    camera.lookAt(currentLookAt)

}
