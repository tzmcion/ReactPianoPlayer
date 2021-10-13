import { noteEvent } from "./TypesForMidi";


const getEmptyNoteEvent = (noteNumber:number): noteEvent => {
    return{
        NoteNumber: noteNumber,
        Velocity: -1,
        Duration: -1,
        SoundDuration: -1,
        Delta: -1
    }
}

const CreateEmptyArray = (Keys:number,startNumber:number):Array<noteEvent> =>{
    let Keys_Array = [];
    for(let x = startNumber; x < Keys + startNumber; x++){
        Keys_Array.push(getEmptyNoteEvent(x));
    }
    return Keys_Array;
}

export {CreateEmptyArray as CreateMidiNoteEventsArray};
export {getEmptyNoteEvent};