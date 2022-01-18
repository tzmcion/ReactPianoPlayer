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
                PBA is a web app created by Tymoteusz Apriasz. It is an open-source project which serves amateurs and professionals various ways to master their pieces. 
                This app uses Midi to "play" piano pieces visually on the computer screen. It reads a midi file, which is a big message that describes what exacly pianist did with piano
                to play a piece. With information provided by Midi, it can show exactly what went wrong, or what may have been done better (of course, pianist has to think by himself, 
                this is not THAT advanced app...). That Midi data is displayed as 'Falling blocks', like in various youtube tutorials.
            </p>
            <h4 className='Pg-Links Pg-Text'>Click here to read about:</h4>
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
                        Just drag Midi to the special black field on 'Home' page, or click on that field to choose Midi manually. Read about configuration in 
                        <span className='Pg-Link-Element' onClick={()=>{on_change_id(3)}}> Configuration</span> page.
                        Please, avoid using broken midi files (by broken midi file I mean any txt file saved with a .MID extension. It will only crush the app :c )  IF loading continues for too long, it means that your file is
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
                You can just find a midi file of it, and use it to visualize with this App. With that, you can see which piano keys you should click.
                As not everyone knows sheet music, this app can 
                show you how you should play the song. Besides that if there are some unclear things in sheet music, you can also help yourself with this app. Besides that, you
                can easily create midi tutorials (however, please record sound from professional device, it just won't sound good with this default free sounds).
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
