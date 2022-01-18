import React,{useState} from 'react';

import OptionCard from '../OptionCard/OptionCard';
import OptionCardImage from '../OptionCard/OptionCardImage';
import EffectChoose from '../OptionCard/EffectChoose/EffectChoose';

import Fountain from '../OptionCard/EffectChoose/Previews/fountain.mp4';
import DancingLines from '../OptionCard/EffectChoose/Previews/DancingLines.mp4';
import Hexagon from '../OptionCard/EffectChoose/Previews/Sparks.mp4'
import Balls from '../OptionCard/EffectChoose/Previews/balls.mp4'
import Fireworks from '../OptionCard/EffectChoose/Previews/Fireworks.mp4'

import { Options as OptionType } from '../../../Utils/TypesForOptions';

interface OptionsProps{
    isOpened:boolean,
    onGoBack:Function,
    handleOptionsChange:Function,
    options:OptionType
}

function Options_Blocks({isOpened,onGoBack,options,handleOptionsChange}:OptionsProps) {
    return (
        <div className='options_Cards'>
            <div className='Cards_Container'>
                    <OptionCard onChange={handleOptionsChange} name='color' type='color' title='Color' value={options.Color} >
                        Choose the color of your blocks, remember to match it it with shadow, or disable shadow.
                    </OptionCard>
                    <OptionCard onChange={handleOptionsChange} name='Thincolor' type='color' title='Thin Blocks Color' value={options.ThinerBlockColor} >
                        Choose the color of thiner blocks. They are the blocks that fall onto the black keys
                    </OptionCard>
                    <OptionCard onChange={handleOptionsChange} name='shadowColor' type='color' title='Block Shadow Color' value={options.ShadowColor} >
                        Choose shadow color of your blocks, it makes them a little more bright and realistic.
                    </OptionCard>
                    <OptionCard onChange={handleOptionsChange} name='KeyPressColor' type='color' title='Key Pressed Color' value={options.KeyPressColor} >
                        Choose the color of a key when block reaches it. It will activate and change color to this.
                    </OptionCard>
                    <OptionCard onChange={handleOptionsChange} name='GradientCol' type='color' title='Gradient Color on Key press' value={options.GradientColor} >
                        Change the Lighting Color which happens when blocks meet piano.
                    </OptionCard>
                    <OptionCard onChange={handleOptionsChange} name='RandomColors' type='checkbox' title='Random blocks Color' value={options.RandomColors} >
                        Choose if you want blocks to appear with random colors each. Colors are brightened.
                    </OptionCard>
                    <OptionCard onChange={handleOptionsChange} name='blockShadowColor' type='number' title='Shadow Radius' value={options.blockShadowRadius.toString()} >
                        Choose the radius (range) of shadow. Zero means no shadow, there is no max value
                    </OptionCard>
                    <OptionCard onChange={handleOptionsChange} name='blockRadius' type='number' title='Block antyaliasing radius' value={options.blockRadius.toString()} >
                        Choose the antyaliasing range. Blocks will have rounded corners. more value, more rounded.
                    </OptionCard>
                    <OptionCard onChange={handleOptionsChange} name='gradientBlocks' type='checkbox' title='GradientBlocks' value={options.GradientBlocks} >
                        Choose if you want to have yout blocks with gradient Colors (options to choose cols soon)
                    </OptionCard>
            </div>
        </div>
        
    )
}

function Options_Effects({isOpened,onGoBack,options,handleOptionsChange}:OptionsProps) {

    const [effect,setEffect] = useState<'fountain' | 'dancingLines' | 'hexagon' | 'stickyBalls' | 'fireworks'>(options.Effect);

    const onChange = (ev:any) =>{
        setEffect(ev.target.value);
        handleOptionsChange(ev);
        const Simulate_event = {
            target:{
                name:'IsEffectsTrue',
                value:true
            }
        }
        handleOptionsChange(Simulate_event);
    }

    return (
        <div className='options_Cards'>
            <div className='Cards_Container'>
                <EffectChoose onChange={onChange} name='Effect' type='number' title='Fountain' textColor='effects' src={Fountain} current={effect} value={'fountain'} >
                        Block reaches the piano, water shows (may english good)
                </EffectChoose>
                <EffectChoose onChange={onChange} name='Effect' type='number' title='Sparks' textColor='effects' src={DancingLines} current={effect} value={'dancingLines'} >
                        I bet those little sparks jump higher than you ---:O---
                </EffectChoose>
                <EffectChoose onChange={onChange} name='Effect' type='number' title='Dancing Lines' textColor='effects' src={Hexagon} current={effect} value={'hexagon'} >
                        They are like me on a dancing floor (in my imagination);
                </EffectChoose>
                <EffectChoose onChange={onChange} name='Effect' type='number' title='Bubbles' textColor='effects' src={Balls} current={effect} value={'stickyBalls'} >
                        Lava Bubbles from the deepest deeps of deepest ocean (they looked better but performance :c)
                </EffectChoose>
                <EffectChoose onChange={onChange} name='Effect' type='number' title='Tornado Fireworks' textColor='effects' src={Fireworks} current={effect} value={'fireworks'} >
                        Those Fancy bubbles spark like fireworks and they move a little like tornado
                </EffectChoose>
            </div>
        </div>
    )
}

function Options_Other({isOpened,onGoBack,options,handleOptionsChange}:OptionsProps) {
    return (
        <div className='options_Cards'>
            <div className='Cards_Container'>
                    <OptionCard onChange={handleOptionsChange} name='watermark' type='checkbox' title='Watermark' textColor='speed' value={options.watermark} >
                        Choose if you want to have a small Watermark with name of app in upper-right corner
                    </OptionCard>
                    <OptionCard onChange={handleOptionsChange} name='soundOn' type='checkbox' title='Sound On' textColor='speed' value={options.soundOn} >
                        Choose On/Off for virtual piano keyboard to make sound or not.
                    </OptionCard>
                    <OptionCard onChange={handleOptionsChange} name='playSpeed' type='number' title='Speed' textColor='speed' value={options.playSpeed.toString()} >
                        Choose How fast will the blocks fall. Remember, blocks are also higher/taller with more speed
                    </OptionCard>
                    <OptionCardImage onChange={handleOptionsChange} name='playSpeed' type='number' title='Background Image' textColor='speed' value={options.playSpeed.toString()} >
                        Choose Background. Carefoul ! You can't easily switch back to default image
                    </OptionCardImage>
                    
            </div>
        </div>
        
    )
}

function Options_Effects_Adv({isOpened,onGoBack,options,handleOptionsChange}:OptionsProps) {
    return (
        <div className='options_Cards'>
            <div className='Cards_Container'>
                    <OptionCard onChange={handleOptionsChange} name='IsEffects' type='checkbox' title='Effects on/off' textColor='background' value={options.IsEffects} >
                        Choose if you want PBA with no effects at all (Green - Effects On / Red - Effects Off);
                    </OptionCard>
                    <OptionCard onChange={handleOptionsChange} name='EffectsBlockColor' type='checkbox' title="Effects color same as block" textColor='background' value={options.EffectsBlockColor} >
                        Choose if you want effects color same as blocks color
                    </OptionCard>
                    <OptionCard onChange={handleOptionsChange} name='EffectsKeyColor' type='checkbox' title="Effects color same as key" textColor='background' value={options.EffectsKeyColor} >
                        Choose if you want effects color same as key press kolor
                    </OptionCard>
                    <OptionCard onChange={handleOptionsChange} name='randomEffectsColor' type='checkbox' title='Random Effects Color' textColor='background' value={options.randomEffectColors} >
                        Choose if you want effects color to be random
                    </OptionCard>
                    <OptionCard onChange={handleOptionsChange} name='EffectsColor' type='color' title='Color of Effects' textColor='background' value={options.EffectsColor} >
                        Choose the color of your effects. NOT EVERY EFFECT TYPE WILL HAVE YOUR COLORS!!!
                    </OptionCard>
            </div>
        </div>
        
    )
}

export {Options_Blocks, Options_Effects, Options_Other, Options_Effects_Adv}
