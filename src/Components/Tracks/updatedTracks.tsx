/**
 * Component created during new version preparing for AVANT in replacement of (/src/Components/Tracks/Tracks.tsx) and (/src/Components/Tracks/TracksIntervalMethod.tsx)
 * LAST UPDATE: 07/29/2025
 * Main changes from obesolete components:
 * - width and height is nowehwere from static window.inner values
 * - 
 */

import AnimationFrameMidiPlayer from "../../Helpers/MidiReader/AnimationFrameMidiPlayer";
import soundManager from "../../Helpers/soundManager";
import { TrackNoteEvent } from "../../Utils/TypesForMidi";
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import DrawPianoKeys from "../DrawPiano/PianoKeys/AllKeys"
import updatedBlocks from "../../Helpers/Blocks/updatedBlocks"
import { useCallback, useEffect, useRef, useState } from "react";



interface UT_props{
    number_of_white_keys:number,
    white_key_height:number,
    width:number,
    height:number,
    Player:AnimationFrameMidiPlayer
    events:TrackNoteEvent[]
    options:OptionsType,
    sound:soundManager,
    number_of_keys:number
}

/**
 * Component updatedTracks (replacement of /src/Components/Tracks/Tracks.tsx)
 * Performs main visualizations and playing of Midi file, can be called a heart of app
 * @returns 
 */
const UpdatedTracks = ({width,height,Player,events,options,sound,number_of_white_keys,white_key_height, number_of_keys}:UT_props):React.ReactElement =>{

    const [blocks,setBlocks] = useState<updatedBlocks>();
    const mainCtx = useRef<HTMLCanvasElement>(null);

    const main_animation_frame = useCallback(():void =>{
        if(blocks){
            blocks.render();
        }
        window.requestAnimationFrame(main_animation_frame);
    },[blocks])


    useEffect(()=>{
        if(blocks){
            blocks.add_blocks(events)
        }
    },[events])

    useEffect(()=>{
        if(mainCtx.current && blocks === undefined){
            const context = mainCtx.current.getContext('2d')
            if(context === null)return;
            setBlocks(new updatedBlocks(context,context,options,height,width,number_of_white_keys,width/number_of_white_keys))
        }
    },[mainCtx.current, blocks])

    useEffect(()=>{
        if(Player.isPlaying !== true && blocks !== undefined){
            Player.set_pause_move_handlers(blocks.pause_playing, blocks.impel_blocks_in_places, blocks.reset)
            main_animation_frame();
        }
    },[blocks])

    return(
        <div>
            <canvas ref={mainCtx} width={width.toString() + 'px'} height={(height - height/5).toString() + 'px'} className='Canvas'></canvas>
            <DrawPianoKeys WhiteKeyWidth={width/number_of_white_keys} height={height/5} number_of_white_keys={number_of_white_keys} marg_top={height - height/5}/>
        </div>
    )
}

export default UpdatedTracks;