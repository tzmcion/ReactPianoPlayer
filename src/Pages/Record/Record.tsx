import React,{useEffect,ReactElement, useState, useRef} from 'react';
import { noteEvent } from '../../Utils/TypesForMidi';
import { useHistory } from 'react-router-dom';
import './Record.styles.scss';

import Footer from '../../Components/Footer/Footer';
import statelessRecord from './statelessRecord';

import Piano from '../../Assets/piano.png'

interface Devices{
    name:string,
    id:number
}

export default function Record():ReactElement {

    const record = useRef(new statelessRecord());
    const history = useHistory();
    const [devices,setDevices] = useState<Array<Devices>>([]);
    const [events,setEvents] = useState<Array<noteEvent>>([]);
    const [recording,setRecording] = useState<boolean>(false);
    const [height,windowHeight] = useState<number>(window.innerHeight);

    useEffect(()=>{
        document.body.style.backgroundColor = 'white';
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
    },[])

    const onMidiEvent = (midiEvent:any,name:string) =>{
        const data= midiEvent.data;
        const command = data[0];
        const noteNumber = data[1];
        const velocity = (midiEvent.data.length > 2) ? midiEvent.data[2] : null;
        switch(command){
            case 144:
                record.current.add(command,noteNumber,velocity);
                break;
            case 128:
                record.current.add(command,noteNumber,velocity);
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

    const renderEvents = () =>{
        if(events.length > 0){
        return events.map((event:noteEvent,index) =>{
            return <div key={index} className='Event'>
                <h3 className='title_ev'>Event: </h3>
                <h3 className='delta'>Delta - {event.Delta}μs</h3>
                <h3 className='noteNumber'>Key id - {event.NoteNumber}</h3>
                <h3 className='duration'>Duration - {event.Duration}μs</h3>
            </div>
        })
    }else{
            if(recording)
                return <h5>Recording</h5>
            else{
                return <h5>Not Recording</h5>
            }
        }
    }

    return (
        <div className='Record' style={{height:height}}>
            <div className="content">
            <h3>Welcome to the Record page! Here you can record your playing and then use PianoBlocksApp to visualize it.
                It's super simple. Click "Rec" button, then play, then click it again, and click "Play Recorded"</h3>
                <h2>Connected Midi Devices:</h2>
                <div className='devices'>
                    {renderDevices()}
                </div>
            <div className='buttons'>
            <button className='rec' onClick={()=>{record.current.startStop(events); setRecording(!recording);setEvents(record.current.list); record.current.reset()}}>Rec</button>
            <button className='play' onClick={()=>{history.push('/')}}>Play Recorded</button>
            </div>
            <div className='Events' style={{height:window.innerHeight /2 }}>
                {renderEvents()}
            </div>
            </div>
            <Footer />
        </div>
    )
}
