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

    const ConvertToNoteEventsJSON = (File: IMidiFile, microsecondsPerQuarterPR:number,StaticMidiFileDataPR:StaticMidiDataProps):Array<noteEvent> =>{
        let microsecondsPerQuarter = microsecondsPerQuarterPR;
        let StaticMidiFileData = StaticMidiFileDataPR;
        let tickTime = microsecondsPerQuarter /  StaticMidiFileData.division;
        let PianoArrayOfKeys = CreateMidiNoteEventsArray(88,21);
        let isPianoSustainOn = false;
        let waitingNotes:Array<noteEvent> = [];
        let finalNotes:Array<noteEvent> = [];
        
        const SimulatePlaying = (ticksToNextEvent:Array<number>,EventIndex:Array<number>,timePassed:number) =>{
            let newtimePassed = timePassed;
            let newIndexes = EventIndex;
            let newTicksToNextEvent = ticksToNextEvent;
            let smallestDelta: Array<number> = [];
            while(true){
                let endofTrack = false;
            while(true){
                let eventWasFound = false;
                // eslint-disable-next-line
                File.tracks.map((Track,index) =>{
                    try{
                        const Event = Track[newIndexes[index]] as MidiEventType;
                            if(Event.delta === newTicksToNextEvent[index]){
                                newIndexes[index] += 1;
                                newTicksToNextEvent[index] = 0;
                                eventWasFound = true;
                                if('setTempo' in Event){    //changing tickTime if
                                    microsecondsPerQuarter =  Event.setTempo.microsecondsPerQuarter;
                                    tickTime = microsecondsPerQuarter /  StaticMidiFileData.division;
                                }
                                if('endOfTrack' in Event){
                                    //endofTrack = true;
                                }
                                if('noteOn' in Event){  //NoteOn begins A note 
                                    const ArrayIndex = Event.noteOn.noteNumber - 21; //number of note
                                    PianoArrayOfKeys[ArrayIndex].Delta = Math.floor(newtimePassed); //when it starts
                                    PianoArrayOfKeys[ArrayIndex].Velocity = Event.noteOn.velocity;  //velocity is volume
                                }
                                if('noteOff' in Event){ //boteOff ends a Note
                                    const ArrayIndex = Event.noteOff.noteNumber - 21;   //number of note
                                    PianoArrayOfKeys[ArrayIndex].Duration = Math.floor(newtimePassed - PianoArrayOfKeys[ArrayIndex].Delta); //Note Duration
                                    if(!isPianoSustainOn || ('endOfTrack' in (Track[newIndexes[index]] as MidiEventType))){  //Sound Duration if Pedal Sustain is  ton on
                                        PianoArrayOfKeys[ArrayIndex].SoundDuration = Math.floor(PianoArrayOfKeys[ArrayIndex].Duration)  //then sound duration is note duration
                                        const Element = PianoArrayOfKeys[ArrayIndex];
                                        if(Element.Velocity && Element.Delta >= 0){
                                        finalNotes.push(Element);  //pushing to final notes
                                        }
                                        PianoArrayOfKeys[ArrayIndex] = getEmptyNoteEvent(ArrayIndex + 21);  //clearing arrayOfNotes
                                    }else{  //if it's on it's just pushed to waiting notes, they wait for pedal off
                                        waitingNotes.push(PianoArrayOfKeys[ArrayIndex]);
                                        PianoArrayOfKeys[ArrayIndex] = getEmptyNoteEvent(ArrayIndex + 21);  //clearing arrayOfNotes
                                    }
                                }
                                if('controlChange' in Event){
                                    switch(Event.controlChange.type){
                                        case 64:    //Sustain Pedal 
                                            if(Event.controlChange.value <= 63){
                                                isPianoSustainOn = false;   //sustain pedal is off
                                                waitingNotes.map((element,index) =>{    //waiting notes are given SoundDuration here
                                                    waitingNotes[index].SoundDuration = Math.floor(newtimePassed - element.Delta);
                                                    return null;
                                                })
                                                waitingNotes.map(element =>{    //waiting notes are pushed to final notes NOTE--They are not sorted yet
                                                    if(element.Velocity && element.Delta >= 0){
                                                    finalNotes.push(element);   
                                                    }
                                                    return null;
                                                })
                                                waitingNotes = []; 
                                            }else{
                                                isPianoSustainOn = true;
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                }
                        }else{
                            smallestDelta.push(Event.delta - newTicksToNextEvent[index]);
                        }
                    }catch{
                        let AllTracksFinished = true;
                        File.tracks.map((Track,index) =>{
                            if(Track.length > newIndexes[index])
                            AllTracksFinished = false;
                            return null;
                        })
                        endofTrack = AllTracksFinished ? true : false;
                    }
                    return null;    //returning for eslint
                })
                if(!eventWasFound){break;}  //if event was not found, breaking the loop of delta = 0
            }
            if(smallestDelta.length > 0){
            let DeltaToWait = smallestDelta.reduce((a,b)=> Math.min(a,b));
            newTicksToNextEvent.map((element,index) =>{
                newTicksToNextEvent[index] += DeltaToWait;
                return null;
            })
            smallestDelta = [];
            
            newtimePassed = (DeltaToWait * tickTime) + newtimePassed;  //Changing time passed
            }
            if(endofTrack){
                break;  //breaking a while loop at the end of a file
            }
        }
            
        }
        let Array_of_A = [],Array_of_B = [];
        for(let x = 0; x < File.tracks.length; x++){
            Array_of_A.push(0);
            Array_of_B.push(0);
        }
        SimulatePlaying(Array_of_A,Array_of_B,0); //Curenttly, getNoteEventsJSON only supports one track MIDIs
        finalNotes.sort((a,b) => a.Delta - b.Delta);    //Sorting to make events in a chronological order
        return finalNotes;
    }

    export default ConvertToNoteEventsJSON;