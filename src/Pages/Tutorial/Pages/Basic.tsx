import React, { ReactElement } from 'react';
import './PagesStyle.scss';

import Demo from '../../../Assets/tutorial/Demo.mp4';
import importing_file from '../../../Assets/tutorial/file_input_tut.mp4'

interface BasicProps{
    on_change_id:Function
}

export default function Basic({on_change_id}:BasicProps):ReactElement {

    return (
        <div className='Basic'>
            <h1 className='Pg-Header Pg-Text'>Introduction</h1>
            <h3 className='Pg-Sm-Header Pg-Text'>What is Piano Blocks App ?</h3>
            <div className='Pg-Video-Container'>
                <video autoPlay muted loop className='Pg-Video-Demo'>
                    <source src={Demo} type="video/mp4" />
                </video>
            </div>
            <p className='Pg-Paragraph Pg-Text'>
                Piano Blocks App is a web application created by Tymoteusz Apriasz. It is an open-source project which serves pianists with visualizng their playing.
                Application uses midi files to display recorded playing in a falling blocks. It reads a midi file, and calculates the time of a block creation.
                The created block starts falling onto the virtual-piano, which is displayed on the bottom part of a monitor.
                It takes around 5 seconds for block to fall on default settings. When block reaches piano, it releases sound, and simulates real-time Piano playing.
            </p>
            <h4 className='Pg-Links Pg-Text'>Click here to learn about:</h4>
                <ul className='Pg-Links-Container'>
                    <li className='Pg-Link-Element' onClick={()=>{on_change_id(1)}}>Midi</li>
                    <li className='Pg-Link-Element' onClick={()=>{on_change_id(2)}}>Recording</li>
                    <li className='Pg-Link-Element' onClick={()=>{on_change_id(3)}}>Configuratinon</li>
                    <li className='Pg-Link-Element' onClick={()=>{on_change_id(4)}}>Creating Tutorials</li>
                    <li className='Pg-Link-Element' onClick={()=>{on_change_id(5)}}>Authors</li>
                </ul>
            <h3 className='Pg-Sm-Header Pg-Text'>How to use Piano Blocks App ?</h3>
            <div className='flex-2'>
                <div className='data-r'>
                <div className='data-video-cnt' style={{display:'flex',alignItems:'center', overflowY:'auto'}}>
                    <p className='Pg-Paragraph Pg-Text'>
                        To Play any Midi file just drag it to the field, or click on it to choose a file. To configure your visualization, click 'Configure' Button. For advanced Configuration go to
                        <span className='Pg-Link-Element' onClick={()=>{on_change_id(3)}}> Configuration</span> page.
                        Please, avoid using broken midi files (by broken midi file I mean any txt file saved with a .MID extension. It will only crish the app :c )  IF loading continues for too long, it means that your file is
                        old, and uses different saving method. Currently, as I didn't worked with a lot of them, this app does not support them. Sorry !
                    </p>
                </div>
                </div>
                <div className='data-l'>
                    <div className='data-video-cnt shadow-ala' style={{width:'90%',height:'100%'}}>
                        <video autoPlay muted loop className='data-video' >
                            <source src={importing_file} type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
            <h3 className='Pg-Sm-Header Pg-Text'>How to find Piano Blocks App usefull ?</h3>
            <p className='Pg-Paragraph Pg-Text'>
                It's super simple! There are many midi files hidden in the depths of internet. If you ever find a song that you want to play or learn on piano,
                You can just find a midi file of it, and use it to visualize with this App. With that, you can see which piano keys you should actually click, or find
                (Believe me, in some songs it's obvious, but in some it is pretty hard). Of course, the other reason is that not everyone knows sheet music, and this app can 
                show you how you should play the song. Besides that if there are some unclear things in sheet music, you can also help yourself with this app. Besides that, you
                can easily create midi tutorials (however, please record your own music from professional device, it just won't sound good with this default free sounds).
                There are many more reasons to use Piano Blocks App, you just have to find them, (and you probably have to play piano too :P)
            </p>
            <h3 className='Pg-Sm-Header Pg-Text'>License and pricing</h3>
            <h4 className='Pg-Xs-Header'>MIT License</h4>
            <h4 className='Pg-Xs-Header'>No pricing</h4>
            <p className='Pg-Paragraph Pg-Text'>
                Piano Blocks App is an open-source project running on a MIT license. You can find the source code <span className='Pg-Link-Element-duo' onClick={()=>{window.location.replace('https://github.com/tzmcion/ReactPianoPlayer')}}>here</span>. 
                Any functionality on this website is free and will be free to use. Website is hosted on <span className='Pg-Link-Element-duo' onClick={()=>{window.location.replace('https://www.heroku.com/what')}}>Heroku</span>, and web-address
                is delivered by <span className='Pg-Link-Element-duo' onClick={()=>{window.location.replace('https://www.cloudflare.com/')}}>CloudFlare</span>.
            </p>
        </div>
    )
}
