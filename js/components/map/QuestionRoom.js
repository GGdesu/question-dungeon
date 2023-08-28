import { Color, Group, BoxHelper, Box3 } from "three";
///import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";
import { getObjSize, getRandomIndex, shuffleArray, visualizeBox } from "../util/Utils";
import { COLORS } from "../util/Constants";
import { Vector3 } from "three";



function frontRoom({ model: model, qRoom: qRoom, doorColor: dColor, walls: walls }) {

    // fazer com que possa fazer front walls para question room e room normal
    // e para isso criar uma função com o nome front wall
    const frontRoom = new Group();
    frontRoom.name = 'frontRoom';

    if (qRoom) {
        frontRoom.add(getFrontWall(model, walls, dColor, qRoom));

    } else {
        frontRoom.add(getFrontWall(model, walls, dColor, qRoom));
    }


    return frontRoom;

}

function createRoom({ model: model, name: name = '', qRoom: qRoom = false, sideWallNumber: sWallNumber, backWallNumber: bWallNumber, doorColor: dColor }) {

    const walls = getWall(model, qRoom);

    const room = new Group();
    room.add(frontRoom({ model: model, qRoom: qRoom, doorColor: dColor, walls: walls }));
    room.name = name;
    //const wall = model.scene.getObjectByName('brick_wall002').clone();


    //console.log(walls);
    const rightWallGroup = new Group();
    rightWallGroup.name = 'right_wall_group';
    const leftWallGroup = new Group();
    leftWallGroup.name = 'left_wall_group';
    const backWallGroup = new Group();
    backWallGroup.name = 'back_wall_group';

    const roomWalls = new Group();
    roomWalls.name = 'room_walls_group';

    //const backWall = isNormal ? 5 : 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < (i === 1 ? bWallNumber : sWallNumber); j++) {

            const wallClone = walls[getRandomIndex(walls)].clone();
            wallClone.scale.set(1, 1, 1);
            const sizeWall = getObjSize(wallClone);
            //wallClone.name = name + j;

            //se i for 1 a parede traseira é feita
            if (i === 1) {

                wallClone.position.set((j * sizeWall.x), 0, -10);


                wallClone.translateX(0.8);


                wallClone.rotateZ(degToRad(180));
                backWallGroup.add(wallClone);

            } else {

                //se a parede lateral for maior que 5 então
                //a parede frontal avança um pouco para frente
                if (j >= 5) {
                    room.children[0].translateZ(sizeWall.z * 2.11);
                    console.log(room.children[0]);
                }


                //se for i for 0 a parede da direita é feita
                if (i === 0) {


                    wallClone.position.set(-1.2, 0, (j * sizeWall.y));


                    wallClone.translateY(j + 7.75);


                    wallClone.rotateZ(degToRad(90));
                    rightWallGroup.add(wallClone);

                    //se i for 2 a parede da esquerda é feita
                } else if (i === 2) {

                    wallClone.position.set(9.05, 0, (j * sizeWall.y));


                    wallClone.translateY(j + 7.75);


                    wallClone.rotateZ(degToRad(90));
                    leftWallGroup.add(wallClone);
                }



            }

        }

    }

    //add AABB for collison
    // const rightBoxHelper = new BoxHelper(rightWallGroup, 0xff0000);
    // rightBoxHelper.name = "rightBoxHelper"
    // const rightBBox = new Box3();
    // rightBBox.setFromObject(rightBoxHelper);
    // rightBBox.name = "rightBBox";
    // rightWallGroup.add(rightBoxHelper);
    //rightWallGroup.add(rightBBox);


    // const leftBoxHelper = new BoxHelper(leftWallGroup, 0x00ff00);
    // leftBoxHelper.name = "leftBoxHelper"
    // const leftBBox = new Box3();
    // leftBBox.setFromObject(leftBoxHelper);
    // leftBBox.name = "leftBBox";
    // leftWallGroup.add(leftBoxHelper);
    // //leftWallGroup.add(leftBBox);

    // const backBoxHelper = new BoxHelper(backWallGroup, 0x0000ff);
    // backBoxHelper.name = "backBoxHelper";
    // const backBBox = new Box3();
    // backBBox.name = "backBBox";
    // backBBox.setFromObject(backBoxHelper);
    // backWallGroup.add(backBoxHelper);

    roomWalls.add(backWallGroup, rightWallGroup, leftWallGroup)
    room.add(roomWalls);
    //room.rotateY(degToRad(90));
    if(!qRoom){
        console.log(room);
        room.getObjectByName("door_arc").position.x = 4;
        room.getObjectByName("door001") === undefined ? "n é obj":  room.getObjectByName("door001").position.x = 3;
        //room.add(getBBoxHelper(room));
        
    }
    return room;


}

//criar a função aqui pra depois colocar em question dungeon
function getFrontWall(model, walls, dColor, qRoom = false) {

    const frontGroup = new Group();
    frontGroup.name = "front_wall_group"
    //frontGroup.position.x = -14;
    //get door arc
    const doorArc = model.scene.getObjectByName('door_arc').clone();
    doorArc.scale.set(1, 1, 1);
    doorArc.position.set(0, 1, 0.2);
    frontGroup.add(doorArc)

    //rand number 0 to 2
    let nRandom = Math.floor(Math.random() * 3);
    if (qRoom) {
        nRandom = 1;
    }

    switch (nRandom) {
        case 0:
            //get black bars grid preta
            const blackGrid = model.scene.getObjectByName('bars001').clone();
            doorArc.add(blackGrid);

            blackGrid.scale.set(1, 1, 1);
            blackGrid.position.set(0, 0, 0);
            blackGrid.rotateX(degToRad(90));
            break;

        case 1:
            const door = model.scene.getObjectByName('door001').clone();
            //doorArc.add(door);
            frontGroup.add(door);
            door.scale.set(1, 1, 1);
            door.position.set(-1, 1.2, 0.4);
            //door.rotateX(degToRad(90));

            const clonedMaterial1 = door.children[0].material.clone();
            const color1 = new Color(dColor.cor1);
            clonedMaterial1.color = color1;
            door.children[0].material = clonedMaterial1;

            const clonedMaterial2 = door.children[2].material.clone();
            const color2 = new Color(dColor.cor2);
            clonedMaterial2.color = color2;
            door.children[2].material = clonedMaterial2;
            break;

        case 2:
            //no door
            break;
    }




    const leftFrontWall = new Group();
    leftFrontWall.name = "left_front_wall_group";
    leftFrontWall.position.z = 1.2;
    leftFrontWall.position.x = 4
    const rightFrontWall = new Group();
    rightFrontWall.name = "right_front_wall_group";
    rightFrontWall.position.z = 1.2;
    rightFrontWall.position.x = 4;

    //random wall 0
    //doorArc.add(leftFrontWall); // add left front wall group to door arc
    //doorArc.add(rightFrontWall);// add right front wall group to door arc
    frontGroup.add(leftFrontWall, rightFrontWall);
    const wall = walls[getRandomIndex(walls)].clone();
    leftFrontWall.add(wall);
    //doorArc.add(wall);
    wall.scale.set(1, 1, 1);
    wall.position.set(1.05, 0, -1);
    //wall.rotateX(degToRad(90));

    //random wall 1
    const wall2 = walls[getRandomIndex(walls)].clone();
    leftFrontWall.add(wall2);
    //doorArc.add(wall2);
    wall2.scale.set(1, 1, 1);
    wall2.position.set(3.1, 0, -1);
    //wall2.rotateX(degToRad(90));


    //random wall 2
    const wall3 = walls[getRandomIndex(walls)].clone();
    rightFrontWall.add(wall3);
    //doorArc.add(wall3);
    wall3.scale.set(-1, 1, 1);
    wall3.position.set(-1.1, 0, -1);
    //wall3.rotateX(degToRad(90));

    //ranndom wall 3
    const wall4 = walls[getRandomIndex(walls)].clone();
    rightFrontWall.add(wall4);
    //doorArc.add(wall4);
    wall4.scale.set(-1, 1, 1);
    wall4.position.set(-3.2, 0, -1);
    //wall4.rotateX(degToRad(90));

    //frontGroup.translateX(4);
    //frontGroup.translateY(-0.5);

    return frontGroup;
}

function getWall(model, qRoom = false) {

    const bWalls = [];
    const sWalls = [];



    //get brick wall
    bWalls.push(model.scene.getObjectById(95).clone());
    for (let i = 99; i < 104; i++) {
        bWalls.push(model.scene.getObjectById(i).clone());

    }
    // get window wall
    bWalls.push(model.scene.getObjectById(115).clone());
    bWalls.push(model.scene.getObjectById(116).clone());

    //get Smooth wall
    sWalls.push(model.scene.getObjectById(96).clone());
    for (let i = 104; i < 108; i++) {
        sWalls.push(model.scene.getObjectById(i).clone());

    }

    const walls = [];
    walls.push(bWalls);
    walls.push(sWalls);

    if (qRoom === false) {
        return walls[getRandomIndex(walls)];
    } else {
        //remove os 4 ultimos elementos, que são paredes com buracos
        for (let i = 0; i < 5; i++) {
            bWalls.pop();
        }

        return bWalls;
    }

}

function questionRoom(model, backWallArray) {

    //[eggplant & dark purple], [field drab], [blood red & black bean]
    const doorColors = COLORS;

    const backWallNumber = backWallArray;
    //const backWallNumber = shuffleArray([3, 5, 5]);
    const roomGroup = new Group();

    for (let i = 0; i < 3; i++) {
        const room = createRoom({
            model: model,
            name: `room0${i + 1}`,
            qRoom: true,
            sideWallNumber: 5,
            backWallNumber: backWallNumber[i],
            doorColor: doorColors[i]
        });
        //room.getObjectByName("front_wall_group").position.x = 4;
        room.getObjectByName("door_arc").position.x = 4;
        room.getObjectByName("door001").position.x = 3;
        room.position.set(i * 11 - 11, 0, 0);
        roomGroup.add(room);

        // const boxHelperGroup = new Group();
        // boxHelperGroup.name = "box_helper_group";
        // boxHelperGroup.add(getBBoxHelper(room));
        // room.add(getBBoxHelper(room));
    }

    //roomGroup.getObjectByName("box_helper_group").children[0].children[0].position.x = -12;
    //console.log( roomGroup.getObjectByName("box_helper_group").children[0].children[0])
    //add extra wall in the end
    const extraWallRight = model.scene.getObjectByName("brick_wall").clone();
    extraWallRight.rotateZ(degToRad(90));
    extraWallRight.position.set(-12.20, 0, -10.15);
    extraWallRight.scale.set(1, 1, 1);

    const extraWallLeft = extraWallRight.clone();
    extraWallLeft.position.x = 20.15;

    roomGroup.add(extraWallRight);
    roomGroup.add(extraWallLeft);
    //
    return roomGroup;

}

function getBBoxHelper(room) {

    //room walls
    const rightBoxHelper = new BoxHelper(room.getObjectByName("right_wall_group"), 0xff0000);
    rightBoxHelper.name = "rightBoxHelper";

    const leftBoxHelper = new BoxHelper(room.getObjectByName("left_wall_group"), 0x00ff00);
    leftBoxHelper.name = "leftBoxHelper";

    const backBoxHelper = new BoxHelper(room.getObjectByName("back_wall_group"), 0x0000ff);
    backBoxHelper.name = "backBoxHelper";

    //front room
    const leftFrontWallBoxHelper = new BoxHelper(room.getObjectByName("left_front_wall_group"), 0xff0000);
    leftFrontWallBoxHelper.name = "leftFrontWallBoxHelper";
    leftFrontWallBoxHelper.position.copy(room.getObjectByName("left_front_wall_group").position);
    //leftFrontWallBoxHelper.position.x = 4;
    //leftFrontWallBoxHelper.update();

    const rightFrontWallBoxHelper = new BoxHelper(room.getObjectByName("right_front_wall_group"), 0x00ff00);
    rightFrontWallBoxHelper.name = "rightFrontWallBoxHelper";
    console.log(leftFrontWallBoxHelper.position)
    //rightFrontWallBoxHelper.position.copy(room.getObjectByName("right_front_wall_group").position);
    //rightFrontWallBoxHelper.updateMatrixWorld();

    const roomBoxGroup = new Group();
    roomBoxGroup.add(rightBoxHelper, leftBoxHelper, backBoxHelper, leftFrontWallBoxHelper, rightFrontWallBoxHelper);

    return roomBoxGroup;
}




export {
    questionRoom,
    createRoom
}