import React, { ReactElement,useEffect, useState } from 'react'
import { noteEvent } from "../../../Utils/TypesForMidi";

interface WhiteKeyProps{
    WhiteKeyWidth: number,
    pos_x:number,
    Data: Array<noteEvent> | undefined,
    id:number,
    Delay:number
}

export default function WhiteKey({WhiteKeyWidth,pos_x,Data,id,Delay}:WhiteKeyProps):ReactElement {

    const [backgroundColor,setBackgroundColor] = useState<string>('white');
    

    useEffect(()=>{
        Data?.map(event =>{
                if(event.NoteNumber === id && event.Velocity > 0){
                    setTimeout(()=>{
                        setBackgroundColor('#b10294');
                        setTimeout(()=>{setBackgroundColor('white')},event.Duration / 1000);
                    },Delay)
                }
            return null;
        })
    },[Data,id,Delay])

    return (
        <div className='whiteKey' style={{width:WhiteKeyWidth.toString() + 'px', left:pos_x.toString() + 'px', backgroundColor: backgroundColor, transform:`rotateX(${backgroundColor === 'white' ? '0deg': '25deg'})`}}>
            <h1>{id}</h1>
        </div>
    )
}
