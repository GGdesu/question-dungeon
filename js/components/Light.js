import { AmbientLight } from "three";
import { DirectionalLight } from "three";
import { HemisphereLight, PointLight } from "three";


function createLight() {

     const lightArray = []

     for(let i = 0; i < 4; i++){
         const light = new PointLight(0x757575, 3, 0);
         
         lightArray.push(light);
     }

    //const light = new PointLight(0x757575, 2, 0);
    const ambientLight = new HemisphereLight('grey',
        'darkslategrey',
        10);


    
    //const direcLight = new DirectionalLight( 0xffffff, 0.5 );

    // lightArray.push(ambientLight);
    //const light = new AmbientLight( 0x404040 );
    return lightArray;
}

export {
    createLight
}