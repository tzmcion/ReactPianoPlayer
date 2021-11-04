import React, { ReactElement,useEffect,useState } from 'react'
import { blockNote } from "../../../Utils/TypesForMidi";

interface WhiteKeyProps{
    WhiteKeyWidth: number,
    pos_x:number,
    Data: Array<blockNote> | undefined,
    id: number,
    sound:any
}

export default function BlackKey({WhiteKeyWidth,pos_x,Data, id,sound}:WhiteKeyProps):ReactElement {

    const [backgroundColor,setBackgroundColor] = useState<string>('black');

    useEffect(()=>{
        Data?.map(event =>{
            if(event.NoteNumber === id){
                if(event.wasDetected === true){
                    setBackgroundColor('#5085f8');
                    sound && sound.instrument.play(id).stop(sound.ac.currentTime + event.duration/1000);
                }else{
                    setBackgroundColor('black');
                }
            }
            return null;
        })
    },[Data,id,sound])

    return (
        <div className='blackKey' style={{width:(WhiteKeyWidth / 1.8).toString() + 'px',left:pos_x.toString() + 'px',backgroundColor: backgroundColor,transform:`rotateX(${backgroundColor === 'black' ? '0deg': '-25deg'})`}}>
        </div>
    )
}
