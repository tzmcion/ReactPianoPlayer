import React,{useState,ChangeEvent} from 'react';
import OptionCard from '../OptionCard/OptionCard';
import OptionCardImage from '../OptionCard/OptionCardImage';
import EffectChoose from '../OptionCard/EffectChoose/EffectChoose';
import AddCard from '../OptionCard/addCard/addCard';
import PresetCard from '../OptionCard/presetCard/presetCard';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

//Videos
import Fountain from '../OptionCard/EffectChoose/Previews/fountain.mp4';
import DancingLines from '../OptionCard/EffectChoose/Previews/DancingLines.mp4';
import Hexagon from '../OptionCard/EffectChoose/Previews/Sparks.mp4'
import Balls from '../OptionCard/EffectChoose/Previews/balls.mp4'
import Fireworks from '../OptionCard/EffectChoose/Previews/Fireworks.mp4'

//Helpers or types
import { Options as OptionType } from '../../../Utils/TypesForOptions';
import {checkExtension, read_as_text} from '../../../Utils/smallFunctions';

//json presets
import presets from '../OptionCard/presets.json';

//|||||||||||||||||||||||||
//||||||| BLOCKS ||||||||||
//|||||||||||||||||||||||||

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
                        Choose if you want to have yout blocks with gradient Colors (change colors in effects.conf)
                    </OptionCard>
            </div>
        </div>
        
    )
}

//|||||||||||||||||||||||||
//|||||| EFFECTS ||||||||||
//|||||||||||||||||||||||||

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

//|||||||||||||||||||||||||
//|||||||| OTHER ||||||||||
//|||||||||||||||||||||||||

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

//||||||||||||||||||||||||||||
//|||||| EFFECTS.CONF ||||||||
//||||||||||||||||||||||||||||

function Options_Effects_Adv({isOpened,onGoBack,options,handleOptionsChange}:OptionsProps) {

    const [colors,setColors] = useState<Array<String>>(options.GradientBlocksColor);

    const handleColorChange = (event:ChangeEvent<HTMLInputElement>):void => {
        const colorindex = parseInt(event.target.name.split('-')[1])-1;
        const newColors:Array<string> = [];
        colors.map((col,index) => {
            if(index === colorindex){newColors.push(event.target.value)}else{newColors.push(col as string)};
            return null;
        })
        const fakeEvent = {
            target: {
                name: 'gradientBlocksColor',
                value: newColors
            }
        }
        setColors(newColors);
        console.log(colorindex);
        handleOptionsChange(fakeEvent);
    }

    const handleColorAdd = ():void =>{
        const newColors = [...colors];
        newColors.push('#123456');
        const fakeEvent = {
            target: {
                name: 'gradientBlocksColor',
                value: newColors
            }
        }
        setColors(newColors);
        handleOptionsChange(fakeEvent);
    }

    const handleColorDelete = ():void =>{
        const newColors = [...colors];
        newColors.pop();
        const fakeEvent = {
            target: {
                name: 'gradientBlocksColor',
                value: newColors
            }
        }
        setColors(newColors);
        handleOptionsChange(fakeEvent);
    }

    const renderCards = ():Array<React.ReactElement> | Array<void> => {
        return colors.map((color,index) =>{
            return <OptionCard onChange={handleColorChange} name={`Color-${index + 1}`} type='color' title={`Gradient Color #${index}`} value={color as string} key={index}>Choose step color</OptionCard>
        })
    }

    return (
        <div className='options_Cards'>
            <div className='Cards_Container'>
                    {renderCards()}
                    <div style={{display:'flex',justifyContent: 'space-evenly',flexDirection: 'column'}}>
                    <AddCard type='delete' onClick={handleColorDelete} />
                    <AddCard type='add' onClick={handleColorAdd} />
                    </div>
            </div>
        </div>
        
    )
}

//|||||||||||||||||||||||||
//|||||| PRESETS ||||||||||
//|||||||||||||||||||||||||

interface options_presets{
    reloadOptions:Function
}

function Options_Presets({reloadOptions}:options_presets):React.ReactElement {

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
      ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
    
      const [open, setOpen] = React.useState<boolean>(false);
      const [chooseOpen,setChooseOpen] = React.useState<boolean>(false);
    
      const handleClick = () => {
        setOpen(true);
      };

      const handleCardClick = ():void =>{
          setChooseOpen(true);
      }

      const handleCardClose = (event?: React.SyntheticEvent | Event, reason?: string):any =>{
        if (reason === 'clickaway') {
            return;
          }
      
          setChooseOpen(false);
      }
    
      const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const import_ref = React.useRef<HTMLInputElement>(null);

    const renderPresets = ():Array<React.ReactElement> => {
        return presets.map((preset,index) =>
            <PresetCard color={preset.color} title={preset.name} onClick={handleCardClick} json={JSON.stringify(preset.data)} key={index} updateOptions={reloadOptions}>{preset.description}</PresetCard>
        )
    }

    const save_Presets = async () =>{
        const current_preset = localStorage.getItem('options');
        if(current_preset){
        const blob = new Blob([current_preset],{type:'application/json'})
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = 'PBA_saved_preset.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        }
    }

    const import_Preset = async () =>{
        try{ 
            const file = import_ref.current?.files![0];
            if(checkExtension(file,'.json')){
                read_as_text(file).then(text =>{
                    localStorage.setItem('options',text);
                    handleClick();
                    reloadOptions();
                })
            }
            else{
                prompt('This is not a valid file...');
            }
        }
        catch{}
    }

    return <div className="options_Cards">
        <div className="Cards_Container">
            {renderPresets()}
        </div>
        <button className="button_save_presets" onClick={save_Presets}>Save current Preset</button>
        <div className="import_preset_div">
            <h4>Import Preset</h4>
            <input type='file' className="button_import_presets" onChange={import_Preset} ref={import_ref}/>
        </div>
        <Snackbar anchorOrigin={{ vertical:'bottom', horizontal:'center',}} open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Preset imported succesfully.
            </Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical:'bottom', horizontal:'center',}} open={chooseOpen} autoHideDuration={6000} onClose={handleCardClose}>
            <Alert onClose={handleCardClose} severity="info" sx={{ width: '100%' }}>
                Preset changed succesfully.
            </Alert>
        </Snackbar>
    </div>
}

//|||||||||||||||||||||||||
//|||||| EXPORTS ||||||||||
//|||||||||||||||||||||||||

export {
     Options_Blocks,
     Options_Effects,
     Options_Other,
     Options_Effects_Adv,
     Options_Presets}
