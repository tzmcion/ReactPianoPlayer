import React, { ReactElement,useEffect,useState } from 'react'
import { blockNote } from "../../../Utils/TypesForMidi";

interface WhiteKeyProps{
    WhiteKeyWidth: number,
    pos_x:number,
    Data: Array<blockNote> | undefined,
    id: number,
    sound:any,
    height:number
}

export default function BlackKey({WhiteKeyWidth,pos_x,Data, id,sound,height}:WhiteKeyProps):ReactElement {

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
        <div id={id.toString()} className='blackKey' style={{width:(WhiteKeyWidth / 1.8).toString() + 'px',height:height / 1.6,left:pos_x.toString() + 'px'}}>
        </div>
    )
}
