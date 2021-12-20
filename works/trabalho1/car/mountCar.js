import * as THREE from '../../../build/three.module.js';

import {
    degreesToRadians
} from "../../../libs/util/util.js"


export default function mountCar() {
    // Start setting the group
    var group = new THREE.Group()


    // cockpit-------------------------------------------------------------------x
    var body1 = createBody(3, 3, 7)
    body1.rotateY(degreesToRadians(90))
    body1.position.set(0.0, 0.5, 0.0)

    var body2 = createBody(11, 3, 3)
    body2.rotateY(degreesToRadians(90))
    body2.position.set(0.0, 0.5, 0.5)

    var body3 = createBody(7, 3, 3)
    body3.rotateY(degreesToRadians(45))
    body3.position.set(0.0, 0.5, 0.0)

    var body4 = createBody(7, 3, 3)
    body4.rotateY(degreesToRadians(135))
    body4.position.set(0.0, 0.5, 0.0)

    // Asa dianteira -----------------------------------------------------------x
    var bico = createCylinder(0.6, 1.5, 7.0, 20, 20, false, 1)
    bico.rotateX(degreesToRadians(100))
    bico.position.set(0.0, -0.1, 9.0)

    var asafrente = createAsa(10, 0.5, 2.0)
    asafrente.rotateX(degreesToRadians(9))
    asafrente.position.set(0.0, -0.9, 13)

    //eixos carrinho e roda dianteira ------------------------------------------x
    var frenteAxis1 = createCylinder(0.3, 0.3, 9.0, 10, 10, false)
    frenteAxis1.rotateZ(degreesToRadians(90))
    frenteAxis1.position.set(0.0, -1.0, 6.0)
    
    var frenteAxis2 = createCylinder(0.3, 0.3, 5.0, 10, 10, false)
    frenteAxis2.rotateZ(degreesToRadians(65))
    frenteAxis2.position.set(1.5, 0.0, 6.0)
    
    var frenteAxis3 = createCylinder(0.3, 0.3, 5.0, 10, 10, false)
    frenteAxis3.rotateZ(degreesToRadians(115))
    frenteAxis3.position.set(-1.5, 0.0, 6.0)

    var frenteRoda1 = createTorus(1.0, 0.3, 20, 20, Math.PI * 2)
    frenteRoda1.position.set(4.5, -1.0, 6.0)

    var frenteRoda2 = createTorus(1.0, 0.3, 20, 20, Math.PI * 2)
    frenteRoda2.position.set(-4.5, -1.0, 6.0)

    //eixos carrinho e roda traseira ------------------------------------------x
    var trasAxis1 = createCylinder(0.3, 0.3, 9.0, 10, 10, false)
    trasAxis1.rotateZ(degreesToRadians(90))
    trasAxis1.position.set(0.0, -1.0, -4.0)
    
    var trasAxis2 = createCylinder(0.3, 0.3, 5.0, 10, 10, false)
    trasAxis2.rotateZ(degreesToRadians(65))
    trasAxis2.position.set(1.5, 0.0, -4.0)
    
    var trasAxis3 = createCylinder(0.3, 0.3, 5.0, 10, 10, false)
    trasAxis3.rotateZ(degreesToRadians(115))
    trasAxis3.position.set(-1.5, 0.0, -4.0)

    var trasRoda3 = createTorus(1.0, 0.3, 20, 20, Math.PI * 2)
    trasRoda3.position.set(4.5, -1.0, -4.0)

    var trasRoda4 = createTorus(1.0, 0.3, 20, 20, Math.PI * 2)
    trasRoda4.position.set(-4.5, -1.0, -4.0)

    var asaAtras = createAsa(10.5, 0.5, 2.0)
    asaAtras.rotateX(degreesToRadians(20))
    asaAtras.position.set(0.0, 3.05, -6.5)

    var sustenta1 = createAsa(0.5, 1.5, 0.5)
    sustenta1.rotateX(degreesToRadians(135))
    sustenta1.position.set(0.0, 2.3, -5.3)

    // Add objects to the group
    group.add(bico) //0 
    group.add(body1) //1 
    group.add(body2) //2
    group.add(body3) //3
    group.add(body4) //4
    group.add(frenteAxis1) //5
    group.add(frenteAxis2) //6
    group.add(frenteAxis3) //7
    group.add(trasAxis1) //8
    group.add(trasAxis2) //9
    group.add(trasAxis3) //10
    group.add(frenteRoda1) //11
    group.add(frenteRoda2) //12
    group.add(trasRoda3) //13
    group.add(trasRoda4) //14
    group.add(asafrente) //15
    group.add(asaAtras) //16
    group.add(sustenta1) //17
  

    // Add group to the scene

    group.translateY(2.6)
    group.rotateY(degreesToRadians(90))
    group.position.set(-100, 2.6, -600)
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
        if (!color) material = new THREE.MeshBasicMaterial({ color: "rgb(0,0,0)" })
        else material = new THREE.MeshPhongMaterial({ color: "rgb(115, 187, 254)" })
        var object = new THREE.Mesh(geometry, material)
        object.castShadow = true
        return object
    }

    function createTorus(radius, tube, radialSegments, tubularSegments, arc) {
        var geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
        var material = new THREE.MeshPhongMaterial({ color: "rgb(10,10,10)" })
        var object = new THREE.Mesh(geometry, material)
        object.castShadow = true
        object.rotateY(degreesToRadians(90))
        return object
    }

    function createBody(width, height, depth) {
        var geometry = new THREE.BoxGeometry(width, height, depth)
        var material = new THREE.MeshPhongMaterial({ color: "rgb(103, 182, 239)" })
        var object = new THREE.Mesh(geometry, material)
        object.castShadow = true
        return object
    }
    function createAsa(width, height, depth) {
        var geometry = new THREE.BoxGeometry(width, height, depth)
        var material = new THREE.MeshPhongMaterial({ color: "rgb(200,200,200)" })
        var object = new THREE.Mesh(geometry, material)
        object.castShadow = true
        return object
    }
}
