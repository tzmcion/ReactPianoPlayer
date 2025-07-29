/**
 * Function significantly altered during new ver release update.
 * Last Update: 07/29/2025
 * - Deleted "Data" and "sound" props, deleted useState and color change as it was not used
 */


import React, { ReactElement } from 'react'

interface WhiteKeyProps{
    WhiteKeyWidth: number,
    pos_x:number,
    id:number,
    height:number
}

/**
 * Simple Component which draws <div> as a single WhiteKey and positions it accordingly by pos_x given in props
 * @param param0 props
 * @returns a single HTML.div element
 */
export default function WhiteKey({WhiteKeyWidth,pos_x,id,height}:WhiteKeyProps):ReactElement {

    return (
        <div id={id.toString()} className='whiteKey' style={{width:WhiteKeyWidth.toString() + 'px', height:height,left:pos_x.toString() + 'px',background:'#fffff0'}}>
        </div>
    )
}
