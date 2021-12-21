import React from 'react'
import './Footer.styles.css'

import SmallFooter  from './SmallFooter/SmallFooter'

export default function Footer() {


    return (<div className='BeforeFooter'>
        <div className='Footer'>
            <div className='Footer_Display'>
                <div className='Footer_Div LI'>
                    <h3>Libraries and Icons</h3>
                        <a href="https://www.flaticon.com/authors/juicy-fish" rel="noreferrer" target='_blank' className='dependencyLink'> Piano File Icon</a>
                        <a href="https://www.freepik.com" rel="noreferrer" target='_blank' className='dependencyLink'> Midi File Icon</a>
                        <a href="https://www.npmjs.com/package/midi-json-parser" rel="noreferrer" target="_blank" className='dependencyLink'>Midi Parser</a>
                        <a href="https://www.npmjs.com/package/rgb-hex" rel="noreferrer" target="_blank" className='dependencyLink'>Rgb Hex</a>
                        <a href="https://www.npmjs.com/package/hex-alpha" rel="noreferrer" target="_blank" className='dependencyLink'>Hex Alpha</a>
                        <a href="https://www.npmjs.com/package/soundfont-player" rel="noreferrer" target="_blank" className='dependencyLink unactive'>SoundFont Player</a>
                </div>
                <div className='Footer_Div'>
                    
                    <h1 className='Copyrights'>This is an open-source project. You're free to use/change any code from this website</h1>
                </div>
            </div>
        </div>
        <SmallFooter />
        </div>
    )
}
