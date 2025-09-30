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
    KeyPressEffect: "Gradient",
    blockRadius:4,
    ShadowColor:'#ffffff',
    blockShadowRadius:8,
    ThinerBlockColor:'#e3e3e3',
    refresh: false,
    keyWhToBlRatio: 1/2,
    pianoHeightRatio: 1/5
}

/**
 * Function checks the options in localStorage, and rewrites them if options are missing, 
 * then reloads the page
 * @returns new options 
 */
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

/**
 * Function checks the options variable and returns updated if necessary
 * @param options - options to check
 * @returns object with data field with updated or repaired options, and reloaded boolean
 */
const validate_options = (options:OptionsType):{data:OptionsType, reloaded:boolean} =>{
    let opt = JSON.parse(JSON.stringify(options));
    let was_reloaded = false;
    for(const [key,value] of Object.entries(Default_data)){
        const obj_key = key;
        if(!Object.hasOwn(opt,obj_key)){
            opt = {
                ...opt,
                [obj_key]:value
            }
            was_reloaded = true;
        }
    }
    return {
        data:opt,
        reloaded:was_reloaded
    }
}


/**Default options variable*/


export {handleDefaultValuesCheck, validate_options};
export {Default_data};