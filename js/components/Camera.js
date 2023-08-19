import { PerspectiveCamera } from "three";


function createCamera() {
     
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);

    camera.position.set(10, 15, 22);

    return camera;
}

export {
    createCamera
}