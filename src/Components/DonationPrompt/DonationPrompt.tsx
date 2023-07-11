import React,{useEffect,useState} from 'react'
import DonateButton from '../DonateButton/DonateButton';
import Hi from '../../Assets/hi.png';
import './DonationPrompt.scss'

export default function DonationPrompt() {

    const [canPrompt,setCanPrompt] = useState<boolean>(false);
    const [countVisited,setCountVisited] = useState<number>(0);

    useEffect(()=>{
        const visited = window.localStorage.getItem("pba_visited") !== null ? parseInt(window.localStorage.getItem("pba_visited")!) : 0 ;
        if(visited % 5 === 0){
            setCanPrompt(true);
            setCountVisited(visited);
        }
        window.localStorage.setItem("pba_visited",(visited+1).toString());
    },[]);

  return (
    <div className={`${canPrompt ? "" : "DonationPromptClosed"} DonationPrompt`}>
        <img src={Hi} alt="wave_hand" />
        <h3>We've noticed that You've visited this page <span>{countVisited}</span> times!</h3>
        <h4>
            If you like using this app consider donating
            It really helps run this project for free
        </h4>
        <DonateButton className='DonBut' link='https://www.paypal.com/donate/?hosted_button_id=TLEW452UQRPFG'/>
        <h2>Thank You!</h2>
        <button onClick={()=>{setCanPrompt(false)}}>Close</button>
    </div>
  )
}
