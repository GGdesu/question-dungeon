import * as THREE from 'three';

function gridFloor(width = 20, height = 20) {

    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, visible: false });

    const plane = new THREE.Mesh(geometry, material);

    plane.name = 'ground';

    plane.rotateX(THREE.MathUtils.degToRad(90));

    return plane;
}

function highlightMesh(width = 1, height = 1) {

    const highlightMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide
        })
    );

    highlightMesh.name = 'hlFloor';
    highlightMesh.rotateX(THREE.MathUtils.degToRad(90));
    highlightMesh.position.set(0.5, 0, 0.5);

    return highlightMesh;

}


function makeGridFloorHelper(scene, camera, floorW = 20, FloorH = 20, highlightW = 1, highlightH = 1) {

    const floor = gridFloor(floorW, FloorH);
    scene.add(floor);

    const grid = new THREE.GridHelper(floorW, FloorH);
    scene.add(grid);

    const hlFloor = highlightMesh(highlightW, highlightH)
    scene.add(hlFloor);

    const mousePosition = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let intersects;

    window.addEventListener('mousemove', function (e) {
        mousePosition.x = (e.clientX / this.window.innerWidth) * 2 - 1;
        mousePosition.y = -(e.clientY / this.window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mousePosition, camera);
        intersects = raycaster.intersectObjects(scene.children);
        intersects.forEach(function (intersect) {
            if (intersect.object.name === 'ground') {
                const highlightPos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);
                hlFloor.position.set( highlightPos.x, 0, highlightPos.z);
                console.log(highlightPos);
            }
        });
    })



}

export {
    makeGridFloorHelper
}