import { Group, Vector3 } from "three";
import { makeDungeonFloor } from "./floor"
import { degToRad, radToDeg } from "three/src/math/MathUtils";
import { questionRoom } from "./QuestionRoom";
import { createQuestionUi, getObjSize, getRandomIndex } from "../util/Utils";
import * as CANNON from 'cannon-es';
import { Quaternion } from "three";
import { Room } from "./Room";
import { Color } from "three";
import { COLORS, QUESTION_1, QUESTION_2, QUESTION_3, QUESTION_4 } from "../util/Constants";


function makeDungeon(scene, models, physicWorld) {
    //group with all floor
    const floor = new Group();
    floor.name = 'Dungeon_floor';


    const qRoom0 = new Room({ model: models, qRoom: true, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS, name: "question_room00", question: QUESTION_1, backWallArray: [3, 5, 5] });
    const qRoom1 = new Room({ model: models, qRoom: true, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS, name: "question_room01", question: QUESTION_2, backWallArray: [5, 3, 5] });
    const qRoom2 = new Room({ model: models, qRoom: true, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS, name: "question_room02", question: QUESTION_3, backWallArray: [5, 5, 3] });
    const qRoom3 = new Room({ model: models, qRoom: true, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS, name: "question_room03", question: QUESTION_4, backWallArray: [3, 5, 5] });

    //const testroom = questionRoom(models)


    //rooms
    //plane 1
    const room01 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room01" });
    const room02 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room02" });
    const room03 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room03" });
    const room04 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room04" });
    const room05 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room05" });

    //plane 2
    const room06 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room06" });
    const room07 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room07" });
    const room08 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room08" });
    const room09 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room09" });
    const room10 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room10" });

    //plane 3
    const room11 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room11" });
    const room12 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room12" });
    const room13 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room13" });
    const room14 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room14" });
    const room15 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room15" });

    //plane 4
    const room16 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room16" });
    const room17 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room17" });
    const room18 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room18" });
    const room19 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room19" });
    const room20 = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "room20" });

    //miscelaneous
    const skulls = multiplyObj(models.scene.getObjectByName("skull").clone());


    scene.add(skulls[0], skulls[1], skulls[2], skulls[3], skulls[4], skulls[5], skulls[6], skulls[7],skulls[8],skulls[9]);

    const woodenBox = multiplyObj(models.scene.getObjectByName("wooden_box").clone(), 10);
    woodenBox[0].position.set(-62, 0.2, 44);
    woodenBox[0].add(skulls[0]);
    skulls[0].position.set(0, 0, 0.4);
    skulls[0].rotateX(degToRad(90));
    skulls[0].scale.set(1, 1, 1);

    woodenBox[1].position.set(-45, 0.2, -129);
    woodenBox[1].add(skulls[1]);
    skulls[1].position.set(0, 0, 0.4);
    skulls[1].rotateX(degToRad(90));
    skulls[1].scale.set(1, 1, 1);

    woodenBox[2].position.set(104, 0.2, -44);
    woodenBox[2].add(skulls[2]);
    skulls[2].position.set(0, 0, 0.4);
    skulls[2].rotateX(degToRad(90));
    skulls[2].scale.set(1, 1, 1);

    woodenBox[3].position.set(95, 0.2, 135);
    woodenBox[3].add(skulls[3]);
    skulls[3].position.set(0, 0, 0.4);
    skulls[3].rotateX(degToRad(90));
    skulls[3].scale.set(1, 1, 1);

    woodenBox[4].position.set(-33,0.2, 95);
    woodenBox[4].add(skulls[4]);
    skulls[4].position.set(0, 0, 0.4);
    skulls[4].rotateX(degToRad(90));
    skulls[4].scale.set(1, 1, 1);

    woodenBox[5].position.set(-92, 0.2, -55);
    woodenBox[5].add(skulls[5]);
    skulls[5].position.set(0, 0, 0.4);
    skulls[5].rotateX(degToRad(90));
    skulls[5].scale.set(1, 1, 1);

    woodenBox[6].position.set(42, 0.2, -46);
    woodenBox[6].add(skulls[6]);
    skulls[6].position.set(0, 0, 0.4);
    skulls[6].rotateX(degToRad(90));
    skulls[6].scale.set(1, 1, 1);

    woodenBox[7].position.set(115, 0.2, 62);
    woodenBox[7].add(skulls[7]);
    skulls[7].position.set(0, 0, 0.4);
    skulls[7].rotateX(degToRad(90));
    skulls[7].scale.set(1, 1, 1);

    woodenBox[8].position.set(-81, 0.2, 83);
    woodenBox[8].add(skulls[8]);
    skulls[8].position.set(0, 0, 0.4);
    skulls[8].rotateX(degToRad(90));
    skulls[8].scale.set(1, 1, 1);

    woodenBox[9].position.set(-40, 0.2, -34);
    woodenBox[9].add(skulls[9]);
    skulls[9].position.set(0, 0, 0.4);
    skulls[9].rotateX(degToRad(90));
    skulls[9].scale.set(1, 1, 1);

    scene.add(woodenBox[0], woodenBox[1], woodenBox[2], woodenBox[3], woodenBox[4], woodenBox[5], woodenBox[6], woodenBox[7], woodenBox[8], woodenBox[9]);

    const chestArray = makeChest(models, 4);
    chestArray[0].position.set(-75, 0.5, 113);
    //chestArray[0].scale.set(0.5, 0.5, 0.5);

    chestArray[1].position.set(-41, 0.5, -59);
    chestArray[2].position.set(87, 0.5, -142);
    chestArray[3].position.set(43, 0.5, 44);

    scene.add(chestArray[0], chestArray[1], chestArray[2], chestArray[3]);




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



    //plane 1 room setup


    room01.room.position.set(-121, 0, 81);
    room01.room.rotateY(degToRad(180));

    room02.room.position.set(-79, 0, 119);

    room03.room.position.set(-40, 0, 92);
    room03.room.rotateY(degToRad(-90));

    room04.room.position.set(-136, 0, 40);

    room05.room.position.set(-141, 0, 135);
    room05.room.rotateY(degToRad(-90));


    // plane 2 room setup


    room06.room.position.set(-141, 0, -135);
    //room05.room.rotateY(degToRad(-90));

    room07.room.position.set(-131, 0, -83);
    room07.room.rotateY(degToRad(90));

    room08.room.position.set(-45, 0, -53);

    room09.room.position.set(-90, 0, -69);
    room09.room.rotateY(degToRad(180));

    room10.room.position.set(-107, 0, -33);
    room10.room.rotateY(degToRad(90));


    //plane 3 room setup


    room11.room.position.set(98, 0, -100);
    room11.room.rotateY(degToRad(180));

    room12.room.position.set(43, 0, -48);
    room12.room.rotateY(degToRad(180));

    room13.room.position.set(56, 0, -89);
    room13.room.rotateY(degToRad(180));

    room14.room.position.set(131, 0, -72);
    room14.room.rotateY(degToRad(180));

    room15.room.position.set(80, 0, -138);



    //plane 4 room setup


    room16.room.position.set(43, 0, 50);

    room17.room.position.set(120, 0, 63);

    room18.room.position.set(140, 0, 120);

    room19.room.position.set(62, 0, 105);

    room20.room.position.set(127, 0, 84);


    // //question room 0 setup

    qRoom0.room.position.set(-51, 0, 42.5);



    // //question room 1 setup

    //     //const boxSize = getObjSize(qRoom1.getObjectByName("Room01").clone());
    qRoom1.room.position.set(-42.5, 0, -137.8);
    qRoom1.room.rotateY(degToRad(270));



    // //question room 2 setup

    qRoom2.room.position.set(93, 0, -42.5);
    qRoom2.room.rotateY(degToRad(180));


    // //question room 3 setup

    qRoom3.room.position.set(96, 0, 137.5);
    qRoom3.room.rotateY(degToRad(180));



    //const roomTeste = new Room({ model: models, qRoom: false, sideWallNumber: 5, backWallNumber: 5, doorColor: COLORS[getRandomIndex(COLORS)], name: "teste question room" });
    //roomTeste.room.position.set(5, 1, 0);

    scene.add(room01.room, room02.room, room03.room, room04.room, room05.room);
    scene.add(room06.room, room07.room, room08.room, room09.room, room10.room);
    scene.add(room11.room, room12.room, room13.room, room14.room, room15.room);
    scene.add(room16.room, room17.room, room18.room, room19.room, room20.room);
    scene.add(qRoom0.room);
    scene.add(qRoom1.room);
    scene.add(qRoom2.room);
    scene.add(qRoom3.room);
    //testroom.position.set(0,0,0)
    //scene.add(testroom);

}

function multiplyObj(obj, num = 10) {
    const objArray = [];

    for (let i = 0; i < 10; i++) {
        const aux = obj.clone();
        aux.scale.set(1, 1, 1);
        objArray.push(aux);
    }

    return objArray;

}

function makeChest(models, num = 1) {
    const chestB = models.scene.getObjectByName("chest_bottom").clone();
    //chestB.scale.set(0.5, 0.5, 0.5);
    chestB.position.set(0, 0, 0);

    const chestT = models.scene.getObjectByName("chest_top").clone();
    chestT.scale.set(1, 1, 1);
    chestT.position.set(0, 0.5, 0);
    chestT.rotateX(degToRad(90));

    const chestG = models.scene.getObjectByName("chest's_gold").clone();
    chestG.scale.set(1, 1, 1);
    chestG.position.set(0, 0, 0);
    chestG.rotateX(degToRad(90));

    chestB.add(chestT);
    chestB.add(chestG);


    const chestArray = multiplyObj(chestB, 4);

    return chestArray;
}

export {
    makeDungeon
}