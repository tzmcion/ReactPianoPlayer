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
import './Tracks.styles.css'



interface UT_props{
    number_of_white_keys:number,
    white_key_height:number,
    width:number,
    height:number,
    Player:AnimationFrameMidiPlayer
    events:TrackNoteEvent[]
    options:OptionsType,
    sound:soundManager | null,
    number_of_keys:number
}

/**
 * Component updatedTracks (replacement of /src/Components/Tracks/Tracks.tsx)
 * Performs main visualizations and playing of Midi file, can be called a heart of app
 * @returns 
 */
const UpdatedTracks = ({width,height,Player,events,options,sound,number_of_white_keys,white_key_height, number_of_keys,}:UT_props):React.ReactElement =>{
    const [blocks,setBlocks] = useState<updatedBlocks | undefined>(undefined);
    const animation_frame = useRef<any>(0);
    const mainCtx = useRef<HTMLCanvasElement>(null);
    const pianoWhite = useRef<HTMLCanvasElement>(null);
    const pianoBlack = useRef<HTMLCanvasElement>(null);
    const gradCtx = useRef<HTMLCanvasElement>(null);
    const EffectCtx = useRef<HTMLCanvasElement>(null);

    useEffect(()=>{
        return () => {
            if(animation_frame.current !== 0){
                window.cancelAnimationFrame(animation_frame.current);
            }    
        }
    },[])

    const main_animation_frame = useCallback(():any =>{
        if(blocks){
            blocks.render();
        }
        animation_frame.current = window.requestAnimationFrame(main_animation_frame);
    },[blocks])

    useEffect(()=>{
        if(blocks){
            blocks.add_blocks(events)
        }
    },[events])

    useEffect(()=>{
        if(blocks === undefined && pianoWhite.current && mainCtx.current && pianoBlack.current && gradCtx.current && EffectCtx.current){
            const context = mainCtx.current.getContext('2d')
            const black_context = pianoBlack.current.getContext('2d');
            const white_context = pianoWhite.current.getContext('2d');
            const grad_context = gradCtx.current.getContext('2d');
            const effect_context = EffectCtx.current.getContext('2d')
            if(context === null || black_context === null || white_context === null || grad_context === null || effect_context === null)return;
            const create_ctx_obj = {
                mainCtx: context,
                whiteKeyCtx:white_context,
                blackKeyCtx:black_context,
                effectsCtx:effect_context,
                KeyPressGradientCtx:grad_context
            }
            setBlocks(new updatedBlocks(create_ctx_obj,options,height,width,number_of_white_keys,width/number_of_white_keys))
        }
    },[mainCtx.current, blocks, pianoBlack.current, pianoWhite.current, EffectCtx.current])

    useEffect(()=>{
        if(blocks !== undefined){
            Player.set_pause_move_handlers(blocks.pause_playing, blocks.impel_blocks_in_places, blocks.reset);
            if(options.soundOn && sound !== null){
                blocks.set_sound_manager(sound);
            }
            main_animation_frame();
        }
    },[blocks])

    return(
        <div>
            <canvas ref={EffectCtx} width={width.toString() + 'px'} height={(height - height/5).toString() + 'px'} className="Canvas"/>
            <canvas ref={mainCtx} width={width.toString() + 'px'} height={(height - height/5).toString() + 'px'} className='Canvas'></canvas>
            <div className="Piano_Dividing_Line" style={{top:`${height - height/5 -5 }px`}}/>
            <canvas ref={gradCtx} width={width.toString() + 'px'} height={300} style={{top: `${height - height/5 - (height - height/5)/5}px`}} className="Canvas_Grad"/>
            <canvas ref={pianoWhite} width={width.toString() + 'px'} height={height/5} style={{top: `${height - height/5}px`}} className="Canvas_Piano_White"/>
            <canvas ref={pianoBlack} width={width.toString() + 'px'} height={height/5} style={{top: `${height - height/5}px`}} className="Canvas_Piano_Black"/>
            <DrawPianoKeys WhiteKeyWidth={width/number_of_white_keys} height={height/5} number_of_white_keys={number_of_white_keys} marg_top={height - height/5}/>
        </div>
    )
}

export default UpdatedTracks;