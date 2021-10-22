import React, {useState} from 'react'
import './Footer.styles.css'

import SmallFooter  from './SmallFooter/SmallFooter'

export default function Footer() {

    const [contact,setContact] = useState<boolean>(false);

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
                    <a href='https://www.youtube.com/channel/UCN8IP1pWA3BvXAqtdLHFHkg' rel="noreferrer" target="_blank" className='LinkFooter'><i className="fa fa-youtube-play YoutubeButton" aria-hidden="true"></i></a>
                    <a href='https://github.com/tzmcion/ReactPianoPlayer' rel="noreferrer" target="_blank" className='LinkFooter'><i className="fa fa-code CodeButton" aria-hidden="true"></i></a>
                    <a className='LinkFooter' onClick={()=>{setContact(!contact)}}><i className="fa fa-address-card-o Contact" aria-hidden="true"></i>
                        <h3 className='Contacct_exp'>
                            Click To reveal Email Adress
                        </h3>
                    </a>
                    {contact && <h1 className='email' onClick={()=>{navigator.clipboard.writeText('tymsonekjelonek@gmail.com');}}>tymsonekjelonek@gmail.com</h1>}
                    {contact && <h2 className='email_info'>Click to Copy</h2>}
                    
                    <h1 className='Copyrights'>This is an open-source project. You're free to use/change any code from this website</h1>
                </div>
            </div>
        </div>
        <SmallFooter />
        </div>
    )
}
