import React, {ReactElement, useRef, useEffect} from 'react';
import './InputFile.styles.css';

import MidiImage from '../../Assets/midi.png';
import DrawInCanvas from './DrawInCanvas';

interface InputFileProps{
    FileRef: React.RefObject<HTMLInputElement>,
    onFileUpload: Function,
}

export default function InputFile({FileRef,onFileUpload}:InputFileProps):ReactElement {

    const Canvas = useRef<HTMLCanvasElement>(null);

    useEffect(()=>{
        const Drawing = new DrawInCanvas(Canvas);
        const interval = setInterval(Drawing.render,45);
        return () => clearInterval(interval);
    })

    return (
        <div className='FileInputDiv'>
            <input type='file' id='file_Upload' className='FileInput' ref={FileRef} onInput={()=>{onFileUpload()}} />
            <div className='Informations'>
                <div className='flexInfo'>
                <img src={MidiImage} className='MidiImage' alt='MidiFile' />
                <h1>Drag Your MIDI File here !</h1>
                </div>
                <h2>Or Click Here To Choose File!</h2>
                </div>
            <canvas className='backgroundCanvas' ref={Canvas}/>
        </div>
    )
}
