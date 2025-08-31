import React, {useRef} from 'react'
import { Options as OptionsType } from '../../../../Utils/TypesForOptions';
import { checkExtension, read_as_text } from '../../../../Utils/smallFunctions';

interface ImpSaveProps{
    reloadOptions: Function,
    options:OptionsType,
    onImport: Function
}

export default function ImportSaveCard({reloadOptions, options, onImport}:ImpSaveProps) {

  const inp_ref = useRef<HTMLInputElement>(null);

  const save_current_preset = ():void =>{
      const today = new Date()
      const title = "piano-blocks-app-preset" + today.toJSON().slice(0,10).replace(/-/g,'/') +'_' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ".PBAJ";
      const blob = new Blob([JSON.stringify(options)],{type:'application/json'});
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const import_preset = ():void =>{
      if(inp_ref.current === null) return;
      if(inp_ref.current.files === null)return;
      const file = inp_ref.current.files[0];
      if(checkExtension(file,".PBAJ") === false){
        //Alert user the file format is incorrect
        console.log('wrong_rxt')
      }
      read_as_text(file).then(async text =>{
        localStorage.setItem('options',text);
        console.log('Loaded')
        reloadOptions(text);
        onImport();
      })
  };


  return (
    <div className='Import_Save_Card'>
        <div className='Import_Preset'>
          <h2 className='jersey-10'>Import Preset [.PBAJ file]</h2>
          <input type='file' ref={inp_ref} onChange={import_preset}/>
        </div>
        <div className='Save_Preset' onClick={save_current_preset}>
          <h2 className='jersey-10'>Save current Preset</h2>
        </div>
    </div>
  )
}
