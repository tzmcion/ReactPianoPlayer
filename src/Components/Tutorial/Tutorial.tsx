import React, {useState,useEffect} from 'react'
import './Tutorial.styles.css';

import Editor from '../../Assets/Editor.png'
import Footer from '../Footer/Footer';

export default function Tutorial() {

    const [height,setHeight] = useState<number>(window.innerHeight);

    useEffect(()=>{
        window.addEventListener('resize',()=>{
            setHeight(window.innerHeight);
        })
    },[height])

    return (
        <div className='mainTutorial' style={{height:height}}>
            <div className='Tutorial'>
                <div className='Tutorial_Head'>
                    <h1>Quick Guide In Piano Blocks App</h1>
                </div>
                <div className='TutorialBlocks'>
                    <div className='TutorialBlock gradientRight'>
                        <div className='flex1 element TextElement'>
                            <h1>Step 1. Record A Midi File</h1>
                            <i className="fa fa-file-audio-o AudioIcon" aria-hidden="true"></i>
                            <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda, non tenetur nesciunt quidem esse impedit ipsum in cum voluptatibus repellat enim quibusdam dolore. Quibusdam earum, ratione libero ipsam sequi asperiores!</h2>
                        </div>
                        <div className='flex2 element ImageElement'>
                            <img src={Editor} className='Editor' alt='Lolek' />
                        </div>
                    </div>
                    <div className='TutorialBlock gradientLeft'>
                        <div className='flex1 element ImageElement'>
                            <img src={Editor} className='Editor' alt='Lolek' />
                        </div>
                        <div className='flex2 element TextElement'>
                            <h1>Step 1. Record A Midi File</h1>
                            <i className="fa fa-file-audio-o AudioIcon" aria-hidden="true"></i>
                            <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda, non tenetur nesciunt quidem esse impedit ipsum in cum voluptatibus repellat enim quibusdam dolore. Quibusdam earum, ratione libero ipsam sequi asperiores!</h2>
                        </div>
                    </div>
                    <div className='TutorialBlock gradientRight'>
                        <div className='flex1 element TextElement'>
                            <h1>Step 1. Record A Midi File</h1>
                            <i className="fa fa-file-audio-o AudioIcon" aria-hidden="true"></i>
                            <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda, non tenetur nesciunt quidem esse impedit ipsum in cum voluptatibus repellat enim quibusdam dolore. Quibusdam earum, ratione libero ipsam sequi asperiores!</h2>
                        </div>
                        <div className='flex2 element ImageElement'>
                            <img src={Editor} className='Editor' alt='Lolek' />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
