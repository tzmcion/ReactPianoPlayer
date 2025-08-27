import React,{ChangeEvent, useState,useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.styles.scss';

import InputFile from '../../Components/Inputfile/InputFile';
import MainBanner from '../../Components/MainBanner/MainBanner';
import NewOptions from '../../Components/NewOptions/Options';
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import { checkExtension, SaveAsBase64 } from '../../Utils/smallFunctions';
import optionsSwitch from '../../Utils/handleOptionsChange'
import DonationPrompt from '../../Components/DonationPrompt/DonationPrompt';
import { useDispatch, useSelector } from 'react-redux';
import { changeOptionValue } from '../../Utils/ReduxSlice_Options';

import previeWMidi from "../../Assets/preview_midi_mendelssohn.MID";
import Midi from '../../Assets/demo.MID';

export default function Main() {

    const [windowHeight,setWindowHeight] = useState<number>(window.innerHeight);
    const [isConfiguring,setIsConfiguring] = useState<boolean>(false);
    const history = useNavigate();
    const dispatch = useDispatch();
    const options = useSelector((state:{options:OptionsType}) => state.options);

    const handleOptionsChange = useCallback((event:ChangeEvent<HTMLInputElement> | {target:{name:string,value:any}}) =>{
        console.log(event)
        const new_Options = optionsSwitch(event,options);
        try{
            localStorage.setItem('options',JSON.stringify(new_Options));
            dispatch(changeOptionValue(new_Options));
        }catch{
            alert('this File is probably to big man');
        }
    },[options,dispatch])

    const reloadOptions = ():void =>{
        const opt = localStorage.getItem('options');
        opt && dispatch(changeOptionValue(JSON.parse(opt)))
    }

    useEffect(()=>{
        document.addEventListener('resize',()=>{setWindowHeight(window.innerHeight)});
        window.addEventListener('resize',()=>{setWindowHeight(window.innerHeight)});
        Save_Preview_Midi();
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

    const Save_Preview_Midi = async () =>{
        await fetch(previeWMidi).then(r => r.blob()).then(r =>{
            SaveAsBase64(r,'Preview_file').then(e =>{
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
