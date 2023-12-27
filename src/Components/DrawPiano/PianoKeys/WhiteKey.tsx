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

    const [backgroundColor,setBackgroundColor] = useState<string>('#fffff0');
    

    useEffect(()=>{
        Data?.map(event =>{
                if(event.NoteNumber === id){
                    if(event.wasDetected === true){
                        setBackgroundColor('#5085f8');
                        //sound && sound.play_key(id);
                    }else{
                        setBackgroundColor('#fffff0');
                    }
                }
            return null;
        })
    },[Data,id,sound])

    return (
        <div id={id.toString()} className='whiteKey' style={{width:WhiteKeyWidth.toString() + 'px', height:height,left:pos_x.toString() + 'px',background:backgroundColor}}>
        </div>
    )
}
