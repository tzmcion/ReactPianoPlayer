/**
 * File consist of small helpfull functions used across the app
 * Last UPDATE: 04/09/2025
 */

import { noteEvent } from "./TypesForMidi";
import rgbHex from 'rgb-hex';

import {Default_data as data} from './Default';


/**
 * Function not recomended for usage due to returning noteEvent type
 * Used before in "/src/Helpers/getNoteEventsJSON.ts"
 * @deprecated 
 * @param noteNumber 
 * @returns 
 */
const getEmptyNoteEvent = (noteNumber:number): noteEvent => {
    return{
        NoteNumber: noteNumber,
        Velocity: -1,
        Duration: -1,
        SoundDuration: -1,
        Delta: -1
    }
}

/**
 * Function not used anywhere and not recomended for usage due to returning noteEvent type
 * @deprecated
 * @param Keys 
 * @param startNumber 
 * @returns 
 */
const CreateEmptyArray = (Keys:number,startNumber:number):Array<noteEvent> =>{
    let Keys_Array = [];
    for(let x = startNumber; x < Keys + startNumber; x++){
        Keys_Array.push(getEmptyNoteEvent(x));
    }
    return Keys_Array;
}

/**
 * Very weird function
 * @param r range from 0-255
 * @param g range from 0-255
 * @param b range from 0-255
 * @returns string in format of RGB
 * @deprecated 
 */
const RandomColor = (r?:number,g?:number,b?:number):string=>{
    return `rgb(${r === undefined? Math.random() * 255 : r},${g === undefined ? Math.random() * 255: g},${b === undefined ? Math.random() * 255 : b})`;
}

/**
 * Very weird function
 * @param r range from 0-255
 * @param g range from 0-255
 * @param b range from 0-255
 * @returns string in format of RGB
 * @deprecated 
 */
const RandomColorRGBwithMin = (r?:number,g?:number,b?:number):string =>{
    return `rgb(${r === undefined? Math.random() * 254 : Math.random() * (254 -r) + r},${g === undefined ? Math.random() * 254: Math.random() * (254 -g ) + g},${b === undefined ? Math.random() * 254 : Math.random() * (254 -b) + b})`;
}

/**
 * Very weird function
 * @param r range from 0-255
 * @param g range from 0-255
 * @param b range from 0-255
 * @returns string in format of RGBA
 * @deprecated 
 */
const RandomColorToAlhpa = (r?:number,g?:number,b?:number):string=>{
    return `rgba(${r === undefined? Math.random() * 255 : r},${g === undefined ? Math.random() * 255: g},${b === undefined ? Math.random() * 255 : b}`;
}

/**
 * Very weird function
 * @param r range from 0-255
 * @param g range from 0-255
 * @param b range from 0-255
 * @returns string in format of RGBA
 * @deprecated 
 */
const RandomColorToAlphawithMin = (r?:number,g?:number,b?:number):string =>{
    return `rgba(${r === undefined? Math.random() * 255 : Math.random() * (255 -r) + r},${g === undefined ? Math.random() * 255: Math.random() * (255 -g ) + g},${b === undefined ? Math.random() * 255 : Math.random() * (255 -b) + b}`;
}

/**
 * Function returns random color in format of HeX
 * @param r 
 * @param g 
 * @param b 
 * @returns hex color
 */
const RandomColorHex = (r?:number,g?:number,b?:number):string =>{
    return rgbHex(Math.floor(r === undefined ? Math.random() * 255:r),Math.floor(g === undefined ? Math.random() * 255:g),Math.floor(b === undefined ? Math.random() * 255:b));
}

/**
 * Method checks the extension of the file. File is a input element
 * @param file File from input element (NOT THE NAME OF THE FILE)
 * @param extension string of extension (example: .JSON, MIDI, MID)
 * @returns boolean stating if extension of the file matches the provided extension
 */
const checkExtension = (file:any,extension:string):boolean =>{
    if(file){
        const ext:string = file.name.split('.').pop();
        if(ext.toLowerCase() === extension.replace('.','').toLowerCase()){
            return true;
        }
    }
    return false;
}

/**
 * Function reads a saved file from localstorage, then returns it as arraybuffer
 * @param storageName in localStorage, the name of the item (for .getItem)
 * @returns an array buffer of the file
 */
const ReadFromLocalStorageBase64 = (storageName:string):ArrayBuffer =>{
        const base64 = localStorage.getItem(storageName);   
        const base64Parts = base64?.split(',');
        const Content = base64Parts !== undefined ? base64Parts[1] : null;
        if(Content){
            const binary_string = window.atob(Content);
            let bytes = new Uint8Array(binary_string.length);
            for(let x = 0; x < binary_string.length; x++){
                bytes[x] = binary_string.charCodeAt(x);
            }
            return bytes.buffer;
        }
        return new ArrayBuffer(1);
    }

/**
 * Function saves the element as binary data in A SCII string format (base64)
 * @param element data to save, either a file, or  JSON
 * @param storageName name in localStorage to save the file in
 * @param json specifies if the inserted data is in form of a JSON
 * @returns a promise, which always results in true.
 */
const SaveAsBase64 = (element:any,storageName:string,json?:boolean):Promise<boolean> => {
        if(json){
            return new Promise<boolean>(resolve =>{
                localStorage.setItem(storageName,JSON.stringify(element));
                resolve(true);
            })
        }else{
            return new Promise<boolean>(resolve =>{
                var file = element
                var reader = new FileReader()
                reader.onload = function(base64) {
                if(typeof base64.target?.result == 'string')
                    localStorage.setItem(storageName,base64.target?.result);
                    resolve(true);
                }
                reader.readAsDataURL(file);
        })
    }
}

/**
 * Function reads the file as a string, and returns in as a promise.
 * @param file a type for file from input
 * @returns A Promise of string, in case of error, returns string "Error"
 */
const read_as_text = async (file:any):Promise<string> =>{
    return new Promise<string>(resolve =>{
        const reader = new FileReader();
        reader.onload = function(otp){
            const result = otp.target?.result;
            typeof result === 'string' ? resolve(result) : resolve('Error');
        }
        reader.readAsText(file);
    })
}

/**
 * Method restores the default options by reloading the localStorage, and refreshing the window
 * PLEASE DO NOT USE
 * @deprecated
 */
const restoreDefaults = ():void =>{
    localStorage.setItem('options',JSON.stringify(data));
    window.location.reload();
}

/**
 * I don't remember the english word for it
 */
const random_denominator = ():1|-1 => {
    return Math.random() > 0.5 ? 1 : -1
}

/**
 * Function adds the to the hex color the alpha number
 * @param hex - color in hexadecimall format
 * @param alpha - alpha value, range from 0 to 255
 * @returns Color in format of HEX: #FFFFF[Alpha], example: #000fff02
 */
const alpha_hex = (hex:string, alpha: number):string => {
    if(hex.length === 0 || alpha < 0 || alpha > 255){
        throw new Error("provided string is not a color in hexadecimal format, or provided alpha is higher than 255 or lower than 0");
    }
    if(hex[0] !== '#'){
        hex = "#" + hex;
    }
    if(hex.length > 7){
        hex = hex.slice(0,7);
    }
    if(alpha === 0){
        return hex + "00";
    }
    if(hex.length === 4){
        //Add at the end of the string the same value as it is on the begin
        hex = hex + hex.slice(1,4)
    }
    return (hex + (alpha < 16 ? '0' : '') + Math.abs(Math.floor(alpha)).toString(16));
}

/**
 * Apply a little lighten and darken to the color
 * @param hex hexadecimal color
 * @param forza force of the change, range from 0-255
 * @param random_in_color randomization of each color, default 0 (no randomization)
 * @returns 
 */
const lighten_darken_color = (hex:string, forza:number, random_in_color:number = 0):string => {
    if(hex[0] === "#"){
        hex = hex.slice(1,hex.length)
    }
    if(hex.length !== 6){
        hex = hex.slice(0,6)
    }
    const first_nr = Number("0x"+hex.slice(0,2)) + (forza + (Math.floor(Math.random() * random_in_color * random_denominator())))
    const second_nr = Number("0x"+hex.slice(2,4)) + (forza + (Math.floor(Math.random() * random_in_color * random_denominator())))
    const third_nr = Number("0x"+hex.slice(4,6)) + (forza + (Math.floor(Math.random() * random_in_color * random_denominator())))

    let build_hex_string = "#";
    build_hex_string += first_nr > 255 ? "ff" : first_nr < 0 ? "00" : (first_nr < 16 ? '0' : '') + Math.abs(Math.floor(first_nr)).toString(16)
    build_hex_string += second_nr > 255 ? "ff" : second_nr < 0 ? "00" : (second_nr < 16 ? '0' : '') + Math.abs(Math.floor(second_nr)).toString(16)
    build_hex_string += third_nr > 255 ? "ff" : third_nr < 0 ? "00" : (third_nr < 16 ? '0' : '') + Math.abs(Math.floor(third_nr)).toString(16)
    return build_hex_string;
}

export {CreateEmptyArray as CreateMidiNoteEventsArray};
export {getEmptyNoteEvent};
export {RandomColor, RandomColorToAlhpa, RandomColorHex, RandomColorRGBwithMin, RandomColorToAlphawithMin, lighten_darken_color};
export {checkExtension};
export {restoreDefaults};
export {read_as_text, random_denominator, alpha_hex};
export {ReadFromLocalStorageBase64, SaveAsBase64}