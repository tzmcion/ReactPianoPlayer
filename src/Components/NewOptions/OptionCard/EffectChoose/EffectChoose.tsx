import React,{useState} from 'react';
import '../OptionCard.style.scss';
import './EffectChoose.style.scss';
import OptionCard from '../OptionCard';

interface OptionCardProps{
    name:string,
    onChange: Function;
    title?:string;
    current:string;
    children: React.ReactElement | string;
    value: string|boolean,
    textColor?: 'effects' | 'blocks' | 'speed' | 'background'
}

export default function EffectChoose({name,onChange,value,children,title,textColor,current}:OptionCardProps) {

    const onClick = ():void =>{
        const event = {
            target:{
                name: name,
                value: value
            }
        }
        onChange(event);
    }

    return (
        <div className={`OptionCard EffectCard ${current === value ? 'Curr_opt' : ''}`} onClick={onClick}>
            <h1 className={`Card_Title jersey-10 ${textColor ? textColor : ''}`} >{title}</h1>
            <h2 className='Card_Description jersey-10'>{children}</h2>
        </div>
    )
}
