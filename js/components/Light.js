import { HemisphereLight } from "three";


function createLight() {

    const ambientLight = new HemisphereLight('grey',
        'darkslategrey',
        5);

    return ambientLight ;
}

export {
    createLight
}