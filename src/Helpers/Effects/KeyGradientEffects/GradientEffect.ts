/**
 * About this gradient effects I am not sure if it is a good idea...
 * But more functionalities never hurt anyone...
 */

export default abstract class GradientEffect{

    /**
     * GradientEffect abstract class
     * @param ctx Canvas REndering Context
     * @param pos_y Pos_y - position zero where the piano and blocks meet - it is the ignition point of any key gradient
     */
    constructor(protected ctx:CanvasRenderingContext2D, protected pos_y:number){};

    /**
     * Function creates the gradient, but it can also render it
     * Depends on implementation - some gradients will be designed to run smoothly on worse computers
     * while others will be designed to be entertaining
     * @param pos_x position_x of where the effect should generate (should be middle of the key!)
     */
    public abstract create_gradient(pos_x:number, key_size:number):void;

    /**
     * Render the effects if applicable.
     * Gradient can have empty render functions if is designed for optimalization
     */
    public abstract render_gradient():void;

    /**
     * Update gradient
     * Gradient can have empty update function if designed for optimalization
     */
    public abstract update_gradient():void;
}