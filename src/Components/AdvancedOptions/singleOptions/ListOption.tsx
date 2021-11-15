import React, { ReactElement,useState } from 'react'

interface CardProps{
    onChange: Function;
    name: string;
    children:JSX.Element | string;
    values: Array<string>;
    defaultValue: number | boolean | string
}

export default function ListOption({onChange,name,children,values,defaultValue}:CardProps):ReactElement {

    const [Myvalue,setValue] = useState<any>(defaultValue.toString());

    const handleChange = (e:any) =>{
        onChange(e)
        setValue(e.target.value);
    }

    const RenderOptions = () =>{
        return values.map((element,index) => <option value={element} key={index}>{element}</option>)
    }


    return (
                <div className='SingleOption'>
                    <h3>{children}</h3>
                        <select id='speeds' value={Myvalue} onChange={handleChange} name={name}>
                            {RenderOptions()}
                        </select>
                </div>
    )
}
