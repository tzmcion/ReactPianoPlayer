import React, {useState} from 'react'
import './ToDo.styles.css';

import Footer from '../../Components/Footer/Footer';

export default function ToDo() {

    const [checkbox,setScheckbox] = useState<string>('false');

 

    return (
        <div className='Donate'>
            <input type='checkbox' value={checkbox} onChange={(e)=>{setScheckbox(checkbox === 'false' ? 'checked': 'false')}} /> 
            <h3 className='data_don'>I understand what a <a href="https://en.wikipedia.org/wiki/Donation">Donation</a> is and I accept a fact that I'm not receiving any goods from this payment</h3> 
            <form action="https://www.paypal.com/donate" method="post" target="_top">
                <input type="hidden" name="hosted_button_id" value="TLEW452UQRPFG" />
                <input type="image" src="https://www.paypalobjects.com/en_US/PL/i/btn/btn_donateCC_LG.gif" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                <img alt="" src="https://www.paypal.com/en_PL/i/scr/pixel.gif" width="1" height="1" />
            </form>
            <Footer />
        </div>
    )
}