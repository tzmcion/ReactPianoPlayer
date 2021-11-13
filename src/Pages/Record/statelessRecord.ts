import { noteEvent } from "../../Utils/TypesForMidi";
import { SaveAsBase64 } from '../../Utils/smallFunctions';
import { DefaultOptions } from '../../Utils/Default';

interface singleNote{
    ison:boolean,
    timeStart:number
}

export default class statelessRecord{
    private eventList:Array<noteEvent>
    private notesOn:Array<singleNote>
    private startTime:number
    private isRecording:boolean
    constructor(){
        this.eventList = [];
        this.notesOn = [];
        for(let x = 0; x < 108; x++){
            this.notesOn.push({ison:false,timeStart:0})
        }
        this.startTime = 0;
        this.isRecording = false;
        this.add = this.add.bind(this);
        this.startStop = this.startStop.bind(this);
    }

    public add(command:number,noteNumber:number,velocity:number):noteEvent | void{
        if(this.isRecording){
            if(this.notesOn[noteNumber].ison === false){
                this.notesOn[noteNumber].ison = true;
                this.notesOn[noteNumber].timeStart = Date.now();
            }
            else{
                this.notesOn[noteNumber].ison = false;
                const now = Date.now();
                const delta = this.notesOn[noteNumber].timeStart - this.startTime;
                const duration = now - this.notesOn[noteNumber].timeStart;
                console.log(delta + '    ' + duration);
                const event:noteEvent = {
                    NoteNumber:noteNumber,
                    Delta:delta * 1000,
                    SoundDuration: duration * 1000,
                    Duration:duration * 1000,
                    Velocity:100
                }
                this.eventList = [...this.eventList,event];
            }
        }
    }

    public startStop(events:Array<noteEvent>):void{
        this.startTime = Date.now();
        this.isRecording = !this.isRecording;
        console.log(this.eventList);
        this.eventList.length > 0 && localStorage.setItem('options',JSON.stringify(DefaultOptions));
        this.eventList.length > 0 && SaveAsBase64(this.eventList.sort((a,b)=> a.Delta - b.Delta),'fileJson',true).then(e =>{
            console.log('file saved to localStorage !')
        });
    }

    public reset():void{
        this.eventList = [];
    }

    public get list():Array<any>{
        return this.eventList;
    } 
}