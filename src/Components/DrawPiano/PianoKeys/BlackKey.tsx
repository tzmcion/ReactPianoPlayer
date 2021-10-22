import React, { ReactElement,useEffect,useState } from 'react'
import { noteEvent } from "../../../Utils/TypesForMidi";

interface WhiteKeyProps{
    WhiteKeyWidth: number,
    pos_x:number,
    Data: Array<noteEvent> | undefined,
    id: number,
    Delay:number
}

export default function BlackKey({WhiteKeyWidth,pos_x,Data, id,Delay}:WhiteKeyProps):ReactElement {

    const [backgroundColor,setBackgroundColor] = useState<string>('black');

    useEffect(()=>{
        Data?.map(event =>{
            if(event.NoteNumber === id){
                setTimeout(()=>{
                    setBackgroundColor('#5085f8');
                    setTimeout(()=>{setBackgroundColor('black')},event.Duration/1000);
                },Delay)
            }
            return null;
        })
    },[Data,id,Delay])

    return (
        <div className='blackKey' style={{width:(WhiteKeyWidth / 1.8).toString() + 'px',left:pos_x.toString() + 'px',backgroundColor: backgroundColor,transform:`rotateX(${backgroundColor === 'black' ? '0deg': '-25deg'})`}}>
        </div>
    )
}
