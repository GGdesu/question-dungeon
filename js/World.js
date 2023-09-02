import { createCamera } from "./components/Camera";
import { createLight } from "./components/Light";
import { load3dModel } from "./components/LoadModel";
import { createScene } from "./components/Scene";
import { makeGridFloorHelper } from "./components/util/GridFloor";


import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { Clock } from "three";
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory';
import * as THREE from 'three';
import * as ThreeMeshUi from "three-mesh-ui";
import * as CANNON from 'cannon-es';
import CannonDebugger from "cannon-es-debugger";

import { createRenderer } from "./sys/Renderer";
import { Resizer } from "./sys/Resizer";
import { createOrbitControls } from "./sys/Controls";
import FirstPersonVRControls from "./components/util/ThreeFirstPersonVr";
import { createRoom, questionRoom } from "./components/map/QuestionRoom";
import { degToRad } from "three/src/math/MathUtils";
import { makeDungeon } from "./components/map/Dungeon";
import { Quaternion } from "three";
import { Vector3 } from "three";
import { getObjSize } from "./components/util/Utils";
import { DirectionalLight } from "three";
import { PointLightHelper } from "three";
import { PickHelper } from "./components/util/PickHelper";






let scene;
let camera;
let renderer;
let controls;
let physicWorld;
let allowVR = false;

let listener, audioLoader, backgroundSound;

let models;


class World {

    constructor({ canvas: container, allowVR: allow = false }) {
        //configuração síncrona
        allowVR = allow;
        this.clock = new Clock();
        scene = createScene();
        camera = createCamera();
        const light = createLight();
        renderer = createRenderer();
        controls = createOrbitControls(camera, renderer.domElement);



        container.append(renderer.domElement);

        //audio
        listener = new THREE.AudioListener();
        camera.add(listener);

        audioLoader = new THREE.AudioLoader();

        backgroundSound = new THREE.Audio(listener);

        audioLoader.load('/music/background_music.mp3', function (buffer) {
            backgroundSound.setBuffer(buffer);
            backgroundSound.setLoop(true);
            backgroundSound.setVolume(0.05);
            backgroundSound.play();
        });
        //





        if (!allowVR) {

            //controls = new FirstPersonControls(camera, renderer.domElement);
            //camera.position.set(0.5, 1, 0.5);
            //camera.lookAt(-0.5, 1.1, -0.5);

            //controls.movementSpeed = 150;
            //controls.lookSpeed = 0.1;


        } else {
            //const rig = new THREE.Object3D();
            this.fpVrControl = new FirstPersonVRControls(camera, scene);


            //this.fpVrControl.verticalMovement = false;
            // You can also enable strafing, set movementSpeed, snapAngle and boostFactor.
            this.fpVrControl.strafing = true;
            this.fpVrControl.movementSpeed = 10;




            this.setupXR(container);


            renderer.setAnimationLoop(this.animate.bind(this));
        }

        //this.pickHelper = new PickHelper(camera);

        //scene.add(camera);

        
        light[0].position.set(-83, 20, 105);
        light[1].position.set(-92, 20, 90);
        light[2].position.set(97, 20, -90);
        light[3].position.set(96, 20, 94);

        scene.add(light[0], light[1], light[2], light[3]);

        const resizer = new Resizer(container, camera, renderer);

        //makeGridFloorHelper(physicWorld, scene, camera, 300, 300);


    }


    createDolly() {
        this.dolly = new THREE.Object3D();
        this.dolly.position.z = 5;

        this.dolly.add(camera);
        scene.add(this.dolly);

        this.dummy = new THREE.Object3D();
        camera.add(this.dummy);

    }


    setupXR(container) {
        renderer.xr.enabled = true;

        container.append(VRButton.createButton(renderer));
    }



    handleMovement() {
        const quaternionDolly = this.dolly.quaternion.clone();

        const quaternionCam = new THREE.Quaternion();

        //camera.updateWorldMatrix(); // Certifique-se de que a matriz mundial da câmera esteja atualizada
        //camera.getWorldQuaternion(quaternionCam);
        console.log('dolly');
        console.log(quaternionDolly);

        this.dummy.getWorldQuaternion(quaternionCam);
        console.log('cam');
        console.log(quaternionCam);

        this.dolly.quaternion.copy(quaternionCam);
        this.dolly.translateZ(0.025);
        this.dolly.position.y = 0;
        this.dolly.quaternion.copy(quaternionDolly);

    }


    async initAsync() {
        models = await load3dModel('/low_poly_dungeon/scene.gltf');
    }

    plotObj() {
        //makeDungeonFloor(scene, models, 120, 120);
        //const test = frontRoom(scene, models);
        //CreateRoom(test, models);
        makeDungeon(scene, models, physicWorld);

        //arrumar as paredes descoladas
        //
        //const singleRoom = createRoom({ model: models, name: 'singleRoom', sideWallNumber: 5, backWallNumber: 3 });
        //scene.add(singleRoom);
    }

    render() {
        renderer.render(scene, camera);
    }



    animate(time) {

        time *= 0.001;

        if (!allowVR) {
            requestAnimationFrame(this.animate.bind(this));
        }


        if (renderer.xr.isPresenting) {

            this.fpVrControl.update(this.clock.getDelta());

        }
        ThreeMeshUi.update();
        // const selectedObj = this.pickHelper.pick({ x: 0, y: 0 }, scene, camera, time);
        // if (selectedObj) {

        //     selectedObj.visible = false;

        // }
       
        this.render();
    }
}

export {
    World
};