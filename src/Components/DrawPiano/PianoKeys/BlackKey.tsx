import React, { ReactElement,useEffect,useState } from 'react'
import { MidiEventType } from "../../../Utils/TypesForMidi";

interface WhiteKeyProps{
    WhiteKeyWidth: number,
    pos_x:number,
    Data: Array<MidiEventType> | undefined,
    id: number
}

export default function BlackKey({WhiteKeyWidth,pos_x,Data, id}:WhiteKeyProps):ReactElement {

    const [backgroundColor,setBackgroundColor] = useState<string>('black');

    useEffect(()=>{
        Data?.map(event =>{
            if('noteOn' in event){
                if(event.noteOn.noteNumber === id){
                    setBackgroundColor('#b40f46')
                }
            }
            if('noteOff' in event){
                if(event.noteOff.noteNumber === id){
                    setBackgroundColor('black')
                }
            }
            return null;
        })
    },[Data])

    return (
        <div className='blackKey' style={{width:(WhiteKeyWidth / 1.8).toString() + 'px',left:pos_x.toString() + 'px',backgroundColor: backgroundColor}}/>
    )
}
