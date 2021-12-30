import React from 'react';

import Me from '../../../Assets/Me.jpg';

export default function Authors() {
    return (
        <div className='Basic'>
            <h1 className='Pg-Header Pg-Text'>Authors</h1>
            <h3 className='Pg-Sm-Header Pg-Text'>Tymoteusz Apriasz</h3>
            <div className='Pg-Flex-Dip'>
                <div className='Pg-Flex-30'>
                    <p className='Pg-Paragraph Pg-Text'>
                        Hi! It's me :). I'm a student and web developer. This app is 95% my doing. I'm main developer and owner of this website.
                        As I play piano, I decided to create this app to help pianists around the world.
                        Since I was 14, I was writing stuff around Midi files and Piano. My first app like this I made in my first class of high school (15 years old).
                        This time, I decided to make something that everyone can use. In someway I surpased my initial plan, but in some ways I changed to worse.
                        If you want to talk with me fell free to find me on FB, or just contact using contact forms on this website.
                        <br /><br />
                        Anyway, I do hope you enjoy using this app!
                    </p>
                </div>
                <div className='Pg-Flex-70'>
                    <img src={Me} alt="Me" className='Pg-Flex-70-img' />
                </div>
            </div>
            <h3 className='Pg-Sm-Header Pg-Text'>Others</h3>
            <h4 className='Pg-Info-Red'>There are many peoples that help developing the app, much more than on this list (and I can only write their nicknames)</h4>
            <ul>
                <li>FreestyleXV</li>
                <li>Avec</li>
                <li>MonsieurAntoine</li>
                <li>bonbon</li>
                <li>bandzior</li>
                <li>Nautirius</li>
                <li>DiamondHaj</li>
                <li>Dronik</li>
                <li>And many friends I don't call by nicknames :)</li>
            </ul>
            <h3 className='Pg-S-Ty'>Here I want to thank everyone for help in developing this project, as you probably don't even know how even a little support helps 💗 </h3>
            
        </div>
    )
}
