//TODO: Add option for Key Gradient to be like fire: https://codepen.io/Capse/pen/aNOeee
// Current RadialGradient is very basic and unatractive
// Also, that radial gradient could be prerendered and reused
//TODO: Combine white_ctx and black_ctx into one single canvas (goal - reduce .clearRect function as much as possible)
//TODO: Combine radial gradient with piano lighting up - generate offsets for canvas... (goal - reduce .clearRect function as much as possible)

import { keyInfo } from "../../Utils/TypesForMidi";
import { CanvasRoundRect, addShadow } from '../../Utils/CanvasFuntions';
import { Options } from "../../Utils/TypesForOptions";
import { KeyGradient } from "../CanvasEffects";

/**
 * Class is used to light-up the keys on the piano
 * LAST UPDATE: 12/09/2025
 */
export default class pianoInteraction{
    private keys_to_light:Array<keyInfo & {color:string, gradient_color:string}> = [];
    private black_key_height:number
    private white_key_height:number

    /**
     * Class used to light up the keys on the piano when the block reaches it (or when the method is executed...)
     * @param black_ctx - ctx for black keys
     * @param white_ctx - ctx for white keys
     * @param gradient_ctx - ctx for gradient keys 
     * @param width -width
     * @param height -height
     * @param cnavas_offSet -- the offset on how bigger the light key should be than the normal key
     * @param options - options
     */
    constructor(private black_ctx:CanvasRenderingContext2D,private white_ctx:CanvasRenderingContext2D, private gradient_ctx: CanvasRenderingContext2D,private width:number,private height:number, private cnavas_offSet:number, private options:Options){
        this.black_key_height = (height-cnavas_offSet) / 1.5 + 5;
        this.white_key_height = (height-cnavas_offSet) + 2;
        this.gradient_ctx.globalCompositeOperation = 'source-over';
    }

    /**
     * Method adds tke key to be lighten up
     * @param key information about the key
     * @param color color which the key will be lighten up
     * @param gradient_color and color of the gradient
     */
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

    /**
     * Method handles the resize of the canvas
     * @param width new width
     * @param height new height
     */
    public handle_resize(width:number, height:number):void {
        this.black_key_height = (height-this.cnavas_offSet) / 1.5 + 5;
        this.white_key_height = (height-this.cnavas_offSet) + 2;
        this.width = width;
        this.height = height;
    }

    /**
     * Method renders the lighten-up keys and the radial gradient for the keys
     */
    public render():void {
        //!! TO MANY CLEAR RECTS
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
            KeyGradient(this.gradient_ctx,key.position,key.width,this.height - this.height / 4,this.options.KeyPressGradientColor, this.height / 2.2);
        })
    }

    /**
     * Function resets array of blocks to clear
     */
    public clear():void{
        this.keys_to_light = []
    }
};