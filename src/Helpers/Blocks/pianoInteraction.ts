//TODO: Add option for Key Gradient to be like fire: https://codepen.io/Capse/pen/aNOeee
// Current RadialGradient is very basic and unatractive
// Also, that radial gradient could be prerendered and reused

import { keyInfo } from "../../Utils/TypesForMidi";
import { CanvasRoundRect, addShadow } from '../../Utils/CanvasFuntions';
import { Options, TRACKS_CONFIGURATION } from "../../Utils/TypesForOptions";
import GradientManager from "../Effects/GradientManager";

/**
 * Class is used to light-up the keys on the piano
 * LAST UPDATE: 12/09/2025
 */
export default class pianoInteraction{
    private keys_to_light:Array<keyInfo & {color:string, gradient_color:string}> = [];
    private gradient:GradientManager
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
    constructor(private black_ctx:CanvasRenderingContext2D,private main_ctx:CanvasRenderingContext2D,private width:number,private height:number, private TR_CONF:TRACKS_CONFIGURATION, private options:Options){
        this.black_key_height = ((height*TR_CONF.piano_height_ratio)) * this.TR_CONF.key_wh_to_bl_ratio + 5;
        this.white_key_height = ((height*TR_CONF.piano_height_ratio)) + 2;
        this.gradient = new GradientManager(main_ctx,this.height - this.height*TR_CONF.piano_height_ratio,options, this.white_key_height /1.5);
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
        this.black_key_height = (height*this.TR_CONF.piano_height_ratio) *this.TR_CONF.key_wh_to_bl_ratio + 5;
        this.white_key_height = (height*this.TR_CONF.piano_height_ratio) + 2;
        this.width = width;
        this.height = height;
    }

    /**
     * Method renders the lighten-up keys and the radial gradient for the keys
     */
    public render():void {
        const HEIGHT_OFFSET = this.height - this.TR_CONF.piano_height_ratio * this.height;
        this.main_ctx.clearRect(0,HEIGHT_OFFSET,this.width, this.white_key_height);    //Clears only the bottom part of the screen, as upper was cleared earlier
        this.black_ctx.clearRect(0,0,this.width, this.black_key_height );   //Here I don't know yet how to proceed, but It will stay like this
        this.main_ctx.shadowBlur = 0;
        this.black_ctx.shadowBlur = 0;
        this.keys_to_light.map(key =>{
            const height = key.type === 'BLACK' ? this.black_key_height : this.white_key_height
            if(key.type === "BLACK"){
                CanvasRoundRect(this.black_ctx,key.color,key.position + 1,0 - 2,key.width,height,3);
                //addShadow(this.main_ctx,key.position + 1,HEIGHT_OFFSET,height - 5, key.width);    //This shadow makes almost no change, but still takes computing time
            }else{
                CanvasRoundRect(this.main_ctx,key.color,key.position,HEIGHT_OFFSET,key.width,height,3);
                addShadow(this.main_ctx,key.position,HEIGHT_OFFSET,height, key.width);      //Better to have gradient defined for keys (as it is always the same), and just fill rect
            }
            this.gradient.generateGradient(key.position + key.width/2, key.width * 1.5);
            this.gradient.updateGradient();
            this.gradient.renderGradient();
        })
    }

    /**
     * Function resets array of blocks to clear
     */
    public clear():void{
        this.keys_to_light = []
    }
};