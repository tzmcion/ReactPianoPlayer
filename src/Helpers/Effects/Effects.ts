import { Options as OptionsType } from "../../Utils/TypesForOptions";
import {Fountain} from '../CanvasEffects';

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
        this.Effect = new Fountain(ctx,width,height,width/52);
    }

    public renerEffects():void{
        this.Effect.render();
    }

    public triggerNewEffects(timer:number,pos_x:number,block_width:number):void{
        if(timer % Math.floor(100 /this.options.speed) === 0){
            this.Effect.create(pos_x,this.height,'rgba(200,150,100');
    }}

    public clearAllEffects():void{
        this.Effect.clear();
    }

    
}

export default Effects;