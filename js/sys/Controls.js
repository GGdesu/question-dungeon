import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


function createOrbitControls(camera, canvas){

    const controls = new OrbitControls(camera, canvas);

    controls.update();

    return controls;
}

export {
    createOrbitControls
}