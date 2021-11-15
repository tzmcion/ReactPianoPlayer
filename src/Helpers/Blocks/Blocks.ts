import { blockNote,noteEvent } from "../../Utils/TypesForMidi"
import {Options} from '../../Utils/TypesForOptions'
import Effects from "../Effects/Effects";
import { RandomColorHex } from '../../Utils/smallFunctions';
import { CanvasRoundRect } from '../../Utils/CanvasFuntions';
import { KeyGradient } from "../CanvasEffects";


export default class Blocks{
    private ctx:CanvasRenderingContext2D
    private ctxEffects:CanvasRenderingContext2D
    private gradientCtx:CanvasRenderingContext2D
    private Width:number
    private Height:number
    private options: Options
    private BlackNumbers: Array<number>
    private intervalSpeed:number
    private Speed:number
    private KeysPositions: Array<any>
    private blocks:Array<blockNote>
    private Effects:Effects
    private requestToAdd:Array<noteEvent>
    private onBlocks:Function
    private positions_to_render_line:Array<number>

    public isInterval:boolean


    constructor(ctx:CanvasRenderingContext2D,ctxEffects:CanvasRenderingContext2D,gradientCtx:CanvasRenderingContext2D,width:number,height:number,options:Options,BlackNumbers:Array<number>,intervalSpeed:number,Speed:number,KeysPositions:Array<any>,onBlock:Function,default_arr?:Array<blockNote>){
        this.ctx=ctx;
        this.ctxEffects = ctxEffects
        this.gradientCtx = gradientCtx
        this.gradientCtx.globalCompositeOperation = 'lighter'
        this.Width=width;
        this.Effects = new Effects(ctxEffects,options,width,height);
        this.Height=height;
        this.options = options;
        this.BlackNumbers = BlackNumbers;
        this.intervalSpeed = intervalSpeed;
        this.Speed = Speed;
        this.KeysPositions = KeysPositions;
        this.blocks = default_arr ? default_arr : [];
        this.isInterval = false;
        this.onBlocks = onBlock;
        this.requestToAdd = [];
        this.positions_to_render_line = [];
        this.RenderOctaveLines();
        this.render = this.render.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.Paused = this.Paused.bind(this);
    }

    public add(Data:Array<noteEvent>):void{
        this.requestToAdd = Data;
    }

    public render():void{
        this.ctx.clearRect(0,0,this.Width,this.Height);
        this.gradientCtx.clearRect(0,this.Height-100,this.Width,this.Height + 100)
        this.Effects.renerEffects();
        this.options.OctaveLines && this.positions_to_render_line.map(position =>{
            this.ctx.beginPath();
            this.ctx.fillStyle = 'rgba(255,255,255,0.15)';
            this.ctx.fillRect(position,0,1,this.Height);
            return null;
        })
        this.handleAdd();
        let onblocks:Array<any> = [];
        let newBlocksToState:Array<blockNote> = [];
        const currentTime = Date.now();
        this.blocks.reverse().map(block =>{
                block.pos_y = this.Speed/20 * (currentTime - (block.creationTime + block.pauseTime!));
                block.playingTime = currentTime - (block.creationTime + block.pauseTime!);
                this.ctx!.shadowColor = block.color;
                this.ctx!.shadowBlur = 8;
                CanvasRoundRect(this.ctx!,block.color,block.pos_x,block.pos_y - block.height!,block.width,block.height!,this.options.blockRadius);
                if(block.pos_y - block.height! < this.Height){
                    newBlocksToState.push(block);
                    if(block.pos_y > this.Height && !block.wasDetected){
                        block.wasDetected = true;
                        onblocks.push(block);
                    }
                    if(block.pos_y > this.Height){
                        KeyGradient(this.gradientCtx!,block.pos_x,block.width,this.Height - 2,block.color);
                        this.options.IsEffects && this.Effects.triggerNewEffects(0,block.pos_x,block.width);
                    }
                }else{
                    block.wasDetected = false;
                    onblocks.push(block);
                }
                return null;
            })
        this.blocks = newBlocksToState;
        onblocks.length > 0 && this.onBlocks(onblocks);
    }

    public run():void{
        this.isInterval = true;
    }

    public get getBlocks():Array<blockNote>{
        return this.blocks
    }
 
    public Paused():void{
         this.Effects.renerEffects();
         let newB:Array<blockNote> = []
         this.blocks.map(e =>{
             e.pauseTime = Date.now() - e.creationTime - e.playingTime!;
             newB.push(e);
             return null;
         })
         this.blocks = newB;
    }
    public Reset():void{
         this.ctx.clearRect(0,0,this.Width,this.Height);
         this.blocks = [];
         this.Effects.clearAllEffects();
    }

    public Update(height:number,width:number,KeysPositions:Array<any>,ctx:CanvasRenderingContext2D):void{
        this.ctx.clearRect(0,0,this.Width,this.Height);
        this.Height = height;
        this.Width = width * 3;
        this.KeysPositions = KeysPositions;
        this.ctx = ctx;
        this.RedoAllBlocks();
        this.RenderOctaveLines();
    }

    private RedoAllBlocks(){
        let newBlocks:Array<blockNote> = [];
        this.blocks.map(block =>{
            block.pos_x = this.KeysPositions[block.NoteNumber - 21].position;
            block.height = block.duration / 1000 / (this.intervalSpeed / this.Speed)
            block.width = this.BlackNumbers.includes(block.NoteNumber) ? this.Width / 52 / 1.8 : this.Width / 52
            newBlocks.push(block);
            return null;
        })
        this.blocks = newBlocks;
    }
    

    private handleAdd():void{
        this.requestToAdd.length > 0 && this.requestToAdd.map(Event =>{
            const newBlock:blockNote = {
                color: this.options.RandomColors ? RandomColorHex() : this.options.Color,
                width: this.BlackNumbers.includes(Event.NoteNumber) ? this.Width / 52 / 1.8 : this.Width / 52,
                Velocity: Event.Velocity,
                NoteNumber: Event.NoteNumber,
                pos_x: this.KeysPositions[Event.NoteNumber - 21].position,
                pos_y: 0,
                height: Event.Duration / 1000 / (22 / this.Speed),
                wasDetected: false,
                duration:Event.Duration,
                creationTime: Date.now(),
                pauseTime:0,
                playingTime:0
            }
            this.blocks.push(newBlock);
            return null;
        })
        this.requestToAdd = [];
    }

    protected RenderOctaveLines(){
        for(let x = 3; x < 88; x++){
            if((x-3) % 12 === 0){
                this.positions_to_render_line.push(this.KeysPositions[x].position)
            }
            if((x-8) % 12 === 0){
                this.positions_to_render_line.push(this.KeysPositions[x].position)
            }

        }
    }
}