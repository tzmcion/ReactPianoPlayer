import React,{useEffect,ReactElement, useState, useRef} from 'react';
import { noteEvent } from '../../Utils/TypesForMidi';
import { useHistory } from 'react-router-dom';
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
    const Convert = useRef<ConvertToPDF>();
    const history = useHistory();
    const [devices,setDevices] = useState<Array<Devices>>([]);
    const [events,setEvents] = useState<Array<noteEvent>>([]);
    const [recording,setRecording] = useState<boolean>(false);
    const height = useRef<number>(window.innerHeight);

    useEffect(()=>{
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


    const renderDevices = () =>{
        if(devices.length > 0)
            return devices.map((device,index) =>{
                return <div className='device' key={index}><i className={`fa fa-circle dot ${recording?'blink':''}`} aria-hidden="true"></i><img src={Piano} alt='piano'/><h1 key={device.id}>{device.name}</h1></div>
            })
        return <h1>No device Connected</h1>
    }

    return (
        <div className='Record' style={{height:height.current}}>
            <div id='backgroundRot' />
            <div className="content">
            <div className='flex-50'>
                <h1 id='Record_Title'>Record / Play</h1>
                <h3 id='Record_Description'>Welcome to the Record page! Here you can record your playing and then use PianoBlocksApp to visualize it. It's super simple. Click "Rec" button, then play, then click it again, and click "Play Recorded"</h3>
                <div className='buttons'>
                    <button className='rec' onClick={()=>{record.current.startStop(events); setRecording(!recording);setEvents(record.current.list); record.current.reset()}}>Rec</button>
                    <button className='play' onClick={()=>{history.push('/PlayRecorded')}}>Play Recorded</button>
                </div>
                <h2 id='textDevices'>Connected MIDI devices :</h2>
                <div className='devices'>
                    {renderDevices()}
                </div>
            </div>
            <div className='flex-50'>
                <canvas ref={Canvas} width={595} height={842} className='Canvas' />
            </div>
            </div>
        </div>
    )
}
