import React,{ReactElement, useState} from 'react';
import './OptionGameMode.scss';

interface props{
    name:string,
    value:any,
    onChange: Function
}

export default function OptionGameMode({name,value,onChange}:props):ReactElement {

    const [Myvalue,setValue] = useState<any>(false);

    return (
        <div className='GameModeCard'>
            <div className='inner'>
                <h1>Game Mode</h1>
                <h2>Play rythmic Game, score the highest possible score, and fell like a real pianist !</h2>
                <input type="checkbox" name='gameMode' value={Myvalue} checked={Myvalue ? true:false} onChange={(e)=>{onChange(e); setValue(!Myvalue)}} />
            </div>
        </div>
    )
}
