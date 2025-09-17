/**
 * Component created during new version preparing for AVANT in replacement of (/src/Components/Tracks/Tracks.tsx) and (/src/Components/Tracks/TracksIntervalMethod.tsx)
 * LAST UPDATE: 12/09/2025
 * Main changes from obesolete components:
 * - width and height is nowehwere from static window.inner values
 */

import AnimationFrameMidiPlayer from "../../Helpers/MidiReader/AnimationFrameMidiPlayer";
import soundManager from "../../Helpers/soundManager";
import { TrackNoteEvent } from "../../Utils/TypesForMidi";
import { Options as OptionsType, TRACKS_CONFIGURATION as TRACKS_CONF_TYPE } from '../../Utils/TypesForOptions';
import DrawPianoKeys from "../DrawPiano/PianoKeys/AllKeys"
import updatedBlocks from "../../Helpers/Blocks/updatedBlocks"
import { useCallback, useEffect, useRef, useState } from "react";
import './Tracks.styles.css'



interface UT_props{
    number_of_white_keys:number,
    width:number,
    height:number,
    Player:AnimationFrameMidiPlayer
    options:OptionsType,
    sound:soundManager | null,
}

/**
 * Component updatedTracks (replacement of /src/Components/Tracks/Tracks.tsx)
 * Performs main visualizations and playing of Midi file, can be called a heart of app
 * @returns 
 */
const UpdatedTracks = ({width,height,Player,options,sound,number_of_white_keys}:UT_props):React.ReactElement =>{
    const [blocks,setBlocks] = useState<updatedBlocks | undefined>(undefined);
    const animation_frame = useRef<any>(0);
    const mainCtx = useRef<HTMLCanvasElement>(null);
    const pianoBlack = useRef<HTMLCanvasElement>(null);
    const EffectCtx = useRef<HTMLCanvasElement>(null);

    //
    //TODO: IMPLEMENT THIS INTO OPTIONS
    //
    const TRACKS_CONFIGURATION:TRACKS_CONF_TYPE = {
        piano_height_ratio: 1/5,
        key_wh_to_bl_ratio: 2/3
    }

    /**
     * Function handles adding the event.
     * !usecallback does not work as this function is copied.
     */
    const add_event = useCallback((ev: TrackNoteEvent[]) =>{
        if(blocks){
            blocks.add_blocks(ev);
        }
    },[blocks])

    /** Cancel animation frame when component is deleted */
    useEffect(()=>{
        return () => {
            if(animation_frame.current !== 0){
                window.cancelAnimationFrame(animation_frame.current);
            }    
        }
    },[])

    /**
     * main animation frame, renders blocks.
     */
    const main_animation_frame = useCallback(():any =>{
        if(blocks){
            blocks.render();
        }
        animation_frame.current = window.requestAnimationFrame(main_animation_frame);
    },[blocks])

    /** Handles the resizing of the page */
    useEffect(()=>{
        if(blocks){
            blocks.handle_resize(width,height,width/number_of_white_keys);
            console.log('resize')
        }

    },[width,height]);

    //Function checks if every canvas is loaded and sets it up in blocks
    useEffect(()=>{
        if(blocks === undefined && mainCtx.current && pianoBlack.current && EffectCtx.current){
            const context = mainCtx.current.getContext('2d')
            const black_context = pianoBlack.current.getContext('2d');
            const effect_context = EffectCtx.current.getContext('2d')
            if(context === null || black_context === null || effect_context === null)return;
            const create_ctx_obj = {
                mainCtx: context,
                blackKeyCtx:black_context,
                effectsCtx:effect_context,
            }
            setBlocks(new updatedBlocks(create_ctx_obj,options,height,width,number_of_white_keys,width/number_of_white_keys, TRACKS_CONFIGURATION))
        }
    },[mainCtx.current, blocks, pianoBlack.current, EffectCtx.current])

    //Here set up all functions/handlers which require blocks to exist
    useEffect(()=>{
        if(blocks !== undefined){
            Player.setEventHandler(add_event)
            Player.set_pause_move_handlers(blocks.pause_playing, blocks.impel_blocks_in_places, blocks.reset);
            if(sound !== null){
                blocks.set_sound_manager(sound);
            }
            main_animation_frame();
        }
    },[blocks])

    return(
        <div>
            <canvas ref={EffectCtx} width={width.toString() + 'px'} height={(height - height/5).toString() + 'px'} className="Canvas"/>
            <canvas ref={mainCtx} width={width.toString() + 'px'} height={(height).toString() + 'px'} className='Canvas_Main'></canvas>
            <canvas ref={pianoBlack} width={width.toString() + 'px'} height={height*TRACKS_CONFIGURATION.piano_height_ratio} style={{top: `${height - height*TRACKS_CONFIGURATION.piano_height_ratio}px`}} className="Canvas_Piano_Black"/>
            <DrawPianoKeys 
                WhiteKeyWidth={width/number_of_white_keys} 
                height={height*TRACKS_CONFIGURATION.piano_height_ratio} 
                number_of_white_keys={number_of_white_keys} 
                marg_top={height - height*TRACKS_CONFIGURATION.piano_height_ratio}
                Black_key_height_ratio={TRACKS_CONFIGURATION.key_wh_to_bl_ratio}
                />

        </div>
    )
}

export default UpdatedTracks;