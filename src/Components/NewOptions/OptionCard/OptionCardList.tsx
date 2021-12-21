import React, { ReactElement,useState } from 'react'
import './OptionCard.style.scss';
import './Input.styles.scss';

interface OptionCardProps{
    name:string,
    onChange: Function;
    Important?:boolean;
    title?:string;
    children:JSX.Element | string;
    value: string|boolean,
    values:Array<any>
}

export default function OptionCard({name,onChange,value,children,title,values}:OptionCardProps):ReactElement {

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

    const RenderOptions = () =>{
        return values.map((element,index) => <option value={element} key={index}>{element}</option>)
    }

    return (
        <div className='OptionCard'>
            <h1 className='Card_Title' >{title}</h1>
            <h2 className='Card_Description'>{children}</h2>
            <select id='speeds' value={Myvalue} onChange={handleChange} name={name}>
                            {RenderOptions()}
            </select>
        </div>
    )
}
