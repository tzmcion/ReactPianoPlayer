import React,{ChangeEvent, useState, useCallback} from 'react';
import './Main.styles.scss';

import InputFile from '../../Components/Inputfile/InputFile';
import MainBanner from '../../Components/MainBanner/MainBanner';
import NewOptions from '../../Components/NewOptions/Options';
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import optionsSwitch from '../../Utils/handleOptionsChange'
import DonationPrompt from '../../Components/DonationPrompt/DonationPrompt';
import { useDispatch, useSelector } from 'react-redux';
import { changeOptionValue } from '../../Utils/ReduxSlice_Options';

/**
 * Main Page/Screen of the web app, it renders the input file screen, the options screen, and banner with basic information
 * @returns 
 */
export default function Main(): React.ReactElement {

    const [isConfiguring,setIsConfiguring] = useState<boolean>(false);
    const dispatch = useDispatch();
    const options = useSelector((state:{options:OptionsType}) => state.options);

    /**
     * This function handles when the options change.
     * WHY is it in the main page? Well because of the mistakes from the past
     * It should be moved to the options page
     */
    const handleOptionsChange = useCallback((event:ChangeEvent<HTMLInputElement> | {target:{name:string,value:any}}) =>{
        const new_Options = optionsSwitch(event,options);
        try{
            localStorage.setItem('options',JSON.stringify(new_Options));
            dispatch(changeOptionValue(new_Options));
        }catch{
            alert('this File is probably to big man');
        }
    },[options,dispatch])

    //This function handles refreshing of the options when Preset changes
    const reloadOptions = (text:string):void =>{
        if(text){
            dispatch(changeOptionValue(JSON.parse(text)))
            return;
        }
        const opt = localStorage.getItem('options');
        opt && dispatch(changeOptionValue(JSON.parse(opt)))
    }

    //Clicking on configurate button
    const onConfClick = ():void =>{
        setTimeout(()=>{
            setIsConfiguring(true);
        },500);
    }

    return (
        <div className='mainDiv'>
            {/* <DonationPrompt /> */}
            <div className='mainHead'>
                <InputFile onConfClick={onConfClick} options={options} isConfOn={isConfiguring}/>
                <MainBanner />
            </div>
            <NewOptions isOpened={isConfiguring} handleOptionsChange={handleOptionsChange} reloadOptions={reloadOptions} options={options} onGoBack={()=>{setIsConfiguring(false)}} />
        </div>
    )
}
