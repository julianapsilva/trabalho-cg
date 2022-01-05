import * as THREE from '../../../build/three.module.js';


export default function mudaPista(scene, isPista) {
    // Start setting the group
    var group = new THREE.Group();

    //Pista 1
    if (isPista == 1) {
        for (let i = -600; i < 602; i += 100) {
            for (let j = -600; j < 602; j += 100) {
                if (i == -600 || i == 600 || j == -600 || j == 600) {
                    group.add(blocoComum(i, j));
                }
                if (i == -100 && j == -600) {
                    group.add(blocoInicio(i, j));
                }
            }
        }
    }
    //Pista 2
    if (isPista == 2) {
        for (let i = -600; i < 601; i += 100) {
            for (let j = -600; j < 601; j += 100) {
                if (j == -600) // reta 1
                {
                    group.add(blocoComum(i, j));
                }
                if (i == 600 && j <= 0) // reta 2
                {
                    group.add(blocoComum(i, j));
                }
                if (j == 0 && i >= 0) // reta 3
                {
                    group.add(blocoComum(i, j));
                }
                if (i == 0 && j >= 0) // reta 4
                {
                    group.add(blocoComum(i, j));
                }
                if (j == 600 && i <= 0) // reta 5
                {
                    group.add(blocoComum(i, j));
                }
                if (i == -600) // reta 6
                {
                    group.add(blocoComum(i, j));
                }
                if (i == -100 && j == -600) {
                    group.add(blocoInicio(i, j));
                }
            }
        }

    }
    if (isPista == 3) {
        for (let i = -600; i < 601; i += 100) {
            for (let j = -600; j < 601; j += 100) {
                if (i>=-300 && j == -600) // reta 1
                {
                    group.add(blocoComum(i, j));
                }
                if (i == 600 ) // reta 2
                {
                    group.add(blocoComum(i, j));
                }
             
                if (j == -300 && i >= 200) // reta 3
                {
                    group.add(blocoComum(i, j));
                }
                if (i == 200 && j >= -300) // reta 4
                {
                    group.add(blocoComum(i, j));
                }
                if (j == 600) // reta 5
                {
                    group.add(blocoComum(i, j));
                }
                if (i == -600 && j >= -100) // reta 6
                {
                    group.add(blocoComum(i, j));
                }
                if (j == -100 && i <= -300) // reta 7
                {
                    group.add(blocoComum(i, j));
                }
                if (j <= -100 && i == -300) // reta 7
                {
                    group.add(blocoComum(i, j));
                }
                if (i == 100 && j == -600) {
                    group.add(blocoInicio(i, j));
                }
            }
        }

    }
    if (isPista == 4) {
        for (let i = -600; i < 601; i += 100) {
            for (let j = -600; j < 601; j += 100) {
                if (j == -600 && i>=300) // reta 1
                {
                    group.add(blocoComum(i, j));
                }
                if (j <= -300 && i==600) // reta 2
                {
                    group.add(blocoComum(i, j));
                }
                if (j == -300 && i>=400) // reta 3
                {
                    group.add(blocoComum(i, j));
                }
                if (j <= 0 && i==300) // reta 4
                {
                    group.add(blocoComum(i, j));
                }
                if (j == -300 && i>=-100 && i <=200) // reta 5
                {
                    group.add(blocoComum(i, j));
                }
                if (j == 0 && i>=-100 && i <=200) // reta 5
                {
                    group.add(blocoComum(i, j));
                }
                if (i == -100 && j>=-200) // reta 2/4
                {
                    group.add(blocoComum(i, j));
                }
                if (i <= -100 && j == 600) // reta 6
                {
                    group.add(blocoComum(i, j));
                }
                if (i <= -100 && j == 0) // reta 6
                {
                    group.add(blocoComum(i, j));
                }
                if (j >= 0 && i == -600) // reta 2
                {
                    group.add(blocoComum(i, j));
                }
                if (i == -600 && j == 300) {
                    group.add(blocoInicio(i, j));
                }
            }
        }

    }
  return group;
    function blocoComum(x, z) {
        var cubeGeometry = new THREE.BoxGeometry(99.75, 0.3, 99.75);
        var cubeMaterial = new THREE.MeshBasicMaterial({ color: 'rgb(50,50,50)' });
        var cube;

        cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(x, 0.15, z);
        return cube;
    }
    function blocoInicio(x, z) {
        var cubeGeometry = new THREE.BoxGeometry(99.75, 0.4, 99.75);
        var cubeMaterial = new THREE.MeshBasicMaterial({ color: 'rgb(255, 0, 0)', });
        var cube;

        cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(x, 0.15, z);
        return cube;
    }

}