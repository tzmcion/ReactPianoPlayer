/**
 * Component significantly altered during new ver release update.
 * Last Update: 07/29/2025
 * - Added functionality of removing itself from rendering on page after loading finished
 * - Changed the design of loading page, now it looks half-decent 
 */


import React,{ReactElement,useState,useEffect} from 'react'
import './LoadingScreen.scss';
interface LoadingScreenProps{
    Finished:boolean
}


/**
 * A loading screen while the sounds and Midi file is processing. It automatically removes itself from rendering after Finished is set to true
 * The loading screen is should be set to Fade Away when the MIDI Player loads
 * @param param0 
 * @returns React Element
 */
export default function LoadingScreen({Finished}:LoadingScreenProps):ReactElement {

    const [opacity,setOpacity] = useState<number>(1)
    const [render_screen, set_render_screen] = useState<boolean>(true);

    useEffect(() => {
        if(Finished){
            setTimeout(()=>{setOpacity(0)},1500);
            setTimeout(()=>{set_render_screen(false)},2050) //for transition 0.5s;
        }
    }, [Finished])

    return (
        <>
        {render_screen && <div className='LoadingScreen' style={{opacity:opacity.toString()}}>
            <img src={'/PBA_logo.png'} alt='Loading' />
            <div className='LoadingText'>
                <h2 className='jersey-10'>Reading the MIDI file, please wait...</h2>
                <div className='traveler'>
                    <h2 className='jersey-10'>Reading the MIDI file, please wait...</h2>
                </div>
            </div>
        </div>}
        </>
    )
}
