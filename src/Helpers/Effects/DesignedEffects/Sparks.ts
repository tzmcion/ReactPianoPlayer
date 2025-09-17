import Effect from "../_Effect"

interface Spark{
    width:number,
    height:number,
    pos_x:number,
    pos_y:number,
    speed_x:number,
    speed_y:number
}

class Sparks extends Effect{
    private sparks:Spark[]

    /**
     * Sparky effect, creates a fountain of sparks, which then drop down
     * @param ctx CanvasRenderingContext
     * @param width width of the canvas
     * @param height height of the canvas
     * @param size_x size of the particle
     * @param size_y size of the particle
     * @param speed_x initial speed of how fast the particles fly horizontally
     * @param speed_y initial speed of how fast the particles fly vertically
     * @param gravity_force how strong the gravity drags the instances down
     * @param random specifies randomization in the speed of instances
     * @param per_creation Argument defines how many instances should spawn per frame
     * @param spark_color color of the particle
     * @param background_color background color with ALREADY APPLIED OPACITY, so it should be smth like rgba(24,24,24,0.05); opacity defines how fast the effects dissapear
     */
    constructor(ctx:CanvasRenderingContext2D, width:number, height:number, private size_x:number, private size_y:number, private speed_x:number = 0.9, private speed_y:number = -3.8, private gravity_force:number = -0.19, private random:number = 2.2, private per_creation:number = 1,private spark_color:string = "#fcebb6ff" ,private background_color:string = "#2A2C2E"){
        super(ctx, width, height);
        this.ctx.globalCompositeOperation = 'overlay';
        this.sparks = [];
    }

    public create_effect(pos_x: number, pos_y: number, key_width:number): void {
        for(let x = 0; x < this.per_creation; x++){
            this.sparks.push({
                pos_x:pos_x + key_width / 2,
                pos_y:pos_y,
                height:this.size_y,
                width:this.size_x,
                speed_x:this.speed_x * (this.random * Math.random()) * (Math.random() > 0.5 ? -1 : 1),
                speed_y: this.speed_y * (this.random * Math.random()) * (Math.random() > 0.8 ? 1.3: 1)
            });
        }
    }

    public render_effect(): void {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.background_color;
        this.ctx.clearRect(0,0,this.width,this.height);
        this.sparks.map((spark)=>{
            this.ctx.fillStyle = this.spark_color;
            this.ctx.fillRect(spark.pos_x,spark.pos_y,spark.width,spark.height);
        });
        this.ctx.closePath()
    }

    public handle_resze(width: number, height: number): void {
        this.width = width;
        this.height = height;
        this.render_effect()
    }

    public update_effect(): void {
        const new_effects:Spark[] = [];
        this.sparks.forEach(spark =>{
            let new_spark = {...spark};
            new_spark.pos_x += new_spark.speed_x;
            new_spark.pos_y += new_spark.speed_y;
            new_spark.speed_x -= 0.02 * new_spark.speed_x
            new_spark.speed_y -= this.gravity_force;
            if(new_spark.pos_y + this.height < this.height)return;
            new_effects.push(new_spark);
        });
        this.sparks = new_effects;
    }
}

export default Sparks;