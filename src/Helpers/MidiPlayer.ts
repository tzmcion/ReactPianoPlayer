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
    private fileType: 'ref' | 'ArrayBuffer'
    private onEvent: Function
    private currentIndex:number
    public isPaused: boolean
    public timer:number
    public isPlaying:boolean
    public isReseting:boolean
    //Constructor
    constructor(fileInput: React.RefObject<HTMLInputElement> | ArrayBuffer, onEvent:Function ,timeStamps?:number){
        if('current' in fileInput){
            this.file = fileInput.current?.files![0];
            this.fileType = 'ref'
        }
        else{
            this.file = fileInput;
            this.fileType = 'ArrayBuffer';
        }
        this.onEvent = onEvent;
        this.timeStamps = timeStamps ? timeStamps: 25;
        this.isPlaying = false;
        this.timer = 0;
        this.currentIndex = 0;
        this.isReseting = false;
        this.Midi = null;
        this.interval = null;
        this.isPaused = false;
        this.convertToJSON = this.convertToJSON.bind(this);
        this.GetMidiAsObject = this.GetMidiAsObject.bind(this);
        this.simulateEvent = this.simulateEvent.bind(this);
    }

    public async GetMidiAsObject(){
        ReadMidiFile(this.file,this.fileType).then(MidiObject =>{
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

    private simulateEvent(x:number):void{
        this.onEvent([{
            Delta: 1200000,
            Duration: 150000,
            NoteNumber: x,
            SoundDuration: 4200000,
            Velocity: 100
        }])
    }

    public generateRandomNotes(){
        for(let x = 21; x < 109; x++){
            setTimeout(()=>{
                this.simulateEvent(x);
            },(x-21)*25)
        }
    }

    public PausePlay():void{
        if(!this.isPlaying){
            this.isReseting = false;
            this.isPlaying = true;
            this.isPaused = false;
            this.interval = null;
            this.timer = 0;
            this.currentIndex = 0;
            this.Midi && this.PlayMidiAsync(this.Midi,this.onEvent);
        }else{
        if(!this.interval){
            this.isPaused = false;
            this.Midi && this.PlayMidiAsync(this.Midi,this.onEvent);
        }else{
            clearInterval(this.interval);
            this.interval = null;
            this.isPaused = true;
        }
        }

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
            let Events:Array<noteEvent> = [];
            this.interval = setInterval(()=>{
                this.timer += this.timeStamps;
                while(true){
                    try{
                    if(noteEventsJSON[this.currentIndex].Delta / 1000 <= this.timer){
                        Events.push(noteEventsJSON[this.currentIndex]);
                        this.currentIndex+=1
                    }else{
                        Events.length > 0 && onEvent(Events);
                        Events = [];
                        break;
                    }
                    }catch{
                        clearInterval(this.interval);
                        onEvent(Events);
                        break;
                    }
                
            }
            },this.timeStamps);
    }
    PlayFromNotesAsync();
}
}

export default MidiPlayer;

