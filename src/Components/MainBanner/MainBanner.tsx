import "./MainBanner.scss"
import React from 'react'
import { Link } from "react-router-dom"

import PBA_Logo from "../../Assets/PBA_logo.png"
import AVNT_Logo from "../../Assets/avnt-no-ng.png"


export default function MainBanner() {
  return (
    <div className="MainPageBanner">
        {/* Main banner with logo and short description */}
        <div className="Logo">
            <div className="LogoLeft">
                <img src={PBA_Logo} alt="PianoBlocksAPP Logo" />
            </div>
            <div className="LogoRight">
                <h1 className="TitleApp jersey-15">PianoBlocksApp</h1>
                <h2 className="AppShortDescription jersey-15">Web Midi Player&Visualizer <br/>Designed to play piano recordings</h2>
                <Link to="https://github.com/tzmcion" className="LinkGithub jersey-15" title="Link to author's github">@tzmcion</Link>
            </div>
        </div>
        {/* Full App Description */}
        <div className="Description">
            <p className="Description-Big jersey-10">
                Piano Blocks App (PBA) Is a WEB piano midi player build for visualization of the recordings of piano playing. 
                App displays the recording in a way of “falling blocks” from the top of the screen, 
                a popular way of visualization on many youtube tutorials. The application is completely <span className="ColOrange">free of charge</span>, 
                alongside with it’s code which can be downloaded and used from the <Link to="https://github.com/tzmcion/ReactPianoPlayer" title="Github's App repo">github page</Link>.</p>
        </div>
        {/* Usage  */}
        <div className="Usage jersey-10">
            <h3>Usage:</h3>
            <p>Start Immediately By dragging the midi file to the input field, or by clicking on it to choose the file using system file dialogue.
                <ul>
                    <li>To configure the app, please click the button “Configure” on the Input field</li>
                    <li>To know more how to utilize the app, go to <Link to="/tutorial">“Docs”</Link> page</li>
                    <li>To record the midi file, go to <Link to="/record">“Record”</Link> page</li>
                </ul>
            </p>
            <p>If you enjoyed the app so far, you can go to the <Link to="/info">“Support”</Link> page, and leave a little donation</p>
            <div className="AvntLogo">
                <div className="LeftSide">
                    <img src={AVNT_Logo} alt="Logo Avnt" />
                </div>
                <div className="RightSide">
                    <h4>Enjoy the App!</h4>
                    <h5>App Created by AVNT group, ©All rights reserved</h5>
                </div>
            </div>
        </div>
    </div>
  )
}
