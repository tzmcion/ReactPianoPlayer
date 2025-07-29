/**
 * Function significantly altered during new ver release update.
 * Last Update: 07/29/2025
 * - Deleted "Data" and "sound" from Props, added number_of_white_keys
 * - changed KeysPosition render from fixed 52 to "number_of_white_keys"
 */

import React, { ReactElement } from 'react';
import WhiteKey from './WhiteKey';
import BlackKey from './BlackKey';

interface AllKeysProps{
    marg_top:number,
    WhiteKeyWidth:number,
    number_of_white_keys:number,
    height:number
}
/**
 * Function draws piano Keys on in a single div element
 * @param param0 
 * @returns 
 */
export default function AllKeys({marg_top,WhiteKeyWidth,number_of_white_keys,height}:AllKeysProps):ReactElement {

    const drawWhitePianoKey = (pos_x:number,id:number):ReactElement =>{
        return <WhiteKey WhiteKeyWidth={WhiteKeyWidth} pos_x={pos_x} id={id} key={id} height={height}/>
    }

    const drawBlackPianoKey = (pos_x:number,id:number):ReactElement =>{
        return <BlackKey WhiteKeyWidth={WhiteKeyWidth} pos_x={pos_x} id={id} key={id} height={height}/>
    }

    const KeysPositions = ():Array<any> =>{
        let Returning:Array<any> = [];
        let counter_ids:number = 21;
        for(let x = 0; x < number_of_white_keys; x++){
            Returning.push(drawWhitePianoKey(WhiteKeyWidth * x,counter_ids));
            const num = counter_ids % 12;
            if(num  === 1 - 1 || num === 3 - 1 || num === 6 - 1 || num ===8 - 1 || num ===10 - 1  ){
                counter_ids++;
                if(counter_ids < 109){
                    if(WhiteKeyWidth * x + WhiteKeyWidth / 1.4 + WhiteKeyWidth < WhiteKeyWidth*number_of_white_keys){
                        Returning.push(drawBlackPianoKey(WhiteKeyWidth * x + WhiteKeyWidth / 1.4,counter_ids));
                    }

                }
            }
            counter_ids++;
        }
        return Returning;
    }

    return (
        <div className='piano_keys' style={{marginTop: marg_top,height:height}}>
            {KeysPositions()}
        </div>
    )
}
