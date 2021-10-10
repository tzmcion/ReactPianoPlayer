import  {IMidiFile, MidiEventType} from "../Utils/TypesForMidi";

import getConstantDataFromMidiFile from "./getConstantDataFromMidiFile";

const PlayMidiAsync = async (fileData:Object,onEvent:Function) =>{
    const File = fileData as IMidiFile;
    let microsecondsPerQuarter = 500000;   //Default Value if it's not given
    const StaticMidiFileData = getConstantDataFromMidiFile(File);
    let tickTime = microsecondsPerQuarter /  StaticMidiFileData.division;  //In microseconds
    console.log(File);

    const PlayAsync = async (indexes:Array<number>, TicksSpentOnTracks:Array<number>,microsecondsGap:number) =>{
        const FunctionTimeStart =  new Date().getTime();   //in miliseconds
        let Array_TicksToNextEvent = new Array(TicksSpentOnTracks.length);
        let newIndexes = new Array(indexes.length);
        indexes.map((e,index)=>{
            newIndexes[index] = e;
            return null;
        })
        let newTicksSpentOnTracks = new Array(TicksSpentOnTracks.length);
        TicksSpentOnTracks.map((e,index)=>{
            newTicksSpentOnTracks[index] = e;
            return null;
        })
        let Events:Array<MidiEventType> = [];
        //  
            while(true){
                let eventWasFound = false;
                // eslint-disable-next-line no-loop-func
                File.tracks.map((Track,index) =>{
                    const Event = Track[newIndexes[index]] as MidiEventType;
                    if(Event){
                    if('delta' in Event){
                        if(Event.delta - newTicksSpentOnTracks[index] <= 0){
                            newTicksSpentOnTracks[index] = 0;
                            eventWasFound = true;
                            newIndexes[index] += 1;
                            Events.push(Event);
                            if('setTempo' in Event){
                                microsecondsPerQuarter =  Event.setTempo.microsecondsPerQuarter;
                                tickTime = microsecondsPerQuarter /  StaticMidiFileData.division; 
                            }
                        }else{
                            Array_TicksToNextEvent[index] = Event.delta - newTicksSpentOnTracks[index];
                        }
                    }
                    }
                    return null;
                })
                if(!eventWasFound){
                    break;
                }
            }
        //
        let ticksRequiredToSleep = 10000000;
        Array_TicksToNextEvent.forEach(element =>{
            if(element < ticksRequiredToSleep){
                ticksRequiredToSleep = element;
            }
        })
        TicksSpentOnTracks.map((e,index)=>{
            newTicksSpentOnTracks[index] = e + ticksRequiredToSleep;
            return null;
        })
        let TimeRequiredToSleep = ticksRequiredToSleep * tickTime / 1000;
        TimeRequiredToSleep -= Math.floor(microsecondsGap); 
        const NextMicrosecondsGap = (TimeRequiredToSleep % 1) + (microsecondsGap % 1);
        onEvent(Events);
        TimeRequiredToSleep -= new Date().getTime() - FunctionTimeStart;
        setTimeout(()=>{PlayAsync(newIndexes,newTicksSpentOnTracks,NextMicrosecondsGap)},TimeRequiredToSleep);
    }

    PlayAsync([0,0],[0,0],0);
}

export default PlayMidiAsync;