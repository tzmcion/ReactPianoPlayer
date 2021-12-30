import React, { MouseEvent, ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './PlayingManagement.scss';

import MidiPlayer from '../../Helpers/MidiPlayer';
import LogoPrototype from '../../Assets/piano_icon.png'

interface PlayingManagementProps{
    Player: MidiPlayer,
    onStart:Function
}

export default function PlayingManagement({Player,onStart}:PlayingManagementProps):ReactElement {

    const [opacity,setOpacity] = useState<number>(0);
    const history = useHistory();

    useEffect(()=>{
        let dada:any = 0;
        const move = () =>{
            clearTimeout(dada);
            dada = setTimeout(()=>{
                setOpacity(0);
            },1500);
            setOpacity(1)
        }
        document.addEventListener('mousemove',move);
        document.addEventListener('keyup',(event)=>{
            if(event.key === ' '){
                Player.PausePlay();
            }
        })
        return () => {clearTimeout(dada);document.removeEventListener('mousemove',move)}
    },[Player])

    const handlePause = ():void =>{
        if(Player.isReady){
            Player.PausePlay();
        }
    }

    const handleStop = ():void =>{
        if(Player.isReady){
            Player.Restart();
        }
    }

    const onDurClick = (ev:MouseEvent):void =>{
        const target_data = ev.currentTarget.getBoundingClientRect()
        const percent = Math.floor((ev.clientX - target_data.x) *100 /target_data.width);
        Player.MoveTo(percent);
    }

    return (
        <div className='Playing_main' style={{opacity:opacity}}>
            <div className='icons'>
            <img src={LogoPrototype} alt='Logo' onClick={()=>{history.push('/')}} title='Go back ?' className='IconGoBack LogoImg' />
            <i className="fa fa-play-circle-o" aria-hidden="true" onClick={handlePause} title='Start Playing'></i>
            <i className="fa fa-pause" aria-hidden="true" onClick={handlePause} title='Pause/Unpause'></i>
            <i className="fa fa-stop" aria-hidden="true" onClick={handleStop} title='Reset'></i>
            </div>
            {/* <h3 className='Timer'>{Math.floor(Player.timer / 1000)}/{Math.floor(Player.MidiLength / 1000)} (seconds)</h3> */}
            <CircularProgressbar 
                className='Timer' 
                value={Player.timer / 1000} 
                maxValue={Player.MidiLength / 1000} 
                text={`${Math.floor(Player.timer / 1000)}s`}
                styles={buildStyles({
                    rotation:0.75,
                    textSize:'26px',
                    textColor:'white',
                    pathColor:'#ec3a49',
                    trailColor:'#ec3a492d',
                    strokeLinecap: 10              
                    })} />;
            <div className='Duration' onClick={onDurClick}>
                <div className='Bar' style={{width: (Player.timer / Player.MidiLength * 100).toString() + '%'}} />
            </div>
        </div>
    )
}
