import React, { ReactElement,useEffect, useState } from 'react'
import { MidiEventType } from "../../../Utils/TypesForMidi";

interface WhiteKeyProps{
    WhiteKeyWidth: number,
    pos_x:number,
    Data: Array<MidiEventType> | undefined,
    id:number
}

export default function WhiteKey({WhiteKeyWidth,pos_x,Data,id}:WhiteKeyProps):ReactElement {

    const [backgroundColor,setBackgroundColor] = useState<string>('white');

    useEffect(()=>{
        Data?.map(event =>{
            if('noteOn' in event){
                if(event.noteOn.noteNumber === id){
                    setBackgroundColor('#063a75');
                }
            }
            if('noteOff' in event){
                if(event.noteOff.noteNumber === id){
                    setBackgroundColor('white')
                }
            }
            return null;
        })
    },[Data])

    return (
        <div className='whiteKey' style={{width:WhiteKeyWidth.toString() + 'px', left:pos_x.toString() + 'px', backgroundColor: backgroundColor}} />
    )
}
