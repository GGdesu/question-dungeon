import { Color, Group, BoxHelper } from "three";
///import * as THREE from "three";
import { degToRad, radToDeg } from "three/src/math/MathUtils";
import { getObjSize, getRandomIndex, shuffleArray, visualizeBox } from "../util/Utils";
import { COLORS } from "../util/Constants";
import * as CANNON from "cannon-es";
import { Vector3 } from "three";



function frontRoom({ model: model, qRoom: qRoom, doorColor: dColor, walls: walls, physWorld: physicWorld }) {

    // fazer com que possa fazer front walls para question room e room normal
    // e para isso criar uma função com o nome front wall
    const frontRoom = new Group();
    frontRoom.name = 'frontRoom';




    if (qRoom) {

        const brickWall = model.scene.getObjectByName('brick_wall_with_door').clone();;
        brickWall.scale.set(1, 1, 1);
        brickWall.position.set(0.5, 0, 0.5);

        //console.log(brickWall);
        //brickWall.computeBoundingBox();
        //const test = getObjSize(brickWall);
        //console.log(test)

        const door = model.scene.getObjectByName('door001').clone();

        //clonar o material pra não ficar referenciando o mesmo material original para todos
        const clonedMaterial1 = door.children[0].material.clone();
        const color1 = new Color(dColor.cor1);
        clonedMaterial1.color = color1;
        door.children[0].material = clonedMaterial1;

        const clonedMaterial2 = door.children[2].material.clone();
        const color2 = new Color(dColor.cor2);
        clonedMaterial2.color = color2;
        door.children[2].material = clonedMaterial2;

        //adicionar a porta como filha da parede com arco
        brickWall.add(door);
        door.scale.set(1, 1, 1);
        door.position.set(2.2, 0, 1.2);
        door.rotateX(degToRad(90));


        frontRoom.add(brickWall);


        //adicionar uma parede extra em cada lado da parede com arco
        const leftWall = model.scene.getObjectByName('brick_wall001').clone();

        brickWall.add(leftWall);
        leftWall.position.set(0, 0, 0);
        leftWall.scale.set(1, 1, 1);
        leftWall.rotateX(degToRad(90));
        leftWall.rotateZ(degToRad(180));

        const rightWall = leftWall.clone();
        brickWall.add(rightWall);
        rightWall.position.set(8.4, 0, 0);
        rightWall.scale.set(1, 1, 1);
        brickWall.translateX(0.3);

    } else {
        frontRoom.add(getFrontWall(model, walls));
    }


    return frontRoom;

}

function createRoom({ model: model, name: name = '', qRoom: qRoom = false, sideWallNumber: sWallNumber, backWallNumber: bWallNumber, doorColor: dColor, physWorld: physicWorld }) {

    const walls = getWall(model, qRoom, physicWorld);

    const room = new Group();
    room.add(frontRoom({ model: model, qRoom: qRoom, doorColor: dColor, walls: walls, physWorld: physicWorld }));
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

    roomWalls.add(backWallGroup, rightWallGroup, leftWallGroup)
    room.add(roomWalls);
    //room.rotateY(degToRad(90));
    return room;


}

//criar a função aqui pra depois colocar em question dungeon
function getFrontWall(model, walls, physicWorld = null) {

    //get door arc
    const doorArc = model.scene.getObjectByName('door_arc').clone();
    doorArc.scale.set(1, 1, 1);
    doorArc.position.set(0, 1, 0);

    //rand number 0 to 2
    const nRandom = Math.floor(Math.random() * 3);


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
            doorArc.add(door);
            door.scale.set(1, 1, 1);
            door.position.set(-1, 0, 0.2);
            door.rotateX(degToRad(90));
            break;

        case 2:
            //no door
            break;
    }



    //random wall 0
    const wall = walls[getRandomIndex(walls)].clone();
    doorArc.add(wall);
    wall.scale.set(1, 1, 1);
    wall.position.set(1.05, 0, -1);
    wall.rotateX(degToRad(90));

    //random wall 1
    const wall2 = walls[getRandomIndex(walls)].clone();
    doorArc.add(wall2);
    wall2.scale.set(1, 1, 1);
    wall2.position.set(3.1, 0, -1);
    wall2.rotateX(degToRad(90));

    //random wall 2
    const wall3 = walls[getRandomIndex(walls)].clone();
    doorArc.add(wall3);
    wall3.scale.set(-1, 1, 1);
    wall3.position.set(-1.1, 0, -1);
    wall3.rotateX(degToRad(90));

    //ranndom wall 3
    const wall4 = walls[getRandomIndex(walls)].clone();
    doorArc.add(wall4);
    wall4.scale.set(-1, 1, 1);
    wall4.position.set(-3.2, 0, -1);
    wall4.rotateX(degToRad(90));

    doorArc.translateX(4);
    doorArc.translateY(-0.5);

    return doorArc;
}

function getWall(model, qRoom = false, physicWorld = null) {

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

function questionRoom(model, physicWorld) {

    //[eggplant & dark purple], [field drab], [blood red & black bean]
    const doorColors = shuffleArray(COLORS);

    const backWallNumber = shuffleArray([3, 5, 5]);

    const room = createRoom({ model: model, name: 'room01', qRoom: true, sideWallNumber: 5, backWallNumber: backWallNumber[0], doorColor: doorColors[0], physWorld: physicWorld });


    const room2 = createRoom({ model: model, name: 'room02', qRoom: true, sideWallNumber: 5, backWallNumber: backWallNumber[1], doorColor: doorColors[1], physWorld: physicWorld });
    room2.position.set(11, 0, 0);

    const room3 = createRoom({ model: model, name: 'room03', qRoom: true, sideWallNumber: 5, backWallNumber: backWallNumber[2], doorColor: doorColors[2], physWorld: physicWorld });
    room3.position.set(-11, 0, 0);

    const roomGroup = new Group();
    roomGroup.add(room);
    roomGroup.add(room2);
    roomGroup.add(room3);

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




export {
    questionRoom,
    createRoom
}