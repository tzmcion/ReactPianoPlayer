import React, { ReactElement,useState } from 'react'
import './NewOptions.styles.scss';

import ChooseButton from './ChooseButtons/ChooseButton';

import { Options as OptionsType } from '../../Utils/TypesForOptions';
import { restoreDefaults } from '../../Utils/smallFunctions';

import {
    Options_Blocks as OptionsBlocks,
    Options_Effects as OptionsEffect,
    Options_Other as OptionsOther,
    Options_Effects_Adv as OptionsEffectsAdv,
    Options_Presets as OptionsPresets} from './OptionsType/OptionsType';

interface OptionsProps{
    isOpened:boolean,
    onGoBack:Function,
    handleOptionsChange:Function,
    reloadOptions:Function
    options:OptionsType
}

export default function Options({isOpened,onGoBack,options,handleOptionsChange,reloadOptions}:OptionsProps):ReactElement {

    const [table,setTable] = useState<'blocks' | 'effects' | 'other' | 'Effects Adv' | 'presets'>('blocks');

    const change_table = (name:'blocks' | 'effects' | 'other' | 'Effects Adv' | 'presets'):void =>{
        setTable(name);
    }


    return (
        <div className={`Options_Main ${isOpened ? 'Opened' : ''} `}>
            <div className='background_options' />
            <div className='Options_Data'>
            <div className='breakline_options' />
                <h2>Configure Visuals</h2>
                <button className='Restore' onClick={()=>restoreDefaults()}>Restore Defaults </button>
                {table === 'blocks' &&  <OptionsBlocks isOpened={isOpened} onGoBack={onGoBack} options={options} handleOptionsChange={handleOptionsChange} />}
                {table === 'effects' &&  <OptionsEffect isOpened={isOpened} onGoBack={onGoBack} options={options} handleOptionsChange={handleOptionsChange} />}
                {table === 'Effects Adv' &&  <OptionsEffectsAdv isOpened={isOpened} onGoBack={onGoBack} options={options} handleOptionsChange={handleOptionsChange} />}
                {table === 'other' &&  <OptionsOther isOpened={isOpened} onGoBack={onGoBack} options={options} handleOptionsChange={handleOptionsChange} />}
                {table === 'presets' && <OptionsPresets reloadOptions={reloadOptions} />}
                <div className='options_buttons'>
                    <ChooseButton onClick={change_table} name='blocks' title='blocks' textColor='#44C1F8' />
                    <ChooseButton onClick={change_table} name='effects' title='effects' textColor='#7B6D8D' />
                    <ChooseButton onClick={change_table} name='Effects Adv' title='Gradients' textColor='#F95738' />
                    <ChooseButton onClick={change_table} name='other' title='other' textColor='#59CD90' />
                    <ChooseButton onClick={change_table} name='presets' title='presets' textColor='#FFD700' />
                </div>
            </div>
            <div className="Bt">
                    <button onClick={()=>{onGoBack()}} className='Bt_GoBack'>
                        <svg width="42" height="32" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_2_46)">
                                <path d="M6 14.5H4.5V17.5H6V14.5ZM37.0607 17.0607C37.6464 16.4749 37.6464 15.5251 37.0607 14.9393L27.5147 5.3934C26.9289 4.80761 25.9792 4.80761 25.3934 5.3934C24.8076 5.97918 24.8076 6.92893 25.3934 7.51472L33.8787 16L25.3934 24.4853C24.8076 25.0711 24.8076 26.0208 25.3934 26.6066C25.9792 27.1924 26.9289 27.1924 27.5147 26.6066L37.0607 17.0607ZM6 17.5H36V14.5H6V17.5Z" fill="#04839C"/>
                            </g>
                            <defs>
                                <filter id="filter0_d_2_46" x="0.499998" y="0.954056" width="41" height="30.0919" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset/>
                                    <feGaussianBlur stdDeviation="2"/>
                                    <feComposite in2="hardAlpha" operator="out"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0.0156863 0 0 0 0 0.513726 0 0 0 0 0.611765 0 0 0 0.5 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_46"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_46" result="shape"/>
                                </filter>
                            </defs>
                        </svg>
                    </button>
            </div>
        </div>
    )
}
