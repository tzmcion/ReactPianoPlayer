import React, {ReactElement, useRef, useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';
import './Input.styles.scss';

import MidiImage from '../../Assets/Midi_org.png';
import DrawInCanvas from './DrawInCanvas';
import { Options } from '../../Utils/TypesForOptions';
import { checkExtension, SaveAsBase64 } from '../../Utils/smallFunctions';

interface InputFileProps{
    options:Options,
    onConfClick:Function,
    isConfOn:boolean
}

export default function InputFile({options,onConfClick,isConfOn}:InputFileProps):ReactElement {

    const MidiFileRef = useRef<HTMLInputElement>(null);
    const Canvas = useRef<HTMLCanvasElement>(null);
    const animationId = useRef<number>(0);
    const [blocks,setBlocks] = useState<DrawInCanvas>();
    const [fade,setFade] = useState<boolean>(false);
    const [is_wrong_extension, set_is_wrong_extension] = useState<boolean>(false);
    const navigation = useNavigate();

    useEffect(()=>{
        (blocks == undefined) && setBlocks(new DrawInCanvas(Canvas,options));
    },[blocks,Canvas,options])

    const render = () =>{
        if(Canvas.current && blocks){
            blocks.render("#F36300");
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
        window.innerWidth > 1370 && setFade(true);
        onConfClick();
    }

    useEffect(() => {
        if(!isConfOn){
            setTimeout(()=>{setFade(false)},250);
        }
    }, [isConfOn])

    /**
     * Function handles File Upload, and warns user if the file extension is not midi
     * @returns  void
     */
    const handleFileUpload = ():void =>{
        //Check if file sucessfully was assigned to the ref
        if(!MidiFileRef.current)return
        if(!MidiFileRef.current.files)return
        //Get the file to new variable
        const File = MidiFileRef.current.files[0]
        //Check if extension of the file is correct, if not, alert the user
        if(checkExtension(File,".MID") == false){
            //Use Materials UI to allert the user about incorrectly assigned file
            console.log("AIAI")
            set_is_wrong_extension(true)
            return;
        }
        //If the extension is correct, save the file to localStorage, and go to the "/Play" Subpage
        SaveAsBase64(MidiFileRef.current?.files![0],'file').then(res =>{
            navigation("/Play");
        })
    }

    /**
     * Function handles close of alert about error of file
     */
    const handle_error_close = ():void =>{
        set_is_wrong_extension(false);
    }

    return (
        <div className={`FileInputDiv ${fade ? 'Fade' : ''}`}>
            {/* HTML logic */}
            <input type='file' id='file_Upload' className='FileInput' accept='.mid,.midi' ref={MidiFileRef} onInput={handleFileUpload}   />
            <div className='background_rotated'>
                <canvas className='backgroundCanvas' height={window.innerHeight + 300} width={window.innerWidth > 920 ? window.innerWidth / 2 : window.innerWidth} ref={Canvas}/>
            </div>
            <div className='FileInput_Data jersey-10'>
                <img src={MidiImage} alt='midi_icon' className='Midi_Icon'  />
                <h2 className='Input_Text'>Drag Your MIDI file here to start</h2>
                <h3 className='Input_Text'>Or click here to choose the file</h3>
                <button className='Input_Configure_Bt jersey-10' onClick={onConfigureClick}>Configure</button>
            </div>
            {/* Here code to alert the user when file insrted is not a midi file */}
            <Snackbar anchorOrigin={{vertical:"bottom", horizontal:"center"}} open={is_wrong_extension} autoHideDuration={5000} onClose={handle_error_close} >
            <Alert severity="error" onClose={handle_error_close}>
                <AlertTitle><b>ERROR</b></AlertTitle>
                Provided file is not a midi file, please input a midi file.
                </Alert>
            </Snackbar>
        </div>
    )
}
