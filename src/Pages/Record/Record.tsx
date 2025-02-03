import React,{useEffect,ReactElement, useState, useRef} from 'react';
import { noteEvent } from '../../Utils/TypesForMidi';
import { useNavigate } from 'react-router-dom';
import './Record.styles.scss';

import statelessRecord from './statelessRecord';
import ConvertToPDF from './ConvertToPdf/ConvertToPdf';

import Piano from '../../Assets/piano.png'

interface Devices{
    name:string,
    id:number
}

export default function Record():ReactElement {

    const record = useRef(new statelessRecord());
    const Canvas = useRef<HTMLCanvasElement>(null);
    const Convert = useRef<ConvertToPDF>(null);
    const history = useNavigate();
    const [devices,setDevices] = useState<Array<Devices>>([]);
    const [events,setEvents] = useState<Array<noteEvent>>([]);
    const [recording,setRecording] = useState<boolean>(false);
    const [height,setHeight] = useState<number>(window.innerHeight)

    useEffect(()=>{
        if('requestMIDIAccess' in window.navigator){
        window.navigator.requestMIDIAccess().then((midiAccess) => {
            console.log("MIDI Ready!");
            for (var input of midiAccess.inputs.values()){
                const deviceName = input.name!;
                const id = Math.random()
                const device = {
                    name:deviceName,
                    id:id
                }
                input.onmidimessage = (e:any) =>{onMidiEvent(e,device.name)};
                setDevices( prev => [...prev,device])
            }
            midiAccess.onstatechange = (e:any) =>{
                const midiAccess = e.target;
                let devices = [];
                if(midiAccess){
                    for (var input of midiAccess.inputs.values()){
                        const deviceName = input.name!;
                        const id = Math.random()
                        const device = {
                            name:deviceName,
                            id:id
                        }
                        input.onmidimessage = (e:any) =>{onMidiEvent(e,device.name)};
                        devices.push(device);
                    }
                    setDevices(devices);
                }
            }
        }).catch((error) => {
            console.log("Error accessing MIDI devices: " + error);
        });
    }else{
        const device = {
            name:'Your broswer does not support MIDI :c',
            id:0
        }
        setDevices([device])
    }
        //Convertion
    },[])

    useEffect(() => {
        let file:any;
        try{
            file = JSON.parse(localStorage.getItem('fileJson')!);
        }catch{
            console.log('Error reading File');
        }
        if(file){
            Convert.current = new ConvertToPDF(file,Canvas.current?.getContext('2d')!);
        }else{
            ConvertToPDF.DrawEmptySheet(Canvas.current?.getContext('2d')!);
        }
    }, [recording])

    const onMidiEvent = (midiEvent:any,name:string) =>{
        const data= midiEvent.data;
        const velocity = (midiEvent.data.length > 2) ? midiEvent.data[2] : null;
        switch(data[0]){
            case 144:
                record.current.add(data[0],data[1],velocity);
                break;
            case 128:
                record.current.add(data[0],data[1],velocity);
                break;
            default:
                break;
        }
    }

    const PlayRecoDed_onClick = ():void =>{
        if(localStorage.getItem('fileJson')){
            history('/PlayRecorded');
        }
    }


    const renderDevices = () =>{
        if(devices.length > 0)
            return devices.map((device,index) =>{
                return <div className='device' key={index}><i className={`fa fa-circle dot ${recording?'blink':''}`} aria-hidden="true"></i><img src={Piano} alt='piano'/><h1 key={device.id}>{device.name}</h1></div>
            })
        return <h1>No device Connected</h1>
    }

    const handleResize = () =>{
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        window.addEventListener('resize',handleResize);
        return () => {
            window.removeEventListener('resize',handleResize);
        }
    }, [])

    return (
        <div className='Record' style={{height:height}}>
            <div id='backgroundRot' />
            <div className="content">
                <div className='flex-50'>
                    <h1 id='Record_Title'>Record</h1>
                    <h3 id='Record_Description'>
                        Record Midi through this app.
                        <br />
                        You can configure visuals through configure button on 'Home' page,
                        then come back here and click 'Play recorded' with different settings.
                        <br /><br />
                        <strong>Note!</strong> You can not (yet) download your recorded Midi
                        <br /><br />
                        <strong>Note!</strong> Sheet music is only demonstrative. You can base sheet music created in professional software on it, but don't use it in any "more advanced" way.
                        <br /><br />
                        <strong className='Caps'>Remember to stop recording!</strong>

                    </h3>
                    <div className='buttons'>
                        <button className='rec' onClick={()=>{record.current.startStop(events); setRecording(!recording);setEvents(record.current.list); record.current.reset()}}>Rec</button>
                        <button className='play' onClick={PlayRecoDed_onClick}>Play Recorded</button>
                    </div>
                    <h2 id='textDevices'>Connected MIDI devices :</h2>
                    <div className='devices'>
                        {renderDevices()}
                    </div>
                </div>
                <div className='flex-50'>
                    <canvas ref={Canvas} width={595} height={842} className='Canvas Canvas_Rec' />
                </div>
                </div>
        </div>
    )
}
