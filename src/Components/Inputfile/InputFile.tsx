import React, {ReactElement, useRef, useEffect,useState} from 'react';
import './Input.styles.scss';

import MidiImage from '../../Assets/midi.png';
import DrawInCanvas from './DrawInCanvas';
import { Options } from '../../Utils/TypesForOptions';

interface InputFileProps{
    FileRef: React.RefObject<HTMLInputElement>,
    onFileUpload: Function,
    options:Options,
    onConfClick:Function,
    isConfOn:boolean
}

export default function InputFile({FileRef,onFileUpload,options,onConfClick,isConfOn}:InputFileProps):ReactElement {

    const Canvas = useRef<HTMLCanvasElement>(null);
    const animationId = useRef<number>(0);
    const [blocks,setBlocks] = useState<DrawInCanvas>();
    const [fade,setFade] = useState<boolean>(false);

    useEffect(()=>{
        !blocks && setBlocks(new DrawInCanvas(Canvas,options));
    },[blocks,Canvas,options])

    const render = () =>{
        if(Canvas.current){
            blocks?.render(options.Color);
            animationId.current = requestAnimationFrame(render);
        }
    }

    useEffect(() => {
        if(blocks){
            animationId.current = requestAnimationFrame(render);
        }
        return () => {
            cancelAnimationFrame(animationId.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blocks])

    const onConfigureClick = () => {
        setFade(true);
        setTimeout(onConfClick,500);
    }

    useEffect(() => {
        if(!isConfOn){
            setTimeout(()=>{setFade(false)},250);
        }
    }, [isConfOn])

    return (
        <div className={`FileInputDiv ${fade ? 'Fade' : ''}`}>
            <input type='file' id='file_Upload' className='FileInput' accept='.mid,.midi' ref={FileRef} onInput={()=>{onFileUpload()}}   />
            <div className='background_rotated'>
                <canvas className='backgroundCanvas' height={window.innerHeight + 300} width={window.innerWidth / 2} ref={Canvas}/>
            </div>
            <div className='FileInput_Data'>
                <img src={MidiImage} alt='midi_icon' className='Midi_Icon'  />
                <h2 className='Input_Text'>Drag Your MIDI file here to start visualizing !</h2>
                <h3 className='Input_Text'>Or click here to choose file!</h3>
                <button className='Input_Configure_Bt' onClick={onConfigureClick}>Configure</button>
            </div>
        </div>
    )
}
