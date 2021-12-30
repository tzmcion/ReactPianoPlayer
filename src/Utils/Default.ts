import { Options } from "./TypesForOptions";

const data:Options = {
    Color:'#8EF971',
    OctaveLines:true,
    KeyPressColor:'#128251',
    RandomColors:false,
    IsEffects:false,
    backgroundImage: '',
    speed:35,
    playSpeed:5,
    watermark:false,
    soundOn:true,
    renderMethod:'animationFrame',
    Effect:'fountain',
    blockRadius:10,
    ShadowColor:'#000',
    blockShadowRadius:6,
    EffectsBlockColor: false,
    randomEffectColors:false,
    EffectsKeyColor:false,
    EffectsColor: '#ffffff',
    GameMode:false,
    ThinerBlockColor:'#FB1378',
    GradientColor:'#128251'
}

const DefaultOptions:Options = localStorage.getItem('options') === null ? data: JSON.parse(localStorage.getItem('options')!);

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

export {DefaultOptions};
export {data};