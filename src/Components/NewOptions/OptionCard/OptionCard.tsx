import React, { ReactElement,useState,useEffect } from 'react'
import './OptionCard.style.scss';
import './Input.styles.scss';

interface OptionCardProps{
    type:string,
    name:string,
    onChange: Function;
    Important?:boolean;
    title?:string;
    children:JSX.Element | string;
    value: string|boolean,
    textColor?: 'effects' | 'blocks' | 'speed' | 'background'
}

export default function OptionCard({type,name,onChange,value,children,title,textColor}:OptionCardProps):ReactElement {

    const [Myvalue,setValue] = useState<any>(value);

    const handleChange = (e:any) =>{
        onChange(e)
        if(e.target.type === 'checkbox'){
            setValue(!Myvalue);
        }else if(e.target.type === 'number'){
            setValue(parseInt(e.target.value) < 0 ? 0: parseInt(e.target.value));
            parseInt(e.target.value) >= 0 && onChange(e);
        }
        else{
            setValue(e.target.value)
        }
    }

    useEffect(()=>{
        setValue(value);
    },[value])

    return (
        <div className='OptionCard'>
            <h1 className={`Card_Title ${textColor ? textColor : ''}`} >{title}</h1>
            <h2 className='Card_Description'>{children}</h2>
            <input value={Myvalue} checked={Myvalue === true ? true:false} type={type} name={name} onChange={handleChange} className={`${type==='checkbox' ? 'checkboxInput' : type==='number' ? 'numberInput' : ''}`} />
        </div>
    )
}
