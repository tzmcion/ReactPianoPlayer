/**
 * This Class was created for new version on AVANT update, replacing old /src/Helpers/Blocks/Blocks.ts
 * LAST UPDATE: 07/29/2025
 * Key changes:
 * - Code refactoring
 * - Deletion of old "game" code
 * - Deletion of gradient blocks -- functionality to be aded when it is rethinked how to do
 */

import { CanvasRoundRect } from "../../Utils/CanvasFuntions";
import { TrackNoteEvent } from "../../Utils/TypesForMidi";
import {Options as OptionsType} from '../../Utils/TypesForOptions'
import { keyInfo } from "../../Utils/TypesForMidi";


/**
 * A single block which is displayed during MIDI Visualization
 */
class Block{
    private pauseTime:number
    private isDetected:boolean
    /**
     * A single block
     * @param pos_x X position of the block
     * @param pos_y initial position of the block, should be top of the screen + height of block
     * @param width width of the block
     * @param height height of the block
     * @param color color of the block
     * @param creationTime creationTime of the block, should be Date.now() or simillar function
     * @param stroke are the blocks filled or only the borders are important
     */
    constructor(private pos_x:number, private pos_y:number, private width:number, private height:number, private color:string, private creationTime:number, private stroke:boolean){
        this.pauseTime = 0;
        this.isDetected = false;
        this.updateBlock = this.updateBlock.bind(this);
        this.renderBlock = this.renderBlock.bind(this);
    };

    /**
     * Update the position of the block
     * Function returns a number indicating what should happened to the block (if it should be perceived or deleted from the array)
     * @param speed_y speed of playing, must be the same for each block
     * @param currentTime a current time, should be Date.now()
     * @param play_height pos_y where the piano starts
     * @returns returns number, 2 if the block should be deleted, 1 if the block is detected by a piano, and 0 if nothing above
     */
    public updateBlock(speed_y:number, currentTime:number, play_height:number, speed_offset:number):number{
        this.pos_y = speed_y/20 * (currentTime - (this.creationTime + this.pauseTime ))
        if(this.pos_y - this.height > play_height){
            return 2;
        }
        if(this.pos_y > play_height){
            this.isDetected = true;
            return 1;
        }
        return 0;
    }

    /**
     * Render a single block
     * @param ctx CanvasRenderingContext to render the function
     * @param options options of the playing
     * @returns void
     */
    public renderBlock(ctx:CanvasRenderingContext2D, options:OptionsType):void{
        ctx.beginPath();
        ctx.shadowColor = options.ShadowColor;
        ctx.shadowBlur = options.blockShadowRadius;
        CanvasRoundRect(ctx,this.color,this.pos_x,this.pos_y - this.height,this.width,this.height, options.blockRadius, false);

    };
}


/**
 * Blocks are the elements which are displayed in the visualization
 * This class is responsibble for:
 * - correct handling of the blocks dropping (going downwards)
 * - correct displaying when the blocks reach the piano
 * - handling the clicking animation on the piano
 * - handling the effects (makes them possible to animate)
 */
class Blocks{
    private blocks:Block[]
    private notes_to_add:TrackNoteEvent[]
    private key_positions_map:Array<keyInfo>
    private static substr_for_note = 21
    private static speed_offset = 1 / 22

    constructor(private ctx:CanvasRenderingContext2D, private effects_ctx:CanvasRenderingContext2D, private options:OptionsType, private height:number, private width:number, nr_of_keys:number, key_width:number){
        this.blocks = []
        this.notes_to_add = [];
        this.render = this.render.bind(this);
        this.add_blocks = this.add_blocks.bind(this);
        this.impel_blocks_in_places = this.impel_blocks_in_places.bind(this);
        this.pause_playing = this.pause_playing.bind(this);
        this.reset = this.reset.bind(this);
        this.key_positions_map = this.__create_key_position_map(width,nr_of_keys,key_width);
        this.__add_blocks_from_waiting_list = this.__add_blocks_from_waiting_list.bind(this);
        this.add_blocks = this.add_blocks.bind(this);
    }

    /**
     * Method render renders a blocks.
     * This Method needs to be executed in window.requestAnimationFrame function.
     * This Method is based on calculatiing time from creation to current on position calculation
     */
    public render():void{
        const new_blocks:Block[] = [];
        const curr_time = Date.now();
        this.ctx.clearRect(0,0,this.width,this.height)
        this.__add_blocks_from_waiting_list(curr_time);
        this.blocks.map(block =>{
            const result = block.updateBlock(this.options.playSpeed,curr_time,this.height,Blocks.speed_offset);
            block.renderBlock(this.ctx,this.options);
            if(result < 2)
                new_blocks.push(block);
        })
        this.blocks = new_blocks;
    };

    /**
     * Method adds blocks to the queue, which will run during frame and add all of the
     * notes during the same animation frame
     * @param blocks 
     * @returns null
     */
    public add_blocks(blocks:TrackNoteEvent[]){
        this.notes_to_add = blocks;
    };

    public impel_blocks_in_places(){};

    public pause_playing(){};

    public reset(){};

    /**
     * Function creates the blocks from the waiting list
     */
    private __add_blocks_from_waiting_list(current_time:number){
        if(this.notes_to_add.length <= 0)return;
        this.notes_to_add.map(event =>{
            console.log(event.Duration / 1000 / this.options.playSpeed)
            const newBlock:Block = new Block(
                this.key_positions_map[event.NoteNumber - Blocks.substr_for_note].position,
                0,
                this.key_positions_map[event.NoteNumber - Blocks.substr_for_note].width,
                event.Duration / 1000 / this.options.playSpeed,
                '#F0F0F0',
                current_time,
                false
            )
            this.blocks.push(newBlock);
            return null;
        })
        this.notes_to_add = [];
    }

    /**
     * Function creates a map of key positions
     */
    private __create_key_position_map(width:number,nr_of_keys:number, WhiteKeyWidth:number):keyInfo[]{
        let Returning:Array<keyInfo> = [];
        let counter_ids:number = 21
        for(let x = 0; x < nr_of_keys; x++){
            Returning.push({position: WhiteKeyWidth * x, noteNumber: counter_ids,width:WhiteKeyWidth, type:'WHITE'});
            const num = counter_ids % 12;
            if(num  === 1 - 1 || num === 3 - 1 || num === 6 - 1 || num ===8 - 1 || num ===10 - 1  ){
                counter_ids++;
                if(counter_ids < 109){
                Returning.push({position : WhiteKeyWidth * x + WhiteKeyWidth / 1.4, noteNumber: counter_ids,width:WhiteKeyWidth/1.8, type:'BLACK'});
                }
            }
            counter_ids++;
        }
        return Returning;
    }

};

export default Blocks;