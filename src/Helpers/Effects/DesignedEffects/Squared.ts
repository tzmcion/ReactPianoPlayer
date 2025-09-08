import Effect from "../_Effect";

class Square{
    private alpha = 255
    private steps_covered = 0
    private speed_x = 0
    private speed_y:number
    private real_color:string
    constructor(private pos_x:number, private pos_y:number, speed:number, private size:number, private color:string, private dying_speed:number){
        this.speed_y = speed * -1;
        this.real_color = this.color + this.alpha.toString(16);
    }

    public update():number{
        this.pos_x += this.speed_x
        this.pos_y += this.speed_y
        this.steps_covered++;
        if(this.steps_covered % 6 == 0){
            //Change the direction with 25% chance
            if(Math.random() > 0.5){
                if(this.speed_y != 0){
                    this.speed_x = Math.random() > 0.5 ? this.speed_y * -1 : this.speed_y;
                    this.speed_y = 0;
                }
                else{
                    this.speed_y = this.speed_x < 0 ? this.speed_x : this.speed_x * -1;
                    this.speed_x = 0;
                }
            }
        }
        this.alpha -= this.dying_speed;
        if(this.alpha <= 0){
            return -1
        }
        this.real_color = this.color + (this.alpha < 16 ? '0' : '') + Math.abs(Math.floor(this.alpha * Math.sin(Math.floor(this.steps_covered/10)))).toString(16);
        return 1;
    }

    public render(ctx:CanvasRenderingContext2D):void{
        ctx.beginPath();
        ctx.fillStyle = this.real_color;
        ctx.fillRect(this.pos_x, this.pos_y, this.size, this.size);
        ctx.closePath();
    }
}


class Squared extends Effect{
    private effects:Array<Square> = []
    /**
     * 
     */
    constructor(ctx:CanvasRenderingContext2D, width:number, height:number, private speed:number, private size:number, private colors:string[], private vanish_factor:number, private quantity_per_event=1){
        super(ctx,width,height);
        ctx.globalCompositeOperation = 'source-over';
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(0,0,width,height)
    }

    public create_effect(pos_x: number, pos_y: number, key_width: number): void {
        for(let x = 0; x < this.quantity_per_event; x++){
            this.effects.push(new Square(pos_x + Math.random() * key_width,pos_y,this.speed,this.size,this.colors[Math.floor(Math.random()*this.colors.length)],1.2));
        }
    }

    public render_effect(): void {
        //Clear the rect with alpha background
        //rgb(42, 44, 46)
        this.ctx.fillStyle = 'rgba(42,44,46,' + this.vanish_factor.toString() + ')';
        this.ctx.fillRect(0,0,this.width,this.height);
        //this.clear_ctx()
        this.effects.forEach(effect =>{
            effect.render(this.ctx);
        })
        //Render Effects
    }

    public handle_resze(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

    public update_effect(): void {
        const new_effects:Array<Square> = [];
        this.effects.map(efect =>{
            const result = efect.update();
            if(result === 1){
                new_effects.push(efect);
            }
        })
        this.effects = new_effects;
    }

};

export default Squared;