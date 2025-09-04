
/**
 * Interface for Options object. Every component which uses options must follow this type to ensure the app is working correctly
 * LAST UPDATE: 09/04/2025
 */
export interface Options{
    Color:string,
    KeyPressColor:string,
    KeyPressGradientColor:string,
    backgroundImage: string,
    speed:number,
    playSpeed:number,
    watermark:boolean,
    soundOn:boolean,
    blockRadius:number,
    blockShadowRadius:number,
    refresh:boolean,
    ShadowColor:string,
    EffectsColor:string,
    OctaveLines:boolean,
    Effect:"Squares" | "Sparks" | "None",
    ThinerBlockColor:string,
}

