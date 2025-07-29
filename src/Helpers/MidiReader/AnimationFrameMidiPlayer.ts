/**
 * Class Created during new version update for AVANT as replacement for /src/Helpers/MidiPlayer
 * Last Update: 07/28/2025
 * Key new differences
 * - Now midi is played using window.requestAnimationFrame, not with interval (as interval can lag often)
 * - Now argument required is array of TrackNoteEvents, so the whole Midi processing and loading process must be done before Player object is created
 *      It facilitates the loadingScreen problem/bug
 * - Other functionalities should be preserved as in the obesolete class MidiPlayer
 */

import { IMidiFile, TrackNoteEvent } from "../../Utils/TypesForMidi";

/**
 * Class consists of Methods which work with Blocks file (/src/Helpers/Blocks/Blocks.ts)
 * It has a set of functions which regulate what is going on with playing.
 * the blocks class/object works with them to handle itself
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
    constructor(src_notes:TrackNoteEvent[], onEvent: (ev:any) => any){
        this.notes = src_notes
        this.onEvent = onEvent
        this.timer = 0
        this.currentNotesIndex = 0
        this.isPlaying = false
        this.animationFrame = null
        this.playMidi = this.playMidi.bind(this)
        this.isFinished = false;
        this.restart()
    }
    
    /**
     * Method simulates clicking 'pause' in the Midi 
     * 
     */
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

    /**
     * Method restarts the playing, resetting the timer
     */
    public restart(){
        this.timer = Date.now() * 1000 //microseconds
    }

    /**
     * Method returns a length of midi in microseconds
     * @returns Length of Midi file in microseconds
     */
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