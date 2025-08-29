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
    private pauseTime:number
    private progres:number
    private static tickSpeed = 25
    private pause_handler: (state:boolean) => void
    private move_handler: (ev:Array<TrackNoteEvent>, delta:number) => void
    private reset_handler: () => void

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
        this.pauseTime = 0
        this.isPlaying = false
        this.progres = 0
        this.animationFrame = null
        this.playMidi = this.playMidi.bind(this)
        this.isFinished = false;
        this.pause_handler = () => {}
        this.move_handler = () => {}
        this.reset_handler = () => {}
        this.playRandom = this.playRandom.bind(this);
        this.play_random_notes = this.play_random_notes.bind(this)
        this.restart()
    }
    
    /**
     * Method simulates clicking 'pause' in the Midi 
     * When the track is Paused, it starts playing, when it is playing, it pauses it...
     * @returns void
     */
    public pausePlay():void{
        if(this.isPlaying){
            window.cancelAnimationFrame(this.animationFrame)
            this.isPlaying = false
            this.progres = Date.now() * 1000 - this.timer - this.pauseTime
            this.pauseTime = Date.now() - this.pauseTime/1000
        }else{

            this.pauseTime = (Date.now() - this.pauseTime) * 1000
            console.log("starting")
            this.isPlaying = true
            this.playMidi()
        }
        this.pause_handler(this.isPlaying)
    }

    /**
     * Method pauses the playing, that is all id does
     * @returns void
     */
    public pause():void{
        if(this.isPlaying){
            this.pausePlay()
        }
    }

    /**
     * Method moves the current playing moment to certain time given by percent of the track
     * @param percent percent of the track
     */
    public moveTo(percent:number):void{
        if(percent <= 0){
            this.restart()
            this.pausePlay()
            return
        }
        this.isFinished = false
        if(this.isPlaying){
            this.timer = Date.now() * 1000 - (this.MidiLength * percent/100)
            const elapsed_time = Date.now() * 1000 - this.timer - this.pauseTime
            this.currentNotesIndex = 0;
            this.notes.map(note =>{
                if(note.Delta < elapsed_time){
                    this.currentNotesIndex += 1
                }
            })
            this.move_handler(this.notes,elapsed_time);
        }
        else{
            this.pauseTime = Date.now()
            this.timer = Date.now() * 1000 - (this.MidiLength * percent/100)
            const elapsed_time = Date.now() * 1000 - this.timer
            this.progres = elapsed_time
            this.currentNotesIndex = 0;
            this.notes.map(note =>{
                if(note.Delta < elapsed_time){
                    this.currentNotesIndex += 1
                }
            })
            this.move_handler(this.notes,elapsed_time);     
        }
    }

    /**
     * Method allows to set up functions which will execute when the player is paused or moved
     * @param pause_handler 
     * @param move_handler 
     */
    public set_pause_move_handlers(pause_handler:(state:boolean)=>void, move_handler:(ev:Array<TrackNoteEvent>,delta:number) => void, reset:()=>void){
        this.pause_handler = pause_handler
        this.move_handler = move_handler
        this.reset_handler = reset
    }



    /**
     * Method restarts the playing, resetting the timer
     */
    public restart(){
        this.pause()
        this.progres = 0;
        this.timer = Date.now() * 1000 //microseconds
        this.pauseTime = Date.now()
        this.currentNotesIndex = 0
        this.isFinished = false
        this.reset_handler()
    }

    /**
     * Method returns a length of midi in microseconds
     * @returns Length of Midi file in microseconds
     */
    public get MidiLength():number{
        return this.notes[this.notes.length -1].Delta;
    }

    /**
     * Method returns midi maximum velocity
     */
    public get MidiMaxVelocity():number{
        if(this.notes.length == 0)return 100000;
        let max_velocity = 0;
        this.notes.forEach(note =>{
            if(note.Velocity > max_velocity){
                max_velocity = note.Velocity;
            }
        })
        return max_velocity;
    }

    /**
     * Method calculates and returns the total length of midi playing, and current progress of playing
     * @returns Object with data about progress
     */
    public get Progress():{Current:number,Length:number}{
        let current = ((Date.now() * 1000 - this.timer - this.pauseTime) / 1000) < 0 ? this.progres / 1000 : ((Date.now() * 1000 - this.timer - this.pauseTime) / 1000)
        if(this.isFinished){
            current = this.notes[this.notes.length -1].Delta / 1000
        }
        return{
            Current: current,
            Length: this.notes[this.notes.length -1].Delta / 1000
        }
    }

    private playMidi(): void{
        const elapsed_time = Date.now() * 1000 - this.timer - this.pauseTime  //microseconds
        //now start from the current index of midi file
        const noteEvents:Array<TrackNoteEvent> = [];
        if(this.currentNotesIndex >= this.notes.length){
            window.cancelAnimationFrame(this.animationFrame)
            //this.pause()
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

    /**
     * Run this function before the component is deleted to assure no background asynchronous playing occurs
     * @returns 
     */
    public clear_player(): void{
        window.cancelAnimationFrame(this.animationFrame)
    }

    /**
     * This method plays the random notes within specified time interval
     */
    public play_random_notes(range:number = 12, time_interval: number = 1000){
        console.log(range)
        this.pauseTime = (Date.now() - this.pauseTime) * 1000;
        this.isPlaying = true;
        this.timer = Date.now();
        this.playRandom(range, time_interval);
        this.pause_handler(this.isPlaying)
    }

    /**
     * Method generates random notes, creates specifically for preview
     * This method uses the same variables as playMidi, therefore those methods cannot be used simultanouesly
     * The only usable other method with this is "AnimationFrameMidiPlayer::clear_player"
     * @param range range of maximum note number on the piano
     */
    private playRandom(range:number = 12, time_interval: number = 400): void{
        const elapsed_time = Date.now() - this.timer;
        if(elapsed_time >= time_interval){
            this.timer = Date.now();
            //Generate random events
            const note:TrackNoteEvent = {
                Delta: elapsed_time * 1000,
                Duration: Math.floor(Math.random() * 5) * 400000,
                NoteNumber: Math.floor(Math.random() * range) + 23,
                SoundDuration: 1,
                TrackNumber: 1,
                Velocity: 1
            }
            this.onEvent([note]);
        }
        this.animationFrame = window.requestAnimationFrame(() =>{this.playRandom(range)});
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