import { Options as OptionsType } from './TypesForOptions';
import { ChangeEvent } from 'react';

const handleOptionsChange = (event:ChangeEvent<HTMLInputElement> | {target:{name:string,value:any}},options:OptionsType):OptionsType =>{
    let currentOptions = {...options};
    switch(event.target.name){
        case 'color':
            currentOptions.Color = event.target.value;
            break;
        case 'Thincolor':
            currentOptions.ThinerBlockColor = event.target.value;
            break;
        case 'GradientCol':
            currentOptions.GradientColor = event.target.value;
            break;
        case 'RandomColors':
            currentOptions.RandomColors = !options.RandomColors;
            break;
        case 'IsEffects':
            currentOptions.IsEffects = !options.IsEffects;
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
        case 'renderMethod':
            if(event.target.value === 'Interval' || event.target.value === 'animationFrame'){
                currentOptions.renderMethod = event.target.value;
            }
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
        case 'EffectsBlockColor':
            currentOptions.EffectsBlockColor = !currentOptions.EffectsBlockColor
            break;
        case 'EffectsKeyColor':
            currentOptions.EffectsKeyColor = !currentOptions.EffectsKeyColor;
            break;
        case 'randomEffectsColor':
            currentOptions.randomEffectColors = !currentOptions.randomEffectColors;
            break;
        case 'EffectsColor':
            currentOptions.EffectsColor = event.target.value;
            break;
        case 'IsEffectsTrue':
            currentOptions.IsEffects = true;
            break;
        case 'gradientBlocks':
            currentOptions.GradientBlocks = !currentOptions.GradientBlocks;
            break;
        case 'gradientBlocksColor':
            currentOptions.GradientBlocksColor = event.target.value;
            break;
        case 'OctaveLines':
            currentOptions.OctaveLines = !currentOptions.OctaveLines;
            break;
        default:
            break;
    }
    return currentOptions;
}

export default handleOptionsChange;