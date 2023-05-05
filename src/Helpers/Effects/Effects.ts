import { Options as OptionsType } from "../../Utils/TypesForOptions";
import {Fountain, DancingLines, HexagonEffect, StickyBalls, Firework,Sparks} from '../CanvasEffects';

import hexAlpha from "hex-alpha";

class Effects{
    private ctx:CanvasRenderingContext2D
    private options:OptionsType
    private width:number
    private height:number
    private Effect: {render:Function,create(pos_x:number,pos_y:number,color:string):void,clear:Function}

    constructor(ctx:CanvasRenderingContext2D,options:OptionsType,width:number,height:number){
        this.ctx = ctx;
        this.options = options;
        this.width = width;
        this.height = height;
        switch(options.Effect){
            case 'fountain':
                this.Effect = new Fountain(ctx,width,height,width/52);
                break;
            case 'dancingLines':
                this.Effect = new DancingLines(ctx,height,width/52,200,1,6,10);
                break;
            case 'hexagon':
                this.Effect = new HexagonEffect(ctx,width,height,width/52);
                break;
            case 'stickyBalls':
                this.Effect = new StickyBalls(ctx,width,height,width/52);
                break;
            case 'fireworks':
                this.Effect = new Firework(ctx,width,height,width/52);
                break;
            case 'sparks':
                this.Effect = new Sparks(ctx,width,height,width/52);
                break;
            default:
                this.Effect = new Fountain(ctx,width,height,width/52);
                break;
        }
    }

    public renerEffects():void{
        this.options.IsEffects && this.Effect.render();
    }

    public triggerNewEffects(timer:number,pos_x:number,block_width:number):void{
        
            let color:string;
            if(this.options.EffectsBlockColor){
                color = hexAlpha(this.options.Color,100)
            }else if(this.options.EffectsKeyColor){
                color = hexAlpha(this.options.KeyPressColor,100)
            }else if(this.options.randomEffectColors){
                color = `rgba(${Math.random() * 255},${Math.random()*255},${Math.random()*255}`;
            }else{
                color = this.options.EffectsColor;
            }
            this.Effect.create(pos_x,this.height,color);
    }

    public clearAllEffects():void{
        this.Effect.clear();
        //a
    }

    
}

export default Effects;