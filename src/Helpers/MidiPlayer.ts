import React from "react";
import  {IMidiFile, noteEvent} from "../Utils/TypesForMidi";

import ReadMidiFile from "./ReadMidiFile";
import getConstantDataFromMidiFile from "./getConstantDataFromMidiFile";
import ConvertToNoteEventsJSON from './getNoteEventsJSON';


class MidiPlayer{
    //Typescript Declarations
    private file: any
    private Midi: Array<noteEvent> | null
    private interval:any
    private timeStamps:number
    public isPaused: boolean
    public timer:number
    public isPlaying:boolean
    public isReseting:boolean
    //Constructor
    constructor(fileRef: React.RefObject<HTMLInputElement>,timeStamps?:number){
        this.file = fileRef.current?.files![0];
        this.timeStamps = timeStamps ? timeStamps: 25;
        this.isPlaying = false;
        this.timer = 0;
        this.isReseting = false;
        this.Midi = null;
        this.interval = null;
        this.isPaused = false;
        this.convertToJSON = this.convertToJSON.bind(this);
        this.GetMidiAsObject = this.GetMidiAsObject.bind(this);
    }

    public async GetMidiAsObject(){
        ReadMidiFile(this.file).then(MidiObject =>{
            const MidiArr =  MidiObject as IMidiFile;
            this.convertToJSON(MidiArr).then(responde =>{
                this.Midi = responde;
            })
        })
    }

    private convertToJSON = async (MidiArr:IMidiFile) =>{ 
        return new Promise<Array<noteEvent>>(function(resolve){
            resolve(ConvertToNoteEventsJSON(MidiArr,500000,getConstantDataFromMidiFile(MidiArr)));
    })}

    public get isReady():boolean{
        if(this.Midi){
        if('Duration' in this.Midi[0] ){
            return true;
        }}
        return false;
    }

    public get MidiLength():number{
        if(this.Midi){
            if('Duration' in this.Midi[0] ){
                return this.Midi[this.Midi.length-1].Delta / 1000;
            }
        }
        return 1;
    }

    public Play(onEvent:Function):void{
        this.isReseting = false;
        this.isPlaying = true;
        this.isPaused = false;
        this.interval = null;
        this.timer = 0;
        this.Midi && this.PlayMidiAsync(this.Midi,onEvent);
    }

    public PausePlay():void{
        this.isPaused = !this.isPaused;
    }

    public Restart():void{
        clearInterval(this.interval);
        this.isPlaying = false;
        this.isPaused = true;
        this.timer = 0;
        this.isReseting = true;
    }

    private PlayMidiAsync = async (noteEventsJSON:Array<noteEvent>,onEvent:Function) =>{
        const PlayFromNotesAsync = async () =>{
            let currentIndex = 0;
            let Events:Array<noteEvent> = [];
            this.interval = setInterval(()=>{
                if(!this.isPaused){
                this.timer += this.timeStamps;
                while(true){
                    try{
                    if(noteEventsJSON[currentIndex].Delta / 1000 <= this.timer){
                        Events.push(noteEventsJSON[currentIndex]);
                        currentIndex+=1
                    }else{
                        onEvent(Events);
                        Events = [];
                        break;
                    }
                    }catch{
                        clearInterval(this.interval);
                        onEvent(Events);
                        break;
                    }
                }
            }
            },this.timeStamps);
    }
    PlayFromNotesAsync();
}
}

export default MidiPlayer;

