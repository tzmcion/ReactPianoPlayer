import GradientEffect from "./GradientEffect";
import { Options as OptionsType } from "../../../Utils/TypesForOptions";
import hexToRgba from "hex-rgba";

export default class BasicGradient extends GradientEffect{
    private glowing_rate:number = 1;
    private random:number = 0;
    private size:number;


    constructor(ctx:CanvasRenderingContext2D, pos_y: number, private org_size:number,private options:OptionsType){
        super(ctx, pos_y)
        this.glowing_rate = 1;
        this.size = org_size;
    }

    public create_gradient(pos_x: number, key_size:number): void {
        this.ctx.save()
        this.size = key_size * this.glowing_rate
        const gradient = this.ctx.createRadialGradient(pos_x, this.pos_y, this.size/10, pos_x, this.pos_y, this.size);
        gradient.addColorStop(1,"transparent")
        gradient.addColorStop(.95,hexToRgba(this.options.KeyPressGradientColor,1 * this.glowing_rate))
        gradient.addColorStop(.9,hexToRgba(this.options.KeyPressGradientColor,3 * this.glowing_rate))
        gradient.addColorStop(.7,hexToRgba(this.options.KeyPressGradientColor,6 * this.glowing_rate))
        gradient.addColorStop(.6,hexToRgba(this.options.KeyPressGradientColor,12 * this.glowing_rate))
        gradient.addColorStop(.5,hexToRgba(this.options.KeyPressGradientColor,18 * this.glowing_rate))
        gradient.addColorStop(.35,hexToRgba(this.options.KeyPressGradientColor,25 * this.glowing_rate))
        gradient.addColorStop(.3,hexToRgba(this.options.KeyPressGradientColor,35 * this.glowing_rate))
        gradient.addColorStop(.25,hexToRgba(this.options.KeyPressGradientColor,43 * this.glowing_rate))
        gradient.addColorStop(.2,hexToRgba(this.options.KeyPressGradientColor,45 * this.glowing_rate))
        gradient.addColorStop(.15,hexToRgba(this.options.KeyPressGradientColor,50 * this.glowing_rate))
        gradient.addColorStop(.1 ,hexToRgba(this.options.KeyPressGradientColor,55 * this.glowing_rate))
        gradient.addColorStop(.09 ,hexToRgba(this.options.KeyPressGradientColor,60 * this.glowing_rate))
        gradient.addColorStop(.08 ,hexToRgba(this.options.KeyPressGradientColor,65 * this.glowing_rate))
        gradient.addColorStop(.05 ,hexToRgba(this.options.KeyPressGradientColor,70 * this.glowing_rate))
        gradient.addColorStop(0,hexToRgba(this.options.KeyPressGradientColor,99 * this.glowing_rate))
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(pos_x - this.size, this.pos_y - this.size, pos_x + this.size, this.pos_y + this.size);
        this.ctx.restore()
    }

    public render_gradient(): void {
        //Empty in this gradient type
        this.glowing_rate = 1 * (Math.random() * 0.05 + 0.9)
    }

    public update_gradient(): void {
        //Empty in this gradient type
    }

};