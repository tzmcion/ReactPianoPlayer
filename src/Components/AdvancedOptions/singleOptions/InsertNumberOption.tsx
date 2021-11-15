import React, { ReactElement,useState} from 'react'

interface props{
    defaultValue:number,
    name:string,
    onChange:Function,
    children: string
}

export default function InsertNumberOption({children,defaultValue,name,onChange}:props):ReactElement {

    const [value,setValue] = useState<number>(defaultValue);

    const onTrigger = (e:any) =>{
        setValue(parseInt(e.target.value) < 0 ? 0: parseInt(e.target.value));
        parseInt(e.target.value) >= 0 && onChange(e);
    }

    return (
        <div className='ColorOption SingleOption'>
            <h3>{children}</h3>
            <input type='number' onChange={onTrigger} name={name} value={value} />
        </div>
    )
}
