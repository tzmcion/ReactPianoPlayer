import BasicGradient from "./KeyGradientEffects/BasicGradient";
import GradientEffect from "./KeyGradientEffects/GradientEffect";
import {Options as OptionsType} from "../../Utils/TypesForOptions";

export default class GradientManager{
    private grad:GradientEffect

    constructor(ctx: CanvasRenderingContext2D, pos_y: number, options:OptionsType, size:number){
        this.grad = new BasicGradient(ctx,pos_y,size,options);
    }

    public generateGradient(pos_x:number, key_size:number):void{
        this.grad.create_gradient(pos_x, key_size);
    }

    public renderGradient():void{
        this.grad.render_gradient();
    }

    public updateGradient():void{
        this.grad.update_gradient();
    }
};