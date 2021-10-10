import React, { ReactElement,useRef } from 'react'
import './DrawPiano.styles.css';

import { MidiEventType } from "../../Utils/TypesForMidi";
import WhiteKey from './PianoKeys/WhiteKey';
import BlackKey from './PianoKeys/BlackKey';

interface DrawPianoProps{
    Data: Array<MidiEventType> | undefined
}

export default function DrawPiano({Data}:DrawPianoProps):ReactElement {

    const Wh_Width = (parseInt(window.getComputedStyle(document.body).width.replace('px', '')) - (parseInt(window.getComputedStyle(document.body).width.replace('px', ''))/5)) / 52;
    const WhiteKeyWidth = useRef<number>(Wh_Width);

    const drawWhitePianoKey = (pos_x:number,id:number) =>{
        return <WhiteKey WhiteKeyWidth={WhiteKeyWidth.current} pos_x={pos_x} Data={Data} id={id} key={id} />
    }

    const drawBlackPianoKey = (pos_x:number,id:number) =>{
        return <BlackKey WhiteKeyWidth={WhiteKeyWidth.current} pos_x={pos_x} Data={Data} id={id} key={id}/>
    }

    const renderPianoKeys = () =>{
        let To_Render = [];
        let counter_ids = 21;
        for(let x = 0; x < 52; x++){
            To_Render.push(drawWhitePianoKey(WhiteKeyWidth.current * x,counter_ids))
            const num = x % 7;
            if(num  === 2 || num === 1 || num === 4 || num ===5 || num ===6  ){
                counter_ids++;
                To_Render.push(drawBlackPianoKey(WhiteKeyWidth.current * x - WhiteKeyWidth.current / 3.2,counter_ids));
            }
            counter_ids++;
        }
        return To_Render;
    }

    return (
        <div className='Piano'>
            {renderPianoKeys()}
        </div>
    )
}
