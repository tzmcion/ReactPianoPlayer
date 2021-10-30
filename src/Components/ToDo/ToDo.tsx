import React, {useState} from 'react'
import './ToDo.styles.css';

import Footer from '../Footer/Footer';

export default function ToDo() {

    const [checkbox,setScheckbox] = useState<string>('false');

 

    return (
        <div className='Donate'>
            <input type='checkbox' value={checkbox} onChange={(e)=>{setScheckbox(checkbox === 'false' ? 'checked': 'false')}} /> 
            <h3 className='data_don'>I understand what a <a href="https://en.wikipedia.org/wiki/Donation">Donation</a> is and I accept a fact that I'm not receiving any goods from this payment</h3> 
            
            <Footer />
        </div>
    )
}