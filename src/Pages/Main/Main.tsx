import React,{ChangeEvent, useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.styles.scss';

import InputFile from '../../Components/Inputfile/InputFile';
import MainBanner from '../../Components/MainBanner/MainBanner';
import NewOptions from '../../Components/NewOptions/Options';
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import { checkExtension, SaveAsBase64 } from '../../Utils/smallFunctions';
import { DefaultOptions } from '../../Utils/Default';
import optionsSwitch from '../../Utils/handleOptionsChange'
import DonationPrompt from '../../Components/DonationPrompt/DonationPrompt';


import Midi from '../../Assets/demo.MID';

export default function Main() {

    const [windowHeight,setWindowHeight] = useState<number>(window.innerHeight);
    const [options,setOptions] = useState<OptionsType>(DefaultOptions);
    const [isConfiguring,setIsConfiguring] = useState<boolean>(false);
    const history = useNavigate();

    const handleOptionsChange = (event:ChangeEvent<HTMLInputElement> | {target:{name:string,value:any}}) =>{
        let currentOptions = optionsSwitch(event,options);
        console.log('changing options');
        try{
            localStorage.setItem('options',JSON.stringify(currentOptions));
            setOptions(currentOptions);
        }catch{
            alert('this File is probably to big man');
        }
    }

    const reloadOptions = ():void =>{
        const opt = localStorage.getItem('options');
        opt && setOptions(JSON.parse(opt));
    }

    useEffect(()=>{
        document.addEventListener('resize',()=>{setWindowHeight(window.innerHeight)});
        window.addEventListener('resize',()=>{setWindowHeight(window.innerHeight)});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const PlayDemoMidi = async () =>{
        localStorage.setItem('options',JSON.stringify(options));
        await fetch(Midi).then(r => r.blob()).then(r =>{
            SaveAsBase64(r,'file').then(e =>{
                history('/Play');
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
            <DonationPrompt />
            <div className='mainHead'>
                <InputFile onConfClick={onConfClick} options={options} isConfOn={isConfiguring}/>
                <MainBanner />
            </div>
            <NewOptions isOpened={isConfiguring} handleOptionsChange={handleOptionsChange} reloadOptions={reloadOptions} options={options} onGoBack={()=>{setIsConfiguring(false)}} />
        </div>
    )
}
