import React from 'react';

import Color1 from '../../../Assets/tutorial/Config/Color1.png'
import Color2 from '../../../Assets/tutorial/Config/Color2.png'
import ColorCard from '../../../Assets/tutorial/Config/ColorCard.png'

import ThinColor1 from '../../../Assets/tutorial/Config/ThinColor1.png'
import ThinColor2 from '../../../Assets/tutorial/Config/ThinColor2.png'
import ThinColorCard from '../../../Assets/tutorial/Config/ThinColorCard.png'

import BlockShadow from '../../../Assets/tutorial/Config/BlockShadow.png'
import BlockShadow1 from '../../../Assets/tutorial/Config/BlockShadow1.png'
import BlockShadow2 from '../../../Assets/tutorial/Config/BlockShadow2.png'

import KeyPressColor from '../../../Assets/tutorial/Config/KeyPressColor.png'
import KeyPressColor1 from '../../../Assets/tutorial/Config/KeyPressColor1.png'
import KeyPressColor2 from '../../../Assets/tutorial/Config/KeyPressColor2.png'

import Gradient from '../../../Assets/tutorial/Config/Gradient.png'
import Gradient1 from '../../../Assets/tutorial/Config/Gradient1.png'
import Gradient2 from '../../../Assets/tutorial/Config/Gradient2.png'

import RandomBlocksColor from '../../../Assets/tutorial/Config/RandomBlocksColor.png'
import RandomBlocksColor1 from '../../../Assets/tutorial/Config/RandomBlocksColor1.png'
import RandomBlocksColor2 from '../../../Assets/tutorial/Config/RandomBlocksColor2.png'

import Shadow from '../../../Assets/tutorial/Config/Shadow.png'
import Shadow1 from '../../../Assets/tutorial/Config/Shadow1.png'
import Shadow2 from '../../../Assets/tutorial/Config/Shadow2.png'

import radius from '../../../Assets/tutorial/Config/radius.png'
import radius1 from '../../../Assets/tutorial/Config/radius1.png'
import radius2 from '../../../Assets/tutorial/Config/radius2.png'

import fountain from '../../../Assets/tutorial/Config/fountain.png'
import fountainVid from '../../../Components/NewOptions/OptionCard/EffectChoose/Previews/fountain.mp4'

import Sparks_img from '../../../Assets/tutorial/Config/Sparks.png';
import Sparks from '../../../Components/NewOptions/OptionCard/EffectChoose/Previews/Sparks.mp4'

import DancingLines_img from '../../../Assets/tutorial/Config/DancingLines.png';
import DancingLines from '../../../Components/NewOptions/OptionCard/EffectChoose/Previews/DancingLines.mp4'

import balls_img from '../../../Assets/tutorial/Config/Bubbles.png';
import balls from '../../../Components/NewOptions/OptionCard/EffectChoose/Previews/balls.mp4'

import fireworks_img from '../../../Assets/tutorial/Config/Fireworks.png'
import fireworks from '../../../Components/NewOptions/OptionCard/EffectChoose/Previews/Fireworks.mp4'

import watermark from '../../../Assets/tutorial/Config/Watermark.png'
import watermark1 from '../../../Assets/tutorial/Config/Watermark1.png'
import watermark2 from '../../../Assets/tutorial/Config/Watermark2.png'

export default function Configuration() {
    return (
        <div className='Basic'>
            <h1 className='Pg-Header Pg-Text'>Configuration</h1>
            <h3 className='Pg-Sm-Header Pg-Text'>How To configure visuals in Piano Blocks App</h3>
            <p className="Pg-Paragraph" style={{width:'fit-content'}}>
                There are more than 20 configuration cards. They devide onto 4 categories, and those categories contain:
                <br /><br />
                    <ol>
                        <li className='Pg-Blocks-Conf Pg-Conf-Header'>
                            Blocks
                            <ul>
                                <li className="Pg-Conf-Element">Color</li>
                                <li className="Pg-Conf-Element">Thin Block Color</li>
                                <li className="Pg-Conf-Element">Block Shadow Color</li>
                                <li className="Pg-Conf-Element">Key Pressed Color</li>
                                <li className="Pg-Conf-Element">Gradient Color On Key Press</li>
                                <li className="Pg-Conf-Element">Random Blocks Color</li>
                                <li className="Pg-Conf-Element">Shadow Radius</li>
                                <li className="Pg-Conf-Element">Block Antyaliasing Radius</li>
                            </ul>
                        </li>
                        <li className='Pg-Effects-Conf Pg-Conf-Header'>Effects
                            <ul>
                                <li className="Pg-Conf-Element">Fountain</li>
                                <li className="Pg-Conf-Element">Sparks</li>
                                <li className="Pg-Conf-Element">Dancing Lines</li>
                                <li className="Pg-Conf-Element">Bubbles</li>
                                <li className="Pg-Conf-Element">Tornado Fireworks</li>
                            </ul>
                        </li>
                        <li className='Pg-EffectsConf-Conf Pg-Conf-Header'>Effects.conf 
                            <ul>
                                <li className="Pg-Conf-Element">Effects on/off</li>
                                <li className="Pg-Conf-Element">Effects color same as block</li>
                                <li className="Pg-Conf-Element">Effects color same as key</li>
                                <li className="Pg-Conf-Element">Random Effects Color</li>
                                <li className="Pg-Conf-Element">Color of Effects</li>
                            </ul>
                        </li>
                        <li className='Pg-Others-Conf Pg-Conf-Header'>Others
                            <ul>
                                <li className="Pg-Conf-Element">Watermark</li>
                                <li className="Pg-Conf-Element">Sound On</li>
                                <li className="Pg-Conf-Element">Speed</li>
                            </ul>
                        </li>
                    </ol>
            </p>
            <h3 className='Pg-Sm-Header Pg-Text Pg-Blocks-Col'>Blocks Description</h3>
            <div className='Pg-Config-4-Description Pg-Bg-Blocks'>
                <div className='Pg-Config-40'>
                    <h2 className='Pg-Config-Header'>Color</h2>
                    <p className="Pg-Paragraph" style={{width:'fit-content'}}>
                        This card defines the color of wider blocks. Those blocks
                        will fall onto the white keys.
                    </p>
                </div>
                <div className='Pg-Config-20'>
                    <img src={ColorCard} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-20'>
                    <img src={Color1} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-20'>
                    <img src={Color2} alt="card_one" className='Img-Conf' />
                </div>
            </div>
            <div className='Pg-Config-4-Description Pg-Bg-Blocks'>
                <div className='Pg-Config-40'>
                    <h2 className='Pg-Config-Header'>Thin Blocks Color</h2>
                    <p className="Pg-Paragraph" style={{width:'fit-content'}}>
                        This card defines the color of the thiner blocks. Those blocks
                        will fall onto the black keys
                    </p>
                </div>
                <div className='Pg-Config-20'>
                    <img src={ThinColorCard} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-20'>
                    <img src={ThinColor1} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-20'>
                    <img src={ThinColor2} alt="card_one" className='Img-Conf' />
                </div>
            </div>
            <div className='Pg-Config-4-Description Pg-Bg-Blocks'>
                <div className='Pg-Config-40'>
                    <h2 className='Pg-Config-Header'>Block Sahdow Color</h2>
                    <p className="Pg-Paragraph" style={{width:'fit-content'}}>
                        This card defines the sahow of the block. It is simply that weak light
                        behind the block
                    </p>
                </div>
                <div className='Pg-Config-20'>
                    <img src={BlockShadow} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-20'>
                    <img src={BlockShadow1} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-20'>
                    <img src={BlockShadow2} alt="card_one" className='Img-Conf' />
                </div>
            </div>
            <div className='Pg-Config-4-Description Pg-Bg-Blocks'>
                <div className='Pg-Config-40'>
                    <h2 className='Pg-Config-Header'>Key Press Color</h2>
                    <p className="Pg-Paragraph" style={{width:'fit-content'}}>
                        This card defines the color of a pressed key
                    </p>
                </div>
                <div className='Pg-Config-20'>
                    <img src={KeyPressColor} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-20'>
                    <img src={KeyPressColor1} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-20'>
                    <img src={KeyPressColor2} alt="card_one" className='Img-Conf' />
                </div>
            </div>
            <div className='Pg-Config-4-Description Pg-Bg-Blocks'>
                <div className='Pg-Config-40'>
                    <h2 className='Pg-Config-Header'>Gradient Color</h2>
                    <p className="Pg-Paragraph" style={{width:'fit-content'}}>
                        This card defines the Gradient color, which lights when block reaches key
                    </p>
                </div>
                <div className='Pg-Config-20'>
                    <img src={Gradient} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-20'>
                    <img src={Gradient1} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-20'>
                    <img src={Gradient2} alt="card_one" className='Img-Conf' />
                </div>
            </div>
            <div className='Pg-Config-4-Description Pg-Bg-Blocks'>
                <div className='Pg-Config-40'>
                    <h2 className='Pg-Config-Header'>Random Blocks Color</h2>
                    <p className="Pg-Paragraph" style={{width:'fit-content'}}>
                        This card defines if the blocks color are random
                    </p>
                </div>
                <div className='Pg-Config-20'>
                    <img src={RandomBlocksColor} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-20'>
                    <img src={RandomBlocksColor1} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-20'>
                    <img src={RandomBlocksColor2} alt="card_one" className='Img-Conf' />
                </div>
            </div>
            <div className='Pg-Config-4-Description Pg-Bg-Blocks'>
                <div className='Pg-Config-40'>
                    <h2 className='Pg-Config-Header'>Block Shadow Radius</h2>
                    <p className="Pg-Paragraph" style={{width:'fit-content'}}>
                        This card defines how much shadow should a block emit
                    </p>
                </div>
                <div className='Pg-Config-20'>
                    <img src={Shadow} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-20'>
                    <img src={Shadow1} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-20'>
                    <img src={Shadow2} alt="card_one" className='Img-Conf' />
                </div>
            </div>
            <div className='Pg-Config-4-Description Pg-Bg-Blocks'>
                <div className='Pg-Config-40'>
                    <h2 className='Pg-Config-Header'>Block Antyaliasing radius</h2>
                    <p className="Pg-Paragraph" style={{width:'fit-content'}}>
                        This cards defines how smooth corners of a block are
                    </p>
                </div>
                <div className='Pg-Config-20'>
                    <img src={radius} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-20'>
                    <img src={radius1} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-20'>
                    <img src={radius2} alt="card_one" className='Img-Conf' />
                </div>
            </div>
            <h3 className='Pg-Sm-Header Pg-Text Pg-Effects-Col'>Effects Description</h3>
            <div className='Pg-Config-4-Description Pg-Bg-Effects'>
                <div className='Pg-Config-40'>
                    <h2 className='Pg-Config-Header-Ef'>Fountaind Effect</h2>
                    <p className="Pg-Paragraph" style={{width:'fit-content'}}>
                        Simulates Water in Fountain :)
                    </p>
                </div>
                <div className='Pg-Config-20'>
                    <img src={fountain} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-Vid-40'>
                    <video autoPlay muted loop className='Pg-Config-Vid'>
                        <source src={fountainVid} type="video/mp4" />
                    </video>
                </div>
            </div>
            <div className='Pg-Config-4-Description Pg-Bg-Effects'>
                <div className='Pg-Config-40'>
                    <h2 className='Pg-Config-Header-Ef'>Sparks Effect</h2>
                    <p className="Pg-Paragraph" style={{width:'fit-content'}}>
                        Simulates Sparks
                    </p>
                </div>
                <div className='Pg-Config-20'>
                    <img src={Sparks_img} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-Vid-40'>
                    <video autoPlay muted loop className='Pg-Config-Vid'>
                        <source src={DancingLines} type="video/mp4" />
                    </video>
                </div>
            </div>
            <div className='Pg-Config-4-Description Pg-Bg-Effects'>
                <div className='Pg-Config-40'>
                    <h2 className='Pg-Config-Header-Ef'>Dancing Lines</h2>
                    <p className="Pg-Paragraph" style={{width:'fit-content'}}>
                        Simulates snakes
                    </p>
                </div>
                <div className='Pg-Config-20'>
                    <img src={DancingLines_img} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-Vid-40'>
                    <video autoPlay muted loop className='Pg-Config-Vid'>
                        <source src={Sparks} type="video/mp4" />
                    </video>
                </div>
            </div>
            <div className='Pg-Config-4-Description Pg-Bg-Effects'>
                <div className='Pg-Config-40'>
                    <h2 className='Pg-Config-Header-Ef'>Lava bubbles</h2>
                    <p className="Pg-Paragraph" style={{width:'fit-content'}}>
                        Simulates lava lamp
                    </p>
                </div>
                <div className='Pg-Config-20'>
                    <img src={balls_img} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-Vid-40'>
                    <video autoPlay muted loop className='Pg-Config-Vid'>
                        <source src={balls} type="video/mp4" />
                    </video>
                </div>
            </div>
            <div className='Pg-Config-4-Description Pg-Bg-Effects'>
                <div className='Pg-Config-40'>
                    <h2 className='Pg-Config-Header-Ef'>Fireworks Tornados</h2>
                    <p className="Pg-Paragraph" style={{width:'fit-content'}}>
                        Simulates Tornados
                    </p>
                </div>
                <div className='Pg-Config-20'>
                    <img src={fireworks_img} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-Vid-40'>
                    <video autoPlay muted loop className='Pg-Config-Vid'>
                        <source src={fireworks} type="video/mp4" />
                    </video>
                </div>
            </div>
            <h3 className='Pg-Sm-Header Pg-Text Pg-Effects-Conf-Col'>Effects.conf Description</h3>
            <h3 className='Pg-Sm-Header Pg-Text Pg-Others-Col'>Others Description</h3>
            <div className='Pg-Config-4-Description Pg-Bg-Others'>
                <div className='Pg-Config-40'>
                    <h2 className='Pg-Config-Header-Other'>Watermark</h2>
                    <p className="Pg-Paragraph" style={{width:'fit-content'}}>
                        This cards defines if watermark should be seen in right-top corner
                    </p>
                </div>
                <div className='Pg-Config-20'>
                    <img src={watermark} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-20'>
                    <img src={watermark1} alt="card_one" className='Img-Conf' />
                </div>
                <div className='Pg-Config-20'>
                    <img src={watermark2} alt="card_one" className='Img-Conf' />
                </div>
            </div>
        </div>
    )
}
