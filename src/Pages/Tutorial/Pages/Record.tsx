import React from 'react';

import Rec from '../../../Assets/tutorial/rec.mp4'
import shet from '../../../Assets/tutorial/shet.png'

export default function Record() {
    return (
        <div className='Basic'>
            <h1 className='Pg-Header Pg-Text'>Recording</h1>
            <h3 className='Pg-Sm-Header Pg-Text'>How to record in Piano Blocks App</h3>
            <div className='Pg-Container-Flex_b'>
                <div className='Pg-Container-Flex-40' >
                    <p className="Pg-Paragraph" style={{width:'fit-content'}}>
                        When you enter a Record page, you'r gona see buttos Rec, play Recorded, and a rectangle with a list of connected devices.
                        If you've connected your device through USB, and you still don't see your device, try connecting to https <span className='Pg-Link-Element-duo' onClick={()=>{window.location.replace('https://pianoblocksapp.com')}}>here, </span> 
                        Or try to install Drivers. App is recording every device that is connected and displayed there. Click record, the dot(s) will start blinking, then clikc it again to stop recording.
                        To play recorded clikc button Play Recorded. To configure visuals, go to main page, then come back :).
                        Remember, don't use this option on cheaper or old computers, it won't work properly.
                    </p>
                </div>
                <div className='Pg-Container-Flex-60'>
                    <video autoPlay muted loop className='Pg-Container-Video-Demo'>
                        <source src={Rec} type="video/mp4" />
                    </video>
                </div>
            </div>
            <h3 className='Pg-Sm-Header Pg-Text'>Sheet music of your recording</h3>
            <div className='Pg-Container-Flex_b'>
                <div className='Pg-Container-Flex-40' >
                    <p className="Pg-Paragraph" style={{width:'fit-content'}}>
                        *BETA*. If you record your playing through this website, you can instantly get prototype of sheet music.
                        <br/><br />
                        *It yet is not working as it should, but you can get some sort of sketch.
                    </p>
                </div>
                <div className='Pg-Container-Flex-60'>
                    <img src={shet} alt="sheet music demo" className='Pg-Container-Flex-img' />
                </div>
            </div>
            <div className='Pg-For-Devs' style={{marginTop:'2%'}}>
                <h2 className='Pg-For-Devs-Header'>* For Nerds</h2>
                <div className="flex-2" style={{margin:0,height:'100%'}}>
                    <div className='flex-5' style={{justifyContent:'center',alignItems:'center', width:'70%'}}>
                    <p className="Pg-Paragraph" style={{width:'80%',marginTop:'50px',fontSize:'16px'}}>
                        Recording in web apps is possible thanks to window.navigator.requestMIDIAccess().
                        If you ever need to record midi through web apps, use it.
                        Altough it is still not supported by some web browsers
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
