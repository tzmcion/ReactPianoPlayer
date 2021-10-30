import React, { ReactElement,useEffect, useState } from 'react'
import { blockNote } from "../../../Utils/TypesForMidi";

interface WhiteKeyProps{
    WhiteKeyWidth: number,
    pos_x:number,
    Data: undefined | Array<blockNote>,
    id:number,
    sound:any
}

export default function WhiteKey({WhiteKeyWidth,pos_x,Data,id,sound}:WhiteKeyProps):ReactElement {

    const [backgroundColor,setBackgroundColor] = useState<string>('white');
    

    useEffect(()=>{
        Data?.map(event =>{
                if(event.NoteNumber === id){
                        setBackgroundColor('#5085f8');
                        setTimeout(()=>{setBackgroundColor('white')},event.duration / 1000 - 15);
                        if(sound){
                        sound.instrument.play(id).stop(sound.ac.currentTime + event.duration/1000);
                        }
                }
            return null;
        })
    },[Data,id,sound])

    return (
        <div className='whiteKey' style={{width:WhiteKeyWidth.toString() + 'px', left:pos_x.toString() + 'px', backgroundColor: backgroundColor, transform:`rotateX(${backgroundColor === 'white' ? '0deg': '25deg'})`}}>
        </div>
    )
}
