import { blockNote,noteEvent } from "../../Utils/TypesForMidi"
import {Options} from '../../Utils/TypesForOptions'
import Effects from "../Effects/Effects";
import { RandomColorHex } from '../../Utils/smallFunctions';
import { CanvasRoundRect } from '../../Utils/CanvasFuntions';
import { KeyGradient } from "../CanvasEffects";


/**
 * @deprecated Please use class updatedBlocks
 */
export default class Blocks{
    private ctx:CanvasRenderingContext2D
    private ctxEffects:CanvasRenderingContext2D
    private gradientCtx:CanvasRenderingContext2D
    private Width:number
    private Height:number
    private options: Options
    private BlackNumbers: Array<number>
    private Speed:number
    private KeysPositions: Array<any>
    private blocks:Array<blockNote>
    private Effects:Effects
    private requestToAdd:Array<noteEvent>
    private onBlocks:Function
    private gradientBg:CanvasGradient
    private positions_to_render_line:Array<number>
    private KeysWaiting: Array<{time:number,name:string}>
    private onKeyClick: Function
    private specialColor:string| null | undefined

    public isInterval:boolean

    /**
     * @deprecated please use updatedBlocks
     */
    constructor(ctx:CanvasRenderingContext2D,ctxEffects:CanvasRenderingContext2D,gradientCtx:CanvasRenderingContext2D,width:number,height:number,options:Options,BlackNumbers:Array<number>,intervalSpeed:number,Speed:number,KeysPositions:Array<any>,onBlock:Function,default_arr?:Array<blockNote>,onKeyClick?:Function,specialColor?:string){
        this.ctx=ctx;
        this.ctxEffects = ctxEffects
        this.gradientCtx = gradientCtx
        this.gradientCtx.globalCompositeOperation = 'source-over'
        this.Width=width;
        this.Effects = new Effects(ctxEffects,options,width,height);
        this.Height=height;
        this.options = options;
        this.BlackNumbers = BlackNumbers;
        this.Speed = Speed;
        this.KeysPositions = KeysPositions;
        this.blocks = default_arr ? default_arr : [];
        this.isInterval = false;
        this.onBlocks = onBlock;
        this.requestToAdd = [];
        this.positions_to_render_line = [];
        this.KeysWaiting = [];
        this.onKeyClick = onKeyClick ? onKeyClick : () =>{};
        this.specialColor = specialColor;
        this.RenderOctaveLines();
        this.render = this.render.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.Paused = this.Paused.bind(this);
        this.gradientBg = this.generateGradient();
    }

    public add(Data:Array<noteEvent>):void{
        this.requestToAdd = Data;
    }

    public render():void{
        if(this.ctx){
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
        let GameActiontaken = false;
        this.blocks.map(block =>{
                block.pos_y = this.Speed/20 * (currentTime - (block.creationTime + block.pauseTime!));
                block.playingTime = currentTime - (block.creationTime + block.pauseTime!);
                this.ctx!.shadowColor = this.options.ShadowColor;
                this.ctx!.shadowBlur = this.options.blockShadowRadius;
                let color = block.color;
                if(color[0] !== '#'){
                    color = '#' + block.color;
                }
                const renderColor = this.options.GradientBlocks ? this.gradientBg : color;
                CanvasRoundRect(this.ctx!,renderColor,block.pos_x,block.pos_y - block.height!,block.width,block.height!,this.options.blockRadius);
                if(block.pos_y - block.height! < this.Height){
                    newBlocksToState.push(block);
                    if(block.pos_y > this.Height){
                        if(this.specialColor){
                            if(block.color === this.specialColor){
                                if(this.KeysWaiting.length > 0 && block.detectTime && !block.timeWasTaken){
                                    const delta =Math.abs(block.detectTime -  this.KeysWaiting[0].time);
                                    this.onKeyClick(delta);
                                    GameActiontaken = true;
                                    block.timeWasTaken = true;
                                }
                            }
                        }
                    }
                    if(block.pos_y > this.Height && !block.wasDetected){
                        block.wasDetected = true;
                        block.detectTime = Date.now();
                        onblocks.push(block);
                }
                    if(block.pos_y > this.Height){
                        KeyGradient(this.gradientCtx!,block.pos_x,block.width,this.Height - 2,this.options.GradientColor !== 'auto' ? this.options.GradientColor : block.color);
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
        if(GameActiontaken){
            this.KeysWaiting = [];
        }
        }
        
    }

    public forcibly_add_blocks(data:{ time:number ,data:Array<noteEvent> }):void {
        let color = this.options.RandomColors ? RandomColorHex() : this.options.Color
        if(typeof this.specialColor == 'string'){
            if(Math.random() > 0.6){
                color = this.specialColor;
                console.log(color);
            }
        }
        let newBlocks:Array<blockNote> = [];
        data.data.map(el =>{
            const creation_time = Date.now() - (data.time -  (el.Delta / 1000));
            const newBlock:blockNote = {
                color: this.options.RandomColors ? color : this.BlackNumbers.includes(el.NoteNumber) ? this.options.ThinerBlockColor : this.options.Color,
                width: this.BlackNumbers.includes(el.NoteNumber) ? this.Width / 52 / 1.8 : this.Width / 52,
                Velocity: el.Velocity,
                NoteNumber: el.NoteNumber,
                pos_x: this.KeysPositions[el.NoteNumber - 21].position,
                pos_y: 0,
                height: el.Duration / 1000 / (22 / this.Speed),
                wasDetected: false,
                duration:el.Duration,
                creationTime: creation_time,
                pauseTime:0,
                playingTime:0,
                timeWasTaken:false
            }
            newBlocks.push(newBlock);
            return null;
        })
        this.blocks = newBlocks;
    }

    public run():void{
        this.isInterval = true;
    }

    public get getBlocks():Array<blockNote>{
        return this.blocks
    }

    public addKey(data:{name:string,time:number}){
        this.KeysWaiting.push(data);
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

    private generateGradient():CanvasGradient {
        const gradient = this.ctx.createLinearGradient(0,0, this.Width * Math.cos(90 / 180 * Math.PI),this.Height * Math.sin(90 / 180 * Math.PI));
        const step = 1 / this.options.GradientBlocksColor.length;
        let current_step = 0;
        console.log(this.options.GradientBlocksColor)
        this.options.GradientBlocksColor.forEach(color =>{gradient.addColorStop(current_step,color); current_step+=step});
        return gradient;
    }

    private handleAdd():void{
        if(this.requestToAdd.length > 0){
        let color = this.options.RandomColors ? RandomColorHex() : this.options.Color

        if(typeof this.specialColor == 'string'){
            if(Math.random() > 0.6){
                color = this.specialColor;
                console.log(color);
            }
        }
        this.requestToAdd.map(Event =>{
            const newBlock:blockNote = {
                color: this.options.RandomColors ? color : this.BlackNumbers.includes(Event.NoteNumber) ? this.options.ThinerBlockColor : this.options.Color,
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
                playingTime:0,
                timeWasTaken:false
            }
            this.blocks.push(newBlock);
            return null;
        })
        this.requestToAdd = [];
    }
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