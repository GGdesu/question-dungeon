import { createCamera } from "./components/Camera";
import { createLight } from "./components/Light";
import { load3dModel } from "./components/LoadModel";
import { createScene } from "./components/Scene";
import { makeGridFloorHelper } from "./components/util/GridFloor";

import { VRButton } from 'three/examples/jsm/webxr/VRButton';

import { createOrbitControls } from "./sys/Controls";
import { createRenderer } from "./sys/Renderer";
import { Resizer } from "./sys/Resizer";



let scene;
let camera;
let renderer;
let controls;
let allowVR = false;

let models;


class World {

    constructor({ canvas: container, allowVR: allow = false }) {
        //configuração síncrona
        allowVR = allow;
        scene = createScene();
        camera = createCamera();
        const light = createLight();
        renderer = createRenderer();

        container.append(renderer.domElement);


        if (!allowVR) {
            controls = createOrbitControls(camera, renderer.domElement);
        } else {
            renderer.xr.enabled = true;
            container.append(VRButton.createButton(renderer));

            camera.position.set(0.5, 1, 0.5);

            renderer.setAnimationLoop(this.animate.bind(this));
        }

        scene.add(light);

        const resizer = new Resizer(container, camera, renderer);

        makeGridFloorHelper(scene, camera, 120, 120);


    }

    async initAsync() {
        models = await load3dModel('/low_poly_dungeon/scene.gltf');

        // const model = models.scene.getObjectByName('door001');
        // model.position.set(0.5, 0, 0.5);
        // model.scale.set(1, 1, 1);

        // scene.add(model);
    }

    plotObj() {
        console.log(models);
        const model = models.scene.getObjectByName('floor001');
        model.position.set(-60, -0.5, 0);
        model.scale.set(1, 1, 1);

        for (let i = -60; i < 0; i++) {
            for (let j = 0; j < 60; j++) {
                const copyFloor = model.clone();
                copyFloor.position.x = -60 + (2 * j);
                copyFloor.position.z = 60 + (i * 2);
                scene.add(copyFloor);

            }
        }

        scene.add(model);
    }

    render() {
        renderer.render(scene, camera);
    }

    animate() {
        if (!allowVR) {
            requestAnimationFrame(this.animate.bind(this));
        }
        //renderer.render(scene, camera);
        this.render();
    }
}

export {
    World
};