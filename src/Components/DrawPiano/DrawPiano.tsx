import React, { ReactElement, useState, useEffect} from 'react';
import './DrawPiano.styles.css';

import { noteEvent } from "../../Utils/TypesForMidi";
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import MidiPlayer from '../../Helpers/MidiPlayer';
import {TracksInterval, TracksAnimationFrame} from '../Tracks';
import soundManager from '../../Helpers/soundManager';

interface DrawPianoProps{
    Data: Array<noteEvent> | undefined,
    options: OptionsType,
    Player: MidiPlayer,
    keys_nr?:number,
    width?:number,
    height?:number
}

export default function DrawPiano({Data,options,Player,keys_nr = 52,width = window.innerWidth,height = window.innerHeight}:DrawPianoProps):ReactElement {

    const [WhiteKeyWidth,setWindowKeyWidth] = useState<number>(width / keys_nr);
    const [windowHeight,setWindowHeight] = useState<number>(height);
    const [sound,setSound] = useState<soundManager>();

    const handleResize = () =>{
        setWindowKeyWidth(width / keys_nr);
        setWindowHeight(height);
    }

    const KeysPositions = (type:('black' | 'all')):Array<any> =>{
        let Returning:Array<any> = [];
        let counter_ids:number = keys_nr === 52? 21 : Math.floor(0.4*keys_nr); //Percent of black keys 
        for(let x = 0; x < keys_nr; x++){
            type === 'all' && Returning.push({position: WhiteKeyWidth * x, noteNumber: counter_ids,width:WhiteKeyWidth});
            const num = counter_ids % 12;
            if(num  === 1 - 1 || num === 3 - 1 || num === 6 - 1 || num ===8 - 1 || num ===10 - 1  ){
                counter_ids++;
                if(counter_ids < 109){
                type ==='all' && Returning.push({position : WhiteKeyWidth * x + WhiteKeyWidth / 1.4, notenumber: counter_ids,width:WhiteKeyWidth/1.8});
                type === 'black' && Returning.push(counter_ids);
                }
            }
            counter_ids++;
        }
        return Returning;
    }

    const RenderTracks = ():ReactElement =>{
        if(options.renderMethod === 'Interval'){
            return <TracksInterval
             Speed={options.speed} Data={Data!} 
             BlackNumbers={KeysPositions('black')} 
             KeysPositions={KeysPositions('all')} 
             intervalSpeed={options.playSpeed} 
             options={options} 
             Player={Player}
             sound={sound}/>
        }else{
            return <TracksAnimationFrame
             Speed={options.playSpeed} Data={Data!}
             Width={WhiteKeyWidth*keys_nr}
             Height={windowHeight}
             BlackNumbers={KeysPositions('black')} 
             KeysPositions={KeysPositions('all')} 
             intervalSpeed={options.speed} 
             options={options} 
             Player={Player}
             sound={sound}/>
        }
    }


    useEffect(()=>{
        window.addEventListener('resize',handleResize);
        if(options.soundOn){
            setSound(new soundManager());
        }
        return () =>{window.removeEventListener('resize',handleResize)}
    },[options.soundOn])

    return (
        <div className='Piano' style={{height: windowHeight}}>
            {sound && options.soundOn && RenderTracks()}
            {!sound && options.soundOn && <div style={{width:window.innerWidth, height:window.innerHeight}} className='loading_sound'><h2>Sound Loading</h2><h3>If sound is not loading try clicking anywhere on the screen</h3></div>}
            {!options.soundOn && RenderTracks()}
        </div>
    )
}
