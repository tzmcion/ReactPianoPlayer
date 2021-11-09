import { blockNote,noteEvent } from "../../Utils/TypesForMidi"
import {Options} from '../../Utils/TypesForOptions'
import Effects from "../Effects/Effects";
import { RandomColorRGBwithMin } from '../../Utils/smallFunctions';
import { CanvasRoundRect } from '../../Utils/CanvasFuntions';
import { KeyGradient } from "../CanvasEffects";

export default class Blocks{
    private ctx:CanvasRenderingContext2D
    private Width:number
    private Height:number
    private options: Options
    private BlackNumbers: Array<number>
    private intervalSpeed:number
    private Speed:number
    private sound:any
    private KeysPositions: Array<any>
    private blocks:Array<blockNote>
    private Effects:Effects
    private requestToAdd:Array<noteEvent>
    private onBlocks:Function
    private onetimesub:boolean
    public paused:boolean
    private restarting:boolean

    public isInterval:boolean


    constructor(ctx:CanvasRenderingContext2D,ctxEffects:CanvasRenderingContext2D,width:number,height:number,options:Options,BlackNumbers:Array<number>,intervalSpeed:number,Speed:number,KeysPositions:Array<any>,sound:any,onBlock:Function){
        this.ctx=ctx;
        this.Width=width;
        this.Effects = new Effects(ctxEffects,options,width,height);
        this.Height=height;
        this.sound = sound
        this.options = options;
        this.BlackNumbers = BlackNumbers;
        this.intervalSpeed = intervalSpeed;
        this.Speed = Speed;
        this.KeysPositions = KeysPositions;
        this.blocks = [];
        this.onetimesub = false;
        this.isInterval = false;
        this.onBlocks = onBlock;
        this.requestToAdd = [];
        this.paused = false;
        this.restarting = false;
        this.render = this.render.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    public add(Data:Array<noteEvent>):void{
        this.requestToAdd = Data;
    }

    public get isPaused():boolean{
        return this.paused
    }

    public render():void{
        if(!this.paused){
        this.Effects.renerEffects();
        this.ctx.clearRect(0,0,this.Width,this.Height);
        this.handleAdd();
        let onblocks:Array<any> = [];
        let newBlocksToState:Array<blockNote> = [];
        const currentTime = Date.now();
        this.blocks.reverse().map(block =>{
                block.pos_y = this.Speed/20 * (currentTime -  block.creationTime);
                this.ctx!.shadowColor = block.color;
                this.ctx!.shadowBlur = 8;
                CanvasRoundRect(this.ctx!,block.color,block.pos_x,block.pos_y - block.height!,block.width,block.height!,5);
                if(block.pos_y - block.height! < this.Height){
                    newBlocksToState.push(block);
                    if(block.pos_y > this.Height && !block.wasDetected){
                        block.wasDetected = true;
                        onblocks.push(block);
                    }
                    if(block.pos_y > this.Height){
                        KeyGradient(this.ctx!,block.pos_x,block.width,this.Height);
                        this.options.IsEffects && this.Effects.triggerNewEffects(0,block.pos_x,block.width);
                    }
                }else{
                    block.wasDetected = false;
                    onblocks.push(block);
                }
                return null;
            })
        this.blocks = newBlocksToState;
        this.onetimesub = true;
        onblocks.length > 0 && this.onBlocks(onblocks);
        
        }else{
            let newBlocksToState:Array<blockNote> = [];
            const ct = Date.now();
            this.blocks.map(block =>{
                if(this.onetimesub){
                    block.creationTime -= block.pos_y / (this.Speed/20)
                }
                block.creationTime += ct - block.creationTime;  
                newBlocksToState.push(block);
            })
            this.blocks = newBlocksToState;
            this.onetimesub = false;
        }
    }

    private handleAdd():void{
        this.requestToAdd.length > 0 && this.requestToAdd.map(Event =>{
            const newBlock:blockNote = {
                color: this.options.RandomColors ? RandomColorRGBwithMin(200,200,200) : this.options.Color,
                width: this.BlackNumbers.includes(Event.NoteNumber) ? this.Width / 52 / 1.8 : this.Width / 52,
                Velocity: Event.Velocity,
                NoteNumber: Event.NoteNumber,
                pos_x: this.KeysPositions[Event.NoteNumber - 21].position,
                pos_y: 0,
                height: Event.Duration / 1000 / (this.intervalSpeed / this.Speed),
                wasDetected: false,
                duration:Event.Duration,
                creationTime: Date.now()
            }
            this.blocks.push(newBlock);
            return null;
        })
        this.requestToAdd = [];
    }

    public run():void{
       this.isInterval = true;
    }

    public setPauseRestart(isPaused:boolean,isRestarting:boolean):void{
        this.paused = isPaused;
        this.restarting = isRestarting
    }
}