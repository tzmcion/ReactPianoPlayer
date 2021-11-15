import React, { ReactElement,useState} from 'react'

interface props{
    defaultValue:boolean,
    name:string,
    onChange:Function,
    children: string
}

export default function CheckboxOption({children,defaultValue,name,onChange}:props):ReactElement {

    const [value,setValue] = useState<boolean>(defaultValue);

    const onTrigger = (e:any) =>{
        setValue(!value);
        onChange(e);
    }

    return (
        <div className='ColorOption SingleOption'>
            <h3>{children}</h3>
            <input type='checkbox' onChange={onTrigger} name={name} checked={value} />
        </div>
    )
}
