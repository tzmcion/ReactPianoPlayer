import GradientEffect from "./GradientEffect";
import { alpha_hex, random_denominator } from "../../../Utils/smallFunctions";

class FireEntity{
    private path_multiplier:number
    private x_decider:number
    private y_speed:number
    private create_time:number
    private alpha:number = 1
    constructor(private pos_x:number, private pos_y:number, private color:string, private TTL:number, private size:number){
        this.create_time = Date.now();
        this.x_decider = Math.random() * 90
        this.path_multiplier = Math.random() + 0.2
        this.y_speed = Math.random() * 1.1 + 0.8
    }

    public update(curr_time:number):boolean{
        this.alpha = 1 - ((curr_time - this.create_time)/this.TTL);
        this.alpha = this.alpha < 0 ? 0 : this.alpha;
        this.alpha = this.alpha > 1 ? 1 : this.alpha;
        this.pos_x += Math.sin(this.x_decider) * this.path_multiplier;
        this.pos_y -= this.y_speed;
        this.x_decider+=0.08;
        return !(this.alpha <= 0 || this.alpha > 1)
    }

    public render(ctx:CanvasRenderingContext2D):void{
        ctx.beginPath();
        ctx.fillStyle = alpha_hex(this.color,this.alpha*255);
        ctx.fillRect(this.pos_x, this.pos_y, this.size, this.size);
    }
}

/**
 * FireGradient simulates emitting fire/like graphics form key on interaction with block
 */
export default class FireGradient extends GradientEffect{
    public colors_array:string[] = ["#fcc26cff", "#ffec97ff", "#ffed90ff", "#ff3535ff"]
    private entities_array:FireEntity[] = [];

    constructor(ctx:CanvasRenderingContext2D, pos_y:number){
        super(ctx,pos_y)
    };

    public create_gradient(pos_x: number, key_size: number): void {
        for(let x = 0; x < 2; x++){
            const ENT_POS_X = pos_x + (random_denominator() * Math.random() * key_size/2);
            const ENT_COLOR = this.colors_array[Math.floor(Math.random() * this.colors_array.length)];
            const TTL_NR = Math.random() * (1500);
            const ENT_SIZE = Math.random() * 3 + 2;
            this.entities_array.push(new FireEntity(ENT_POS_X, this.pos_y, ENT_COLOR, TTL_NR, ENT_SIZE));
        }
    }

    public render_gradient(): void {
        this.entities_array.forEach(entity => {
            entity.render(this.ctx);
        })
    }

    public update_gradient(): void {
        const curr_time = Date.now();
        this.entities_array = this.entities_array.filter(entity => entity.update(curr_time));
    }

}