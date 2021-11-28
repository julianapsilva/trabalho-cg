import * as THREE from '../../../build/three.module.js';


export default function mudaPista(scene, isPista) {
    //Pista 1
    if (isPista == 1) {
        for (let i = -150; i < 151; i += 30) {
            for (let j = -150; j < 151; j += 30) {
                if (i == -150 || i == 150 || j == -150 || j == 150) {
                    blocoComum(i, j);
                }
                if (i == -30 && j == -150) {
                    blocoInicio(i, j);
                }
            }
        }
    }
    //Pista 2
    if (isPista == 2) {
        for (let i = -150; i < 151; i += 30) {
            for (let j = -150; j < 151; j += 30) {
                if (j == -150) // reta 1
                {
                    blocoComum(i, j);
                }
                if (i == 150 && j <= 0) // reta 2
                {
                    blocoComum(i, j);
                }
                if (j == 0 && i >= 0) // reta 3
                {
                    blocoComum(i, j);
                }
                if (i == 0 && j >= 0) // reta 4
                {
                    blocoComum(i, j);
                }
                if (j == 150 && i <= 0) // reta 5
                {
                    blocoComum(i, j);
                }
                if (i == -150) // reta 6
                {
                    blocoComum(i, j);
                }
                if (i == -30 && j == -150) {
                    blocoInicio(i, j);
                }
            }
        }

    }


    function blocoComum(x, z) {
        var cubeGeometry = new THREE.BoxGeometry(50, 0.3, 50);
        var cubeMaterial = new THREE.MeshBasicMaterial({ color: 'rgb(50,50,50)' });
        var cube;

        cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(x, 0.15, z);
        scene.add(cube);
    }
    function blocoInicio(x, z) {
        var cubeGeometry = new THREE.BoxGeometry(50, 0.4, 50);
        var cubeMaterial = new THREE.MeshBasicMaterial({ color: 'rgb(255, 0, 0)', });
        var cube;

        cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(x, 0.15, z);

        scene.add(cube);
    }

}