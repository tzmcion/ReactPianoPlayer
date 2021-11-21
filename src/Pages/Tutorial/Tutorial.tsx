import React, {useState,useEffect} from 'react'
import './Tutorial.styles.css';

import Tutorial_uno from '../../Assets/Editor.png'
import Tutorial_duo from '../../Assets/Tutorial_duo.png';
import Tutorial_trio from '../../Assets/Tutorial_trio.png';
import YouTube from 'react-youtube';
import Footer from '../../Components/Footer/Footer';

export default function Tutorial() {

    const [height,setHeight] = useState<number>(window.innerHeight);

    useEffect(()=>{
        window.addEventListener('resize',()=>{
            setHeight(window.innerHeight);
        })
    },[height])

    return (
        <div className='mainTutorial' style={{height:height,paddingBottom:200, backgroundColor:'white'}}>
            <div className='Tutorial'>
                <div className='Tutorial_Head'>
                    <h1>Quick Guide In Piano Blocks App</h1>
                </div>
                <div className='TutorialBlocks'>
                    <div className='TutorialBlock gradientRight'>
                        <div className='flex1 element TextElement'>
                            <h1>Step 1. Record A Midi File</h1>
                            <i className="fa fa-file-audio-o AudioIcon" aria-hidden="true"></i>
                            <h2>Record your beautiful piano music by a record button on your piano, or a program for recording midi tracks ( fe. midiEditor). Anyway, you need a midi file</h2>
                        </div>
                        <div className='flex2 element ImageElement'>
                            <img src={Tutorial_uno} className='Editor' alt='Lolek' />
                        </div>
                    </div>
                    <div className='TutorialBlock gradientLeft'>
                        <div className='flex1 element ImageElement'>
                            <img src={Tutorial_duo} className='Editor' alt='Lolek' />
                        </div>
                        <div className='flex2 element TextElement'>
                            <h1>Step 2. Watch and learn</h1>
                            <i className="fa fa-file-audio-o AudioIcon" aria-hidden="true"></i>
                            <h2>Insert your midi to main page, and watch how your playing looks !</h2>
                        </div>
                    </div>
                    <div className='TutorialBlock gradientRight'>
                        <div className='flex1 element TextElement'>
                            <h1>Step 3. Easy way to create a video from Piano Blocks App</h1>
                            <i className="fa fa-file-audio-o AudioIcon" aria-hidden="true"></i>
                            <h2>If you record your playing, you can easily put music track in any editor (even in Windows Photos) and have a pro/like video !</h2>
                        </div>
                        <div className='flex2 element ImageElement'>
                            <img src={Tutorial_trio} className='Editor' alt='Lolek' />
                        </div>
                    </div>
                </div>
                <h2 className='YT_tut'>Youtube Tutorial</h2>
                <YouTube videoId="scIpl3SacK0" className='Youtube' onReady={()=>{}} />
            </div>
            <Footer />
        </div>
    )
}
