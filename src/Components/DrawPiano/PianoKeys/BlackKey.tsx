import React, { ReactElement,useEffect,useState } from 'react'
import { noteEvent } from "../../../Utils/TypesForMidi";

interface WhiteKeyProps{
    WhiteKeyWidth: number,
    pos_x:number,
    Data: Array<noteEvent> | undefined,
    id: number
}

export default function BlackKey({WhiteKeyWidth,pos_x,Data, id}:WhiteKeyProps):ReactElement {

    const [backgroundColor,setBackgroundColor] = useState<string>('black');

    useEffect(()=>{
        Data?.map(event =>{
            if(event.NoteNumber === id){
                setBackgroundColor('#5f014f');
                setTimeout(()=>{setBackgroundColor('black')},event.Duration/1000)
            }
            return null;
        })
    },[Data,id])

    return (
        <div className='blackKey' style={{width:(WhiteKeyWidth / 1.8).toString() + 'px',left:pos_x.toString() + 'px',backgroundColor: backgroundColor,transform:`rotateX(${backgroundColor === 'black' ? '0deg': '25deg'})`}}>
            <h1>{id}</h1>
        </div>
    )
}
