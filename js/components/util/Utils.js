import { Box3, BoxHelper, Color, Group, Vector3 } from "three";
import * as ThreeMeshUi from "three-mesh-ui";
import { COLORS } from "./Constants";

function getObjSize(obj) {

    const box = new Box3().setFromObject(obj);
    //console.log(box);
    const size = new Vector3();

    box.getSize(size);

    return size;
}

function visualizeBox(obj){
    let box = new BoxHelper(obj, 0x00ff00);

    return box;
}

function addStaticBody(){

}

//durstenfeld shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function getRandomIndex(list, customLength = 0) {
    if (customLength === 0) {
        //console.log(Math.floor((Math.random()*list.length)));
        return Math.floor((Math.random() * list.length));
    } else {
        //console.log(Math.floor((Math.random()*list.length)));
        return Math.floor((Math.random() * customLength));
    }

}

function createQuestionUi(question, answer) {

    const group = new Group();
    group.name = "question_group";

    answer = answer;

    const answerColor = COLORS;

    //question panel
    const questionBlock = new ThreeMeshUi.Block({
        width: 15.2,
        height: 3.7,
        padding: 0.2,
        fontSize: 0.5,
        fontFamily: "./font/Roboto-msdf.json",
        fontTexture: "./font/Roboto-msdf.png",
    });

    const qText = new ThreeMeshUi.Text({
        content: question
    });

    questionBlock.add(qText);
    questionBlock.name = 'question';

    group.add(questionBlock);
    //

    //answer panel

    //answer 1
    const answerBlock = new ThreeMeshUi.Block({
        width: 15.2,
        height: 1.7,
        padding: 0.2,
        fontSize: 0.5,
        backgroundColor: new Color(answerColor[0].cor1),
        fontFamily: "./font/Roboto-msdf.json",
        fontTexture: "./font/Roboto-msdf.png",
    });

    const aText1 = new ThreeMeshUi.Text({
        content: answer[0]
    });

    answerBlock.add(aText1);
    answerBlock.position.setY(-(Math.floor(questionBlock.height)));
    answerBlock.name = "answer_1";
    group.add(answerBlock);


    //answer 2

    const answerBlock2 = new ThreeMeshUi.Block({
        width: 15.2,
        height: 1.7,
        padding: 0.2,
        fontSize: 0.5,
        backgroundColor: new Color(answerColor[1].cor1),
        fontFamily: "./font/Roboto-msdf.json",
        fontTexture: "./font/Roboto-msdf.png",
    });

    const aText2 = new ThreeMeshUi.Text({
        content: answer[1]
    });

    answerBlock2.add(aText2);
    answerBlock2.position.setY(-(Math.floor(questionBlock.height*1.5)));
    answerBlock2.name = "answer_2"

    group.add(answerBlock2);

    //answer 3

    const answerBlock3 = new ThreeMeshUi.Block({
        width: 15.2,
        height: 1.7,
        padding: 0.2,
        fontSize: 0.5,
        backgroundColor: new Color(answerColor[2].cor1),
        fontFamily: "./font/Roboto-msdf.json",
        fontTexture: "./font/Roboto-msdf.png",
    });

    const aText3 = new ThreeMeshUi.Text({
        content: answer[2]
    });

    answerBlock3.add(aText3);
    answerBlock3.position.setY(-(Math.floor(questionBlock.height*2)));
    answerBlock3.name = "answer_3"

    group.add(answerBlock3);

    return group;

}


export {
    getObjSize,
    shuffleArray,
    getRandomIndex,
    createQuestionUi,
    visualizeBox
}