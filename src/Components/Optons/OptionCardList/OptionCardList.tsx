import React, { ReactElement,useState } from 'react'
import './OptionCardList.styles.css';

interface CardProps{
    onChange: Function;
    name: string;
    Important?:boolean;
    title?:string;
    children:JSX.Element | string;
    value: string|boolean
}

export default function OptionCard({onChange,name,Important,title,children,value}:CardProps):ReactElement {

    const [Myvalue,setValue] = useState<any>('35');

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
                        <select id='speeds' value={Myvalue} onChange={handleChange} name='speed' className={`ListInput input`} >
                            <option value="20" >20</option>
                            <option value="30" >30</option>
                            <option value="35" >35</option>
                            <option value="40" >40</option>
                            <option value="50" >50</option>
                            <option value="75" >75</option>
                            <option value="100" >100</option>
                        </select>
                </div>
        </div>
    )
}
