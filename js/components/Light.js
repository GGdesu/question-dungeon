import { HemisphereLight } from "three";


function createLight() {

    const ambientLight = new HemisphereLight('white',
        'darkslategrey',
        5);

    return ambientLight ;
}

export {
    createLight
}