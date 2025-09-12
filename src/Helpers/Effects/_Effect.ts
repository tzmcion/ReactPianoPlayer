/**
 * A pattern for class effect,
 * Every effect must follow the same methods
 * LAST UPDATE: 12/09/2025
 */
export default abstract class Effect{
    /**
     * Constructor for abstract class of Effect
     * @param ctx canvas ctx
     * @param width width of ctx
     * @param height height of ctx
     */
    constructor(protected ctx:CanvasRenderingContext2D, protected width:number, protected height:number){}

    /**
     * Method spawns the effect isntance - whether a rectangle, a glow, a circle, or whatever the inheritated effect class creates
     * @param pos_x pos_x of where the effect should spawn
     * @param pos_y pos_y of where the effect should spawn
     * @param key_width width of the key to randomize if it spawns at the beggining, end, or middle of key
     */
    public abstract create_effect(pos_x:number, pos_y:number, key_width:number):void;

    /**
     * Method renders the effect on the canvas
     */
    public abstract render_effect():void;

    /**
     * Method updates the position of the effect,
     * also deleting it when it is not visible on the screen anymore
     */
    public abstract update_effect():void;

    /**
     * Method handles the resize of the screen
     */
    public abstract handle_resze(width:number, height:number):void;

    /**
     * Method clears the Canvas
     */
    public clear_ctx():void {
        this.ctx.clearRect(0,0,this.width,this.height);
    };

}