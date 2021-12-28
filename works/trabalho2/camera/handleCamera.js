import * as THREE from '../../../build/three.module.js';
let i = 30, j = -30, k = 7, z = -10
let a = -25, b = -20, c = 15
let d = 30, e = -20
let f = -15, g = 5, h = 20, m = 12
let n = -5, o = 0
let zoom2 = 0.5


export default function handleCamera(position, camera, group, currentPosition, currentLookAt, acc, pista) {

    let idealPosition
    let lookAt
    const t = 0.05


    switch (position) {
        case 1:
            if (acc) {
                if (i >= -25) i -= 0.2;

                if (j >= -20) j -= 0.1

                if (k >= -5) k -= 0.1

                if (camera.zoom >= 0.6) camera.zoom -= 0.002

                if (z <= 5) z += 0.1
            }

            idealPosition = new THREE.Vector3(i, 17, j)
            lookAt = new THREE.Vector3(10, k, z)
            camera.zoom = 0.6

            break;
        case 2:
            f = -15, g = 5, h = 20, m = 12
            if (acc) {
                if (a <= -15) a += 0.03

                if (b <= 20) b += 0.12

                if (zoom2 >= 0.4) zoom2 -= 0.0005

                if (c > 5) c -= 0.045
            }

            idealPosition = new THREE.Vector3(a, 10, b)
            lookAt = new THREE.Vector3(c, -5, 5)
            camera.zoom = zoom2
            break;
        case 3:
            a = -25, b = -20, c = 15
            zoom2 = 0.5

            if (acc) {

                if (pista == 1) {
                    if (f < 20) f += 0.09

                    if (g > -20) g -= 0.05

                    if (h < 30) h += 0.003

                    if (m > 0) m -= 0.01

                }
                else {

                    if (f > -25) f -= 0.045

                    if (g < 15) g += 0.05

                    if (h > -20) h -= 0.25

                    if (m > 5) m -= 0.035
                }

            }

            idealPosition = new THREE.Vector3(f, 10, h)
            lookAt = new THREE.Vector3(g, -5, m)
            camera.zoom = 0.4
            break;
        case 4:
            i = 30, j = -30, k = 7, z = -10

            if (acc) {
                if (d > -30) d -= 0.17

                if (e < 10) e += 0.09

                if (n < 7) n += 0.027

                if (o > -10) o -= 0.022
                if (camera.zoom < 0.6) camera.zoom += 0.0006
            }

            idealPosition = new THREE.Vector3(20, 9, d)
            lookAt = new THREE.Vector3(e, n, o)
            break;

        case 5:         // posicao 3 adaptada para pista 2
            a = -25, b = -20, c = 15
            zoom2 = 0.5

            if (acc) {
                if (f < 20) f += 0.14

                if (g > -20) g -= 0.1

                if (h < 30) h += 0.006

                if (m > 0) m -= 0.02
            }

            idealPosition = new THREE.Vector3(f, 10, h)
            lookAt = new THREE.Vector3(g, -5, m)
            camera.zoom = 0.4

            break;
    }
    camera.updateProjectionMatrix();

    idealPosition.applyQuaternion(group.quaternion)
    idealPosition.add(group.position)

    lookAt.applyQuaternion(group.quaternion)
    lookAt.add(group.position)

    currentPosition.lerp(idealPosition, t)
    currentLookAt.lerp(lookAt, t)

    camera.position.copy(currentPosition)
    camera.lookAt(currentLookAt)

}
