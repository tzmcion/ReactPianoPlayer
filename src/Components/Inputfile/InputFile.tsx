import React, {ReactElement, useRef} from 'react';
import './InputFile.styles.css';
import MidiImage from '../../Assets/midi.png';

interface InputFileProps{
    FileRef: React.RefObject<HTMLInputElement>,
    onFileUpload: Function,
}

export default function InputFile({FileRef,onFileUpload}:InputFileProps):ReactElement {

    return (
        <div className='FileInputDiv'>
            <input type='file' id='file_Upload' className='FileInput' ref={FileRef} onInput={()=>{onFileUpload()}} />
            <div className='Informations'>
                <div className='flexInfo'>
                <img src={MidiImage} className='MidiImage' />
                <h1>Drag Your MIDI File here !</h1>
                </div>
                <h2>Or Click Here To Choose File!</h2>
                </div>
        </div>
    )
}
