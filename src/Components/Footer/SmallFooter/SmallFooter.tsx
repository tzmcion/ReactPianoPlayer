import React from 'react'
import './SmallFooter.styles.css';

import Logo from '../../../Assets/piano_icon.png';
import NPM from '../../../Assets/NPMLogo.png';
import ReactJS from '../../../Assets/ReactJSLogo.png';
import GoogleFonts from '../../../Assets/GoogleFontsLogo.png';
import Heroku from '../../../Assets/herokuLogo.png';
import TypeScript from '../../../Assets/TypeScriptLogo.png';
import FontAwesome from '../../../Assets/FontAwesomeLogo.png';

export default function SmallFooter() {

    const iconClick = () =>{
        const doc = document.querySelector('.mainDiv');
        doc && doc.scrollTo(0,0);
        const doc_d = document.querySelector('.mainTutorial');
        doc_d && doc_d.scrollTo(0,0);
    }

    return (
        <div className='Footer_Small'>
            <div className='data'>
                <div className='AppName'>
                    <img src={Logo} className='LogoImg' alt='Logo' onClick={iconClick} />
                    <h1> Piano Blocks App V.01 beta version </h1>
                    <h2> Created By <span>Tymoteusz Apriasz</span></h2>
                </div>
                <div className='Technologies'>
                    <img src={Heroku} className='Tech' title='Heroku' alt='technology' />
                    <img src={FontAwesome} className='Tech' title='FontAwesome' alt='technology' />
                    <img src={GoogleFonts} className='Tech' title='GoogleFonts' alt='technology' />
                    <img src={NPM} className='Tech' title='NPM library' alt='technology' />
                    <img src={ReactJS} id='reactIcon' className='Tech' title='React' alt='technology' />
                    <img src={TypeScript} className='Tech' title='TypeScript' alt='technology' />
                </div>
            </div>
        </div>
    )
}
