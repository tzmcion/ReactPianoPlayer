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
    const [height,windowHeight] = useState<number>(window.innerHeight);

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
    },[])

    const onMidiEvent = (midiEvent:any,name:string) =>{
        const data= midiEvent.data;
        const command = data[0];
        const noteNumber = data[1];
        const velocity = (midiEvent.data.length > 2) ? midiEvent.data[2] : null;
        let event:any;
        switch(command){
            case 144:
                event = record.current.add(command,noteNumber,velocity);
                if(event){
                    setEvents(prev => [...prev,event]);
                }
                break;
            case 128:
                event = record.current.add(command,noteNumber,velocity);
                if(event){
                    setEvents(prev => [...prev,event]);
                }
                break;
            default:
                break;
        }
    }


    const renderDevices = () =>{
        if(devices.length > 0)
            return devices.map(device =>{
                return <div className='device'><i className="fa fa-circle dot" aria-hidden="true"></i><img src={Piano} alt='piano'/><h1 key={device.id}>{device.name}</h1></div>
            })
        return <h1>No device Connected</h1>
    }

    const renderEvents = () =>{
        if(events.length > 0){
        return events.map((event:noteEvent,index) =>{
            return <div key={index} className='Event'>
                <h3 className='title_ev'>Event: </h3>
                <h3 className='delta'>Delta - {event.Delta}</h3>
                <h3 className='noteNumber'>Key - {event.NoteNumber}</h3>
                <h3 className='duration'>Duration - {event.Duration}</h3>
            </div>
        })
        }else{
            return <h5>Midi events will be displayed here</h5>
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
            <button className='rec' onClick={()=>{record.current.startStop(events);}}>Rec</button>
            <button className='play' onClick={()=>{history.push('/PlayRecorded')}}>Play Recorded</button>
            </div>
            <div className='Events' style={{height:window.innerHeight /2 }}>
                {renderEvents()}
            </div>
            </div>
            <Footer />
        </div>
    )
}
