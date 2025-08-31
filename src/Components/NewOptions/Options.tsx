import React, { ReactElement,useState } from 'react'
import './NewOptions.styles.scss';

import ChooseButton from './ChooseButtons/ChooseButton';
import ImageButton from './ImageButton/ImageButton';
import OptionsDescription from './OptionsDescription/OptionsDescription';

import { Options as OptionsType } from '../../Utils/TypesForOptions';
import { restoreDefaults } from '../../Utils/smallFunctions';

import {
    Options_Blocks as OptionsBlocks,
    Options_Effects as OptionsEffect,
    Options_Other as OptionsOther,
    Options_Effects_Adv as OptionsEffectsAdv,
    Options_Presets as OptionsPresets} from './OptionsType/OptionsType';

import save_img from "../../Assets/save.png"
import Preview from '../Preview/Preview';

interface OptionsProps{
    isOpened:boolean,
    onGoBack:Function,
    handleOptionsChange:Function,
    reloadOptions:Function
    options:OptionsType
}

export default function Options({isOpened,onGoBack,options,handleOptionsChange,reloadOptions}:OptionsProps):ReactElement {

    const [table,setTable] = useState<'blocks' | 'effects' | 'other' | 'presets'>('blocks');

    const change_table = (name:'blocks' | 'effects' | 'other' | 'presets'):void =>{
        setTable(name);
    }


    return (
        <div className={`Options_Main ${isOpened ? 'Opened' : ''} `}>
            <div className='background_options' />
            <div className='Options_Data'>
                <OptionsDescription type={table} />
                <div className='breakline_options' />
                    {table === 'blocks' &&  <OptionsBlocks isOpened={isOpened} onGoBack={onGoBack} options={options} handleOptionsChange={handleOptionsChange} />}
                    {table === 'effects' &&  <OptionsEffect isOpened={isOpened} onGoBack={onGoBack} options={options} handleOptionsChange={handleOptionsChange} />}
                    {table === 'other' &&  <OptionsOther isOpened={isOpened} onGoBack={onGoBack} options={options} handleOptionsChange={handleOptionsChange} />}
                    {table === 'presets' && <OptionsPresets reloadOptions={reloadOptions} options={options} />}
                    <Preview active={isOpened}/>
                    <div className='options_buttons'>
                        <ChooseButton onClick={change_table} name='blocks' title='blocks' textColor='#000' />
                        <ChooseButton onClick={change_table} name='effects' title='effects' textColor='#000' />
                        <ChooseButton onClick={change_table} name='other' title='other' textColor='#000' />
                        <ChooseButton onClick={change_table} name='presets' title='presets' textColor='#000' />
                    </div>
            </div>
            <ImageButton image={save_img} className={`Image_Save ${isOpened ? 'Bt_open' : ''}`} onClick={onGoBack} onHover={()=>{}} title='SAVE OPTIONS'/>
        </div>
    )
}
