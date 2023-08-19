import { Mesh, MeshPhongMaterial, PlaneGeometry, RepeatWrapping, TextureLoader } from "three"
import { degToRad } from "three/src/math/MathUtils";

function makeDungeonFloor(Width = 1, Height = 1) {

    const loader = new TextureLoader();

    const texture = loader.load('/floorTexture/floor.jpg', (texture) => {
        console.log('Textura carregada com sucesso!');
        // Verifique se a textura está carregada corretamente
    }, undefined, (error) => {
        console.error('Erro ao carregar a textura:', error);
    });

    const dmap = loader.load('/floorTexture/dfloor.png', (dmap) => {
        console.log('displacement map carregado com sucesso!');
    }, undefined, (error) => {
        console.error('Erro ao carregar a displacement map:', error);
    });

    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;

    texture.repeat.set(Math.ceil(Width / 2), Math.ceil(Height / 2));

    const geometry = new PlaneGeometry(Width, Height);
    const material = new MeshPhongMaterial({
        //displacementMap: dmap,
        //displacementScale: .5,
        map: texture
    });

    const mesh = new Mesh(geometry, material);

    mesh.rotateX(degToRad(-90));

    return mesh;

}

export {

    makeDungeonFloor
}