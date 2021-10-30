import React, { ReactElement } from 'react';
import WhiteKey from './WhiteKey';
import BlackKey from './BlackKey';
import { blockNote } from '../../../Utils/TypesForMidi';

interface AllKeysProps{
    wh:number,
    WhiteKeyWidth:number,
    data: Array<blockNote>,
    sound:any
}

export default function AllKeys({wh,WhiteKeyWidth,data,sound}:AllKeysProps):ReactElement {

    const drawWhitePianoKey = (pos_x:number,id:number):ReactElement =>{
        return <WhiteKey WhiteKeyWidth={WhiteKeyWidth} pos_x={pos_x} Data={data} id={id} key={id} sound={sound} />
    }

    const drawBlackPianoKey = (pos_x:number,id:number):ReactElement =>{
        return <BlackKey WhiteKeyWidth={WhiteKeyWidth} pos_x={pos_x} Data={data} id={id} key={id} sound={sound}/>
    }

    const KeysPositions = (type:('black' | 'all' | 'piano')):Array<any> =>{
        let Returning:Array<any> = [];
        let counter_ids:number = 21;
        for(let x = 0; x < 52; x++){
            type === 'piano' && Returning.push(drawWhitePianoKey(WhiteKeyWidth * x,counter_ids));
            type === 'all' && Returning.push({position: WhiteKeyWidth * x, noteNumber: counter_ids});
            const num = counter_ids % 12;
            if(num  === 1 - 1 || num === 3 - 1 || num === 6 - 1 || num ===8 - 1 || num ===10 - 1  ){
                counter_ids++;
                if(counter_ids < 109){
                type ==='all' && Returning.push({position : WhiteKeyWidth * x + WhiteKeyWidth / 1.4, notenumber: counter_ids});
                type === 'piano' && Returning.push(drawBlackPianoKey(WhiteKeyWidth * x + WhiteKeyWidth / 1.4,counter_ids));
                type === 'black' && Returning.push(counter_ids);
                }
            }
            counter_ids++;
        }
        return Returning;
    }

    return (
        <div className='piano_keys' style={{marginTop: wh - 235}}>
            {KeysPositions('piano')}
        </div>
    )
}
