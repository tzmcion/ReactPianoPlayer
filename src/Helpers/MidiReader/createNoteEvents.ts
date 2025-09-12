import { IMidiFile, TrackNoteEvent, UpdatedMidiEventType, timeSignatureDataProps } from "../../Utils/TypesForMidi";
import MidiToSingleTrack from './MidiToSingleTrack'

interface awaiting_event{
    note_number:number,
    delta_start:number,
    sustain_on_end:boolean
    velocity:number,    
    track_number:number,
    delta_end:number,   //duration
}

/**
 * Function Converts IMidiFile to NoteEvents array. It uses TrackNoteEvent, which states if the event occured on different track
 * Also, it converts all the tracks to one single track
 * LAST CHANGE: 28/07/2025
 * @param src_file source file
 * @param timeControl file with time controll
 * @param focus_track Optional parameter - as the tracks are merged, sometimes the noteEvent can occure for same note number. This parameter specifies the priority. first_event means unless noteOff event happens, all other events are ignored. end_last means the previous note will be ended.
 */
const CreateMidiNoteEventsArray = (src_file:IMidiFile, timeControl:timeSignatureDataProps, focus_type:"first_event" | "end_last" = "first_event"):Array<TrackNoteEvent> =>{
    let tickTime = 500000 / timeControl.division;   //Constant value, it's 500 ms per 1/4, but only for BMP=120 ! it should be defined in midiFile division will not change, mq_per_quarter probably will change
    const MidiTrack = MidiToSingleTrack(src_file).tracks[0]; //Convert any midi to single file, also creates a Deep Copy 
    const NoteEvents:Array<TrackNoteEvent> = [];
    let WaitingEvents:Array<awaiting_event> = [];
    let is_pedal_active = false;
    let time_passed = 0
    MidiTrack.forEach(event =>{ //Iterating over each event in the file
        const midiEvent = event as UpdatedMidiEventType;
        time_passed += midiEvent.delta * tickTime;
        if("setTempo" in midiEvent){
            //Tempo event
            tickTime = midiEvent.setTempo.microsecondsPerQuarter / timeControl.division;
        }
        if("noteOn" in midiEvent){
            //On event being noteOn, the note is added to "waitingEvents" array, and it wait there until noteOff event happens on the same key
            WaitingEvents.push({
                delta_start:time_passed,
                delta_end:-1,
                note_number:midiEvent.noteOn.noteNumber, //How you get the real note number
                sustain_on_end:false,
                track_number:midiEvent.trackNumber,
                velocity:midiEvent.noteOn.velocity,
            })
        }
        if("noteOff" in midiEvent){
            //on NoteOff event the note is found in waitingEvents array, and it's length etc. is calucalted.
            //If sustain is on, note is kept in array until pedal is off, to calculate duration of the sound
            const waiting_event = WaitingEvents.find(el => el.note_number === (midiEvent.noteOff.noteNumber) && el.sustain_on_end === false)    //Finding el.sustain_on_end === false took me 9 hours...
            if(waiting_event === undefined){
                throw new Error("Error during parsing of MIDI file --> found noteOff event without previous noteOn event !!!")
            }
            const index = WaitingEvents.indexOf(waiting_event)
            if(is_pedal_active){
                WaitingEvents[index].delta_end = time_passed - waiting_event.delta_start
                WaitingEvents[index].sustain_on_end = true
            }else{
                WaitingEvents.splice(index,1)
                NoteEvents.push({
                    Delta:waiting_event.delta_start,
                    Duration:time_passed - waiting_event.delta_start,
                    NoteNumber:waiting_event.note_number,
                    SoundDuration:time_passed - waiting_event.delta_start,
                    TrackNumber:waiting_event.track_number,
                    Velocity:waiting_event.velocity
                })
            }
        }
        if("controlChange" in midiEvent){
            if(midiEvent.controlChange.type === 64){    //Sustain Event, otherwise not important
                if(midiEvent.controlChange.value > 63){
                    is_pedal_active = true;
                }
                else{
                    is_pedal_active = false;
                    const new_waiting_events:Array<awaiting_event> = [];
                    WaitingEvents.forEach(ev =>{
                        if(ev.delta_end != -1 && ev.sustain_on_end === true){
                            //These events will now end, as sustain pedal is of
                            NoteEvents.push({
                                Delta:ev.delta_start,
                                Duration:ev.delta_end,
                                NoteNumber:ev.note_number,
                                SoundDuration:time_passed - ev.delta_start,
                                TrackNumber:ev.track_number,
                                Velocity:ev.velocity
                            })
                        }else{
                            new_waiting_events.push(ev);
                        }
                    })
                    WaitingEvents = new_waiting_events;
                }
            }
        }
    });
    NoteEvents.sort((a,b) => a.Delta - b.Delta);
    return NoteEvents;
}

export default CreateMidiNoteEventsArray;
