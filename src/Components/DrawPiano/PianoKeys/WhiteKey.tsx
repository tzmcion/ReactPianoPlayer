import React, { ReactElement,useEffect, useState } from 'react'
import { blockNote } from "../../../Utils/TypesForMidi";

interface WhiteKeyProps{
    WhiteKeyWidth: number,
    pos_x:number,
    Data: undefined | Array<blockNote>,
    id:number,
    sound:any,
    height:number
}

export default function WhiteKey({WhiteKeyWidth,pos_x,Data,id,sound,height}:WhiteKeyProps):ReactElement {

    const [backgroundColor,setBackgroundColor] = useState<string>('white');
    

    useEffect(()=>{
        Data?.map(event =>{
                if(event.NoteNumber === id){
                    if(event.wasDetected === true){
                        setBackgroundColor('#5085f8');
                        sound && sound.instrument.play(id).stop(sound.ac.currentTime + event.duration/1000);
                    }else{
                        setBackgroundColor('white');
                    }
                }
            return null;
        })
    },[Data,id,sound])

    return (
        <div className='whiteKey' style={{width:WhiteKeyWidth.toString() + 'px', height:height,left:pos_x.toString() + 'px', backgroundColor: backgroundColor, transform:`scale(${backgroundColor === 'white' ? '1': '0.95'})`}}>
        </div>
    )
}
