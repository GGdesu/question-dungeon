import * as THREE from 'three';
import WebGl from 'three/examples/jsm/capabilities/WebGL.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { load3dModel } from './components/LoadModel';
import { makeGridFloorHelper } from './components/util/GridFloor';
import { makeDungeonFloor } from './components/map/floor';
import { World } from './World';



async function main() {


    // new code
    
    const container = document.querySelector('#scene-container');

    const world = new World(container);
    
    //verifica a compatibilidade do navegador
    if (WebGl.isWebGL2Available()) {

        world.animate();

    } else {
        const warning = WebGl.getErrorMessage();
        document.getElementById('container').appendChild(warning);

    }
    

    //
    /*const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(10, 15, -22);
    
    

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const ambLight = new THREE.AmbientLight(0x111111, 50);
    scene.add(ambLight);

    const light = new THREE.PointLight(0x404040, 10, 100);
    light.position.set(0, 10, 0);
    scene.add(light);

    const dungeon3DModelPack = load3dModel('/low_poly_dungeon/scene.gltf', scene);
    console.log(dungeon3DModelPack);
    makeGridFloorHelper(scene, camera, 120, 120);

    //makeDungeonFloor(scene, dungeon3DModelPack, 120);

    



    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        //cube.rotation.x += 0.01;
        //cube.rotation.y += 0.01;
    }

    //verifica a compatibilidade do navegador
    if (WebGl.isWebGL2Available()) {

        animate();

    } else {
        const warning = WebGl.getErrorMessage();
        document.getElementById('container').appendChild(warning);

    }*/

}

main().catch((err) => {
    console.error(err);
})