import hexAlpha from "hex-alpha";

class Spark{
    private pos_x:number
    private pos_y:number
    private readonly dirrection: 'R' | 'L'
    private readonly duration:number
    private readonly color:string
    private readonly height:number
    private readonly width:number
    private speed_x:number
    private speed_y:number
    private time:number
    public alpha:number
        constructor(pos_x:number,pos_y:number, duration:number, direction: 'R' | 'L', color:string){
            this.pos_x = pos_x + (direction ==='R' ? Math.random() *-8 -1: Math.random() * 8 + 1);
            this.pos_y = pos_y;
            this.speed_x = direction ==='R' ? Math.random() *-3 -1: Math.random() * 3 + 1;
            this.speed_y = Math.random() *-2 -1;
            this.dirrection = direction;
            this.duration = duration;
            this.color = color;
            this.width = Math.floor(Math.random() * 2 + 2);
            this.height = Math.floor(Math.random() * 4 + 3);
            this.time = Date.now();
            this.alpha = 1;
    }

    public render(ctx:CanvasRenderingContext2D){
        this.pos_x += this.speed_x;
        this.pos_y += this.speed_y;
        this.speed_y -= 0.2;
        if(this.alpha > 0){
            ctx.beginPath();
            ctx.fillStyle = hexAlpha(this.color,this.alpha);
            ctx.fillRect(this.pos_x,this.pos_y,this.width,this.height);
            ctx.closePath();
            ctx.fill();
        }
        const now = Date.now();
        this.alpha = 1 - 1*(now - this.time)/this.duration;
    }
};

class Sparks{
    private readonly ctx:CanvasRenderingContext2D
    private readonly width:number
    private readonly height:number
    private readonly key_width:number
    private sparks: Array<Spark>
    private creators: Array<{pos_x:number,pos_y:number,color:string,speed_x:number}>
    constructor(ctx:CanvasRenderingContext2D, width:number, height:number, key_width:number){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.key_width = key_width;
        this.ctx.globalCompositeOperation = "source-over";
        this.sparks = [];
        this.creators = [];
    }

    public render(){
        this.ctx.clearRect(0,0,this.width,this.height);
        let newSparks: Array<Spark> = [];
        this.sparks.map(spark =>{
            spark.render(this.ctx);
            if(spark.alpha > 0){
                newSparks.push(spark);
            }
            return 0;
        })
        this.sparks = newSparks;
        let newCreators: Array<{pos_x:number,pos_y:number,color:string,speed_x:number}> = [];
        this.creators.map(creator =>{
            creator.pos_y -= Math.floor(Math.random() * 5 + 5);
            creator.pos_x += creator.speed_x/3;
            creator.speed_x += Math.random() > 0.5 ? Math.random() * -1: Math.random() * 1;
            if(Math.random() > 0.8){
                this.sparks.push(new Spark(creator.pos_x,creator.pos_y,1000,Math.random() > 0.5 ? 'R' : 'L',creator.color));
            }
            if(creator.pos_y > 300){
                newCreators.push(creator);
            }
            return 0;
        })
        this.creators = newCreators;
    }

    public create(pos_x:number,pos_y:number,color:string){
        this.creators.push({pos_x:pos_x,pos_y:pos_y,color:color,speed_x: Math.random() > 0.5 ? -2:2});
    }

    public clear(){
        this.creators  = [];
        this.sparks = [];
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
    }
};

export default Sparks;