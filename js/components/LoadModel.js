import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";




async function load3dModel(url) {

    const loader = new GLTFLoader();

    const gltfData = await loader.loadAsync(url, function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + ' % loaded');

    })

    const model = gltfData.scene.getObjectByName('door001');
    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);

    return model;

    /*loader.load(url, function (gltf) {

        // const model = gltf.scene.getObjectByName("door001");
        // model.position.set(0, 0, 0);
        // model.scale.set(1, 1, 1);
        // console.log(model);
        // gltf.scene.position.set(0, -5, 0);
        gltf.scene.scale.set(1, 1, 1);
        return gltf;

    }, function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + ' % loaded');

    }, function (error) {

        console.log(error);

    });*/


}

export {
    load3dModel
}