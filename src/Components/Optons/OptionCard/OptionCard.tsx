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

    const [Myvalue,setValue] = useState<any>('#FF3232');

    const handleChange = (e:any) =>{
        onChange(e)
        setValue(e.target.value);
    }
    return (
        <div className={`${name}Div OptionCard`}>
                <div className='CardData'>
                    {Important && <div className='Important'>Important</div>}
                    <h1 className='OptionName'>{ title ? title:name}</h1>
                    <h3 className='description'>{children}</h3>
                    <input className='input' value={Myvalue} type={type} name={name} onChange={handleChange} />
                </div>
        </div>
    )
}
