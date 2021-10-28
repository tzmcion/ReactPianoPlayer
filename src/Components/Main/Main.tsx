import React,{useRef,ChangeEvent, useState,useEffect, useCallback} from 'react';
import Soundfont from 'soundfont-player';
import './Main.styles.css';

import MidiPlayer from '../../Helpers/MidiPlayer';
import InputFile from '../Inputfile/InputFile';
import DrawPiano from '../DrawPiano/DrawPiano';
import Options from '../Optons/Options';
import Footer from '../Footer/Footer';
import PlayingManagement from '../PlayingManagement/PlayingManagement';
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import { noteEvent } from "../../Utils/TypesForMidi";
import { checkExtension } from '../../Utils/smallFunctions';

export default function Main() {

    const MidiFileRef = useRef<HTMLInputElement>(null);
    const [Player,setPlayer] = useState<MidiPlayer>();
    const [windowHeight,setWindowHeight] = useState<number>(window.innerHeight);
    const [Events,setEvents] = useState<Array<noteEvent>>();
    const [options,setOptions] = useState<OptionsType>({Color:'#e5e4e2',RandomColors:false,IsEffects:false, backgroundImage: '',speed:35, playSpeed:10, watermark:true,soundOn:true});

    const handleMidiEvent = (Events:Array<noteEvent>,instrument?:any,ac?:AudioContext) =>{
        Events.length > 0 && setEvents(Events);
        if(instrument && ac){
        Events.map(event =>{
            setTimeout(() => {instrument.play(event.NoteNumber,ac.currentTime,{gain:event.Velocity / 127 * (event.NoteNumber/10)}).stop(ac.currentTime + event.SoundDuration)}, ((window.innerHeight - 185) * 10)/(options.playSpeed * 10/options.speed));
            return null;
        })
    }
    }

    const handleClick = useCallback(
        () => {
            if(options.soundOn){
            const ac = new AudioContext();
            Player && Player.isReady && Soundfont.instrument(ac, 'acoustic_grand_piano',{ soundfont: 'MusyngKite' }).then((instrument) =>{
                Player.Play((ev:Array<noteEvent>)=>{handleMidiEvent(ev,instrument,ac)});
            })
            }else{
                Player && Player.isReady && Player.Play((ev:Array<noteEvent>)=>{handleMidiEvent(ev)});
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [Player],
    )

    const handleFileInput = () =>{
        
        if(checkExtension(MidiFileRef.current?.files![0],'mid')){
            setPlayer(new MidiPlayer(MidiFileRef))
        }else{
            alert('Error, Submited file is not MIDI file...');
        }
    }

    const handleOptionsChange = (event:ChangeEvent<HTMLInputElement>) =>{
        let currentOptions = options;
        switch(event.target.name){
            case 'color':
                currentOptions.Color = event.target.value;
                break;
            case 'RandomColors':
                currentOptions.RandomColors = !options.RandomColors;
                break;
            case 'IsEffects':
                currentOptions.IsEffects = !options.IsEffects;
                break;
            case 'Image':
                currentOptions.backgroundImage = event.target.value;
                break;
            case 'speed':
                currentOptions.speed = parseInt(event.target.value);
                break;
            case 'playSpeed':
                currentOptions.playSpeed = parseInt(event.target.value);
                break;
            case 'watermark':
                currentOptions.watermark = !options.watermark;
                break;
            case 'soundOn':
                currentOptions.soundOn = !options.soundOn;
                break;
            default:
                break;
        }
        setOptions(currentOptions);
    }

    useEffect(()=>{
        document.addEventListener('keyup',(e)=>{
            if(e.key === ' ' || e.keyCode === 32){
                if(!Player?.isPlaying){
                handleClick();
                }
            }
        })
    },[handleClick])

    useEffect(()=>{
        document.querySelector('.mainDiv')!.scrollTo(0,0);
    },[Player])

    useEffect(()=>{
        document.addEventListener('resize',()=>{setWindowHeight(window.innerHeight)});
        window.addEventListener('resize',()=>{setWindowHeight(window.innerHeight)});
    },[])


    return (
        <div style={{height:windowHeight, overflowY: Player? 'hidden': 'scroll'}} className='mainDiv'>
            {!Player && <InputFile FileRef={MidiFileRef} onFileUpload={handleFileInput} /> }
            {!Player && <Options handleOptionsChange={handleOptionsChange} options={options} />}
            {Player &&<DrawPiano drawSpeed={options.playSpeed} Player={Player} Data={Events} Speed={options.speed} options={options}/>}
            {Player && <PlayingManagement Player={Player} onEvent={handleClick}/>}
            {!Player && <Footer />}
        </div>
    )
}
