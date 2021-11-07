import { Options as OptionsType } from "../../Utils/TypesForOptions";
import {DancingLines} from '../CanvasEffects';

class Effects{
    private ctx:CanvasRenderingContext2D
    private options:OptionsType
    private width:number
    private height:number
    private Effect: {render:Function,create(pos_x:number,pos_y:number,color:string):void}

    constructor(ctx:CanvasRenderingContext2D,options:OptionsType,width:number,height:number){
        this.ctx = ctx;
        this.options = options;
        this.width = width;
        this.height = height;
        ctx.globalCompositeOperation = 'lighter';
        this.Effect = new DancingLines(ctx,height,width/52,110,1,4,8,false,false,true,0.05);
    }

    renerEffects():void{
        this.Effect.render();
    }

    triggerNewEffects(timer:number,pos_x:number,block_width:number):void{
        if(timer % Math.floor(100 /this.options.speed) === 0){
        for(let x = 0; x  <2; x++){
        this.Effect.create(pos_x,this.height,'rgba(200,150,100');
        }
    }
    }
}

export default Effects;