/**
 * FILE APPLIES DEFAULT OPTIONS TO THE OPTIONS FILE
 * Also, if the options file is corrupted, it will reload the file
 * LAST UPDATE: 04/09/2025
 */

import { Options } from "./TypesForOptions";

/**Default options */
const data:Options = {
    Color:'#ffffff',
    OctaveLines:true,
    KeyPressColor:'#e3e3e3',
    KeyPressGradientColor: "#ffffff",
    backgroundImage: '',
    speed:35,
    playSpeed:5,
    watermark:false,
    soundOn:true,
    Effect:'None',
    blockRadius:4,
    ShadowColor:'#ffffff',
    blockShadowRadius:8,
    EffectsColor: '#ffffff',
    ThinerBlockColor:'#e3e3e3',
    refresh: false
}

//Important, if options are undefined do it this way :)
try{
    JSON.parse(localStorage.getItem('options')!)
}catch{
    localStorage.setItem('options',JSON.stringify(data))
}

/**Default options variable*/
let DefaultOptions:Options = localStorage.getItem('options') === null ? data : JSON.parse(localStorage.getItem('options')!);

if(!('ThinerBlockColor' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('EffectsColor' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('KeyPressGradientColor' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();    
}

if(!('blockShadowRadius' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('ShadowColor' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('blockRadius' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('Effect' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('soundOn' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('watermark' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('playSpeed' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('speed' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('backgroundImage' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}
if(!('KeyPressColor' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('OctaveLines' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('Color' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('refresh' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

DefaultOptions = localStorage.getItem('options') === null ? data: JSON.parse(localStorage.getItem('options')!);

export {DefaultOptions};
export {data};