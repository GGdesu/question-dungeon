import { Group } from "three";
import { createQuestionUi, shuffleArray } from "../util/Utils";
import { createRoom, questionRoom } from "./QuestionRoom";



class Room {

    constructor({ model: model, name: name = '', qRoom: qRoom = false, sideWallNumber: sWallNumber = 5, backWallNumber: bWallNumber = 5, doorColor: dColor = null, question: question = ["",["","",""]], backWallArray: bArray}) {
       
        if(qRoom){
            this.room = questionRoom(model, bArray);
            this.room.add(createQuestionUi(question[0], question[1]));
            this.room.getObjectByName("question_group").position.set(25, 8, 7);
            this.room.getObjectByName("question_group").rotation.set(0, -1, 0);
        }else{
            this.room = createRoom({ model: model, name: '', qRoom: qRoom, sideWallNumber: sWallNumber, backWallNumber: bWallNumber, doorColor: dColor});
            //this.room.add()
        }
        
    }



}

export{
    Room
}