import React, { ReactElement,useRef, useState } from 'react'

import {checkExtension} from '../../../Utils/smallFunctions';

interface CardProps{
    onChange: Function;
    name: string;
    type: string;
    title?:string;
    children:JSX.Element | string;
    value: string|boolean,
    textColor:string
}

export default function OptionCard({onChange,name,type,textColor,title,children,value}:CardProps):ReactElement {

    const Myvalue = useRef<any>();
    const [image,setImage] = useState<any>();

    const handleChange = () =>{
        
        function convertDataToArray64():Promise<ArrayBuffer | string> {

        if(Myvalue.current){
        const file = Myvalue.current.files![0];
        
        return new Promise<ArrayBuffer>((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = (event:any) => {
                resolve(event.target.result);
            };
    
            reader.onerror = (err) => {
                reject(err);
            };
            // reader.readAsArrayBuffer(file);
            reader.readAsDataURL(file)
        });
        }else{
          return new Promise(resolve =>{resolve('Error')})
        }
      }
      if(checkExtension(Myvalue.current?.files[0],'.jpg') || checkExtension(Myvalue.current?.files[0],'.png') || checkExtension(Myvalue.current?.files[0],'.gif')){
      convertDataToArray64().then(reading =>{
        const data = {
            target:{name:'Image', value:reading}
        };
        onChange(data);
        setImage(reading);
      })
        }
        else{
            alert('Error, Image Format Not supported');
        }
    }
    return (
        <div className={`${name}Div OptionCard`}>
                <h1 className={`Card_Title ${textColor ? textColor : ''}`} >{title}</h1>
                <h2 className='Card_Description'>{children}</h2>
                {!image && 
                    <div className='inputImageDiv'>
                    <h1>Insert Image</h1>
                    <input className={`ImageInput`} accept='.jpg,.png,.gif' ref={Myvalue} type='file' name={name} onChange={handleChange} />
                    </div>
                }
                {image && <img src={image} alt='your' className='inputImage' />}
        </div>
    )
}