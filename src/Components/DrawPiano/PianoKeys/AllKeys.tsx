import React, { ReactElement } from 'react';
import WhiteKey from './WhiteKey';
import BlackKey from './BlackKey';
import { blockNote } from '../../../Utils/TypesForMidi';

interface AllKeysProps{
    wh:number,
    WhiteKeyWidth:number,
    data: Array<blockNote>,
    sound:any,
    height:number
}

export default function AllKeys({wh,WhiteKeyWidth,data,sound,height}:AllKeysProps):ReactElement {

    const drawWhitePianoKey = (pos_x:number,id:number):ReactElement =>{
        return <WhiteKey WhiteKeyWidth={WhiteKeyWidth} pos_x={pos_x} Data={data} id={id} key={id} sound={sound}  height={height}/>
    }

    const drawBlackPianoKey = (pos_x:number,id:number):ReactElement =>{
        return <BlackKey WhiteKeyWidth={WhiteKeyWidth} pos_x={pos_x} Data={data} id={id} key={id} sound={sound} height={height}/>
    }

    const KeysPositions = ():Array<any> =>{
        let Returning:Array<any> = [];
        let counter_ids:number = 21;
        for(let x = 0; x < 52; x++){
            Returning.push(drawWhitePianoKey(WhiteKeyWidth * x,counter_ids));
            const num = counter_ids % 12;
            if(num  === 1 - 1 || num === 3 - 1 || num === 6 - 1 || num ===8 - 1 || num ===10 - 1  ){
                counter_ids++;
                if(counter_ids < 109){
                Returning.push(drawBlackPianoKey(WhiteKeyWidth * x + WhiteKeyWidth / 1.4,counter_ids));
                }
            }
            counter_ids++;
        }
        return Returning;
    }

    return (
        <div className='piano_keys' style={{marginTop: wh,height:height}}>
            {KeysPositions()}
        </div>
    )
}
