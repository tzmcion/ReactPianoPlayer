import React, { ReactElement } from 'react'
import './PagesStyle.scss';

import midi_des from '../../../Assets/tutorial/Midi_Description.png';
import interface_mid from '../../../Assets/tutorial/interface.png';

interface BasicProps{
    on_change_id:Function
}

export default function Midi({on_change_id}:BasicProps):ReactElement {
    return (
        <div className='Basic'>
            <h1 className="Pg-Header">MIDI Files</h1>
            <h2 className="Pg-Sm-Header">What is Midi File ?</h2>
            <div className='Pg-Images flex-2'>
                <div className='Pg-Flex-Img-Container'>
                    <img src={midi_des} alt="Midi Desciption" className='Pg-Image' />
                </div>
                <div className='Pg-Flex-Text-Container'>
                    <p className="Pg-Paragraph">
                        Basically, Midi File is a set of commands saved in a File. Those commands are MIDI events. Let's say you are playing and 
                        recording MIDI. Every time, you press a key, or pedal, or do any other action that affects sound, your device sends MIDI event.
                        Those events are divided onto more than 20 types (only for Piano), but 90% of time you'll only use 2 of them, which are onKeyPress and onKeyUp.
                        So, when you press a key, your device sends a midi event, when you release a key same, etc.
                    </p>
                </div>
            </div>
            <p className="Pg-Paragraph">
                So, summing up, Midi File is a group of informations about what were you doing during recording. Midis only have COMMANDS.
            </p>
            <h2 className="Pg-Sm-Header">How those set of commands can be of a use ?</h2>
            <p className="Pg-Paragraph">
                They are really usefull in digital world. They have all the data necessary to recreate the exact sound of a device, but more to that, they 
                give the possibility to change a sound, to fix some gaps, to mark a mistakes. They make it much easier to edit the sound than in a normal
                audio file like .mp3. Besides that Midi files are much smaller than normal audio files, and they have many more possibilities. The only problem
                is that they need a good (and probably difficult to learn) software to read them and make use from them. We can call they the central part of music developement. The finall part is obviously your
                song saved in audio formats like .mp3, .Wav etc.
            </p>
            <div className='Pg-For-Devs'>
                <h2 className='Pg-For-Devs-Header'>* For Nerds</h2>
                <div className="flex-2 flex-res" style={{margin:0,height:'100%'}}>
                    <div className='flex-5 w-70' style={{justifyContent:'center',alignItems:'center'}}>
                    <p className="Pg-Paragraph" style={{width:'80%',marginTop:'50px',fontSize:'12px'}}>
                        This is how this website reads MIDI files. With typescript it creates an object with this interface before playing.
                        Thanks to that preparation, it can aquire reasonable performance during playing. By doing that, it reduces the initial
                        array of midi events, and makes it even 4 times smaller (as it completely reduces events like onKeyPress, onKeyRelease, onPedalPress, onPedalRelease 
                        to one object). Thanks to that, during playing, app needs to analyze 4 times less data.
                    </p>
                    </div>
                    <div className='flex-5'>
                        <img src={interface_mid} className='image_for-nerds' alt='inmterface' />
                    </div>
                </div>
            </div>
            <h2 className="Pg-Sm-Header">How to record my playing to a MIDI file ?</h2>
            <p className="Pg-Paragraph">
                The easiest way is to connect your device with computer using USB, then go to <span className='Pg-Link-Element-duo' onClick={()=>{on_change_id(2)}}>Record</span> Page.
                <br /><br />
                <b>Altough</b>, If your computer has bad parameters, this website may not record your playing properly. If it has, please, download
                a midi recording software. With recorded and exported Midi file you can go back to this page and see your playstyle.
                <br /><br />
                <b>IMPORTANT</b> If after a while of waiting website still does not see your device you may 
                <ul>
                    <li>Have your device switched off ;)</li>
                    <li>Need to install device drivers on your computer</li>
                    <li>Connect to https version of this website (simply click <span className='Pg-Link-Element-duo' onClick={()=>{window.location.replace('https://pianoblocksapp.com')}}>here</span>)</li>
                </ul> 
            </p>
            <h2 className="Pg-Sm-Header">Find out more about MIDI:</h2>
            <ul>
                <li><a href='https://en.wikipedia.org/wiki/MIDI' rel='noreferrer' target='_blank' className='Pg-Link-a'>WIKI</a></li>
                <li><a href='https://www.lifewire.com/midi-file-2621979' rel='noreferrer' target='_blank' className='Pg-Link-a'>Using Midi Files</a></li>
                <li><a href='https://www.midieditor.org/' rel='noreferrer' target='_blank' className='Pg-Link-a'>Free midi recording software</a></li>
            </ul>
        </div>
    )
}
