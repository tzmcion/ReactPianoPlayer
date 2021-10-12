    // -- Basically Mapping Every midi Event takes some time
    // -- for example, there can be 24 Events in the same time
    // -- Therefore, they all (for this program), may be converted 
    // -- into something more simple and clear
    // -- So, midi Events : "noteOn", "noteOff", "ControlChange(Sustain) -On", "ControlChange(Sustain) -Off"
    // -- are much more usefull here in a form of an Array f.e.
    // -- [{NoteNumber:62, Delta:number, Duration: 3212, SoundDuration:5444, Velocity: 32},{**Next Note**}]
    // -- With this convertion, Number of Events lowers from
    // -- earlier 24 to 8, even 6 is some cases
    // -- And that Array Easily Gives sufficient informations for this midi reader to work
    // -- as SoundDuration is not only based on when the command noteOff happens,
    // -- but it also checks if sustain pedal was on or off, and awaits it off

    import { IMidiFile, noteEvent, MidiEventType, StaticMidiDataProps } from "../Utils/TypesForMidi";
    import { CreateMidiNoteEventsArray, getEmptyNoteEvent } from "../Utils/smallFunctions";

    const ConvertToNoteEventsJSON = (File: IMidiFile, microsecondsPerQuarterPR:number,StaticMidiFileDataPR:StaticMidiDataProps, tickTimePR:number):Array<noteEvent> =>{
        let microsecondsPerQuarter = microsecondsPerQuarterPR;
        let StaticMidiFileData = StaticMidiFileDataPR;
        let tickTime = tickTimePR
        let PianoArrayOfKeys = CreateMidiNoteEventsArray(88,21);
        let isPianoSustainOn = false;
        let waitingNotes:Array<noteEvent> = [];
        let finalNotes:Array<noteEvent> = [];
        let counter = 0;
        
        const SimulatePlaying = (ticksToNextEvent:number,EventIndex:Array<number>,ticksPassed:number,timePassed:number) =>{
            let newtimePassed = timePassed;
            let newIndexes = EventIndex;
            let newTicksToNextEvent = ticksToNextEvent;
            while(true){
            let endofTrack = false;
            while(true){
                let eventWasFound = false;
                // eslint-disable-next-line
                File.tracks.map((Track,index) =>{
                    try{
                        const Event = Track[newIndexes[index]] as MidiEventType;
                            if(Event.delta === newTicksToNextEvent){
                                newIndexes[index] += 1;
                                newTicksToNextEvent = 0;
                                counter+=1;
                                eventWasFound = true;
                                if('setTempo' in Event){
                                    microsecondsPerQuarter =  Event.setTempo.microsecondsPerQuarter;
                                    tickTime = microsecondsPerQuarter /  StaticMidiFileData.division;
                                }
                                if('endOfTrack' in Event){
                                    endofTrack = true;
                                }
                                //Here Are The Actuall inportant midi events for piano
                                if('noteOn' in Event){
                                    const ArrayIndex = Event.noteOn.noteNumber - 21;
                                    PianoArrayOfKeys[ArrayIndex].Delta = newtimePassed;
                                    PianoArrayOfKeys[ArrayIndex].Velocity = Event.noteOn.velocity;
                                }
                                if('noteOff' in Event){
                                    const ArrayIndex = Event.noteOff.noteNumber - 21;
                                    PianoArrayOfKeys[ArrayIndex].Duration = newtimePassed - PianoArrayOfKeys[ArrayIndex].Delta;
                                    if(!isPianoSustainOn){
                                        PianoArrayOfKeys[ArrayIndex].SoundDuration = PianoArrayOfKeys[ArrayIndex].Duration
                                        finalNotes.push(PianoArrayOfKeys[ArrayIndex]);
                                        PianoArrayOfKeys[ArrayIndex] = getEmptyNoteEvent(ArrayIndex + 21);
                                    }else{
                                        waitingNotes.push(PianoArrayOfKeys[ArrayIndex]);
                                        PianoArrayOfKeys[ArrayIndex] = getEmptyNoteEvent(ArrayIndex + 21);
                                    }
                                }
                                if('controlChange' in Event){
                                    switch(Event.controlChange.type){
                                        case 64:
                                            if(Event.controlChange.value <= 63){
                                                isPianoSustainOn = false;
                                                waitingNotes.map((element,index) =>{
                                                    waitingNotes[index].SoundDuration = newtimePassed - element.Delta;
                                                    return null;
                                                })
                                                waitingNotes.map(element =>{
                                                    finalNotes.push(element);
                                                    return null;
                                                })
                                                waitingNotes = [];
                                            }else{
                                                isPianoSustainOn = true;
                                            }
                                            break;
                                        case 123:
                                            break;
                                        case 121:
                                            break;
                                        default:
                                            break;
                                    }
                                }
                        }else{
                            newTicksToNextEvent = Event.delta;
                        }
                    }catch{
                        console.log("Couldn't read next Array Element, most probably here our Array Ended Wow !: " + newIndexes);
                        endofTrack = true;
                    }
                    return null;
                })
                if(!eventWasFound){break;}
            }
            newtimePassed = (newTicksToNextEvent * tickTime) + newtimePassed;   //Changing time passed
            if(endofTrack){
                break;  //breaking a while loop at the end of a file
            }
        }
            
        }
        SimulatePlaying(0,[0],0,0); //Curenttly, getNoteEventsJSON only supports one track MIDIs
        console.log(counter + ' Events has been detected of ' +  File.tracks[0].length + ' total');     //checking if every event was considered
        finalNotes.sort((a,b) => a.Delta - b.Delta);    //Sorting to make events in a chronological order
        return finalNotes;
    }

    export default ConvertToNoteEventsJSON;