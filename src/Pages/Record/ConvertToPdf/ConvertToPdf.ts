import { noteEvent } from "../../../Utils/TypesForMidi";
import Bass_png from '../../../Assets/bass.png';
import Violin_png from '../../../Assets/violin.png';

interface AddOptions{
    width?:number,
    height?:number,
    /** Percent in number 0-20 */padding_vertical?:number,
    /** Percent in number 0-20 */padding_horizontal?:number
}

interface Options{
    width:number,
    height:number,
    padding_vertical:number,
    padding_horizontal:number
}


const Positions = [7+9,16+9,28+9,37+9,49+9,58+9,70+9,79+9]; //10
const Bar_Width = 40;
const Drawing_Start_Position = 12;

/**
 * Converts Midi to PDF
 */
export default class ConvertToPDF{
    private File:Array<noteEvent>
    private ctx: CanvasRenderingContext2D
    private options:Options
    private bassKey:any
    private violinKey:any
    private subbDelta:number
    constructor(File:Array<noteEvent>, ctx:CanvasRenderingContext2D, options?:AddOptions){
        this.File = File;
        this.ctx = ctx;
        this.options = {
            width: options?.width ? options.width : 595,
            height: options?.height ? options.height: 842,
            padding_horizontal: options?.padding_horizontal ? options.padding_horizontal: 5,
            padding_vertical: options?.padding_vertical ? options.padding_vertical : 5
        }
        this.subbDelta = 0;
        this.draw_Lines = this.draw_Lines.bind(this);
        this.Draw = this.Draw.bind(this);
        this.bassKey = null;
        this.violinKey  = null;
        //bpm  1 beat is equal to 500 ms, so 120bpm = 1 minute //1 bar is 2 seconds, so 2/32 = 31.25 ms every digit, 16th note is 62.5 milisec
        this.load_images = this.load_images.bind(this);
        this.Read_File = this.Read_File.bind(this);
        this.load_images();
    }




    //Public Functions

    public Draw():void{
        this.ctx.fillStyle = '#FFF';
        this.ctx.beginPath();
        this.ctx.fillRect(0,0,this.options.width,this.options.height);
        for(let x = 0; x < 8; x++){
            this.draw_Lines(x);
        }
         this.ctx.beginPath();
        this.ctx.fillStyle = '#000'
        this.ctx.font = 'bold 20px sans-serif';
        this.ctx.fillText('4',this.calculate_percent(Drawing_Start_Position - 1.5,'vertical'),this.calculate_percent(Positions[0] + 1.8,'horizontal'));
        this.ctx.fillText('4',this.calculate_percent(Drawing_Start_Position - 1.5,'vertical'),this.calculate_percent(Positions[0] + 4,'horizontal'));
        this.ctx.fillText('4',this.calculate_percent(Drawing_Start_Position - 1.5,'vertical'),this.calculate_percent(Positions[1] + 1.8,'horizontal'));
        this.ctx.fillText('4',this.calculate_percent(Drawing_Start_Position - 1.5,'vertical'),this.calculate_percent(Positions[1] + 4,'horizontal'));
        if(this.File){
            if(this.File[0]){
                this.subbDelta = this.File[0].Delta;
                this.File.map(event =>{
                    const delta = Math.floor((event.Delta - this.subbDelta)/1000);
                    const duration = Math.floor(Math.floor(event.Duration / 1000) / 62.5);
                    const noteData = this.Calculate_note_number_and_hash(event.NoteNumber);
                    const type = duration >= 32 ? 32 : duration >=16 ? 16 : duration >= 8 ? 8 : duration >= 4 ? 4 : 2;
                    if(event.NoteNumber === 60){
                        console.log(noteData.SheetMusicNumber);
                    }
                    this.drawNote(noteData.SheetMusicNumber,delta,noteData.hash,type);
                })
            }
        }
    }

    //Private Functions

    private calculate_percent(percent:number,orientation:'horizontal' | 'vertical'):number{
        if(orientation === 'horizontal'){
            return this.options.height / (100 / percent);
        }
        if(orientation === 'vertical'){
            return this.options.width / (100 / percent);
        }
        return 0;
    }

    private Read_File():void{
        console.log(this.File);
    }

    private load_images():void{
        const load_image = () =>{
            this.bassKey = bass;
            this.violinKey = violin;
            this.Draw();
        }
        const bass = new Image();
        const violin = new Image();
        bass.onload = function(){
            load_image();
        }
        bass.src = Bass_png;
        violin.onload = function(){
            load_image();
        }
        violin.src = Violin_png;
    }

    private drawNote(noteNumber:number,/** miliseconds */ delta:number,hash:boolean,set_type:number ):void{
        const note_vertical_position =  Math.floor(delta / 62.5) === 0 ? 1 : Math.floor(delta / 62.5);
        const note_line = Math.floor(Math.floor(note_vertical_position / 64) * 2);
        const type = set_type
        if(noteNumber < 45){
            //48 -- mid C3
            const decimNumber = 21 - noteNumber;
            let pos_x = this.calculate_percent(Drawing_Start_Position + (note_vertical_position - ((Math.floor(note_vertical_position /64))) * 64) * 100 /32 * Bar_Width / 100,'vertical');
            const notePosition = this.calculate_percent(Positions[note_line + 1],'horizontal') + this.calculate_percent(11 + (decimNumber) / 2,'horizontal'); //6.5 procentow
            if(decimNumber > -13){
                for(let x = decimNumber +1; x > -13; x--){
                    if(x%2 === -1){
                    const linePos = this.calculate_percent(Positions[note_line + 1],'horizontal') + this.calculate_percent(10.5 + x / 2,'horizontal');
                    this.Canvas_Draw_Note_Line(pos_x,linePos);
                    }
                }
            }
            if(noteNumber  === 45){
                    const linePos = this.calculate_percent(Positions[note_line + 1],'horizontal') + this.calculate_percent(-1,'horizontal');
                    this.Canvas_Draw_Note_Line(pos_x,linePos);
            }
            if(type === 8 || type === 4 || type === 2 || type === 16 || type ===32){
                hash && this.draw_hash(pos_x - 1,notePosition);
                this.Canvas_Draw_Note(pos_x,notePosition,type);
            }
        }
        if(noteNumber >= 45){
            //72 -- mid c5
            const decimNumber = 45 - noteNumber;
            let pos_x = this.calculate_percent(Drawing_Start_Position + (note_vertical_position - ((Math.floor(note_vertical_position /64))) * 64) * 100 /32 * Bar_Width / 100,'vertical');
            const notePosition = this.calculate_percent(Positions[note_line],'horizontal') + this.calculate_percent(5 + decimNumber / 2,'horizontal'); //7.5 procentow
            if(decimNumber > -1){
                for(let x = decimNumber; x > -2; x--){
                    if(x%2 === -1){
                    const linePos = this.calculate_percent(Positions[note_line],'horizontal') + this.calculate_percent(5.5 + x / 2,'horizontal');
                    this.Canvas_Draw_Note_Line(pos_x,linePos);
                    }
                }
            }
            if(decimNumber < -13){
                for(let x = decimNumber; x < -12; x++){
                    if(x%2 === -1){
                    const linePos = this.calculate_percent(Positions[note_line],'horizontal') + this.calculate_percent(5.5 + x / 2,'horizontal');
                    this.Canvas_Draw_Note_Line(pos_x,linePos);
                    }
                }
            }
            if(type === 8 || type === 4 || type === 2 || type === 16 || type ===32){
                hash && this.draw_hash(pos_x - 1,notePosition);
                this.Canvas_Draw_Note(pos_x,notePosition,type);
            }
        }
    }

    //Drawing Functions

    private Calculate_note_number_and_hash(noteNumber:number):{SheetMusicNumber:number,hash:boolean}{
        //24 ,36 ,48,60,72,84,96
        let hash = false;
        let finalNumber = 0;
        const selector = noteNumber - 24;
        if(noteNumber - 24 >= 0){
            if((selector - 12 * (Math.floor(selector / 12))) % 12 === 0){
                //C
                finalNumber = 24 + 7 * (Math.floor(selector / 12));
            }else if((selector - 12 * (Math.floor(selector / 12))) % 11 === 0){
                // H | B
                finalNumber = 30 + 7 * (Math.floor(selector / 12));
            }else if((selector - 12 * (Math.floor(selector / 12))) % 10 === 0){
                //A#
                finalNumber = 29 + 7 * (Math.floor(selector / 12));
                hash = true;
            }else if((selector - 12 * (Math.floor(selector / 12))) % 9 === 0 ){
                // A
                finalNumber = 29 + 7 * (Math.floor(selector / 12));
            }else if((selector - 12 * (Math.floor(selector / 12))) % 8 === 0){
                //G#
                finalNumber = 28 + 7 * (Math.floor(selector / 12));
                hash = true;
            }else if((selector - 12 * (Math.floor(selector / 12))) % 7 === 0){
                // G
                finalNumber = 28 + 7 * (Math.floor(selector / 12));
            }else if((selector - 12 * (Math.floor(selector / 12))) % 6 === 0){
                //F#
                finalNumber = 27 + 7 * (Math.floor(selector / 12));
                hash = true;
            }else if((selector - 12 * (Math.floor(selector / 12))) % 5 === 0){
                // F
                finalNumber = 27 + 7 * (Math.floor(selector / 12));
            }else if((selector - 12 * (Math.floor(selector / 12))) % 4 === 0){
                // E
                finalNumber = 26 + 7 * (Math.floor(selector / 12));
            }else if((selector - 12 * (Math.floor(selector / 12))) % 3 === 0){
                //D#
                finalNumber = 25 + 7 * (Math.floor(selector / 12));
                hash = true;
            }else if((selector - 12 * (Math.floor(selector / 12))) % 2 === 0){
                // D
                finalNumber = 25 + 7 * (Math.floor(selector / 12));
            }else{
                // C#
                finalNumber = 24 + 7 * (Math.floor(selector / 12));
                hash = true;
            }
        }else{
            if(noteNumber === 23){
                finalNumber = 23;
            }
            if(noteNumber === 22){
                finalNumber = 22 
                hash = true
            }
            if(noteNumber === 21){
                finalNumber = 22
            }
        }
        return{
            SheetMusicNumber: finalNumber,
            hash:hash
        }
    }

    private Canvas_Draw_Note_Line(x:number,y:number):void{
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x + 2,y);
        this.ctx.lineTo(x+18,y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    private Canvas_Draw_Note(x:number,y:number,which:8|4|2|16|32):void{
        this.ctx.fillStyle = '#000';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(x + 10,y,5,0,Math.PI * 2);
        if(which === 16 || which ===32){
            this.ctx.stroke();
        }else{
            this.ctx.fill();
        }
        if(which !== 32){
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(x + 15,y + 3);
        this.ctx.lineTo(x + 15,y - 30);
        this.ctx.stroke();
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        if(which === 4 || which === 2){
            this.ctx.moveTo(x + 15,y + -29);
            this.ctx.lineTo(x + 25,y - 24);
        if(which === 2){
            this.ctx.moveTo(x + 15,y - 24);
            this.ctx.lineTo(x + 25,y - 19);
        }
        }
        this.ctx.stroke();
        }
    }

    private draw_hash(pos_x:number,pos_y:number):void{
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#000';
        this.ctx.beginPath();
        this.ctx.moveTo(pos_x + 2,pos_y-5);
        this.ctx.lineTo(pos_x,pos_y + 5);
        this.ctx.moveTo(pos_x + 4,pos_y-5);
        this.ctx.lineTo(pos_x + 2,pos_y + 5);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    private draw_Lines(pos:number):void{
        const pos_x = this.calculate_percent(2,'vertical');
        const width = this.calculate_percent(96,'vertical');
        this.ctx.beginPath();
        //Drawing Keys
        pos % 2 === 0 && this.ctx.drawImage(this.violinKey,pos_x,this.calculate_percent(Positions[pos] - 1,'horizontal'),40,40);
        pos % 2 === 1 && this.ctx.drawImage(this.bassKey,pos_x + 10,this.calculate_percent(Positions[pos] + 1,'horizontal'),24,24);
        //Drawing Break Lines
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(0,0,0,0.6)';
        this.ctx.moveTo(pos_x + 45,this.calculate_percent(Positions[pos] - 0.5,'horizontal'));
        this.ctx.lineTo(pos_x + 45, this.calculate_percent(Positions[pos] + 4.5,'horizontal'));
        this.ctx.moveTo(this.calculate_percent(0.5 + Drawing_Start_Position +  Bar_Width,'vertical'),this.calculate_percent(Positions[pos] - 0.5,'horizontal'));
        this.ctx.lineTo(this.calculate_percent(0.5 + Drawing_Start_Position +  Bar_Width,'vertical'),this.calculate_percent(Positions[pos] + 4.5,'horizontal'));
        this.ctx.moveTo(this.calculate_percent(0.5 + Drawing_Start_Position +  Bar_Width * 2,'vertical'),this.calculate_percent(Positions[pos] - 0.5,'horizontal'));
        this.ctx.lineTo(this.calculate_percent(0.5 + Drawing_Start_Position +  Bar_Width * 2,'vertical'),this.calculate_percent(Positions[pos] + 4.5,'horizontal'));
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#000';
        for(let x = 0; x < 5; x++){
            const pos_y = this.calculate_percent(Positions[pos] + x,'horizontal');
            this.ctx.moveTo(pos_x,pos_y);
            this.ctx.lineTo(pos_x + width,pos_y);
        }
        this.ctx.stroke();
    }
    
}