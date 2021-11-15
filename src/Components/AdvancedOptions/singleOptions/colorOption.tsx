import React, { ReactElement,useState} from 'react'

interface props{
    defaultValue:string,
    name:string,
    onChange:Function,
    children: string
}

export default function ColorOption({children,defaultValue,name,onChange}:props):ReactElement {

    const [value,setValue] = useState<string>(defaultValue);

    const onTrigger = (e:any) =>{
        setValue(e.target.value);
        onChange(e);
    }

    return (
        <div className='ColorOption SingleOption'>
            <h3>{children}</h3>
            <input type='color' onChange={onTrigger} name={name} value={value} />
        </div>
    )
}
