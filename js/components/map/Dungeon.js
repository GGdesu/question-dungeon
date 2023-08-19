import { Group, Vector3 } from "three";
import { makeDungeonFloor } from "./floor"
import { degToRad, radToDeg } from "three/src/math/MathUtils";
import { questionRoom } from "./QuestionRoom";
import { createQuestionUi, getObjSize } from "../util/Utils";
import * as CANNON from 'cannon-es';
import { Quaternion } from "three";


function makeDungeon(scene, models, physicWorld) {
    //group with all floor
    const floor = new Group();
    floor.name = 'Dungeon_floor';

    const qRoom0 = questionRoom(models, physicWorld);
    const qRoom1 = questionRoom(models, physicWorld);
    const qRoom2 = questionRoom(models, physicWorld);
    const qRoom3 = questionRoom(models, physicWorld);

    {
        const planeFloor1 = makeDungeonFloor(120, 120);
        planeFloor1.name = 'plane_floor001';
        planeFloor1.position.set(-90, 0, 90);

        const planeFloor2 = makeDungeonFloor(120, 120);
        planeFloor2.name = 'plane_floor002';
        planeFloor2.position.set(-90, 0, -90);

        const planeFloor3 = makeDungeonFloor(120, 120);
        planeFloor3.name = 'plane_floor003';
        planeFloor3.position.set(90, 0, -90);

        const planeFloor4 = makeDungeonFloor(120, 120);
        planeFloor4.name = 'plane_floor004';
        planeFloor4.position.set(90, 0, 90);

        floor.add(planeFloor1);
        floor.add(planeFloor2);
        floor.add(planeFloor3);
        floor.add(planeFloor4);
    }

    {
        //
        const bridgeFloor = makeDungeonFloor(5, 60);
        bridgeFloor.name = 'bridge_floor001';
        bridgeFloor.position.set(-35, 0, 0);

        const bridgeArcFront = models.scene.getObjectByName("door_arc").clone();
        bridgeFloor.add(bridgeArcFront);
        bridgeArcFront.scale.set(1.5, 1, 1);
        bridgeArcFront.rotateX(degToRad(90));
        bridgeArcFront.position.set(0, -30, 1);

        const bridgeArcBack = models.scene.getObjectByName("door_arc").clone();
        bridgeFloor.add(bridgeArcBack);
        bridgeArcBack.scale.set(1.5, 1, 1);
        bridgeArcBack.rotateX(degToRad(90));
        bridgeArcBack.position.set(0, 30, 1);
        //

        const bridgeFloor2 = bridgeFloor.clone();
        bridgeFloor2.name = 'bridge_floor002';
        bridgeFloor2.position.set(0, 0, -147.5);
        bridgeFloor2.rotateZ(degToRad(90));

        const bridgeFloor3 = bridgeFloor.clone();
        bridgeFloor3.name = 'bridge_floor003';
        bridgeFloor3.position.set(100, 0, 0);


        floor.add(bridgeFloor);
        floor.add(bridgeFloor2);
        floor.add(bridgeFloor3);

        scene.add(floor);
    }

    //question room 0 setup
    {
        qRoom0.position.set(-51, 0, 42.5);
        //qRoom0.rotateY(degToRad(0));
        qRoom0.add(createQuestionUi("hello world", ["alt1 lorem lorem lorem lorrem lorem lorem lorem", "alt2 lorem lorem lorem lorrem lorem lorem lorem", "alt3 lorem lorem lorem lorrem lorem lorem lorem"]));
        qRoom0.getObjectByName("question_group").position.set(25, 8, 7);
        qRoom0.getObjectByName("question_group").rotation.set(0, -1, 0);
    }

    //question room 1 setup
    {
        //const boxSize = getObjSize(qRoom1.getObjectByName("Room01").clone());
        qRoom1.position.set(-42.5, 0, -137.8);
        qRoom1.rotateY(degToRad(270));
        qRoom1.add(createQuestionUi("hello world", ["alt1 lorem lorem lorem lorrem lorem lorem lorem", "alt2 lorem lorem lorem lorrem lorem lorem lorem", "alt3 lorem lorem lorem lorrem lorem lorem lorem"]));
        qRoom1.getObjectByName("question_group").position.set(25, 8, 7);
        qRoom1.getObjectByName("question_group").rotation.set(0, -1, 0);
        //console.log(qRoom1);

        //room 1 physics setup
        console.log(qRoom1);
        const brickwall = qRoom1.children[3];
        let worldPos = new Vector3();
        brickwall.getWorldPosition(worldPos);

        //brickwall size
        const boxSize = getObjSize(brickwall);
        const rightBoxBody = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Box(new CANNON.Vec3((boxSize.x / 2), (boxSize.y / 2), (boxSize.z / 2) * 6)),
            position: new CANNON.Vec3(worldPos.x, 1.5, (worldPos.z + 1) - (boxSize.z * 2.5)),
        });


        const leftWallPos = qRoom1.children[2].children[1].children[2].children[0];
        //console.log(leftWallPos)
        leftWallPos.getWorldPosition(worldPos);
        //console.log(worldPos);
        const leftBoxBody = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Box(new CANNON.Vec3((boxSize.x / 2), (boxSize.y / 2), (boxSize.z / 2) * 5)),
            position: new CANNON.Vec3(worldPos.x, 1.5, (worldPos.z + 1) - (boxSize.z * 2)),
        });


        const backWallPos = qRoom1.children[2].children[1].children[0].children[0];
        const worldQuaternion = new Quaternion();
        backWallPos.getWorldQuaternion(worldQuaternion);
        //console.log(worldQuaternion)
        console.log(radToDeg(backWallPos.quaternion.z))
        backWallPos.getWorldPosition(worldPos);
        const backBoxBody = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Box(new CANNON.Vec3((boxSize.x / 2), (boxSize.y / 2), (boxSize.z / 2) * 3)),
            position: new CANNON.Vec3(worldPos.x, 1.5, (worldPos.z + 1) - (boxSize.z * 2)),
            //quaternion: new CANNON.Quaternion().setFromEuler(40.51423092676636, 40.51423092676636, 0)
        });
        //backBoxBody.quaternion.setFromEuler(0, Math.PI / 2, 0);



        //backBoxBody.quaternion.copy(worldQuaternion);
        //backBoxBody.quaternion.copy(backWallPos.quaternion);

        //console.log(backBoxBody.quaternion);
        console.log(backWallPos.rotation.x);
        //boxBody.position.copy(worldPos);


        //console.log(radToDeg(rightWall.quaternion.x));

        physicWorld.addBody(rightBoxBody);
        physicWorld.addBody(leftBoxBody);
        physicWorld.addBody(backBoxBody);


        //fazer talvez um retorno onde terá o objeto visual e fisico
        //
        
    }

    //question room 2 setup
    {
        qRoom2.position.set(93, 0, -42.5);
        qRoom2.rotateY(degToRad(180));
        qRoom2.add(createQuestionUi("hello world", ["alt1 lorem lorem lorem lorrem lorem lorem lorem", "alt2 lorem lorem lorem lorrem lorem lorem lorem", "alt3 lorem lorem lorem lorrem lorem lorem lorem"]));
        qRoom2.getObjectByName("question_group").position.set(25, 8, 7);
        qRoom2.getObjectByName("question_group").rotation.set(0, -1, 0);
    }

    //question room 3 setup
    {
        qRoom3.position.set(96, 0, 137.5);
        qRoom3.rotateY(degToRad(180));
        qRoom3.add(createQuestionUi("hello world", ["alt1 lorem lorem lorem lorrem lorem lorem lorem", "alt2 lorem lorem lorem lorrem lorem lorem lorem", "alt3 lorem lorem lorem lorrem lorem lorem lorem"]));
        qRoom3.getObjectByName("question_group").position.set(25, 8, 7);
        qRoom3.getObjectByName("question_group").rotation.set(0, -1, 0);
    }


    scene.add(qRoom1);
    scene.add(qRoom0);
    scene.add(qRoom2);
    scene.add(qRoom3);

}



export {
    makeDungeon
}