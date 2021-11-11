import React,{ReactElement,useState,useEffect} from 'react'
import './LoadingScreen.scss';

import Gear from '../../../Assets/gear.png';

interface LoadingScreenProps{
    width:number,
    height:number,
    onLoaded: Function,
    Finished:boolean
}



export default function LoadingScreen({width,height,onLoaded,Finished}:LoadingScreenProps):ReactElement {

    const [opacity,setOpacity] = useState<number>(0)
    const [isReady,setisReady] = useState<boolean>(false);

    useEffect(() => {
        if(Finished){
            setTimeout(()=>{setOpacity(200)},1500);
        }
    }, [Finished])

    useEffect(() => {
        if(isReady){onLoaded();}
        if(Gear){
            setisReady(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReady])

    return (
        <div className='LoadingScreen' style={{width:width,height:height,left:opacity.toString() + '%'}}>
            <img src={Gear} alt='Loading' />
            <h2>Loading, Please Wait</h2>
        </div>
    )
}
