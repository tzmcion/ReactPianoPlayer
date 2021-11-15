import { Options } from "./TypesForOptions";

const data = {Color:'#506CC7',OctaveLines:true,KeyPressColor:'#C89664',RandomColors:false,IsEffects:true, backgroundImage: '',speed:35, playSpeed:5, watermark:true,soundOn:true,renderMethod:'animationFrame', Effect:'fountain',blockRadius:5}

const DefaultOptions:Options = localStorage.getItem('options') === null ? data: JSON.parse(localStorage.getItem('options')!);
localStorage.setItem('options',JSON.stringify(data));

export {DefaultOptions};