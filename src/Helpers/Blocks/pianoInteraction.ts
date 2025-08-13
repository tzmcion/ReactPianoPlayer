import { keyInfo } from "../../Utils/TypesForMidi";
import { CanvasRoundRect, addShadow } from '../../Utils/CanvasFuntions';
import { Options } from "../../Utils/TypesForOptions";
import { KeyGradient } from "../CanvasEffects";

export default class pianoInteraction{
    private keys_to_light:Array<keyInfo & {color:string, gradient_color:string}> = [];
    private black_key_height:number
    private white_key_height:number

    constructor(private black_ctx:CanvasRenderingContext2D,private white_ctx:CanvasRenderingContext2D, private gradient_ctx: CanvasRenderingContext2D,private width:number,private height:number, private cnavas_offSet:number, private options:Options){
        this.black_key_height = (height-cnavas_offSet) / 1.5 + 5;
        this.white_key_height = (height-cnavas_offSet) + 2;
        this.gradient_ctx.globalCompositeOperation = 'source-over';
    }

    public handle_block_key(key:keyInfo, color:string, gradient_color:string):void {
        this.keys_to_light.push({
            width: key.width,
            type: key.type,
            gradient_color:gradient_color,
            color:color,
            noteNumber:key.noteNumber,
            position:key.position
        })
    }

    public render():void {
        this.white_ctx.clearRect(0,0,this.width,this.height);
        this.black_ctx.clearRect(0,0,this.width,this.height);
        this.gradient_ctx.clearRect(0,0,this.width,this.height * 3);
        this.keys_to_light.map(key =>{
            const height = key.type === 'BLACK' ? this.black_key_height : this.white_key_height
            if(key.type === "BLACK"){
                CanvasRoundRect(this.black_ctx,key.color,key.position + 1,0 + this.cnavas_offSet - 2,key.width,height,3);
                addShadow(this.white_ctx,key.position + 1,0,height - 5, key.width);
            }else{
                CanvasRoundRect(this.white_ctx,key.color,key.position + 1,0 + this.cnavas_offSet - 2,key.width + 1,height,3);
                addShadow(this.white_ctx,key.position,0,height, key.width + 1);
            }
            KeyGradient(this.gradient_ctx,key.position,key.width,140,this.options.GradientColor, 85);
        })
    }

    /**
     * Function resets array of blocks to clear
     */
    public clear():void{
        this.keys_to_light = []
    }
};