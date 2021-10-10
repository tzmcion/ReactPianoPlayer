import React, {useRef} from 'react'
import './InputFile.styles.css'

export default function InputFile() {

    const File = useRef<HTMLInputElement>(null);

    const handleDrag = (e:any) =>{
        console.log(e)
    }

    return (
        <div className='FileInputDiv'>
            <input type='file' id='file_Upload' className='FileInput' ref={File} onDrag={handleDrag} />
        </div>
    )
}
