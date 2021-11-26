import * as THREE from '../../../build/three.module.js';

import {
    degreesToRadians
} from "../../../libs/util/util.js"


export default function mountCar() {
    // Start setting the group

    var group = new THREE.Group()


    // Set the parts of the pseudo-car
    var body = createCylinder(2.0, 2.7, 12.0, 20, 20, false, 1)
    body.rotateX(degreesToRadians(90))
    body.position.set(0.0, 0.5, 0.0)

    var front = createRectangle()
    front.position.set()
    //eixos carrinho
    var axis1 = createCylinder(0.3, 0.3, 7.0, 10, 10, false)
    axis1.rotateZ(degreesToRadians(90))
    axis1.position.set(0.0, -1.0, 4.0)

    var axis2 = createCylinder(0.3, 0.3, 7.0, 10, 10, false)
    axis2.rotateZ(degreesToRadians(90))
    axis2.position.set(0.0, -1.0, -4.0)

    var roda1 = createTorus(1.0, 0.3, 20, 20, Math.PI * 2)
    roda1.position.set(3.5, -1.0, 4.0)

    var roda2 = createTorus(1.0, 0.3, 20, 20, Math.PI * 2)
    roda2.position.set(-3.5, -1.0, 4.0)

    var roda3 = createTorus(1.0, 0.3, 20, 20, Math.PI * 2)
    roda3.position.set(3.5, -1.0, -4.0)

    var roda4 = createTorus(1.0, 0.3, 20, 20, Math.PI * 2)
    roda4.position.set(-3.5, -1.0, -4.0)

    var atras = createRectangle(10.5, 0.5, 2.0)
    atras.position.set(0.0, 1.5, -6.9)

    var frente = createRectangle(7.5, 0.5, 2.0)
    frente.position.set(0.0, 0.5, 6.9)

    // Add objects to the group
    group.add(body)
    group.add(axis1)
    group.add(axis2)
    group.add(roda1)
    group.add(roda2)
    group.add(roda3)
    group.add(roda4)
    //group.add( lateralDir);
    //group.add( lateralEsq);
    group.add(frente)
    group.add(atras)

    // Add group to the scene

    group.translateY(2.6)
    group.rotateY(degreesToRadians(-90))
    group.position.set(65, 2.6, -64)
    return group

    function createCylinder(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, color) {
        var geometry = new THREE.CylinderGeometry(
            radiusTop,
            radiusBottom,
            height,
            radialSegments,
            heightSegments,
            openEnded
        )
        var material
        if (!color) material = new THREE.MeshBasicMaterial({ color: "rgb(125,0,0)" })
        else material = new THREE.MeshBasicMaterial({ color: "rgb(0,0,0)" })
        var object = new THREE.Mesh(geometry, material)
        object.castShadow = true
        return object
    }

    function createTorus(radius, tube, radialSegments, tubularSegments, arc) {
        var geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
        var material = new THREE.MeshBasicMaterial({ color: "rgb(255,255,255)" })
        var object = new THREE.Mesh(geometry, material)
        object.castShadow = true
        object.rotateY(degreesToRadians(90))
        return object
    }

    function createRectangle(width, height, depth) {
        var geometry = new THREE.BoxGeometry(width, height, depth)
        var material = new THREE.MeshBasicMaterial({ color: "rgb(12, 96, 126)" })
        var object = new THREE.Mesh(geometry, material)
        object.castShadow = true
        return object
    }
}
