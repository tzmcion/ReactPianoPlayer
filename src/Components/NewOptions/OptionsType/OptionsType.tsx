import React,{useState,ChangeEvent} from 'react';
import OptionCard from '../OptionCard/OptionCard';
import OptionCardImage from '../OptionCard/OptionCardImage';
import EffectChoose from '../OptionCard/EffectChoose/EffectChoose';
import PresetCard from '../OptionCard/presetCard/presetCard';
import ImportSaveCard from '../OptionCard/presetCard/ImportSaveCard';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

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
                    <OptionCard onChange={handleOptionsChange} name='KeyPressGradientColor' type='color' title='Gradient Color on Key press' value={options.KeyPressGradientColor} >
                        Change the Lighting Color which happens when blocks meet piano.
                    </OptionCard>
                    <OptionCard onChange={handleOptionsChange} name='blockShadowColor' type='number' title='Shadow Radius' value={options.blockShadowRadius.toString()} >
                        Choose the radius (range) of shadow. Zero means no shadow, there is no max value
                    </OptionCard>
                    <OptionCard onChange={handleOptionsChange} name='blockRadius' type='number' title='Block antyaliasing radius' value={options.blockRadius.toString()} >
                        Choose the antyaliasing range. Blocks will have rounded corners. more value, more rounded.
                    </OptionCard>
                    <OptionCard onChange={handleOptionsChange} name='OctaveLines' type='checkbox' title='Render Octave Lines' value={options.OctaveLines} >
                        Check if octave lines should be rendered or not
                    </OptionCard>
                    <OptionCard onChange={handleOptionsChange} name='refresh' type='checkbox' title='Reset Preview' value={options.refresh} >
                        Sometimes piano preview starts lagging... Click Here to reset it.
                    </OptionCard>
            </div>
        </div>
        
    )
}

//|||||||||||||||||||||||||
//|||||| EFFECTS ||||||||||
//|||||||||||||||||||||||||

function Options_Effects({isOpened,onGoBack,options,handleOptionsChange}:OptionsProps) {

    const [effect,setEffect] = useState<'fountain' | 'dancingLines' | 'hexagon' | 'stickyBalls' | 'fireworks' | 'sparks' | 'DNA' | "None">(options.Effect);

    const onChange = (ev:any) =>{
        setEffect(ev.target.value);
        handleOptionsChange(ev);
    }

    return (
        <div className='options_Cards'>
            <div className='Cards_Container'>
                <EffectChoose onChange={onChange} name='Effect' title='None' textColor='effects' current={effect} value={'None'} >
                        <ul>
                            <li>No particular effect</li>
                            <li>Performance indicator: <span className='Blue_cl'>None</span></li>
                        </ul>
                </EffectChoose>
                <EffectChoose onChange={onChange} name='Effect' title='Sparks' textColor='effects' current={effect} value={'Sparks'} >
                        <ul>
                            <li>Little sparks from the keyboard</li>
                            <li>Performance indicator: <span className='Red_cl'>High</span></li>
                        </ul>
                </EffectChoose>
                <EffectChoose onChange={onChange} name='Effect' title='Squared' textColor='effects' current={effect} value={'Squared'} >
                        <ul>
                            <li>Little quares going in squares, Squared!</li>
                            <li><span className='Red_cl'>Warning: </span>Background Image does not work with this effect</li>
                            <li>Performance indicator: <span className='Green_cl'>Good</span></li>
                        </ul>
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
//|||||| GRADIENTS ||||||||
//||||||||||||||||||||||||||||

/**
 * @deprecated
 * @param param0 
 * @returns 
 */
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
            return <OptionCard onChange={handleColorChange} name={`Color-${index + 1}`} type='color' title={`Gradient Color #${index}`} value={color as string} key={index}>
                Color building gradeint.
                Remember to switch on GradeintBlocks!
                </OptionCard>
        })
    }

    return (
        <div className='options_Cards'>
            <div className='Cards_Container'>
                    <div style={{display:'flex',justifyContent: 'space-evenly',flexDirection: 'column'}}>
                    </div>
            </div>
        </div>
        
    )
}

//|||||||||||||||||||||||||
//|||||| PRESETS ||||||||||
//|||||||||||||||||||||||||

interface options_presets{
    reloadOptions:Function,
    options:OptionType
}

function Options_Presets({reloadOptions,options}:options_presets):React.ReactElement {

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

    const renderPresets = ():Array<React.ReactElement> => {
        return presets.map((preset,index) =>
            <PresetCard color={preset.color} title={preset.name} onClick={handleCardClick} json={JSON.stringify(preset.data)} key={index} updateOptions={reloadOptions}>{preset.description}</PresetCard>
        )
    }

    return <div className="options_Cards">
        <div className="Cards_Container">
            <ImportSaveCard reloadOptions={reloadOptions} options={options} onImport={handleClick} />
            {renderPresets()}
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
