import React, {ReactElement, useRef, useEffect,useState} from 'react';
import './InputFile.styles.css';

import MidiImage from '../../Assets/midi.png';
import DrawInCanvas from './DrawInCanvas';
import { Options } from '../../Utils/TypesForOptions';

interface InputFileProps{
    FileRef: React.RefObject<HTMLInputElement>,
    onFileUpload: Function,
    options:Options
}

export default function InputFile({FileRef,onFileUpload,options}:InputFileProps):ReactElement {

    const Canvas = useRef<HTMLCanvasElement>(null);
    const animationId = useRef<number>(0);
    const [blocks,setBlocks] = useState<DrawInCanvas>();

    useEffect(()=>{
        setBlocks(new DrawInCanvas(Canvas,options,blocks?.Blocks));
    },[options])

    const render = () =>{
        blocks?.render();
        animationId.current = requestAnimationFrame(render)
    }

    useEffect(() => {
        if(blocks){
            animationId.current = requestAnimationFrame(render);
        }
        return () => {
            cancelAnimationFrame(animationId.current);
        }
    }, [blocks])

    return (
        <div className='FileInputDiv'>
            <input type='file' id='file_Upload' className='FileInput' accept='.mid,.midi' ref={FileRef} onInput={()=>{onFileUpload()}} />
            <div className='Informations'>
                <div className='flexInfo'>
                <img src={MidiImage} className='MidiImage' alt='MidiFile' />
                <h1>Drag Your MIDI file here to start visualizing !</h1>
                </div>
                <h2>Or click here to choose file!</h2>
                </div>
                <div className="app_description">
                    <h2>Piano Blocks App is a web midi player/visualizer. It main purpose is to visualize and play midis recorded by pianists.
                        <br />
                        You can start imidiatelly by draging your midi file, or you can change options to decide, how app will display blocks for you.
                        <br/>
                        Be aware that this project is still at it's childhood. It may be bugged in various places, it can look ugly somewhere, it can be user unfriendly/UI may be bad.
                        <br/>
                        Any functionality that you meet here bugged will be fixed, as long as you contact me (email at the bottom of the page [driver's id icon]).
                        <br/>
                        If you have any ideas of inprovement/better UI alaso please contact me as it really helps to have feedback.
                        <br/>
                        If youre experience with app is unpleasant, please consider coming back here in January 2022.
                        <br/>
                        Version 1.0 of app will be released between 10.01.2022/30.01.2022, which wersion will have functions like:
                        <br />
                        Recording Midis <span id='small'>(Beta already avaliable)</span>, Exporting Midis to sheet Music pdf, Mini rythmic game, ? Playing music from images/sheet music png's, jpg's ?
                        <br/><br />
                        Enjoy using Piano Blocks !
                    </h2>
                </div>
            <canvas className='backgroundCanvas' ref={Canvas}/>
        </div>
    )
}
