import { IMidiFile, TrackNoteEvent } from "../../Utils/TypesForMidi";
import createNoteEvents from "../../Helpers/MidiReader/createNoteEvents"
import timeControl from "../../Helpers/MidiReader/timeSignatureValuesFromMidiFile"

/**
 * Description of class
 */
class AnimationFrameMidiPlayer{
    private notes:Array<TrackNoteEvent>
    private timer:number //In other words, time when playing started
    private onEvent: (ev:any) => any
    private animationFrame:any
    private currentNotesIndex:number
    private isFinished:boolean
    private static tickSpeed = 25

    public isPlaying:boolean


    /**
     * Description of constructor
     * @param file 
     * @param onEvent 
     */
    constructor(file:IMidiFile, onEvent: (ev:any) => any){
        this.notes = createNoteEvents(file,timeControl(file),"first_event")
        this.onEvent = onEvent
        this.timer = 0
        this.currentNotesIndex = 0
        this.isPlaying = false
        this.animationFrame = null
        this.playMidi = this.playMidi.bind(this)
        this.isFinished = false;
        this.restart()
    }
    
    public pausePlay(){
        if(this.isPlaying){
            window.cancelAnimationFrame(this.animationFrame)
        }else{
            console.log("starting")
            this.playMidi()
        }
    }

    public moveTo(){

    }

    public restart(){
        this.timer = Date.now() * 1000 //microseconds
    }

    public get MidiLength():number{
        return this.notes[this.notes.length -1].Delta;
    }

    private playMidi(): void{
        const elapsed_time = Date.now() * 1000 - this.timer //microseconds
        //now start from the current index of midi file
        const noteEvents:Array<TrackNoteEvent> = [];
        if(this.currentNotesIndex >= this.notes.length){
            window.cancelAnimationFrame(this.animationFrame)
            this.isFinished = true
            return
        }
        while(this.currentNotesIndex < this.notes.length && this.notes[this.currentNotesIndex].Delta <= elapsed_time){
            noteEvents.push(this.notes[this.currentNotesIndex++])
        }
        if(noteEvents.length > 0){
            this.onEvent(noteEvents)
        }
        //Check if from the start time till now there are any new events
        this.animationFrame = window.requestAnimationFrame(this.playMidi)
    }

    public async __for_testing():Promise<boolean>{
        return new Promise((res,ret) =>{
            setInterval(()=>{
                if(this.isFinished){
                    res(true)
                }
            },100)
        })
    }  

};

export default AnimationFrameMidiPlayer;