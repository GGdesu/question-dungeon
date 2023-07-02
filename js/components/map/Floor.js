
function makeDungeonFloor(scene, model, numFloorX = 1, numFloorY = 1) {
    const floor = model.scene.getObjectByName('floor001');
    console.log(floor);
    const espacamento = 4;
    
    for (let i = 0; i < numFloorX / 2; i++) {
        const copyFloor = floor.clone();
        copyFloor.position.x = -59.5 + (espacamento * i);
        copyFloor.position.z = -59;
        //scene.add(copyFloor);

         
    }

}

export {
    makeDungeonFloor
}