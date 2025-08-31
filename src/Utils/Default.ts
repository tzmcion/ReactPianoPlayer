import { Options } from "./TypesForOptions";

const data:Options = {
    Color:'#ffffff',
    OctaveLines:true,
    KeyPressColor:'#e3e3e3',
    RandomColors:false,
    IsEffects:false,
    backgroundImage: '',
    speed:35,
    playSpeed:5,
    watermark:false,
    soundOn:true,
    renderMethod:'animationFrame',
    Effect:'None',
    blockRadius:4,
    ShadowColor:'#ffffff',
    blockShadowRadius:8,
    EffectsBlockColor: false,
    randomEffectColors:false,
    EffectsKeyColor:false,
    EffectsColor: '#ffffff',
    GameMode:false,
    ThinerBlockColor:'#e3e3e3',
    GradientColor:'#e3e3e3',
    GradientBlocks:true,
    GradientBlocksColor:["#ff0000","#f59b00","#ffff00","#00ff00","#0033ff","#4b0082","#7f00ff"],
}

//Important, if options are undefined do it this way :)
try{
    JSON.parse(localStorage.getItem('options')!)
}catch{
    localStorage.setItem('options',JSON.stringify(data))
}


let DefaultOptions:Options = localStorage.getItem('options') === null ? data : JSON.parse(localStorage.getItem('options')!);

if(!('GradientColor' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('ThinerBlockColor' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('EffectsColor' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('EffectsKeyColor' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('randomEffectColors' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('EffectsBlockColor' in DefaultOptions)){
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

if(!('renderMethod' in DefaultOptions)){
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

if(!('IsEffects' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

if(!('RandomColors' in DefaultOptions)){
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
if(!('GradientBlocks' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}
if(!('GradientBlocksColor' in DefaultOptions)){
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

DefaultOptions = localStorage.getItem('options') === null ? data: JSON.parse(localStorage.getItem('options')!);

export {DefaultOptions};
export {data};