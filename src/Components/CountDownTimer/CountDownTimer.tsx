import React,{ReactElement, useEffect,useState} from 'react';
import './Timer.scss';

interface CountDown_Props{
    onEnd:Function
}

export default function CountDownTimer({onEnd}:CountDown_Props):ReactElement {

    const [time,setTime] = useState<any>(Date.now());
    const [data,setData] = useState<any>({
        hours:0,
        days:0,
        minutes:0,
        seconds:0
    })

    useEffect(() => {
        const interval = setInterval(()=>{setTime(new Date().getTime())},1000);
        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        const Planned = new Date("Dec 30, 2021 20:00:00").getTime();
        const distance = Planned - time;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setData({
            hours:hours,
            days:days,
            minutes:minutes,
            seconds:seconds
        })
        if(distance <= 0){
            onEnd();
        }
    }, [time,onEnd])

    return (
        <div className='Timer_Main'>
            <div className='Timer'>
                <h4 className='Timer_Element'>{data.days}</h4>
                <h4 className='Timer_Element'>{data.hours}</h4>
                <h4 className='Timer_Element'>{data.minutes}</h4>
                <h4 className='Timer_Element'>{data.seconds}</h4>
            </div>
            <div className='Info'>
                <h4 className='Info_Element'>Days</h4>
                <h4 className='Info_Element'>Hours</h4>
                <h4 className='Info_Element'>Minutes</h4>
                <h4 className='Info_Element'>Seconds</h4>
            </div>
        </div>
    )
}
