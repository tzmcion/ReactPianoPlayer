//  This File exports a Function
//  which converts a midi file
//  into Object(JSON)
//  It returns a Promise of an Object, which Object
//  Will be converted to JSON

import { parseArrayBuffer } from 'midi-json-parser';
import { IMidiFile } from '../Utils/TypesForMidi';
//  midi-json-parser is npm library created by chrisguttandin
//  Big thanks to Him!

/**
 * Function reads a midiFile, returning a JSON with IMidiFile
 * @param file a file
 * @param type Specify if File is a reference object or an ArrayBuffer
 * @returns 
 */
const ReadMidiFile = (file:any,type:'ref' | 'ArrayBuffer'): Promise<IMidiFile> =>{

    //Function Converting file from binarry form into ArrayBuffer
    function convertDataToArray64():Promise<ArrayBuffer | string> {
        return new Promise<ArrayBuffer>((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = (event:any) => {
                resolve(event.target.result as ArrayBuffer);
            };
    
            reader.onerror = (err) => {
                reject(err);
            };
            reader.readAsArrayBuffer(file);
        });
    }
    if(type === 'ref'){
    return new Promise<IMidiFile>((resolve,reject) =>{
        convertDataToArray64().then(file=>{
            //checking if Error hasn't been returned
            if(typeof file !== 'string'){
            parseArrayBuffer(file).then(json =>{
                resolve(json);
                });
            }else{
                reject('Error ! Provided type is Not an Object !!');
            }
          })
    })
    }else{
        return new Promise<IMidiFile>((resolve,reject) =>{
            //checking if Error hasn't been returned
            parseArrayBuffer(file).then(json =>{
                    resolve(json);
            });
        })
    }
}

export default ReadMidiFile;