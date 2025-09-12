import Effect from './_Effect'
import { Options as OptionsType } from '../../Utils/TypesForOptions';

/**
 * Import Effects
 */
import Sparks from './DesignedEffects/Sparks';
import Squared from './DesignedEffects/Squared';
import Blank from './DesignedEffects/Blank';

/**
 * Effects Manager handles the choice of effects, and just fires the correct effects
 * It is created mainly for clearer code, and easier effects to update when new ones are created
 * LAST UPDATE: 12/09/2025
 */
export default class EffectsManager{
    private effects:Effect;

    /**
     * Effects Manager handles the choice of effects, and just fires the correct effects
     * It is created mainly for clearer code, and easier effects to update when new ones are created
     * @param ctx canvas for effects 
     * @param width width of the 
     * @param height height of the canvas
     * @param key_width width of the key - should be also changed with resizing
     * @param effect_type type of effect
     * @param options options
     */
    constructor(ctx:CanvasRenderingContext2D, width:number, private height:number, private key_width:number, effect_type:string, options:OptionsType){
        switch(effect_type){
            case 'Sparks':
                this.effects = new Sparks(ctx, width, height, 1, 6,);
                break;
            case 'Squared':
                this.effects = new Squared(ctx,width,height,2.5,3,[options.Color,options.ThinerBlockColor],0.05);
                break;
            case "None":
                this.effects = new Blank(ctx, 0, 0)
                break
            default:
                this.effects = new Blank(ctx, 0, 0);
                break;
        }
    }

    /**
     * Method handles the resize of the page/canvas
     * @param width width of the canvas to change
     * @param height height of the canvas to change
     */
    public handle_resize(width:number, height: number):void{
        this.height = height;
        this.effects.handle_resze(width, height);
    }

    /**
     * Method generates the effect
     * Should be executed when the block is touching the piano
     * but dependent on situation can be executed in other situations
     * @param pos_x pos_x of the key
     */
    public generate_effect(pos_x:number):void{
        this.effects.create_effect(pos_x, this.height, this.key_width);
    }

    /**
     * Method renders the effects,
     * should be executed inside some kind of AnimationFrame method/function
     */
    public render_effect():void{
        this.effects.update_effect();
        this.effects.render_effect();
    }

    /**
     * Method clears the effects canvas
     */
    public clear_effect():void{
        this.effects.clear_ctx();
    }
};