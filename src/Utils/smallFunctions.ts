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

export {CreateEmptyArray as CreateMidiNoteEventsArray};
export {getEmptyNoteEvent};
export {RandomColor, RandomColorToAlhpa, RandomColorHex, RandomColorRGBwithMin, RandomColorToAlphawithMin};
export {checkExtension};