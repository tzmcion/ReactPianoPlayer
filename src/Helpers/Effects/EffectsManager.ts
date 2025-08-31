import Effect from './_Effect'

/**
 * Import Effects
 */
import Sparks from './DesignedEffects/Sparks';
import Squared from './DesignedEffects/Squared';
import Blank from './DesignedEffects/Blank';
import { Options } from '../../Utils/TypesForOptions';

export default class EffectsManager{

    private effects:Effect;
    constructor(private ctx:CanvasRenderingContext2D, width:number,private height:number, private key_width:number,effect_type:string, options:Options){
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


    public generate_effect(pos_x:number):void{
        this.effects.create_effect(pos_x, this.height, this.key_width);
    }

    public render_effect():void{
        this.effects.update_effect();
        this.effects.render_effect();
    }

    public clear_effect():void{
        this.effects.clear_ctx();
    }
};