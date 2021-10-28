import React, { ReactElement, useEffect, useState } from 'react';
import './PlayingManagement.scss';

import MidiPlayer from '../../Helpers/MidiPlayer';

interface PlayingManagementProps{
    Player: MidiPlayer,
    onEvent:Function
}

export default function PlayingManagement({Player,onEvent}:PlayingManagementProps):ReactElement {

    const [opacity,setOpacity] = useState<number>(0);

    useEffect(()=>{
        let something:any;
        document.addEventListener('mousemove',()=>{
            something && clearTimeout(something);
            something = setTimeout(()=>{
                setOpacity(0);
            },3000);
            setOpacity(1)
        });
    },[])

    const handleClick = () =>{
        if(!Player?.isPlaying){
            onEvent();
        }
    }

    const handlePause = () =>{
        if(Player.isReady){
            Player.PausePlay();
        }
    }

    const handleStop = () =>{
        if(Player.isReady){
            Player.Restart();
        }
    }

    return (
        <div className='Playing_main' style={{opacity:opacity}}>
            <div className='icons'>
            <i className="fa fa-play-circle-o" aria-hidden="true" onClick={handleClick}></i>
            <i className="fa fa-pause" aria-hidden="true" onClick={handlePause}></i>
            <i className="fa fa-stop" aria-hidden="true" onClick={handleStop}></i>
            </div>
            <div className='Duration'>
                <div className='Bar' style={{width: (Player.timer / Player.MidiLength * 100).toString() + '%'}} />
            </div>
        </div>
    )
}
