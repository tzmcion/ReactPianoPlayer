import React,{useRef,ChangeEvent, useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import './Main.styles.scss';

import InputFile from '../../Components/Inputfile/InputFile';
import NewOptions from '../../Components/NewOptions/Options';
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import { checkExtension, SaveAsBase64 } from '../../Utils/smallFunctions';
import { DefaultOptions } from '../../Utils/Default';

import Logo from '../../Assets/piano_icon.png';

import Midi from '../../Assets/demo.MID';

export default function Main() {

    const MidiFileRef = useRef<HTMLInputElement>(null);
    const [windowHeight,setWindowHeight] = useState<number>(window.innerHeight);
    const [options,setOptions] = useState<OptionsType>(DefaultOptions);
    const [isConfiguring,setIsConfiguring] = useState<boolean>(false);
    const history = useHistory();


    const handleFileInput = () =>{
        if(checkExtension(MidiFileRef.current?.files![0],'mid')){
            localStorage.setItem('options',JSON.stringify(options))
            SaveAsBase64(MidiFileRef.current?.files![0],'file').then(e =>{
                if(options.GameMode){
                    history.push('/GameMode');
                }else{
                    history.push('/Play');
                }
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
            case 'Thincolor':
                currentOptions.ThinerBlockColor = event.target.value;
                break;
            case 'GradientCol':
                currentOptions.GradientColor = event.target.value;
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
                currentOptions.KeyPressColor = event.target.value;
                break;
            case 'blockShadowColor':
                currentOptions.blockShadowRadius = parseInt(event.target.value);
                break;
            case 'blockRadius':
                currentOptions.blockRadius = parseInt(event.target.value);
                break;
            case 'Effect':
                if(event.target.value === 'fountain' || event.target.value === 'dancingLines' || event.target.value === 'hexagon' || event.target.value === 'stickyBalls' || event.target.value === 'fireworks'){
                    currentOptions.Effect = event.target.value;}
                break;
            case 'shadowColor':
                currentOptions.ShadowColor = event.target.value;
                break;
            case 'EffectsBlockColor':
                currentOptions.EffectsBlockColor = !currentOptions.EffectsBlockColor
                break;
            case 'EffectsKeyColor':
                currentOptions.EffectsKeyColor = !currentOptions.EffectsKeyColor;
                break;
            case 'randomEffectsColor':
                currentOptions.randomEffectColors = !currentOptions.randomEffectColors;
                break;
            case 'EffectsColor':
                currentOptions.EffectsColor = event.target.value;
                break;
            default:
                break;
        }
        localStorage.setItem('options',JSON.stringify(currentOptions))
        setOptions(currentOptions);
    }

    useEffect(()=>{
        document.addEventListener('resize',()=>{setWindowHeight(window.innerHeight)});
        window.addEventListener('resize',()=>{setWindowHeight(window.innerHeight)});
    },[]);

    const PlayDemoMidi = async () =>{
        await fetch(Midi).then(r => r.blob()).then(r =>{
            localStorage.setItem('options',JSON.stringify(options))
            SaveAsBase64(r,'file').then(e =>{
                if(options.GameMode){
                    history.push('/GameMode');
                }else{
                    history.push('/Play');
                }
            });
            
        })
    }

    const onConfClick = ():void =>{
        setTimeout(()=>{
            setIsConfiguring(true);
        },500);
    }

    return (
        <div style={{height:windowHeight}} className='mainDiv'>
            <div className='mainHead'>
                <InputFile FileRef={MidiFileRef} onFileUpload={handleFileInput} onConfClick={onConfClick} options={options} isConfOn={isConfiguring}/>
                <div className='Main_data'>
                    <img src={Logo} className='Logo' alt='Logo' />
                    <h1 className='Main_data_Text Title'>Web midi player/visualizer/recorder for piano</h1>
                    <h3 className='Main_data_Text Description'>
                    Piano Blocks App is a web midi player/visualizer. 
                    It main purpose is to visualize and play midis recorded by pianists.

                    You can start imidiatelly by draging your midi file,
                    or you can change options to decide, how app will display blocks for you.

                    Be aware that this project is still at it's childhood. 
                    It may be bugged in various places, it can look ugly somewhere,
                    it can be user unfriendly/UI may be bad.
                    <br /><br />
                    Enjoy using Piano Blocks !
                    </h3>
                </div>
            </div>
            <button className='Demo_Bt' onClick={PlayDemoMidi}>Play demo song</button>
            <NewOptions isOpened={isConfiguring} handleOptionsChange={handleOptionsChange} options={options} onGoBack={()=>{setIsConfiguring(false)}} />
        </div>
    )
}
