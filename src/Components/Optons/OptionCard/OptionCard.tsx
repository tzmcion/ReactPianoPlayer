import React, { ReactElement,useState } from 'react'
import './OptionCard.styles.css';

interface CardProps{
    onChange: Function;
    name: string;
    type: string;
    Important?:boolean;
    title?:string;
    children:JSX.Element | string;
    value: string|boolean
}

export default function OptionCard({onChange,name,type,Important,title,children,value}:CardProps):ReactElement {

    const [Myvalue,setValue] = useState<any>(value);

    const handleChange = (e:any) =>{
        onChange(e)
        if(e.target.type === 'checkbox'){
            setValue(!Myvalue);
        }else{
            setValue(e.target.value)
        }
    }
    return (
        <div className={`${name}Div OptionCard`}>
                <div className='CardData'>
                    {Important && <div className='Important'></div>}
                    <h1 className='OptionName'>{ title ? title:name}</h1>
                    <h3 className='description'>{children}</h3>
                    <input className={`${type}Input input`} value={Myvalue} checked={Myvalue === true ? true:false} type={type} name={name} onChange={handleChange} />
                </div>
        </div>
    )
}
