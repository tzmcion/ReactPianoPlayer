import React, { ReactElement,useState,useEffect, useRef } from 'react'
import './OptionCard.style.scss';
import './Input.styles.scss';

interface OptionCardProps{
    type:string,
    name:string,
    onChange: Function;
    Important?:boolean;
    title?:string;
    children: React.ReactNode | React.ReactElement | string;
    value: string|boolean,
    textColor?: 'effects' | 'blocks' | 'speed' | 'background'
}

export default function OptionCard({type,name,onChange,value,children,title,textColor}:OptionCardProps):ReactElement {

    const [Myvalue,setValue] = useState<any>(value);
    const [text_inp_value,set_text_inp_value] = useState<string>(value as string);
    const inputRef = useRef<HTMLInputElement>(null);

    const get_input_value = ():string => {
        if(inputRef.current){
            return inputRef.current.value;
        }else{
            return value as string;
        }
    }

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
            set_text_inp_value(get_input_value());
        }
    }

    const change_color_input = (event:any):void =>{
        const text = event.target.value as string;
        if(text[0] === '#' && text.length === 7){
            setValue(event.target.value);
            onChange(event)
        }
        set_text_inp_value(text);
    }

    useEffect(()=>{
        setValue(value);
    },[value])

    return (
        <div className='OptionCard'>
            <h1 className={`Card_Title jersey-10 ${textColor ? textColor : ''}`} >{title}</h1>
            <h2 className='Card_Description jersey-10'>{children}</h2>
            <div className='Input_Container'>
                <input value={Myvalue} ref={inputRef} checked={Myvalue === true ? true:false} type={type} name={name} onChange={handleChange} className={`jersey-10 ${type==='checkbox' ? 'checkboxInput' : type==='number' ? 'numberInput' : ''}`} />
                {type === "color" && <><h3 className='jersey-10'>Hex:</h3> <input className='Hex_Input jersey-10' type='text' value={text_inp_value} onChange={change_color_input} name={name} /></>}
                {type === "checkbox" && <h4 className={`jersey-10 ${Myvalue === true ? "In_Green" : "In_Red"}`}>{Myvalue === true ? "Enabled" : "Disabled"}</h4>}
            </div>
        </div>
    )
}
