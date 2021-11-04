import { noteEvent } from "./TypesForMidi";
import rgbHex from 'rgb-hex';


const getEmptyNoteEvent = (noteNumber:number): noteEvent => {
    return{
        NoteNumber: noteNumber,
        Velocity: -1,
        Duration: -1,
        SoundDuration: -1,
        Delta: -1
    }
}

const CreateEmptyArray = (Keys:number,startNumber:number):Array<noteEvent> =>{
    let Keys_Array = [];
    for(let x = startNumber; x < Keys + startNumber; x++){
        Keys_Array.push(getEmptyNoteEvent(x));
    }
    return Keys_Array;
}

const RandomColor = (r?:number,g?:number,b?:number):string=>{
    return `rgb(${r === undefined? Math.random() * 255 : r},${g === undefined ? Math.random() * 255: g},${b === undefined ? Math.random() * 255 : b})`;
}

const RandomColorRGBwithMin = (r?:number,g?:number,b?:number):string =>{
    return `rgb(${r === undefined? Math.random() * 255 : Math.random() * (255 -r) + r},${g === undefined ? Math.random() * 255: Math.random() * (255 -g ) + g},${b === undefined ? Math.random() * 255 : Math.random() * (255 -b) + b})`;
}

const RandomColorToAlhpa = (r?:number,g?:number,b?:number):string=>{
    return `rgba(${r === undefined? Math.random() * 255 : r},${g === undefined ? Math.random() * 255: g},${b === undefined ? Math.random() * 255 : b}`;
}

const RandomColorToAlphawithMin = (r?:number,g?:number,b?:number):string =>{
    return `rgba(${r === undefined? Math.random() * 255 : Math.random() * (255 -r) + r},${g === undefined ? Math.random() * 255: Math.random() * (255 -g ) + g},${b === undefined ? Math.random() * 255 : Math.random() * (255 -b) + b}`;
}

const RandomColorHex = (r?:number,g?:number,b?:number):string =>{
    return rgbHex(Math.floor(r === undefined ? Math.random() * 255:r),Math.floor(g === undefined ? Math.random() * 255:g),Math.floor(b === undefined ? Math.random() * 255:b));
}

const checkExtension = (file:any,extension:string):boolean =>{
    if(file){
        const ext:string = file.name.split('.').pop();
        if(ext.toLowerCase() === extension.replace('.','').toLowerCase()){
            return true;
        }
    }
    return false;
}

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
const SaveAsBase64 = (element:any,storageName:string):Promise<boolean> => {
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

export {CreateEmptyArray as CreateMidiNoteEventsArray};
export {getEmptyNoteEvent};
export {RandomColor, RandomColorToAlhpa, RandomColorHex, RandomColorRGBwithMin, RandomColorToAlphawithMin};
export {checkExtension};
export {ReadFromLocalStorageBase64, SaveAsBase64}