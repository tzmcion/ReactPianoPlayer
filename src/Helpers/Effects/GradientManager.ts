import BasicGradient from "./KeyGradientEffects/BasicGradient";
import GradientEffect from "./KeyGradientEffects/GradientEffect";
import FireGradient from "./KeyGradientEffects/FireGradient";
import EmptyGradient from "./KeyGradientEffects/EmptyGradient";
import {lighten_darken_color} from "../../Utils/smallFunctions";
import {Options as OptionsType} from "../../Utils/TypesForOptions";

export default class GradientManager{
    private grad:GradientEffect

    constructor(ctx: CanvasRenderingContext2D, pos_y: number, options:OptionsType, size:number){
        switch(options.KeyPressEffect){
            case "None":
                this.grad = new EmptyGradient(ctx,pos_y);
                break;
            case "Gradient":
                this.grad = new BasicGradient(ctx, pos_y, size, options);
                break;
            case "Fireplace":
                const col = options.KeyPressGradientColor
                const colors = [col, lighten_darken_color(col, 20, 20), lighten_darken_color(col, -20, 20), lighten_darken_color(col, 0, 50), lighten_darken_color(col, 0, 50)]
                console.log(colors)
                this.grad = new FireGradient(ctx, pos_y, colors);
                break;
        }
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