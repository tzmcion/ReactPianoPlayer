import React,{useState} from 'react';
import './EffectChoose.style.scss';

interface OptionCardProps{
    type:string,
    name:string,
    onChange: Function;
    Important?:boolean;
    title?:string;
    current:string;
    children: JSX.Element | string;
    value: string|boolean,
    src:any
    textColor?: 'effects' | 'blocks' | 'speed' | 'background'
}

export default function EffectChoose({type,name,onChange,value,children,title,textColor,src,current}:OptionCardProps) {

    const [hovered,isHovered] = useState<boolean>(false);

    const onClick = ():void =>{
        const event = {
            target:{
                name: name,
                value: value
            }
        }
        onChange(event);
    }


    const onMouseEnter_Leave = (action:'leave' | 'enter') =>{
        if(action === 'enter'){
            isHovered(true);
        }
        if(action === 'leave'){
            isHovered(false);
        }
    }

    return (
        <div className={`OptionCard EffectChoose ${hovered ? 'hovered' : ''} ${current === value ? 'curr' : ''} `} onMouseEnter={()=>{onMouseEnter_Leave('enter')}} onMouseLeave={()=>{onMouseEnter_Leave('leave')}} onClick={onClick} >
            <h1 className={`Card_Title ${textColor ? textColor : ''}`} >{title}</h1>
            <h2 className='Card_Description'>{children}</h2>
            <h3 className='Click_To'>Click to choose</h3>
            {type !== "None" &&
                <video width="300" height="170" autoPlay muted loop className={`video ${!hovered ? 'hidd' : ''}`}>
                    <source src={src} type="video/mp4" />
                </video>
            }
        </div>
    )
}
