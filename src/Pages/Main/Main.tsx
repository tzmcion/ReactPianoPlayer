import React,{useRef,ChangeEvent, useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import './Main.styles.css';

import InputFile from '../../Components/Inputfile/InputFile';
import Options from '../../Components/Optons/Options';
import Footer from '../../Components/Footer/Footer';
import PianoBlockDetailed from '../../Components/PianoBlockDetailed/PianoBlockDetailed';
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import { checkExtension, SaveAsBase64 } from '../../Utils/smallFunctions';
import { DefaultOptions } from '../../Utils/Default';

export default function Main() {

    const MidiFileRef = useRef<HTMLInputElement>(null);
    const [windowHeight,setWindowHeight] = useState<number>(window.innerHeight);
    const [options,setOptions] = useState<OptionsType>(DefaultOptions);
    const history = useHistory();


    const handleFileInput = () =>{
        if(checkExtension(MidiFileRef.current?.files![0],'mid')){
            localStorage.setItem('options',JSON.stringify(options))
            SaveAsBase64(MidiFileRef.current?.files![0],'file').then(e =>{
                history.push('/Play');
            });
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
            case 'renderMethod':
                if(event.target.value === 'Interval' || event.target.value === 'animationFrame'){
                    currentOptions.renderMethod = event.target.value;
                }
                break;
            case 'KeyPressColor':
                options.KeyPressColor = event.target.value;
                break;
            default:
                break;
        }
        setOptions(currentOptions);
    }

    useEffect(()=>{
        document.addEventListener('resize',()=>{setWindowHeight(window.innerHeight)});
        window.addEventListener('resize',()=>{setWindowHeight(window.innerHeight)});
    },[])

    return (
        <div style={{height:windowHeight}} className='mainDiv'>
            <InputFile FileRef={MidiFileRef} onFileUpload={handleFileInput} />
            <h2 style={{fontSize:'18px', textAlign:'center'}}>Currently Resizing During Playing is not working, sorry :C (but you can still resize before clicking 'Play' Button :) )</h2>
            <Options handleOptionsChange={handleOptionsChange} options={options} />
            <PianoBlockDetailed />
            <Footer />
        </div>
    )
}
