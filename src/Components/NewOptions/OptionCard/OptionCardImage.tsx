import React, { ReactElement,useRef, useState } from 'react'

import {checkExtension} from '../../../Utils/smallFunctions';

interface CardProps{
    onChange: Function;
    name: string;
    type: string;
    title?:string;
    children: React.ReactElement | string;
    value: string|boolean,
    textColor:string
}

export default function OptionCard({onChange,name,type,textColor,title,children,value}:CardProps):ReactElement {

    const Myvalue = useRef<any>(null);
    const [image,setImage] = useState<any>(undefined);
    const [hovered,setHovered] = useState<boolean>(false);

    const handleChange = () =>{
        
        function convertDataToArray64():Promise<ArrayBuffer | string> {

        if(Myvalue.current){
        const file = Myvalue.current.files![0];
        if(!Myvalue.current.files[0])
            {return new Promise(resolve =>{resolve('Error')})}
        
        
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


    const delete_image = ():void =>{
        const data = {target:{name:'Image', value:""}};
        onChange(data)
        setImage(undefined);
    }

    return (
        <div className='OptionCard'>
            <h1 className={`Card_Title jersey-10 ${textColor ? textColor : ''}`} >{title}</h1>
            <h2 className='Card_Description jersey-10'>{children}</h2>
            <div className='Input_Image_Container' onMouseEnter={()=>{setHovered(true)}} onMouseLeave={(()=>{setHovered(false)})}>
                <h3 className='jersey-10'>Insert IMG.</h3>
                <input className={`ImageInput`} accept='.jpg,.png,.gif' ref={Myvalue} type='file' name={name} onChange={handleChange} />
            </div>
            <div className='Input_Delete_Image' onClick={delete_image}/>
            {hovered && image && <div className='Image_Input_Preview'>
                    <h5 className='jersey-10'>Image Preview</h5>
                    <img src={image} alt='preview_image' />
            </div>}
        </div>
    )
}