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

    public isInterval:boolean


    constructor(ctx:CanvasRenderingContext2D,ctxEffects:CanvasRenderingContext2D,width:number,height:number,options:Options,BlackNumbers:Array<number>,intervalSpeed:number,Speed:number,KeysPositions:Array<any>,sound:any,k?:Function){
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
        this.isInterval = false;
        this.render = this.render.bind(this);
    }

    public add(Data:Array<noteEvent>):void{
        Data && Data.map(Event =>{
            const newBlock:blockNote = {
                color: this.options.RandomColors ? RandomColorRGBwithMin(200,200,200) : this.options.Color,
                width: this.BlackNumbers.includes(Event.NoteNumber) ? this.Width / 52 / 1.8 : this.Width / 52,
                Velocity: Event.Velocity,
                NoteNumber: Event.NoteNumber,
                pos_x: this.KeysPositions[Event.NoteNumber - 21].position,
                pos_y: 0,
                height: Event.Duration / 1000 / (this.intervalSpeed / this.Speed),
                wasDetected: false,
                duration:Event.Duration
            }
            this.blocks.push(newBlock);
            return null;
        })
    }

    public render():void{
        this.Effects.renerEffects();
        let newBlocksToState:Array<blockNote> = [];
        this.ctx.clearRect(0,0,this.Width,this.Height);
        this.blocks.reverse().map(block =>{
                block.pos_y += this.Speed;
                this.ctx!.shadowColor = block.color;
                this.ctx!.shadowBlur = 8;
                CanvasRoundRect(this.ctx!,block.color,block.pos_x,block.pos_y - block.height!,block.width,block.height!,5);
                if(block.pos_y - block.height! < this.Height - this.Height/5){
                    newBlocksToState.push(block);
                    if(block.pos_y > this.Height - this.Height/5 && !block.wasDetected){
                        block.wasDetected = true;
                        document.getElementById(block.NoteNumber.toString())?.classList.add('red');
                        this.sound && this.sound.instrument.play(block.NoteNumber).stop(this.sound.ac.currentTime + block.duration /1000);
                    }
                    if(block.pos_y > this.Height - this.Height/5){
                        KeyGradient(this.ctx!,block.pos_x,block.width,this.Height - this.Height/5);
                        this.options.IsEffects && this.Effects.triggerNewEffects(0,block.pos_x,block.width);
                    }
                }else{
                    document.getElementById(block.NoteNumber.toString())?.classList.remove('red');
                }
                return null;
            })
        this.blocks = newBlocksToState;
    }

    public run():void{
       this.isInterval = true;
    }
}