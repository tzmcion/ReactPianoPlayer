import React, { ReactElement, useState, useEffect} from 'react'
import './DrawPiano.styles.css';

import { noteEvent } from "../../Utils/TypesForMidi";
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import Tracks from '../Tracks/Tracks';
import WhiteKey from './PianoKeys/WhiteKey';
import BlackKey from './PianoKeys/BlackKey';

interface DrawPianoProps{
    Data: Array<noteEvent> | undefined,
    Speed: number,
    options: OptionsType
}

export default function DrawPiano({Data,Speed,options}:DrawPianoProps):ReactElement {

    const [WhiteKeyWidth,setWindowKeyWidth] = useState<number>(window.innerWidth / 52);
    const [windowHeight,setWindowHeight] = useState<number>(window.innerHeight);

    const drawWhitePianoKey = (pos_x:number,id:number) =>{
        return <WhiteKey WhiteKeyWidth={WhiteKeyWidth} pos_x={pos_x} Data={Data} id={id} key={id} Delay={((windowHeight - 215) * 10)/(100/Speed)} />
    }

    const drawBlackPianoKey = (pos_x:number,id:number) =>{
        return <BlackKey WhiteKeyWidth={WhiteKeyWidth} pos_x={pos_x} Data={Data} id={id} key={id} Delay={((windowHeight - 215) * 10)/(100/Speed)}/>
    }

    const handleResize = () =>{
        setWindowKeyWidth(window.innerWidth / 52);
        setWindowHeight(window.innerHeight);
    }

    useEffect(()=>{
        window.addEventListener('resize',handleResize);
    },[])

    const renderPianoKeys = () =>{
        let To_Render = [];
        let counter_ids = 21;
        for(let x = 0; x < 52; x++){
            To_Render.push(drawWhitePianoKey(WhiteKeyWidth * x,counter_ids))
            const num = counter_ids % 12;
            if(num  === 1 - 1 || num === 3 - 1 || num === 6 - 1 || num ===8 - 1 || num ===10 - 1  ){
                counter_ids++;
                if(counter_ids < 109){
                To_Render.push(drawBlackPianoKey(WhiteKeyWidth * x + WhiteKeyWidth / 1.4,counter_ids));
                }
            }
            counter_ids++;
        }
        return To_Render;
    }
    const blackKeysNumbers = () =>{
        let to_count:Array<number> = [];
        let counter_ids = 21;
        for(let x = 0; x < 52; x++){
            const num = counter_ids % 12;
            if(num  === 1 - 1 || num === 3 - 1 || num === 6 - 1 || num ===8 - 1 || num ===10 - 1  ){
                counter_ids++;
                if(counter_ids < 109){
                to_count.push(counter_ids)
                }
            }
            counter_ids++;
        }
        return to_count;
    }

    const KeysPositions = () =>{
        let positions = [];
        let counter_ids = 21;
        for(let x = 0; x < 52; x++){
            positions.push({position: WhiteKeyWidth * x, noteNumber: counter_ids})
            const num = counter_ids % 12;
            if(num  === 1 - 1 || num === 3 - 1 || num === 6 - 1 || num ===8 - 1 || num ===10 - 1  ){
                counter_ids++;
                if(counter_ids < 109){
                positions.push({position : WhiteKeyWidth * x + WhiteKeyWidth / 1.4, notenumber: counter_ids});
                }
            }
            counter_ids++;
        }
        return positions;
    }

    return (
        <div className='Piano' style={{height: windowHeight}}>
            <Tracks Width={WhiteKeyWidth * 52} Height={windowHeight-215 + 15} Speed={10} Data={Data!} BlackNumbers={blackKeysNumbers()} KeysPositions={KeysPositions()} intervalSpeed={Speed} options={options} />
            <div className='piano_keys' style={{marginTop: windowHeight + 15 - 235}}>
            {renderPianoKeys()}
            </div>
        </div>
    )
}
