import { Options } from "../../../Utils/TypesForOptions";
import Effect from "../_Effect";

interface Stain_Options{
    max_width:number,
    max_height:number,
    offset_margin:number,
    speed:number,
}

export type { Stain_Options };

interface path_element{
    x0:number,
    y0:number,
    x1:number,
    y1:number,
    r:number
}

class Stain_Entity{
    private reached_destination:boolean = false;
    private end_x:number
    private end_y:number
    private render_next:number = 0
    public static DEFAULT_CONF:Stain_Options = {
        max_height:20,
        max_width:20,
        offset_margin:10,
        speed:1
    }
    private path_element:path_element[];

    constructor(start_x:number, start_y:number, private color:string, private configuration:Stain_Options ){
        this.end_x = start_x + Math.random() * configuration.offset_margin * (Math.random() > 0.5 ? 1 : -1) - 200;
        this.end_y = start_y - Math.random() * configuration.offset_margin - 100;
        this.path_element = this._generate_shape();
    }

    public update(){

    }

    public render(ctx:CanvasRenderingContext2D){
        ctx.beginPath();
        this.path_element.forEach((el,index) =>{
            if(index * 30 <= this.render_next){
                ctx.moveTo(el.x0,el.y0)
                ctx.arcTo((el.x0 + el.x1)/2,(el.y0 + el.y1)/2, el.x1, el.y1, el.r);
                ctx.lineTo(el.x1,el.y1);
            }
            this.render_next+=1;
        })
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.fill();
    }

    private _reach_destination():void{

    }

    private _generate_shape():Array<path_element>{
        let width = Math.random() * this.configuration.max_width;
        let height = Math.random() * this.configuration.max_height;
        const turns_per_horizon = 3;
        let start_x = this.end_x;
        let start_y = this.end_y;
        let forward = 1;
        let dir = (Math.random() > 0.5 ? 1 : -1)
        const radius = 5;
        const path_arr:path_element[] = [];
        for(;forward>=-1;forward-=2){
            for(let x = 0; x < turns_per_horizon; x++){
                dir *= -1;
                const dest_x = start_x + width/turns_per_horizon * (x+1) * forward;
                const dest_y = start_y + (Math.random() * this.configuration.max_height/2) * dir;
                const path:path_element = {
                    x0: start_x,
                    y0: start_y,
                    x1: dest_x,
                    y1: dest_y,
                    r: radius
                }
                start_x = dest_x;
                start_y = dest_y;
                path_arr.push(path);
            }
            for(let y = 0; y < turns_per_horizon; y++){
                dir *=-1;
                const dest_x = start_x + (Math.random() * this.configuration.max_width/2) * dir;
                const dest_y = start_y + height/turns_per_horizon * (y+1) * forward;
                const path:path_element = {
                    x0: start_x,
                    y0: start_y,
                    x1: dest_x,
                    y1: dest_y,
                    r: radius
                }
                start_x = dest_x;
                start_y = dest_y;
                path_arr.push(path);
            }
            width = Math.abs(start_x - this.end_x)
            height = Math.abs(start_y - this.end_y)
        }
        const path:path_element = {
            x0: start_x,
            y0: start_y,
            x1: this.end_x,
            y1: this.end_y,
            r: radius
        }
        path_arr.push(path);
        console.log(path_arr);
        return path_arr;
    }
}


export default class Stain extends Effect{
    private entities:Stain_Entity[] = [];
    private rendered:boolean = false;

    constructor(ctx: CanvasRenderingContext2D, width:number, height:number,private options: Options){
        super(ctx, width, height);
    }

    public create_effect(pos_x: number, pos_y: number, key_width: number): void {
        if(!this.rendered)
        this.entities.push(new Stain_Entity(pos_x,pos_y, this.options.Color, Stain_Entity.DEFAULT_CONF))
        this.rendered = true;
    }

    public update_effect(): void {
        
    }

    public render_effect(): void {
        const vanish_speed = 0.02
        this.ctx.fillStyle = 'rgba(42,44,46,' + vanish_speed.toString() + ')';
        this.ctx.fillRect(0,0,this.width,this.height);
        this.entities.forEach(entity =>{
            entity.render(this.ctx);
        })
    }

    public handle_resze(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }
}