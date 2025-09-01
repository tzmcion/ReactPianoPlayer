import React, {useEffect, useRef, useState, MouseEvent} from 'react'
import { useNavigate } from 'react-router-dom'
import AnimationFrameMidiPlayer from '../../Helpers/MidiReader/AnimationFrameMidiPlayer'
import './UpdatedPlayingManagement.scss'

import LOGO from "../../Assets/PBA_logo.png"
import Button_Play from "../../Assets/play.png"
import Button_Pause from "../../Assets/pause.png"
import Button_Stop from "../../Assets/stop.png"

interface UPM_props{
    Player:AnimationFrameMidiPlayer
}

/**
 * Component handles the bar with "pause,play,stop,reset,move" etc. 
 * Important for user interaction and control of what is goind on with the playing
 * @param param0 
 * @returns 
 */
export default function UpdatedPlayingManagement({Player}:UPM_props):React.ReactElement {

    const timeout_ref = useRef<any>(null);
    const [dot_left,set_dot_left] = useState<number>(0);
    const [bt_display,set_bt_display] = useState<string>(Button_Play);
    const [timing, set_timing] = useState<{curr:number,length:number}>({curr:0,length:0});
    const [active, setActive] = useState<boolean>(false);
    const navi = useNavigate();

    const handlePausePlay = ():void =>{
        Player.pausePlay();
        set_bt_display(curr => curr === Button_Play ? Button_Pause : Button_Play)
    }

    const handleResetButton = ():void =>{
        Player.restart();
        set_bt_display(Button_Play)
    }

    useEffect(()=>{
        if(Player){
            const handle_timer_update = ():void =>{
                const curr = Player.Progress.Current < 0 ? 0 : Math.floor(Player.Progress.Current) / 1000
                const leng = Player.Progress.Length < 0 ? 0 : Math.floor(Player.Progress.Length) / 1000
                set_dot_left(curr*100 / leng)
                set_timing({curr:curr, length:leng})
            }
            const inter = setInterval(handle_timer_update,100);

            return () => {clearInterval(inter)}
        }
    },[Player])

    const make_timer_string = () =>{
        let curr_str, length_str
        const mins = Math.floor(timing.curr/60)
        const secs = Math.floor(timing.curr % 60);
        const mins_l = Math.floor(timing.length / 60);
        const secs_l = Math.floor(timing.length % 60)
        curr_str = mins.toString() + ":" + (secs < 10 ? "0" : "") + secs.toString();
        length_str = mins_l.toString() + ":" + (secs_l < 10 ? "0" : "") + secs_l.toString();
        return curr_str + "/" + length_str
    }

    const click_bar_handler = (ev:MouseEvent) =>{
        const target_data = ev.currentTarget.getBoundingClientRect()
        const percent = Math.floor((ev.clientX - target_data.x) *100 /target_data.width);
        Player.moveTo(percent + 1);
    }


    const set_player_active = ():void =>{
        if(active === false){
            setActive(true);
        }
        window.clearTimeout(timeout_ref.current);
        timeout_ref.current = setTimeout(()=>{
            setActive(false);
        },2000);
    }

    useEffect(()=>{
        window.addEventListener('mousemove',set_player_active);
        return () => {window.removeEventListener('mousemove',set_player_active)}
    },[])


  return (
    <div className={`Player_Manager ${active? "Player_Manager_Active" : ""}`}>
        <img className="logo_upd" onClick={()=>{navi('/'); console.log('click')}}src={LOGO} alt="PBA_LOGO" />
        <h3 className='jersey-10 titlePBA'>piano-blocks-app</h3>
        <div className='Button_Play' onClick={handlePausePlay}>
            <img src={bt_display} alt='button_for_pauseplay' />
        </div>
        <div className='Button_Reset' onClick={handleResetButton}>
            <img src={Button_Stop} alt='pause_button' />
        </div>
        <div className='Timer'>
            <h3 className='jersey-10'>{make_timer_string()}</h3>
        </div>
        <div className='Timer_Bar' onClick={click_bar_handler}>
            <div className='Time_Bar_Bar'></div>
            <div className='Time_Bar_Dot' style={{left:dot_left.toString() + '%'}}></div>
        </div>
    </div>
  )
}
