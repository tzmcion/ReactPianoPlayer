export interface Options{
    Color:string,
    KeyPressColor:string,
    RandomColors:boolean,
    IsEffects:boolean,
    backgroundImage: string,
    speed:number,
    playSpeed:number,
    watermark:boolean,
    soundOn:boolean,
    OctaveLines:boolean
    renderMethod:'Interval' | 'animationFrame',
    Effect:'fountain' | 'dancingLines'
}

