import { Color, Scene } from "three";


function createScene() {

    const scene = new Scene();

    //color space cadet
    scene.background = new Color(0x242D53);

    return scene;

}

export {
    createScene
}