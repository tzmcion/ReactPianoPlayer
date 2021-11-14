import { Options as OptionsType } from "../../Utils/TypesForOptions";
import {Fountain, DancingLines} from '../CanvasEffects';

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
                this.Effect = new DancingLines(ctx,height,width/52,100,1,5);
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
        if(timer % Math.floor(100 /this.options.speed) === 0){
            const color = hexAlpha(this.options.KeyPressColor,100).substring(0,hexAlpha(this.options.KeyPressColor,100).length - 3)
            this.Effect.create(pos_x,this.height,color);
    }}

    public clearAllEffects():void{
        this.Effect.clear();
        this.Effect.render();
        //a
    }

    
}

export default Effects;