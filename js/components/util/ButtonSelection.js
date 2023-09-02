
import VRControl from './VRControl.js'


let selectState = false;
////////////////////
//EM CONSTRUCAO
////////////////
class ButtonSelection {

    constructor(renderer, camera, scene) {

        this.initControllers(renderer, camera, scene);

    }



    initControllers() {
        this.vrControl = VRControl(renderer, camera, scene);

        scene.add(this.vrControl.controllerGrips[0], this.vrControl.controllers[0]);

        this.vrControl.controllers[0].addEventListener('selectstart', () => {
            selectState = true;
        });

        this.vrControl.controllers[0].addEventListener('selectend', () => {
            selectState = false;
        })

    }
}

export {
    ButtonSelection
}