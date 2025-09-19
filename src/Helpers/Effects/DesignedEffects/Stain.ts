import { Options } from "../../../Utils/TypesForOptions";
import Effect from "../_Effect";

interface Stain_Options{
    max_width:number,
    max_height:number,
    offset_margin:number,
    speed:number,
    max_radius:number,
    bounce:number,
}

export type { Stain_Options };

interface path_element{
    pos_x:number,
    pos_y:number,
    radius:number,
    opacity:number,
    falling_speed:number,
    opacity_fade_speed:number,
    x_movement:number,
    sin_opacity:number,
    sin_opacity_nominator:number,
    color:string //In HEX format
}

class Stain_Entity{
    private gravitation:number = 0.08
    private end_x:number
    private end_y:number
    private create_time:number = Date.now()
    private speed_x:number = (Math.random() > 0.5 ? 1 : -1) * Math.random() * 2 + 0.5
    private speed_y:number = Math.random() * 7.5 + 8.5 * -1
    private stop_time:number = Math.random()*1500 + 1000
    private initial_radius:number = Math.random() * this.configuration.max_radius + 0.5
    private render_next:number = 0
    private TT_MARGIN = 15
    public static DEFAULT_CONF:Stain_Options = {
        max_height:50,
        max_width:90,
        offset_margin:10,
        max_radius:4,
        speed:1,
        bounce: 0.9
    }
    private path_element:path_element[];

    constructor(start_x:number, start_y:number, private color:string[], private configuration:Stain_Options, private height:number ){
        this.end_x = start_x;
        this.end_y = start_y;
        this.path_element = this._generate_shape();
    }

    public update():boolean{
        if(Date.now() - this.create_time >= this.stop_time ){
            
            let is_each_zero = false;
            this.path_element.forEach((el,index) =>{
                el.sin_opacity+=el.sin_opacity_nominator;
                el.color = el.color.slice(0,7) + (Math.abs(Math.floor(el.opacity * Math.cos(el.sin_opacity))) < 16 ? '0' : '') + Math.abs(Math.floor(el.opacity * Math.cos(el.sin_opacity))).toString(16)
                el.pos_y += el.falling_speed;
                el.pos_x += el.x_movement;
                el.x_movement -= this.gravitation * (el.x_movement < 0 ? -1 : 1);
                el.falling_speed += this.gravitation;
                if(index * this.TT_MARGIN <= this.render_next){
                    el.opacity -= el.opacity_fade_speed;
                }
                if(el.opacity > 0){
                    is_each_zero = true;
                }
            })
            return is_each_zero;
        }//If yet not the explosion time
        this.end_x += this.speed_x;
        this.end_y += this.speed_y;
        this.speed_y += this.gravitation;
        this.path_element.forEach(el =>{
            el.pos_x = this.end_x;
            el.pos_y = this.end_y;
        })
        return true;
    }

    public render(ctx:CanvasRenderingContext2D){
        if(Date.now() - this.create_time >= this.stop_time){
            this.path_element.forEach((el,index) =>{
                if(index * this.TT_MARGIN <= this.render_next && el.opacity > 0){
                    ctx.beginPath();
                    ctx.fillStyle = el.color;
                    ctx.arc(el.pos_x,el.pos_y,el.radius,0,Math.PI * 2);
                    ctx.fill();
                }
                this.render_next+=1;
            })
            return;
        }//else
        const TRAIL_SIZE = 15;
        for(let x = 0; x < TRAIL_SIZE; x++){
            const pos_x = this.end_x - this.speed_x*(x+1)
            const pos_y = this.end_y - this.speed_y*(x+1)
            ctx.beginPath();
            ctx.fillStyle = this.color[0] + Math.abs(Math.floor(255/ (0.5*(x+2)))).toString(16)
            ctx.arc(pos_x, pos_y, this.initial_radius / (0.20*(x+5)), 0, Math.PI *2);
            ctx.fill();
        }
    }

    private _reach_destination():void{

    }

    private _generate_shape():Array<path_element>{
        const DOTS_PER_ENTITY = 30;
        const ENTITY_RADIUS = this.initial_radius;
        const CENTER_X = this.end_x;
        const CENTER_Y = this.end_y;
        const path_arr:path_element[] = [];
        for(let x = 0; x < DOTS_PER_ENTITY; x++){
            const DENOM_X = Math.random() > 0.5 ? 1 : -1;
            const DENOM_Y = Math.random() > 0.5 ? 1 : -1;
            const element:path_element = {
                opacity:Math.floor(204 * Math.random() + 50),
                pos_x: CENTER_X,
                pos_y: CENTER_Y,
                radius: ENTITY_RADIUS * Math.random(),
                falling_speed: Math.random() * 3.5 * ( Math.random() > 0.5 ? -1 : 0.2),
                opacity_fade_speed: Math.random() * 3 + 1,
                x_movement: Math.random() * 2.6 * (DENOM_X),
                sin_opacity: DENOM_Y === -1 ? Math.random() * 90 : 0,
                sin_opacity_nominator: DENOM_Y === -1 ? Math.random() * 0.1 + 0.2 : 0,
                color: this.color[Math.floor(Math.random() * this.color.length)]
            }
            path_arr.push(element);
        }
        return path_arr;
    }
}


export default class Stain extends Effect{
    private entities:Stain_Entity[] = [];
    private occupied_pos:{id:number,time:number}[] = [];

    constructor(ctx: CanvasRenderingContext2D, width:number, height:number,private options: Options){
        super(ctx, width, height);
    }

    public create_effect(pos_x: number, pos_y: number, key_width: number): void {
        const TIMESPAN = 750;
        const time_now = Date.now();
        const el = this.occupied_pos.find(el => el.id === pos_x);
        if(el){
            if(time_now - el.time > TIMESPAN){
                el.time = time_now;
                this.entities.push(new Stain_Entity(pos_x + key_width/2,pos_y, [this.options.Color, this.options.ThinerBlockColor], Stain_Entity.DEFAULT_CONF, this.height))
                return;
            }
            return;
        }//if element does not exist
        this.occupied_pos.push({
            id:pos_x,
            time:time_now
        })
        this.entities.push(new Stain_Entity(pos_x + key_width/2,pos_y, [this.options.Color, this.options.ThinerBlockColor], Stain_Entity.DEFAULT_CONF, this.height));

        
    }

    public update_effect(): void {
        this.entities = this.entities.filter(entity => entity.update());
    }

    public render_effect(): void {
        const vanish_speed = 1;
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