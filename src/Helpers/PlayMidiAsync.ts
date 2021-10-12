import  {IMidiFile, noteEvent} from "../Utils/TypesForMidi";

import getConstantDataFromMidiFile from "./getConstantDataFromMidiFile";
import ConvertToNoteEventsJSON from './getNoteEventsJSON';

const PlayMidiAsync = async (fileData:Object,onEvent:Function) =>{
    const File = fileData as IMidiFile;
    let microsecondsPerQuarter = 500000;   //Default Value if it's not given
    const StaticMidiFileData = getConstantDataFromMidiFile(File);
    let tickTime = microsecondsPerQuarter /  StaticMidiFileData.division;  //In microseconds
    console.log(File);

    const noteEventsJSON = ConvertToNoteEventsJSON(File,microsecondsPerQuarter,StaticMidiFileData,tickTime);
    console.log(noteEventsJSON);
    const PlayFromNotesAsync = async () =>{
        let isFinished = false, timer = 0, currentIndex = 0;
        let Events:Array<noteEvent> = [];
        const timeStamps = 50;
        const interval = setInterval(()=>{
            timer += timeStamps;
            while(true){
                if(noteEventsJSON[currentIndex].Delta / 1000 <= timer){
                    Events.push(noteEventsJSON[currentIndex]);
                    currentIndex+=1
                }else{
                    onEvent(Events);
                    Events = [];
                    break;
                }
            }
            isFinished && clearInterval(interval);
        },timeStamps);
    }
    PlayFromNotesAsync();
    //PlayAsync([0,0],[0,0],0);
}

export default PlayMidiAsync;