/**
 * Function significantly altered during new ver release update.
 * Last Update: 07/29/2025
 * - Deleted "Data" and "sound" props, deleted useState and color change as it was not used
 */


import React, { ReactElement } from 'react'

interface WhiteKeyProps{
    WhiteKeyWidth: number,
    pos_x:number,
    id: number,
    height:number
}

/**
 * Simple Component which draws blackKeys as <div> elements and possitions them as provided in props
 * @param param0 props
 * @returns A single HTML.div element
 */
export default function BlackKey({WhiteKeyWidth,pos_x, id,height}:WhiteKeyProps):ReactElement {
    return (
        <div id={id.toString()} className='blackKey' style={{width:(WhiteKeyWidth / 1.8).toString() + 'px',height:height / 1.6,left:pos_x.toString() + 'px',background:'#2A2C2E'}}>
        </div>
    )
}
