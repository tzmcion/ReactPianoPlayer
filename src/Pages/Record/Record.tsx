import React,{useEffect,ReactElement, useState, useRef} from 'react';
import { noteEvent } from '../../Utils/TypesForMidi';
import { useHistory } from 'react-router-dom';
import './Record.styles.scss';

import statelessRecord from './statelessRecord';

interface Devices{
    name:string,
    id:number
}

export default function Record():ReactElement {

    const record = useRef(new statelessRecord());
    const history = useHistory();
    const [devices,setDevices] = useState<Array<Devices>>([]);
    const [events,setEvents] = useState<Array<any>>([]);

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
        switch(command){
            case 144:
                const event = record.current.add(command,noteNumber,velocity);
                if(event){
                    setEvents(prev => [...prev,event]);
                }
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
            return devices.map(device =>{
                return <h1 key={device.id}>{device.name}</h1>
            })
        return <h1>No device Connected</h1>
    }

    const renderEvents = () =>{
        return record.current.list.map((event:noteEvent,index) =>{
            return <div key={index} className='Event'>
                <h3>note: {event.NoteNumber} delta:{event.Delta}</h3>
            </div>
        })
    }

    return (
        <div className='Record'>
            {renderDevices()}
            <button onClick={()=>{record.current.startStop(events);}}>Rec</button>
            <div className='Events'>
                {renderEvents()}
            </div>
            <button onClick={()=>{history.push('/PlayRecorded')}}>Play Recorded</button>
        </div>
    )
}
