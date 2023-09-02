import { Color, CubeTextureLoader, Fog, Scene } from "three";
import wallTexture from '/wallTexture/walltex.jpg';


function createScene() {

    const scene = new Scene();
    const cubeTextureLoader = new CubeTextureLoader();
    scene.background = cubeTextureLoader.load([
        wallTexture,
        wallTexture,
        wallTexture,
        wallTexture,
        wallTexture,
        wallTexture
    ]);

    scene.fog = new Fog(0x2D2D2D, 10, 75);
    //color space cadet
    //scene.background = new Color(0x242D53);

    return scene;

}

export {
    createScene
}