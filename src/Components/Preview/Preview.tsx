import React, {useState, useEffect, useCallback, useRef} from 'react'
import './Preview.scss'

import DrawPiano from '../DrawPiano/DrawPiano'
import MidiPlayer from '../../Helpers/MidiPlayer'
import { noteEvent } from '../../Utils/TypesForMidi'
import { useSelector } from 'react-redux'
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import { ReadFromLocalStorageBase64 } from '../../Utils/smallFunctions'

interface Preview_props{
    is_on:boolean
}

export default function Preview({is_on}:Preview_props):React.ReactElement {

    const [Events,setEvents] = useState<Array<noteEvent>>();
    const [Player,setPlayer] = useState<MidiPlayer>();
    const file_ref = useRef<ArrayBuffer>(null);
    const options = useSelector((state:{options:OptionsType}) => state.options);

    useEffect(() => {
        if(file_ref.current === null){
            file_ref.current = ReadFromLocalStorageBase64('file');
            setPlayer(new MidiPlayer(file_ref.current,handleMidiEvent,25));
        }
    }, []);

    // useEffect(() => {
    //     Player?.Restart();
    // }, [Player])

    const handleMidiEvent = (Events:Array<noteEvent>) =>{
        Events.length > 0 && setEvents(Events);
    }

    const generateOptions = useCallback(():OptionsType =>{
        const opt = {...options};
        opt.soundOn = false;
        return opt;
    },[options])

    const await_player_ready = useCallback(async () =>{
        return new Promise((res,ret)=>{
            const inter = setInterval(()=>{
                if(Player){
                    if(Player.isReady){
                        clearInterval(inter);
                        res(true);
                    }
                }
            },500)
        })
    },[Player])

    useEffect(()=>{
        if(Player )
            await_player_ready().then(()=>{
                console.log("ai")
                Player.PausePlay()
                Player.MoveTo(2)
            })
    },[Player])

    useEffect(()=>{
        if(Player){
            if(is_on === true){
                Player.PausePlay()
                Player.MoveTo(2)
            }else{
                Player.PausePlay();
            }
        }
    },[is_on])

  return (
    <div className={`Preview_Window ${is_on === true? "Preview_ON" : ""}`}>
        {is_on && <div className='Inside_Player'>
            {Player && <DrawPiano Player={Player} Data={Events} options={generateOptions()}/>}
        </div>}
    </div>
  )
}
