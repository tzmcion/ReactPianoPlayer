import React, { ReactElement,useState } from 'react'
import './OptionCardList.styles.css';

interface CardProps{
    onChange: Function;
    name: string;
    Important?:boolean;
    title?:string;
    children:JSX.Element | string;
    values: Array<string>;
    value: number | boolean | string
}

export default function OptionCard({onChange,name,Important,title,children,values,value}:CardProps):ReactElement {

    const [Myvalue,setValue] = useState<any>(value.toString());

    const handleChange = (e:any) =>{
        onChange(e)
        setValue(e.target.value);
    }

    const RenderOptions = () =>{
        return values.map((element,index) => <option value={element} key={index}>{element}</option>)
    }


    return (
        <div className={`${name}Div OptionCard`}>
                <div className='CardData'>
                    {Important && <div className='Important'></div>}
                    <h1 className='OptionName'>{ title ? title:name}</h1>
                    <h3 className='description'>{children}</h3>
                        <select id='speeds' value={Myvalue} onChange={handleChange} name={name} className={`ListInput input`} >
                            {RenderOptions()}
                        </select>
                </div>
        </div>
    )
}
