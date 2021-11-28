import * as THREE from '../../../build/three.module.js';
let i = 30, j = -30, k = 7, z = -10
let a = -25, b = -20, c = 15
let d = 30, e = -20
let f = -15, g = 5, h = 20, m = 12
let n = -5, o = 0
let zoom = 0.4
let zoom2 = 0.5


export default function handleCamera(position, camera, group, currentPosition, currentLookAt, acc, pista) {

    let idealOffset
    let idealLookAt
    const t = 0.05


    switch (position) {
        case 1:
            console.log("POSICAO 1")
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
            console.log("POSICAO 2")
            f = -15, g = 5, h = 20, m = 12

            if (a <= -15 && acc) {
                a += 0.03
            }

            if (b <= 20 && acc) {
                b += 0.12
            }

            if (zoom2 >= 0.4 && acc) {
                zoom2 -= 0.0005
            }

            if (c > 5 && acc) {
                c -= 0.045
            }

            console.log('zoom2', zoom2)
            console.log('a', a, 'b', b, 'c', c)



            idealOffset = new THREE.Vector3(a, 10, b)
            idealLookAt = new THREE.Vector3(c, -5, 5)
            camera.zoom = zoom2
            break;
        case 3:
            console.log("POSICAO 3")
            a = -25, b = -20, c = 15
            zoom2 = 0.5

            if (pista == 1) {
                console.log('ESTA NA PISTA 1')
                if (f < 20 && acc) {
                    f += 0.09
                }

                if (g > -20 && acc) {
                    g -= 0.05
                }

                if (h < 30 && acc) {
                    h += 0.003
                }

                if (m > 0 && acc) {
                    m -= 0.01
                }
                console.log('chegar em 20', f, 'chegar em 30', h, 'chegar em -20', g, 'chegar em 0', m)
            }
            else {
                console.log("POSICAO 3 INDO PRA 2")

                if (f > -25 && acc) {
                    f -= 0.045
                }

                if (g < 15 && acc) {
                    g += 0.05
                }

                if (h > -20 && acc) {
                    h -= 0.25
                }

                if (m > 5 && acc) {
                    m -= 0.035
                }
                console.log('chegar em -25', f, 'chegar em -20', h, 'chegar em 15', g, 'chegar em 5', m)
            }

            idealOffset = new THREE.Vector3(f, 10, h)
            idealLookAt = new THREE.Vector3(g, -5, m)
            camera.zoom = 0.4
            break;
        case 4:
            i = 30, j = -30, k = 7, z = -10

            if (d > -30 && acc) {
                d -= 0.17
            }

            if (e < 10 && acc) {
                e += 0.09
            }

            if (n < 7 && acc) {
                n += 0.027
            }

            if (o > -10 && acc) {
                o -= 0.022
            }

            console.log('chegar em -30', d, 'chegar em 10', e, 'chegar em 7', n, 'chegar em -10', o)

            idealOffset = new THREE.Vector3(20, 9, d)
            idealLookAt = new THREE.Vector3(e, n, o)
            // camera.zoom = 0.7
            break;

        case 5:         // posicao 3 adaptada para pista 2
            console.log('POSICAO 5')

            a = -25, b = -20, c = 15
            zoom2 = 0.5

            if (f < 20 && acc) {
                f += 0.18
            }

            if (g > -20 && acc) {
                g -= 0.1
            }

            if (h < 30 && acc) {
                h += 0.006
            }

            if (m > 0 && acc) {
                m -= 0.02
            }

            idealOffset = new THREE.Vector3(f, 10, h)
            idealLookAt = new THREE.Vector3(g, -5, m)
            camera.zoom = 0.4

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
