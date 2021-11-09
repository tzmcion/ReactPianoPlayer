import React, { ReactElement, useState, useEffect} from 'react';
import soundFont from 'soundfont-player';
import './DrawPiano.styles.css';

import { noteEvent } from "../../Utils/TypesForMidi";
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import MidiPlayer from '../../Helpers/MidiPlayer';
import Tracks from '../Tracks/Tracks';


interface DrawPianoProps{
    Data: Array<noteEvent> | undefined,
    Speed: number,
    options: OptionsType,
    drawSpeed: number,
    Player: MidiPlayer
}

export default function DrawPiano({Data,Speed,options,drawSpeed,Player}:DrawPianoProps):ReactElement {

    const [WhiteKeyWidth,setWindowKeyWidth] = useState<number>(window.innerWidth / 52);
    const [windowHeight,setWindowHeight] = useState<number>(window.innerHeight);
    const [sound,setSound] = useState<any>();

    const handleResize = () =>{
        setWindowKeyWidth(window.innerWidth / 52);
        setWindowHeight(window.innerHeight);
    }

    const KeysPositions = (type:('black' | 'all')):Array<any> =>{
        let Returning:Array<any> = [];
        let counter_ids:number = 21;
        for(let x = 0; x < 52; x++){
            type === 'all' && Returning.push({position: WhiteKeyWidth * x, noteNumber: counter_ids});
            const num = counter_ids % 12;
            if(num  === 1 - 1 || num === 3 - 1 || num === 6 - 1 || num ===8 - 1 || num ===10 - 1  ){
                counter_ids++;
                if(counter_ids < 109){
                type ==='all' && Returning.push({position : WhiteKeyWidth * x + WhiteKeyWidth / 1.4, notenumber: counter_ids});
                type === 'black' && Returning.push(counter_ids);
                }
            }
            counter_ids++;
        }
        return Returning;
    }


    useEffect(()=>{
        window.addEventListener('resize',handleResize);
        if(options.soundOn){
            const ac = new AudioContext();
            soundFont.instrument(ac, 'acoustic_grand_piano').then(function (piano) {
                setSound({
                    instrument:piano,
                    ac:ac
                })
            })
        }
    },[options.soundOn])

    return (
        <div className='Piano' style={{height: windowHeight}}>
            <Tracks
             Speed={drawSpeed} Data={Data!} 
             BlackNumbers={KeysPositions('black')} 
             KeysPositions={KeysPositions('all')} 
             intervalSpeed={Speed} 
             options={options} 
             Player={Player}
             sound={sound}/>
        </div>
    )
}
