import React from 'react';
import './presetCard.style.scss';
import { validate_options } from '../../../../Utils/Default';


interface Props{
    title:string,
    color:string,
    children:string | React.ReactNode
    json:any,
    onClick:Function
    updateOptions:Function
}



export default function PresetCard({title,color,children,json,updateOptions,onClick}:Props):React.ReactElement {
  const changeOptions = ():void => {
    if(typeof json == 'string'){
      const new_options = validate_options(JSON.parse(json));
      if(new_options.reloaded){
        localStorage.setItem('options', JSON.stringify(new_options.data))
        onClick();
        updateOptions();
        return
      }
      localStorage.setItem('options',json)
      onClick();
      updateOptions();
    }else{
      console.log(new Error('JSON is not a string'));
    }
  }

  return (
    <div onClick={changeOptions} className='OptionCard Option_Preset_Card'>
            <h1 className="Card_Title jersey-10" style={{textShadow:`0px 0px 2px ${color}`}}>{title}</h1>
            <h2 className='Card_Description jersey-15' >{children}</h2>
            
    </div>
  )
}
