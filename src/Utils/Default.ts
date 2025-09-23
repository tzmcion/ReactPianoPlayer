/**
 * FILE APPLIES DEFAULT OPTIONS TO THE OPTIONS FILE
 * Also, if the options file is corrupted, it will reload the file
 * LAST UPDATE: 04/09/2025
 */

import { Options as OptionsType } from "./TypesForOptions";

/**Default options */
const Default_data:OptionsType = {
    Color:'#ffffff',
    OctaveLines:true,
    KeyPressColor:'#e3e3e3',
    KeyPressGradientColor: "#ffffff",
    backgroundImage: '',
    playSpeed:5,
    watermark:false,
    soundOn:true,
    Effect:'None',
    blockRadius:4,
    ShadowColor:'#ffffff',
    blockShadowRadius:8,
    ThinerBlockColor:'#e3e3e3',
    refresh: false,
    keyWhToBlRatio: 1/2,
    pianoHeightRatio: 1/5
}

const handleDefaultValuesCheck = ():OptionsType => {
    //Important, if options are undefined do it this way :)
    try{
        JSON.parse(localStorage.getItem('options')!)
    }catch{
        localStorage.setItem('options',JSON.stringify(Default_data))
    }

    let DefaultOptions:OptionsType = localStorage.getItem('options') === null ? Default_data : JSON.parse(localStorage.getItem('options')!);

    let needs_reload = false;
    for(const [key,value] of Object.entries(Default_data)){
        const obj_key = key as keyof OptionsType;
        if(!Object.hasOwn(DefaultOptions,obj_key)){
            DefaultOptions = {
                ...DefaultOptions,
                [obj_key]:value
            }
            needs_reload = true;
        }
    }

    if(needs_reload){
        localStorage.setItem('options',JSON.stringify(DefaultOptions));
        window.location.reload();
    }

    return DefaultOptions;
} 



/**Default options variable*/


export {handleDefaultValuesCheck};
export {Default_data};