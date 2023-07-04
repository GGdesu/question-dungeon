import { createCamera } from "./components/Camera";
import { createLight } from "./components/Light";
import { createScene } from "./components/Scene";
import { makeGridFloorHelper } from "./components/util/GridFloor";

import { createOrbitControls } from "./sys/Controls";
import { createRenderer } from "./sys/Renderer";
import { Resizer } from "./sys/Resizer";



let scene;
let camera;
let renderer;
let controls;


class World {

    constructor(container) {
        //configuração síncrona
        scene = createScene();
        camera = createCamera();
        const light  = createLight();
        renderer = createRenderer();
        
        container.append(renderer.domElement);

        controls = createOrbitControls(camera, renderer.domElement);

        scene.add(light);

        const resizer = new Resizer(container, camera, renderer);

        makeGridFloorHelper(scene, camera, 120, 120);


    }

    async initAsync() {


    }

    render() {
        renderer.render(scene, camera);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.render()
    }
}

export {
    World
};