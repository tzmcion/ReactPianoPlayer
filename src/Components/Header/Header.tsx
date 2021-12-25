import React from 'react';
import {Link} from 'react-router-dom';
import './Header.styles.scss';

export default function Header() {
    return (
        <nav className='Header'>
            <div className='HeaderData'>
                <div className='Logo'>
                    <Link to='/' className='Logo_Link'>
                    <h1>Piano Blocks App</h1>
                    </Link>
                </div>
                <div className='Links'>
                    <Link to='/' className='Link'>Home</Link>
                    <Link to='/Record' className='Link'>Record</Link>
                    <Link to='/tutorial' className='Link'>DOCS</Link>
                    <Link to='/Todo' className='Link'>Donate</Link>
                </div>
            </div>
        </nav>
    )
}
