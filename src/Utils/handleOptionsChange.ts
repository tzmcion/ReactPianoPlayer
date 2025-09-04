//LAST UPDATE: 04/09/2025

import { Options as OptionsType } from './TypesForOptions';
import { ChangeEvent } from 'react';

/**
 * Method reads the event of the change, and applies the changes to the options file
 * It returns new options file with applied changes, it does not change any state.
 * @param event Either eventChange from HTML, or a object with target, name and value
 * @param options Options
 * @returns Returns edited options object.
 */
const handleOptionsChange = (event:ChangeEvent<HTMLInputElement> | {target:{name:string,value:any}},options:OptionsType):OptionsType =>{
    let currentOptions = {...options};
    switch(event.target.name){
        case 'color':
            currentOptions.Color = event.target.value;
            break;
        case 'Thincolor':
            currentOptions.ThinerBlockColor = event.target.value;
            break;
        case 'Image':
            currentOptions.backgroundImage = event.target.value
            break;
        case 'speed':
            currentOptions.speed = parseInt(event.target.value);
            break;
        case 'playSpeed':
            currentOptions.playSpeed = parseInt(event.target.value);
            break;
        case 'watermark':
            currentOptions.watermark = !options.watermark;
            break;
        case 'soundOn':
            currentOptions.soundOn = !options.soundOn;
            break;
        case 'KeyPressColor':
            currentOptions.KeyPressColor = event.target.value;
            break;
        case 'blockShadowColor':
            currentOptions.blockShadowRadius = parseInt(event.target.value);
            break;
        case 'blockRadius':
            currentOptions.blockRadius = parseInt(event.target.value);
            break;
        case 'Effect':
            currentOptions.Effect = event.target.value;
            break;
        case 'shadowColor':
            currentOptions.ShadowColor = event.target.value;
            break;
        case 'EffectsColor':
            currentOptions.EffectsColor = event.target.value;
            break;
        case 'OctaveLines':
            currentOptions.OctaveLines = !currentOptions.OctaveLines;
            break;
        case 'refresh':
            currentOptions.refresh = !currentOptions.refresh;
            break;
        default:
            break;
    }
    return currentOptions;
}

export default handleOptionsChange;