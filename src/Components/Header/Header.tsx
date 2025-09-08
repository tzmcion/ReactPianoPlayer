import React from 'react';
import {Link} from 'react-router-dom';
import './Header.styles.scss';

import Logo from '../../Assets/PBA_logo.png'

export default function Header() {

    return (
        <nav className={`Header`}>
            <div className='HeaderData'>
                <div className='Logo'>
                    <Link to='/' className='Logo-Small-Res'>
                        <img src={Logo} alt="PBA_logo" />
                        <h2 className='jersey-10 Logo-Title'>PBA</h2>                        
                    </Link>

                    <Link to='/' className='Logo_Link Logo-Big-Res'>
                        <h2 className='jersey-10 Logo-Title'>PIANO-BLOCKS-APP</h2>
                    </Link>
                </div>
                <div className='Links'>
                    <Link to='/' className='Link jersey-10 HomeLink'>HOME</Link>
                    <Link to='/RebuildInfo' className='Link jersey-10'>RECORD</Link>
                    {/* <Link to='/PlayLive' className='Link jersey-10'>LIVE PLAY</Link> */}
                    <Link to='/tutorial' className='Link jersey-10'>DOCS</Link>
                    <Link to='https://www.paypal.com/donate/?hosted_button_id=J6GQGKHC7H7SG' className='Link jersey-10'>SUPPORT</Link>
                </div>
            </div>
        </nav>
    )
}
