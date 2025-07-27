/*
    Function created to work with web worker
*/

import { IMidiFile, TrackNoteEvent, timeSignatureDataProps } from "../../Utils/TypesForMidi";

const mergeTracks = (file:IMidiFile): {

}

/**
 * Function Converts IMidiFile to NoteEvents array. If uses TrackNoteEvent, which states if the event occured on different track
 * @param src_file source file
 * @param timeControl file with time controll
 */
const CreateMidiNoteEventsArray = (src_file:IMidiFile, timeControl:timeSignatureDataProps):Array<TrackNoteEvent> =>{
    let mq_per_quarter = 500000; //Constant value, it's 500 ms per 1/4, but only for BMP=120 ! it should be defined in midiFile
    let tickTime = mq_per_quarter / timeControl.division;

}

