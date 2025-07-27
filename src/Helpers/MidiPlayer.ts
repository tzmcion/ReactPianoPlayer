import React from "react";
import  {IMidiFile, noteEvent} from "../Utils/TypesForMidi";

import ReadMidiFile from "./ReadMidiFile";
import getConstantDataFromMidiFile from "./getConstantDataFromMidiFile";
import ConvertToNoteEventsJSON from './getNoteEventsJSON';

/**
 * Class MidiPlayer handles the timing, order, and correctness of Midi file playing
 * It is eseentially a class which allowes to play and manipulate of the playing of midi file
 */
class MidiPlayer{
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
    public isMoved:boolean
    /**
     * 
     * @param fileInput MidiFiles object of Notes, should be a returned variable from function "ReadFromLocalStorageBase64" 
     * @param onEvent Function which will be executed when a midi event is detected
     * @param timeStamps TimeStamps defines how often the Player checks for new event to occure. It can be also named "precision", default, 25 precision means every 25ms the player checks for new midi events
     */
    constructor(fileInput: React.RefObject<HTMLInputElement> | ArrayBuffer | Array<noteEvent>, onEvent:Function ,timeStamps?:number){
        if('current' in fileInput){ //check if passed object is a react reference, or arraybuffer.
            this.file = fileInput.current?.files![0];
            this.fileType = 'ref'
        }
        else{
            this.file = fileInput;
            this.fileType = 'ArrayBuffer';
        }
        this.onEvent = onEvent; //Function wchich is executed when an event is detected during playing
        this.timeStamps = timeStamps ? timeStamps: 25;  //How often the player checks for new midi events (it works as interval)
        this.isPlaying = false;
        this.timer = 0;
        this.currentIndex = 0;
        this.isReseting = false;
        this.Midi = null;
        this.interval = null;
        this.isPaused = false;
        this.isMoved = false;
        this.convertToJSON = this.convertToJSON.bind(this);
        this.GetMidiAsObject = this.GetMidiAsObject.bind(this);
        this.simulateEvent = this.simulateEvent.bind(this);
    }

    /**
     * Static Method converts arrayBuffer to Array of NoteEvents.
     * It must be done before the start of playing, as this Class is capable only of reading noteEvents
     * @param file an ArrayBuffer --> IMidiFile
     * @returns a Promise of array with noteEvents
     */
    public static async NoteEvents_From_ArrayBuffer(file:IMidiFile):Promise<Array<noteEvent>>{
        const convertToJSON = async (MidiArr:IMidiFile) =>{ 
            return new Promise<Array<noteEvent>>(function(resolve){
                resolve(ConvertToNoteEventsJSON(MidiArr,500000,getConstantDataFromMidiFile(MidiArr)));
        })}
        return new Promise(resolve =>{
            ReadMidiFile(file,'ArrayBuffer').then(MidiObject =>{
                convertToJSON(MidiObject).then(response =>{
                    resolve(response);
                })
            })
        })
    }

    public async GetMidiAsObject(){
        if(this.file[0]){
        if('SoundDuration' in this.file[0]){
            this.Midi = this.file;
        }}
        else{
            ReadMidiFile(this.file,this.fileType).then(MidiObject =>{
                const MidiArr =  MidiObject as IMidiFile;
                this.convertToJSON(MidiArr).then(responde =>{
                    this.Midi = responde;
                })
            })
        }
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
            this.isMoved = false;
        }else{
        if(!this.interval){
            this.isPaused = false;
            this.Midi && this.PlayMidiAsync(this.Midi,this.onEvent);
            this.isMoved = false;
        }else{
            clearInterval(this.interval);
            this.interval = null;
            this.isPaused = true;
            this.isMoved = false;
        }
        }

    }

    public get_time():number{
        return this.timer;
    }

    public Restart():void{
        clearInterval(this.interval);
        this.isPlaying = false;
        this.isPaused = true;
        this.timer = 0;
        this.isReseting = true;
    }

    public MoveTo(percent:number):void{
        this.PausePlay();
        this.isMoved = true;
        if(this.Midi){
            if(this.Midi.length > 0){
                if(percent !== 0){
                const max_delta = this.Midi[this.Midi.length - 1].Delta / 1000 //in ms;
                const time = max_delta *(percent/100);
                let smallest_index_dif = 100000000;
                this.Midi.map((el,index) =>{
                    if(time - (el.Delta / 1000) < smallest_index_dif && time - (el.Delta / 1000) > 0){
                        smallest_index_dif = index
                    }
                    return null;
                })
                this.currentIndex = smallest_index_dif;
                this.timer = time;
                }else{
                    this.Restart();
                    this.PausePlay();
                }
            }
        }
    }

    public getBackwardsBlocks(deltaBack:number):{ time:number ,data:Array<noteEvent> }{
        const min_time = this.timer - deltaBack;
        const max_time = this.timer;
        const back_events:Array<noteEvent> = []; 
        if(this.Midi){
            this.Midi.map(event =>{
                if(event.Delta / 1000 > min_time && event.Delta / 1000 < max_time)
                {
                    back_events.push(event);
                }
                return null;
            })
        }
        back_events.sort((a,b) => a.Delta - b.Delta);
        return {
            time:this.timer,
            data:back_events
        }
    }

    private PlayMidiAsync = async (noteEventsJSON:Array<noteEvent>,onEvent:Function) =>{
        const PlayFromNotesAsync = async () =>{
            let Events:Array<noteEvent> = [];
            this.interval = setInterval(()=>{
                this.timer += this.timeStamps;
                while(true){
                    try{
                    if(noteEventsJSON[this.currentIndex].Delta / 1000 <= this.timer){
                        if(this.timer - noteEventsJSON[this.currentIndex].Delta / 1000 <= this.timeStamps )
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

