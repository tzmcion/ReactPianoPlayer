class Effect{
    private x;
    private y;
    private lifetime;
    private multiplier;
    private created;
    constructor(pos_x:number,pos_y:number,lifetime:number,side:boolean){
        this.x = pos_x;
        this.y = pos_y;
        this.lifetime = lifetime;
        this.created = Date.now();
        this.multiplier = side ? 1 : -1;
    }

    public render(){
        const now = Date.now();
        const x_pos = this.x + Math.sin((now - this.created)/200)*20*this.multiplier;
        const y_pos = this.y - (now - this.created)/12;
        if((now - this.created) / 1000 < this.lifetime){
            return[x_pos,y_pos,1-((now-this.created)/1000)*1/this.lifetime];
        }
        return false;
    }
}

class DNA{
    private ctx;
    private width;
    private height;
    private key_width;
    private effects:Array<Effect>;
    constructor(ctx:CanvasRenderingContext2D,width:number,height:number,key_width:number){
        this.ctx=ctx;
        this.width=width;
        this.height=height;
        this.key_width=key_width;
        this.effects = [];
    }

    public render(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
        const newEffects:Array<Effect> = [];
        this.effects.forEach(effect =>{
            const data = effect.render();
            if(data !== false){
                const alpha = Math.floor(data[2] * 100);
                this.ctx.fillStyle = `rgba(255,255,255,${alpha %2 === 0 || alpha % 4 === 0 ? 0 : alpha/100})`;
                this.ctx.beginPath();
                this.ctx.arc(data[0],data[1],2,Math.PI*2,0);
                this.ctx.fill();
                this.ctx.closePath();
                newEffects.push(effect);
            }});
        this.effects = newEffects;
    }

    public create(pos_x: number, pos_y: number, color: string): void {
        this.effects.push(new Effect(pos_x,pos_y,6,true));
        this.effects.push(new Effect(pos_x,pos_y,6,false));
    }

    public clear(): void {
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.effects = [];
    }
}

export default DNA;