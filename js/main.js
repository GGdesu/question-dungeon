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
    const allowVR = true;

    const world = new World({ canvas: container, allowVR: allowVR });

    await world.initAsync();

    world.plotObj();

    //verifica a compatibilidade do navegador
    if (WebGl.isWebGL2Available()) {

        if (!allowVR) {
            world.animate();
        }

    } else {
        const warning = WebGl.getErrorMessage();
        document.getElementById('container').appendChild(warning);

    }



}

main().catch((err) => {
    console.error(err);
})